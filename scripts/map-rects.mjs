import fs from 'node:fs'

const stream = fs.createReadStream('mock1.svg', { encoding: 'utf8', highWaterMark: 256 * 1024 })
let carry = ''
const rects = []

function scan(data, final) {
  const re = /<rect\b([^>]*)\/?>/g
  let match
  let last = 0
  while ((match = re.exec(data)) !== null) {
    last = re.lastIndex
    const attrs = match[1]
    const fill = attrs.match(/\sfill="([^"]+)"/)?.[1] ?? ''
    if (!fill.includes('pattern')) continue
    const read = (name) => attrs.match(new RegExp(`\\s${name}="([^"]+)"`))?.[1] ?? ''
    rects.push({
      fill,
      x: read('x'),
      y: read('y'),
      width: read('width'),
      height: read('height'),
      rx: read('rx'),
      transform: (attrs.match(/\stransform="([^"]+)"/)?.[1] ?? '').slice(0, 100),
    })
  }
  if (!final) {
    const open = data.lastIndexOf('<rect')
    if (open >= last && open > data.length - 400) return data.slice(open)
  }
  return ''
}

stream.on('data', (chunk) => {
  carry = scan(carry + chunk, false)
})
stream.on('end', () => {
  scan(carry, true)
  console.log(JSON.stringify(rects, null, 2))
})
