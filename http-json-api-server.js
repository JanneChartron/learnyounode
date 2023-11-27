const http = require('http');
const url = require('url');

const port = process.argv[2];

const server = http.createServer(function (req, res) {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  res.writeHead(200, { 'Content-Type': 'application/json' });

  if (pathname === '/api/parsetime' && query && query.iso) {
    const isoTime = new Date(query.iso);
    const jsonResponse = {
      hour: isoTime.getHours(),
      minute: isoTime.getMinutes(),
      second: isoTime.getSeconds()
    };
    res.end(JSON.stringify(jsonResponse));
  } else if (pathname === '/api/unixtime' && query && query.iso) {
    const unixTime = new Date(query.iso).getTime();
    const jsonResponse = { unixtime: unixTime };
    res.end(JSON.stringify(jsonResponse));
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(port);