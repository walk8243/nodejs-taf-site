var sass  = require('node-sass');

class Sass {
  constructor(){
    this.sassList = [];
  }

  compile(path = './lib'){
    console.log(`sass(${path}) compile!`);
    this.sassList = []; // sassファイルリストの初期化

    this.searchSass(path);
    console.log(this.sassList);
    for(var sassPath of this.sassList){
      var result = sass.renderSync({
        file: sassPath.sass,
        outputStyle: 'compressed',
      });
      // console.log(result.css.toString());
      fs.writeFileSync(sassPath.output, result.css.toString());
    }
  }

  searchSass(path){
    if(myFunc.isExistFile(path)){
      if(fs.statSync(path).isDirectory()){
        var files = fs.readdirSync(path);
        for(var i in files){
          var filePath = path + "/" + files[i];
          // console.log(filePath);
          var file = fs.statSync(filePath);
          if(file.isDirectory()){
            this.searchSass(filePath);
          }else if(file.isFile()){
            if(filePath.match(/\.(sass|scss)$/)){
              this.addCompileFile(filePath);
            }
          }
        }
      }else if(fs.statSync(path).isFile()){
        if(path.match(/\.(sass|scss)$/)){
          this.addCompileFile(path);
        }
      }
    }else{
      console.log(error.printErrorMessage(0, [path]));
      return;
    }
  }

  addCompileFile(filePath){
    var outputFilePath = filePath.replace(/\.(sass|scss)$/, '.css');
    var obj = {
      sass  : filePath,
      output: outputFilePath
    };
    this.sassList.push(obj);
  }
}

module.exports = new Sass();
