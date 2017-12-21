const http  = require('http'),
      url		= require('url');

var export_function = require('./route.js');
export_function.func1();
export_function.func2('hoge');
var test_func = export_function.func3();

const server = http.createServer();
server.on('request', doRequest);
server.listen(1234);
console.log('Server running!');

function doRequest(request, response){
  var url_parts = url.parse(request.url);

  if(url_parts.pathname == '/favicon.ico'){
    return;
  }
  console.log(url_parts);

  var url_result = export_function.func4(url_parts.pathname);

  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write('Site Open!' + test_func + url_result);
  response.end();
}
