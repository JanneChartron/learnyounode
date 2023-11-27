const net = require('net');

const port = process.argv[2];

const server = net.createServer(function (socket) {
  const date = new Date();
  const year = date.getFullYear();
  const month = zeroFill(date.getMonth() + 1);
  const day = zeroFill(date.getDate());
  const hours = zeroFill(date.getHours());
  const minutes = zeroFill(date.getMinutes());

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}\n`;

  socket.write(formattedDate);
  socket.end();
});

server.listen(port);

function zeroFill(num) {
  return num < 10 ? `0${num}` : num;
}
