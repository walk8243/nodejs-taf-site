const http  = require('http'),
      url		= require('url'),
      mysql	= require('mysql'),
      ConfigFile	= require('config');

ejs   = require('ejs');
fs    = require('fs');
sass  = require('node-sass');

// mysqlの接続設定
mysqlConnection = mysql.createConnection({
	host		: ConfigFile.mysql.host,
	user		: ConfigFile.mysql.user,
	password: ConfigFile.mysql.pass,
	database: ConfigFile.mysql.database
});

// SASSファイルのコンパイル
require('./sass.js');

var export_function = {};
export_function.route = require('./route.js');
export_function.page = require('./page.js');

const server = http.createServer();
server.on('request', doRequest);
server.listen(1234);
console.log('Server running!');

function doRequest(request, response){
  var url_parts = url.parse(request.url), htmlData = "";

  if(url_parts.pathname == '/favicon.ico'){
    return;
  }
  // console.log(url_parts);

  var url_result = export_function.route.routes(url_parts.pathname);
  var url_title, url_page, url_data;
  if(url_result === false){
    // 本来ここは404ページ
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.end('param Error!');
    return;
  }else if(typeof url_result === 'object'){
    if(url_result[0] == 'lib'){
      response.writeHead(200, {'Content-Type': 'text/plain'});
      response.write(export_function.page.lib(url_result[1]));
      response.end();
      return;
    }

    url_page = url_result[0].split('/');
    url_data = url_result[1];
    url_title = url_data.title;

    export_function.page.pages(response, url_page, url_data);
  }else{
    url_page = "";
    url_title = url_result;
    url_data = {};

    response.end();
    return;
  }

  response.on('close', function(){
    console.log('response close!');
  });
}
