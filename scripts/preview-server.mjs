import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve('scripts')
const server = http.createServer((request, response) => {
  const file = request.url === '/' ? path.join(root, 'preview.html') : path.join(root, request.url.split('?')[0].replace(/^\//, ''))
  if (!file.startsWith(root)) {
    response.writeHead(403)
    response.end()
    return
  }
  fs.readFile(file, (error, body) => {
    if (error) {
      response.writeHead(404)
      response.end('missing')
      return
    }
    const type = file.endsWith('.svg') ? 'image/svg+xml' : 'text/html'
    response.writeHead(200, { 'Content-Type': type })
    response.end(body)
  })
})

server.listen(4178, () => {
  console.log('listening 4178')
})
