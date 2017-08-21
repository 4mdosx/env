var http = require('http')

exports.start = function () {
  http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type': 'text/plain'})
    response.write('Hello World')
    response.end()
  }).listen(8888)
}
