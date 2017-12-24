const fs		= require('fs');

// テンプレートファイルの読み込み
var templateFiles = {};
loadTemplate('./template', templateFiles);
// console.log(templateFiles);

// ページングで使用する関数を入れるオブジェクト
pagingFuncs = setPagingFunc('./page');
// console.log(pagingFuncs);

// `route.yml`で指定している関数を実行
exports.pages = function(page, data){
  // console.log(page);
  // 定義されているかどうかの確認
  if(typeof pagingFuncs[page[0]] === 'function'){
    pagingFuncs[page[0]](page, data);
  }else if(typeof pagingFuncs[page[0]]['index'] === 'function'){
    pagingFuncs[page[0]]['index'](page, data);
  }else{
  }
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
