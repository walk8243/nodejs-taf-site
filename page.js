class Page {
  constructor(){
    this.template = null;
    this.pageStr = "";
    this.pageData = {};
    this.baseTempDir = "";
  }

  // このページ内にデータを格納する
  setData(data){
    this.pageData = data;
    // console.log(this.pageData);
  }

  // テンプレートとして使用するejsファイルを指定する
  setTemplate(filepath){
    if(myFunc.isExistFile(`./template/${filepath}.ejs`)){
      this.template = `./template/${filepath}.ejs`;
    }else if(myFunc.isExistFile(`./template/${filepath}/index.ejs`)){
      this.template = `./template/${filepath}/index.ejs`;
    }else{
      this.template = null;
    }
    // console.log('OK!');
  }


  // 事前にテンプレートをコンパイルする
  createTemplate(){
    if(!this.baseTempDir){
      this.baseTempDir = `${__dirname}/template/${this.pageData.server.id}`;
    }
    // console.log(this.baseTempDir);

    this.pageStr = fs.readFileSync(this.template).toString();
    this.pageData['baseDir'] = this.baseTempDir;
    // console.log(tempEjs);
    // console.log(this.pageData);
    // this.pageStr = ejs.render(this.pageStr, this.pageData, {delimiter: '?'});
    this.pageStr = this.render({delimiter: '?'});
  }

  // ページを出力する
  outputPage(res, data){
    // console.log(data);
    this.pageData.param = data;
    myFunc.renderEjs(res, this.render());
  }


  // EJSをレンダリングする
  render(option = {}){
    return ejs.render(this.pageStr, this.pageData, option);
  }
}

module.exports = Page;
