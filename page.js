const fs		= require('fs');

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

function loadTemplate(dirPath, tmpObj){
  if(fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()){
    var files = fs.readdirSync(dirPath);
    for(var i in files){
      filePath = dirPath + "/" + files[i];
      // console.log(filePath);
      if(fs.statSync(filePath).isDirectory()){
        tmpObj[files[i]] = {};
        loadTemplate(filePath, tmpObj[files[i]]);
      }else if(fs.statSync(filePath).isFile()){
        tmp = files[i].split('.');
        tmpObj[tmp[0]] = fs.readFileSync(filePath, 'utf8');
      }
    }
  }
}

function index(data){
  console.log("index");
}
