import fs from 'node:fs'

const input = fs.createReadStream('mock1.svg')
const output = fs.createWriteStream('scripts/mock-lite.svg')
let pending = Buffer.alloc(0)
const marker = Buffer.from('data:image/')
let skipping = false

input.on('data', (chunk) => {
  let data = Buffer.concat([pending, chunk])
  pending = Buffer.alloc(0)
  if (skipping) {
    const end = data.indexOf(0x22)
    if (end === -1) return
    skipping = false
    output.write(Buffer.from('data:image/gif;base64,R0lGODlhAQABAAAAACw='))
    data = data.subarray(end)
  }
  let offset = 0
  while (offset < data.length) {
    const start = data.indexOf(marker, offset)
    if (start === -1) {
      const keep = Math.min(marker.length - 1, data.length)
      output.write(data.subarray(offset, data.length - keep))
      pending = data.subarray(data.length - keep)
      return
    }
    output.write(data.subarray(offset, start))
    const end = data.indexOf(0x22, start)
    if (end === -1) {
      skipping = true
      return
    }
    output.write(Buffer.from('data:image/gif;base64,R0lGODlhAQABAAAAACw='))
    offset = end
  }
})

input.on('end', () => {
  if (pending.length) output.write(pending)
  output.end()
})
