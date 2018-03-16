var sass  = require('node-sass');

class Sass {
  constructor(){
    this.sassList = [];
  }

  compile(dirPath = './lib'){
    console.log('sass compile!');
    this.sassList = []; // sassファイルリストの初期化

    this.searchSass(dirPath);
    // console.log(this.sassList);
    for(var sassPath of this.sassList){
      var result = sass.renderSync({
        file: sassPath.sass,
        outputStyle: 'compressed',
      });
      // console.log(result.css.toString());
      fs.writeFileSync(sassPath.output, result.css.toString());
    }
  }

  searchSass(dirPath){
    if(myFunc.isExistFile(dirPath)
      && fs.statSync(dirPath).isDirectory()){
      var files = fs.readdirSync(dirPath);
      for(var i in files){
        var filePath = dirPath + "/" + files[i];
        // console.log(filePath);
        var file = fs.statSync(filePath);
        if(file.isDirectory()){
          this.searchSass(filePath);
        }else if(file.isFile()){
          if(filePath.match(/^.+\.(sass|scss)$/)){
            var outputFilePath = filePath.replace(/\.(sass|scss)$/, '.css');
            var obj = {
              sass  : filePath,
              output: outputFilePath
            };
            this.sassList.push(obj);
          }
        }
      }
    }else{
      console.log(0, [dirPath]);
    }
  }
}

module.exports = new Sass();
