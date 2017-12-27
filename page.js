// テンプレートファイルの読み込み
templateFiles = {};
loadTemplate('./template', templateFiles);
setCommonTemplate(templateFiles);
// console.log(templateFiles);

// ページングで使用する関数を入れるオブジェクト
pagingFuncs = setPagingFunc('./page');
// console.log(pagingFuncs);

// `route.yml`で指定している関数を実行
exports.pages = function(page, data){
  var htmlData = "";
  // console.log(page);

  // 定義されているかどうかの確認
  var selectPageFunc = selectPage(page);
  if(selectPageFunc === false){
    return htmlData;
  }
  htmlData = selectPageFunc(page, data);

  return htmlData;
}

// 使用するテンプレートオブジェクトを探索する
selectTemplate = function(page){
  var tmpObj = templateFiles;
  for(var i in page){
    if(page.hasOwnProperty(i)){
      tmpObj = tmpObj[page[i]];
    }
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
  var tmpFunc = pagingFuncs;
  for(var i in page){
    if(page.hasOwnProperty(i)){
      tmpFunc = tmpFunc[page[i]];
    }
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
renderPage = function(template, postData){
  var ejsData = {};
  ejsData.data = data;
  for(var key in postData){
    if(postData.hasOwnProperty(key)){
      ejsData[key] = postData[key];
    }
  }

  return ejs.render(template, ejsData);
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

function setCommonTemplate(tmpObj){
  var commonTemplate = templateFiles.common;
  for(var key in tmpObj){
    if(tmpObj.hasOwnProperty(key) && key!="common"){
      if(typeof tmpObj[key] == 'object'){
        setCommonTemplate(tmpObj[key]);
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
