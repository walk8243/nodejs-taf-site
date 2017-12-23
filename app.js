const http  = require('http'),
      fs		= require('fs'),
      url		= require('url');

var export_function = {};
export_function.route = require('./route.js');
export_function.page = require('./page.js');

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

  var url_result = export_function.route.routes(url_parts.pathname);
  var url_title, url_page, url_data;
  if(url_result === false){
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write('param Error!');
    response.end();
    return;
  }else if(typeof url_result === 'object'){
    url_page = url_result[0].split('/');
    url_data = url_result[1];
    url_title = url_data.title;

    export_function.page.pages(url_page, url_data);
  }else{
    url_page = "";
    url_title = url_result;
    url_data = {};
  }

  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write('Site Open!\n' + url_title);
  response.end();
}
