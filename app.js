const http  = require('http');

const server = http.createServer();
server.on('request', doRequest);
server.listen(1234);
console.log('Server running!');

function doRequest(request, response){
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write('Site Open!');
  response.end();
}
