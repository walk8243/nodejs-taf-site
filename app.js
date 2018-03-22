const express = require('express'),
      auth    = require('http-auth'),
      vhost   = require('vhost'),
      mysql   = require('mysql'),
      yaml    = require('js-yaml'),
      config  = require('config');

ejs     = require('ejs'),
fs      = require('fs'),
myFunc  = require('./func.js'),
error   = require('./error.js');

const sass    = require('./sass.js');


const setting   = config.setting,
      hostname  = setting.hostname,
      portNo    = 1234;
var app = express(),
    libServer = express();
var servers = {},
    route   = {},
    pages   = {},
    rest,
    pageDir   = './page',
    tempDir   = './template',
    libDir    = './lib',
    authFile  = './.htpasswd',
    libFiles  = [],
    libCond   = ['js', 'css', 'jpg', 'jpeg', 'png', 'gif', 'pdf'];

// mysqlの接続設定
mysqlConnection = mysql.createConnection({
  host    : config.mysql.host,
  user    : config.mysql.user,
  password: config.mysql.pass,
  database: config.mysql.database,
  timezone: 'UTC'
});

var promise1, promise2;
promise1 = new Promise(function(resolve, reject){
  // ウェブサイトで使用する定数を記憶
  siteDefine = {};
  mysqlConnection.query(
    {
      sql: 'SELECT `index`, `value` FROM `constant`',
    },
    function (error, results, fields) {
      if(error){
        throw error;
        reject();
      }
      // console.log(results);
      for(var result of results){
        siteDefine[result['index']] = result['value'];
      }
      console.log(siteDefine);
      resolve();
    }
  );
});
promise2 = new Promise(function(resolve, reject){
  // SASSのコンパイル
  sass.compile();
  resolve();
});

Promise.all([promise1, promise2]).then(function(){
  // サーバの設置、構築
  return new Promise(function(resolve, reject){
    // libサーバの設置
    try{
      app.use(vhost('lib.'+hostname, libServer));
    }catch(err){
      if(err){throw err;}
      reject();
    }

    // main, adminサーバの構築
    for(var server of setting.server){
      // console.log(server);
      let serverName = server.name;
      servers[serverName] = express();
      for(var subdomain of server.subdomain){
        if(subdomain == null){
          // console.log(hostname);
          app.use(vhost(hostname, servers[serverName]));
        }else{
          // console.log(subdomain+'.'+hostname);
          app.use(vhost(subdomain+'.'+hostname, servers[serverName]));
        }
      }
      pages[serverName] = {};

      // console.log(eval(`${serverName}`));
      try{
        if(myFunc.isExistFile(`./config/${server.route}`)){
          // console.log('Yes!');
          routeObj = yaml.safeLoad(fs.readFileSync(`./config/${server.route}`, 'utf8'));
          // console.log(routeObj);

          route[serverName] = {},
          rest = {};
          moldingRoute(serverName, routeObj, '');
          // console.log(route);
          delete routeObj;

          if(server.hasOwnProperty('auth') && server.auth){
            // console.log(server.name);
            let digest = auth.digest({
              realm : serverName,
              file  : authFile
            });
            Object.keys(route[serverName]).forEach(function(path){
              // console.log(`'${path}'=> title:'${route[serverName][path].title}', page:'${route[serverName][path].page}'`);
              let sendData = createSendData(server, path);
              pages[serverName][path] = myFunc.readPage(serverName, route[serverName][path].page, sendData);
              if(pages[serverName][path] === false){
                return;
              }
              servers[serverName].route(path)
                .get(auth.connect(digest), function(req, res){
                  onRequest(req, res, sendData);
                });
            });
          }else{
            Object.keys(route[serverName]).forEach(function(path){
              // console.log(`'${path}'=> title:'${route[serverName][path].title}', page:'${route[serverName][path].page}'`);
              let sendData = createSendData(server, path);
              pages[serverName][path] = myFunc.readPage(serverName, route[serverName][path].page, sendData);
              if(pages[serverName][path] === false){
                return;
              }
              servers[serverName].route(path)
                .get(function(req, res){
                  onRequest(req, res, sendData);
                });
            });
          }
        }else{
          // console.log('No!');
          console.log(error.printErrorMessage(0, [`./config/${server.route}`]));
          console.error(error.printErrorMessage(100, [serverName]));
          reject();
        }
      }catch(e){
        console.error(e);
        reject();
      }
    }
    resolve();
  });
}).then(function(){
  // libフォルダ内の読み込み
  return new Promise(function(resolve, reject){
    if(myFunc.readLibDir(libDir, libCond, libFiles)){
      for(let libFile of libFiles){
        app.route(libFile)
          .get(function(req, res){
            res.status(200)
              .end(fs.readFileSync(libDir+libFile));
          });
      }
      resolve();
    }else{
      reject();
    }
  });
}).then(function(){
  // Serverの公開
  return new Promise(function(resolve, reject){
    try{
      app.listen(portNo, function(){
        console.log(`Server listening on port ${portNo}!`);
        resolve();
      });
    }catch(err){
      if(err){
        throw err;
        reject();
      }
    }
  });
}).then(function(){
  // 標準入力の受付
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdout.write('\nAccept command!\n');
  process.stdout.write('node> ');
  process.stdin.on('data', function(chunk){
    // process.stdout.write(chunk);
    if(chunk != null){
      onModuleCommand(chunk.slice(0,-1));
    }
    process.stdout.write('node> ');
  });
  process.stdin.on('end', function(){
    process.stdout.write('end\n');
    process.exit(0);
  });
}).catch(function(){
  console.error(error.printErrorMessage(101, []));
  process.exit(0);
});


