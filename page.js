const fs		= require('fs');

// テンプレートファイルの読み込み
var templateFiles = {};
loadTemplate('./template', templateFiles);
// console.log(templateFiles);

// ページングで使用する関数を入れるオブジェクト
var pagingFuncs = {};

// `route.yml`で指定している関数を実行
exports.pages = function(page, data){
  // 定義されているかどうかの確認
  if(typeof pagingFuncs[page] === 'function'){
    // console.log("Yes!");
    pagingFuncs[page](data);
  }else{
    // console.log("No!");
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

pagingFuncs.index = function(data){
  console.log("index");
}

pagingFuncs.competition = function(data){
  var comFunc = require('./page/competition.js');
  comFunc.index();
}
