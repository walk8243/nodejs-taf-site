const http  = require('http'),
      url   = require('url'),
      mysql = require('mysql'),
      ConfigFile  = require('config'),
      auth  = require('http-auth');

var basic = auth.basic({
  realm : 'aaa',
  file  : './.htpasswd'
});

ejs   = require('ejs');
fs    = require('fs');
sass  = require('node-sass');

// mysqlの接続設定
mysqlConnection = mysql.createConnection({
  host    : ConfigFile.mysql.host,
  user    : ConfigFile.mysql.user,
  password: ConfigFile.mysql.pass,
  database: ConfigFile.mysql.database
});

// 引数を変数に格納
argList = process.argv.slice(2);
// console.log(argList);

if(argList.indexOf('NC') == -1){
  // SASSファイルのコンパイル
  require('./sass.js');
}

var export_function = {};
export_function.route = require('./route.js');
export_function.page = require('./page.js');

// ウェブサイトで使用する定数を記憶
siteDefine = {};
mysqlConnection.query(
  {
    sql: 'SELECT `index`, `value` FROM `constant`',
  },
  function (error, results, fields) {
    if(error){throw error;}
    // console.log(results);
    for(var result of results){
      siteDefine[result['index']] = result['value'];
    }
  }
);

// HTTPサーバを起動
const server = http.createServer(doRequest);
server.listen(1234);

const adminServer = http.createServer(basic, doAdminRequest);
adminServer.listen(8080);

console.log('Server running!');

// HTTPリクエストに対する動作
function doRequest(request, response){
  requestFunc(request, response, 'main');
}

// AdminページのHTTPリクエストに対する動作
function doAdminRequest(request, response){
  requestFunc(request, response, 'admin');
}

function requestFunc(request, response, mode){
  var url_parts = url.parse(request.url), htmlData = "";

  if(url_parts.pathname == '/favicon.ico'){
    return;
  }
  // console.log(url_parts);

  var url_result = export_function.route.routes(url_parts.pathname, mode);
  var url_title, url_page, url_data;
  if(url_result === false){
    // 本来ここは404ページ
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.end('param Error!');
    return;
  }else if(typeof url_result === 'object'){
    if(url_result[0] == 'lib'){
      // console.log(url_result);
      var result = export_function.page.lib(url_result[1]);
      if(result){
        response.writeHead(200, {'Content-Type': result[0]});
        response.write(result[1]);
        response.end();
      }else{
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.end('param Error!');
      }
      return;
    }

    url_page = url_result[0].split('/');
    url_page.unshift(mode);
    // console.log(url_page);
    url_data = Object.assign(url_result[1], siteDefine);
    url_title = url_data.title;

    export_function.page.pages(response, url_page, url_data);
  }else{
    url_page = "";
    url_title = url_result;
    url_data = {};

    response.writeHead(500, {'Content-Type': 'text/plain'});
    response.end('param Error!');
    return;
  }
}