function onRequest(req, res, data){
  // console.log(data);
  // console.log(req.params);
  if(Object.keys(req.params).length > 0){
    var vars = req.params;
    Object.keys(vars).forEach(function(key){
      regexp = new RegExp(`^${data.var[key]}$`);
      if(vars[key].match(regexp) == null){
        // console.log('NO!');
        res.status(404).end();
      }
    });
  }

  // console.log(page[data.server][data.path]);
  if(pages[data.server.id][data.page.path] === null){
    res.status(204).end();
  }else{
    res.status(200);
    if(req.user){
      req.params.user = req.user;
    }
    pages[data.server.id][data.page.path].outputPage(res, req.params);
  }
  // res.end(data.title);
}

function moldingRoute(inputArea, obj, basePath){
  Object.keys(obj).forEach(function(key){
    // console.log(key);
    // console.log(obj[key]);
    var index;
    switch(key){
      case '_num_':
        index = basePath + '/' + `:${obj[key].var}`;
        rest[obj[key].var] = "\\d+";
        break;
      case '_string_':
        index = basePath + '/' + `:${obj[key].var}`;
        rest[obj[key].var] = "\\S+";
        break;
      default:
        index = basePath + '/' + key;
        break;
    }

    if(obj[key].hasOwnProperty('page') && obj[key].page){
      // console.log(rest);
      route[inputArea][index] = {
        title : obj[key].title,
        page  : obj[key].page,
        var   : Object.assign({}, rest)
      }
    }

    if(obj[key].hasOwnProperty('children')){
      moldingRoute(inputArea, obj[key].children, index);
    }

    delete rest[obj[key].var];
  });
}

