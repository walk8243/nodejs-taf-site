// テンプレートファイルの読み込み
templateFiles = {};
loadTemplate('./template', templateFiles);
setCommonTemplate(templateFiles, templateFiles);
// console.log(templateFiles);

// テンプレートファイルの読み込み(Admin)
adminTemplateFiles = {};
loadTemplate('./admin/template', adminTemplateFiles);
setCommonTemplate(adminTemplateFiles, adminTemplateFiles);
// console.log(adminTemplateFiles);

// ページングで使用する関数を入れるオブジェクト
pagingFuncs = setPagingFunc('./page');
// console.log(pagingFuncs);

// ページングで使用する関数を入れるオブジェクト(Admin)
adminPagingFuncs = setPagingFunc('./admin/page');
// console.log(adminPagingFuncs);


// `lib`フォルダに格納されているファイルの読み込み
libFiles = {};
loadExt = ['css', 'js', 'jpg', 'jpeg', 'png', 'gif', 'pdf']; // 読み込む拡張子の設定
regexp = new RegExp('.+\\.(' + loadExt.join('|') + ')$', 'g');
libFiles = loadLibFiles('./lib');
// console.log(libFiles);

// `route.yml`で指定している関数を実行
exports.pages = function(res, page, data){
  var htmlData = "";
  // console.log(data);

  // 定義されているかどうかの確認
  var selectPageFunc = selectPage(page.slice());
  if(selectPageFunc === false){
    // Error発生
    // 本来ここは500ページ
    res.writeHead(500, {'Content-Type': 'text/plain'});
    res.end('Internal Server Error');
    return;
  }

  res.writeHead(200, {'Content-Type': 'text/html'});
  selectPageFunc(page, data, res);
}

// libフォルダを格納
exports.lib = function(filename){
  // console.log(libFiles[filename]);
  var libFile = libFiles,
      returnData = [],
      pieces = filename.split('/');
  for(var piece of pieces){
    libFile = libFile[piece];
  }
  // console.log(libFile);
  if(libFile){
    if(filename.match(/\.css$/i)){
      returnData[0] = 'text/css';
    }else if(filename.match(/\.js$/i)){
      returnData[0] = 'text/javascript';
    }else if(filename.match(/\.(jpg|jpeg)$/i)){
      returnData[0] = 'image/jpeg';
    }else if(filename.match(/\.(png)$/i)){
      returnData[0] = 'image/png';
    }else if(filename.match(/\.(gif)$/i)){
      returnData[0] = 'image/gif';
    }else if(filename.match(/\.(pdf)$/i)){
      returnData[0] = 'application/pdf';
    }else{
      returnData[0] = 'text/html';
    }

    returnData[1] = libFile;
  }
  return returnData;
}

// 使用するテンプレートオブジェクトを探索する
selectTemplate = function(page){
  // console.log(page);
  var tmpObj, mode=page.shift();
  if(mode == 'main'){
    tmpObj = templateFiles;
  }else if(mode == 'admin'){
    tmpObj = adminTemplateFiles;
  }

  for(var val of page){
    tmpObj = tmpObj[val];
  }

  if(typeof tmpObj === 'object'){
    return tmpObj.index;
  }else if(typeof tmpObj === 'string'){
    return tmpObj;
  }else{
    return false;
  }
}

// 使用するページ表示関数を探索する
selectPage = function(page){
  var tmpFunc, mode=page.shift();
  if(mode == 'main'){
    tmpFunc = pagingFuncs;
  }else if(mode == 'admin'){
    tmpFunc = adminPagingFuncs;
  }

  for(var val of page){
    tmpFunc = tmpFunc[val];
  }

  if(typeof tmpFunc === 'function'){
    return tmpFunc;
  }else if(typeof tmpFunc.index === 'function'){
    return tmpFunc.index;
  }else{
    return false;
  }
}

// ページをレンダリングする
renderPage = function(res, template, postData){
  var ejsData = {};
  ejsData.data = data;
  for(var key in postData){
    if(postData.hasOwnProperty(key)){
      ejsData[key] = postData[key];
    }
  }

  // return ejs.render(template, ejsData);
  htmlData = ejs.render(template, ejsData);
  res.write(htmlData);
  res.end();
}

// `template`フォルダに存在する全ての`ejs`ファイルを読み込む
function loadTemplate(dirPath, tmpObj){
  if(fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()){
    var files = fs.readdirSync(dirPath);
    for(var i in files){
      filePath = dirPath + "/" + files[i];
      file = fs.statSync(filePath);
      // console.log(filePath);
      if(file.isDirectory()){
        tmpObj[files[i]] = {};
        loadTemplate(filePath, tmpObj[files[i]]);
      }else if(file.isFile()){
        tmp = files[i].split('.');
        if(tmp[1] == 'ejs'){
          tmpObj[tmp[0]] = fs.readFileSync(filePath, 'utf8');
        }
      }
    }
  }
}

// `page`フォルダに存在する全ての`js`ファイルを関数として読み込む
function setPagingFunc(dirPath){
  var pagingFuncs = {};
  if(fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()){
    var files = fs.readdirSync(dirPath);
    for(var i in files){
      filePath = dirPath + "/" + files[i];
      file = fs.statSync(filePath);
      // console.log(filePath);
      if(file.isDirectory()){
        pagingFuncs[files[i]] = setPagingFunc(filePath);
      }else if(file.isFile()){
        tmp = files[i].split('.');
        if(tmp[1] == 'js'){
          tmpObj = require(filePath);
          for (var key in tmpObj) {
            if (tmpObj.hasOwnProperty(key)) {
              pagingFuncs[key] = tmpObj[key];
            }
          }
        }
      }
    }
  }

  return pagingFuncs;
}

function setCommonTemplate(tmpObj, oriObj){
  var commonTemplate = oriObj.common;
  for(var key in tmpObj){
    if(tmpObj.hasOwnProperty(key) && key!="common"){
      if(typeof tmpObj[key] == 'object'){
        setCommonTemplate(tmpObj[key], oriObj);
      }else if(typeof tmpObj[key] == 'string'){
        for(var mass in commonTemplate){
          if(commonTemplate.hasOwnProperty(mass)){
            tmpObj[key] = tmpObj[key].replace(new RegExp('<%'+mass+'%>', 'g'), commonTemplate[mass]);
          }
        }
      }
    }
  }
}

// `lib`フォルダに存在する全てのファイルの読み込み
function loadLibFiles(dirPath){
  var contents = {};
  if(fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()){
    var files = fs.readdirSync(dirPath);
    for(var i in files){
      filePath = dirPath + "/" + files[i];
      // console.log(filePath);
      file = fs.statSync(filePath);
      if(file.isDirectory()){
        contents[files[i]] = loadLibFiles(filePath);
      }else if(file.isFile()){
        // console.log(file);
        if(filePath.match(regexp)){
          contents[files[i]] = fs.readFileSync(filePath);
        }
      }
    }
  }
  // console.log(contents);

  return contents;
}
