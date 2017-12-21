const http  = require('http'),
      fs		= require('fs'),
      url		= require('url');

var export_function = require('./route.js');

const server = http.createServer();
server.on('request', doRequest);
server.listen(1234);
console.log('Server running!');

function doRequest(request, response){
  var url_parts = url.parse(request.url);

  if(url_parts.pathname == '/favicon.ico'){
    return;
  }
  // console.log(url_parts);

  var url_result = export_function.func4(url_parts.pathname);
  if(url_result === false){
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write('param Error!');
    response.end();
    return;
  }else if(typeof url_result === 'object'){
    var url_title = url_result[0];
    var url_data = url_result[1];
  }else{
    var url_title = url_result;
    var url_data = {};
  }

  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write('Site Open!' + url_title);
  response.end();
}
