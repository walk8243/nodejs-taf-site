function renderEjs(res, content, data){
  // console.log(content);
  // console.log(data);
  res.end(ejs.render(content, data));
}

function readPage(server, page, data){
  // console.log(server + ' => ' + page);
  var pageJs;
  if(isExistFile(`./page/${server}/${page}.js`)){
    pageJs = require(`./page/${server}/${page}.js`);
  }else if(isExistFile(`./page/${server}/${page}/index.js`)){
    pageJs = require(`./page/${server}/${page}/index.js`);
  }else{
    console.log(error.printErrorMessage(0, [`./page/${server}/${page}.js`]));
    return false;
  }
  // console.log(pageJs);

  if(!pageJs.hasOwnProperty('template') || !pageJs.template){
    pageJs.setTemplate(`${server}/${page}`);
  }
  if(pageJs.template){
    if(isExistFile(pageJs.template)){
      // console.log('template Yes!');
      pageJs.setData(data);
      pageJs.createTemplate();
      return pageJs;
    }else{
      console.log(error.printErrorMessage(0, [pageJs.template]));
      return null;
    }
  }else{
    console.log(error.printErrorMessage(0, [`./template/${server}/${page}.ejs`]));
    return null;
  }
}

function readDir(dirpath, fsArray){
  if(isExistFile(dirpath)){
    files = fs.readdirSync(dirpath);
    // console.log(files);
    for(var file of files){
      var filepath  = dirpath + '/' + file,
          fileStats = fs.statSync(filepath);
      // console.log(filepath);
      if(fileStats.isDirectory()){
        // console.log('dir');
        readDir(filepath, fsArray);
      }else if(fileStats.isFile()){
        // console.log('file');
        fsArray.push(filepath);
      }
    }
  }else{
    console.log(error.printErrorMessage(0, [dirpath]));
  }
}

function readLibDir(libPath, conditions, fsArray){
  if(isExistFile(libPath)){
    readDir(libPath, fsArray);
    // console.log(fsArray);

    var startPos  = libPath.length,
        regexp    = new RegExp('(.*)(?:\\.('+conditions.join('|')+')$)'),
        removeKey = [];
    Object.keys(fsArray).forEach(function(key){
      if(fsArray[key].match(regexp)){
        fsArray[key] = fsArray[key].substring(startPos);
      }else{
        removeKey.push(key);
      }
    });
    if(removeKey.length > 0){
      for(var i=removeKey.length-1; i>=0; i--){
        fsArray.splice(removeKey[i], 1);
      }
    }
    console.log(fsArray);
    return true;
  }else{
    console.log(error.printErrorMessage(0, [libPath]));
    return false;
  }
}

function isExistFile(filepath){
  try{
    fs.statSync(filepath);
    return true;
  }catch(err){
    if(err.code === 'ENOENT'){
      return false;
    }
  }
}

module.exports = {
  renderEjs   : renderEjs,
  readPage    : readPage,
  readDir     : readDir,
  readLibDir  : readLibDir,
  isExistFile : isExistFile
};
