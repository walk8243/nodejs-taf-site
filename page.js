const fs		= require('fs');

// テンプレートファイルの読み込み
var templateFiles = {};
loadTemplate('./template', templateFiles);
// console.log(templateFiles);



exports.pages = function(page, data){
  if(typeof eval(page) === 'function'){
    eval(page + "(data)"); // `route.yml`で指定している関数にジャンプ
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
          console.log(filePath);
          tmpObj[tmp[0]] = fs.readFileSync(filePath, 'utf8');
        }
      }
    }
  }
}

function index(data){
  console.log("index");
}
