import fs from 'node:fs'

const stream = fs.createReadStream('mock1.svg', { encoding: 'utf8', highWaterMark: 1024 * 1024 })
let carry = ''
const events = []

function scan(data, final) {
  const re = /<(pattern|use|image|g|rect)\b([^>]*)>/g
  let match
  let last = 0
  while ((match = re.exec(data)) !== null) {
    last = re.lastIndex
    const tag = match[1]
    const attrs = match[2]
    if (tag === 'image') {
      events.push({ tag, note: 'image' })
      continue
    }
    const id = attrs.match(/\sid="([^"]+)"/)?.[1] ?? ''
    const href = attrs.match(/\s(?:href|xlink:href)="([^"]+)"/)?.[1] ?? ''
    const transform = attrs.match(/\stransform="([^"]+)"/)?.[1] ?? ''
    const x = attrs.match(/\sx="([^"]+)"/)?.[1] ?? ''
    const y = attrs.match(/\sy="([^"]+)"/)?.[1] ?? ''
    const width = attrs.match(/\swidth="([^"]+)"/)?.[1] ?? ''
    const height = attrs.match(/\sheight="([^"]+)"/)?.[1] ?? ''
    if (tag === 'pattern' || tag === 'use' || id || href) {
      events.push({ tag, id, href, x, y, width, height, transform: transform.slice(0, 80) })
    }
  }
  if (!final) {
    const open = Math.max(data.lastIndexOf('<pattern'), data.lastIndexOf('<use '), data.lastIndexOf('<image'), data.lastIndexOf('<g '), data.lastIndexOf('<rect'))
    if (open > last - 1 && open > data.length - 500) return data.slice(open)
  }
  return ''
}

stream.on('data', (chunk) => {
  carry = scan(carry + chunk, false)
})
stream.on('end', () => {
  scan(carry, true)
  const lines = events
    .filter((event) => event.tag !== 'rect' || event.id)
    .map((event) => JSON.stringify(event))
  console.log(lines.join('\n'))
  console.log('count', events.length)
})
