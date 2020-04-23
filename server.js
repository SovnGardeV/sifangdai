var http = require('http')
var url = require('url')

var fs = require('fs')
var server = http.createServer()
server.on('request', function(req, res) {
  var urls = url.parse(req.url, true)
  if (urls.pathname === '/') {
    fs.readFile('./dist/index.html', function(err, data) {
      console.log(err)
      res.end(data)
    })
  } else {
    console.log(req.url)
    fs.readFile('./dist/' + req.url.slice(16), function(err, data) {
      console.log(err)
      res.end(data)
    })
  }
})

server.listen(3000, '127.0.0.1') // 监听本机上的 3000 端口

console.log('server is listening 3000')
