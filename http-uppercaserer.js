const http = require('http');
const map = require('through2-map');

const port = process.argv[2];

const server = http.createServer(function (req, res) {
  if (req.method === 'POST') {
    req.pipe(map(function (chunk) {
      return chunk.toString().toUpperCase();
    })).pipe(res);
  } else {
    res.writeHead(405, { 'Allow': 'POST' });
    res.end('Method Not Allowed');
  }
});

server.listen(port);
