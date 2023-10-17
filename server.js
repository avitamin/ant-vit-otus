const http = require('http')
const fs = require('fs/promise')
const port = 3000
const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.end('Hello World\n')
})
server.listen(port, () => {
    console.log(`Server running at ${port} port`)
})
