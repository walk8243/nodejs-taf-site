console.log('sass compile!');

sassList = [];
searchSass('./lib');
// console.log(sassList);
for(var sassPath of sassList){
  var result = sass.renderSync({
    file: sassPath.sass,
    outputStyle: 'compressed',
  });
  // console.log(result.css.toString());
  fs.writeFileSync(sassPath.output, result.css.toString());
}

function searchSass(dirPath){
  if(fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()){
    var files = fs.readdirSync(dirPath);
    for(var i in files){
      var filePath = dirPath + "/" + files[i];
      // console.log(filePath);
      var file = fs.statSync(filePath);
      if(file.isDirectory()){
        searchSass(filePath);
      }else if(file.isFile()){
        if(filePath.match(/^.+\.(sass|scss)$/)){
          var outputFilePath = dirPath + "/" + files[i].replace(/\.(sass|scss)$/, '.css');
          obj = {
            sass  : filePath,
            output: outputFilePath
          };
          sassList.push(obj);
        }
      }
    }
  }
}
