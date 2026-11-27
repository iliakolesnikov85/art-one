import fs from 'node:fs'
import path from 'node:path'

const source = path.resolve('mock1.svg')
const outDir = path.resolve('public/mock')
fs.mkdirSync(outDir, { recursive: true })

const stream = fs.createReadStream(source, { encoding: 'utf8', highWaterMark: 1024 * 1024 })
let carry = ''
let index = 0
const summary = []

function takeImages(data, final) {
  const re = /<image\b([^>]*)\/?>/g
  let match
  let last = 0
  while ((match = re.exec(data)) !== null) {
    last = re.lastIndex
    const attrs = match[1]
    const read = (name) => {
      const found = attrs.match(new RegExp(`${name}="([^"]*)"`))
      return found ? found[1] : ''
    }
    const href = read('href') || read('xlink:href')
    const meta = {
      index,
      x: read('x'),
      y: read('y'),
      width: read('width'),
      height: read('height'),
      bytes: href.length,
    }
    if (href.startsWith('data:')) {
      const header = href.slice(0, href.indexOf(','))
      const ext = header.includes('png') ? 'png' : header.includes('jpeg') || header.includes('jpg') ? 'jpg' : 'bin'
      const file = `image-${String(index).padStart(2, '0')}.${ext}`
      const body = href.slice(href.indexOf(',') + 1)
      fs.writeFileSync(path.join(outDir, file), Buffer.from(body, 'base64'))
      meta.file = file
      meta.mime = header
    } else {
      meta.href = href.slice(0, 120)
    }
    summary.push(meta)
    index += 1
  }
  if (!final) {
    const open = data.lastIndexOf('<image')
    if (open >= last) return data.slice(open)
  }
  return ''
}

stream.on('data', (chunk) => {
  carry = takeImages(carry + chunk, false)
})
stream.on('end', () => {
  takeImages(carry, true)
  fs.writeFileSync(path.join(outDir, 'manifest.json'), JSON.stringify(summary, null, 2))
  console.log(JSON.stringify(summary, null, 2))
})
