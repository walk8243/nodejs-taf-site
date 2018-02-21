sassList = [];
searchSass('./lib');
// console.log(sassList);

function searchSass(dirPath){
  if(fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()){
    var files = fs.readdirSync(dirPath);
    for(var i in files){
      filePath = dirPath + "/" + files[i];
      // console.log(filePath);
      file = fs.statSync(filePath);
      if(file.isDirectory()){
        searchSass(filePath);
      }else if(file.isFile()){
        if(filePath.match(/.+\.(sass|scss)$/)){
          sassList.push(filePath);
        }
      }
    }
  }
}