function onModuleCommand(command){
  if(!command.match(/^\w+( -[a-zA-Z]+ \S+)*$/)){
    console.log(error.printErrorMessage(200));
    return;
  }
  var pieces  = command.split(' '),
      option  = {};
  console.log(pieces);

  switch(pieces[0]){
    case 'page':
      console.log('page Update!');
      /*
        受け付けるオプション
          -s  サーバの指定
          -p  パスの指定
      */
      option['range'] = {};
      for(var server in servers){
        option['range'][server] = [];
      }
      option['range-priority'] = null;
      // console.log(option['range']);
      for(var i=1; i<pieces.length; i++){
        let range = {};
        if(pieces[i].match(/^-s$/)){
          // console.log(typeof servers[pieces[i+1]]);
          if(typeof servers[pieces[i+1]] != "undefined"){
            if(option['range-priority'] == 'p'){
              continue;
            }
            for(var key in option['range']){
              if(key != pieces[i+1]){
                delete option['range'][key];
              }
            }
            i++;
          }else{
            console.log(error.printErrorMessage(4, [pieces[i+1]]));
            return;
          }
        }else if(pieces[i].match(/^-p$/)){
          let regexp = new RegExp('^'+pieces[i+1]);
          // console.log(regexp);
          for(var server in pages){
            // console.log(server);
            if(option['range'].hasOwnProperty(server)){
              // console.log(pages[server]);
              for(var path in pages[server]){
                if(pages[server].hasOwnProperty(path) && pages[server][path] !== false){
                  // console.log(path);
                  if(path.match(regexp)){
                    option['range'][server].push(path);
                  }
                }
              }
            }
          }
          option['range-priority'] = 'p';
        }
      }
      if(!option['range-priority']){
        for(var server in pages){
          // console.log(server);
          if(option['range'].hasOwnProperty(server)){
            // console.log(pages[server]);
            for(var path in pages[server]){
              if(pages[server].hasOwnProperty(path) && pages[server][path] !== false){
                // console.log(path);
                option['range'][server].push(path);
              }
            }
          }
        }
      }
      console.log(option['range']);

      // pageクラス内の`htmlStr`を設定し直す
      for(var server in option['range']){
        for(var path of option['range'][server]){
          if(typeof pages[server][path] != "undefined"){
            // console.log(server + ", " + path + " => OK!");
            pages[server][path].createTemplate();
          }else{
            console.log(server + ", " + path + " => NG!");
          }
        }
      }
      break;
    case 'ejs':
      console.log('ejs Update!');
      break;
    case 'sass':
      console.log('sass Update!');
      for(var i=1; i<pieces.length; i++){
        let range = '';
        if(pieces[i].match(/^-d$/)){
          if(myFunc.isExistFile(pieces[i+1])){
            range = pieces[i+1];
          }else if(myFunc.isExistFile(libDir+'/'+pieces[i+1])){
            range = libDir+'/'+pieces[i+1];
          }else{
            console.log(error.printErrorMessage(0, [libDir+'/'+pieces[i+1]]));
            return;
          }

          if(fs.statSync(range).isDirectory()){
            if(option['range-priority'] == 'f'){
              continue;
            }
            option['range'] = range;
            option['range-priority'] = 'd';
            i++;
          }else{
            console.log(error.printErrorMessage(5, [range]));
            return;
          }
        }else if(pieces[i].match(/^-f$/)){
          if(option.hasOwnProperty('range-priority')
            && option['range-priority'] == 'd'){
            if(option['range'].match(/\/$/)){
              range = option['range'];
            }else{
              range = option['range'] + '/';
            }
          }
          if(myFunc.isExistFile(range+pieces[i+1])){
            range = range+pieces[i+1];
          }else if(myFunc.isExistFile(range+pieces[i+1]+'.scss')){
            range = range+pieces[i+1]+'.scss';
          }else if(myFunc.isExistFile(range+pieces[i+1]+'.sass')){
            range = range+pieces[i+1]+'.sass';
          }else if(myFunc.isExistFile(libDir+'/'+pieces[i+1])){
            range = libDir+'/'+pieces[i+1];
          }else if(myFunc.isExistFile(libDir+'/'+pieces[i+1]+'.scss')){
            range = libDir+'/'+pieces[i+1]+'.scss';
          }else if(myFunc.isExistFile(libDir+'/'+pieces[i+1]+'.sass')){
            range = libDir+'/'+pieces[i+1]+'.sass';
          }else{
            console.log(error.printErrorMessage(0, [libDir+'/'+pieces[i+1]]));
            return;
          }

          if(fs.statSync(range).isFile()){
            option['range'] = range;
            option['range-priority'] = 'f';
            i++;
          }else{
            console.log(error.printErrorMessage(6, [range]));
            return;
          }
        }
      }
      // console.log(option['range'] + ', ' + option['range-priority']);
      sass.compile(option['range']);
      break;
    case 'man':
      var message = `
usage: <command>

These are commands:
  page    Compile EJS file
  sass    Compile Sass or Scss file

command'page' is usage:
  page [-s <server name>] [-p <path(Forward match)>]

command'sass' is usage:
  sass [-d <directory path>] [-f <file name>]
`;
      console.log(message.substring(1));
      break;
    default: break;
  }
}

function createSendData(server, path){
  return {
    server  : {
      id    : server.name,
      name  : server.title
    },
    page    : {
      id    : route[server.name][path].page,
      title : route[server.name][path].title,
      path  : path
    },
    var     : route[server.name][path].var,
    lib     : `http://lib.${hostname}:${portNo}`
  }
}
