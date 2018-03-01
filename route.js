const yaml  = require('js-yaml');

var route;
try{
  route = yaml.safeLoad(fs.readFileSync('./config/route.yml', 'utf8'));
}catch(e){
  console.log(e);
}
var adminRoute;
try{
  adminRoute = yaml.safeLoad(fs.readFileSync('./config/admin.yml', 'utf8'));
}catch(e){
  console.log(e);
}

exports.routes = function(pathname, mode){
  // console.log(pathname);
  var routeObj;
  if(mode == 'main'){
    routeObj = route;
  }else if(mode == 'admin'){
    routeObj = adminRoute;
  }

  if(pathname == "/"){
    var returnData = [];
    returnData[0] = 'index';
    data = {};
    data['title'] = routeObj[""].title;
    data['page'] = routeObj[""].page;
    returnData[1] = data;
    return returnData;
  }else if(pathname.match(/\/lib\//)){
    // console.log("lib folder!");
    var returnData = [];
    returnData[0] = 'lib';
    returnData[1] = pathname.substr(5);
    return returnData;
  }

  var pathArray = pathname.split('/');
  pathArray.shift();
  // console.log(pathArray);
  var returnData = [], thisRoute = routeObj;
  for(var i in pathArray){
    // URLの最後が`/`で終わっていた場合の例外処理
    if(pathArray[i] == ''){
      if(returnData[0]){
        return returnData;
      }else{
        return false;
      }
    }

    // URLから設定されたデータの取得
    var result = decisionPath(pathArray[i], thisRoute, returnData);
    if(result === true){ // 設定されているURLに完結したとき
      return returnData;
    }else if(result === false){ // 設定されていないURLが選択されたとき
      return false;
    }else if(typeof result === 'object'){ // URLにまだ続きがある場合
      thisRoute = result;
    }
  }

  if(returnData){
    return returnData;
  }
  return false;
}

function decisionPath(param, thisRoute, returnData){
  // console.log(Object.keys(thisRoute));
  for(var key in thisRoute){
    if(key == param){
      if(thisRoute[key].page){
        returnData[0] = thisRoute[key].page;
        data = {};
        data['title'] = thisRoute[key].title;
        data['page'] = thisRoute[key].page;
        returnData[1] = data;
        if(thisRoute[key].children){
          return thisRoute[key].children;
        }else{
          return true;
        }
      }else{
        if(thisRoute[key].children){
          return thisRoute[key].children;
        }
      }
    }else if(key == "_num_"){
      if(param.match(/\d+/i)){
        if(thisRoute[key].page){
          returnData[0] = thisRoute[key].page;
          data = {};
          data['title'] = thisRoute[key].title;
          data['page'] = thisRoute[key].page;
          data[thisRoute[key].var] = param;
          returnData[1] = data;
          if(thisRoute[key].children){
            return thisRoute[key].children;
          }else{
            return true;
          }
        }else{
          if(thisRoute[key].children){
            return thisRoute[key].children;
          }
        }
      }
    }else if(key == "_string_"){
      if(param.match(/\w+/i)){
        if(thisRoute[key].page){
          returnData[0] = thisRoute[key].page;
          data = {};
          data['title'] = thisRoute[key].title;
          data['page'] = thisRoute[key].page;
          data[thisRoute[key].var] = param;
          returnData[1] = data;
          if(thisRoute[key].children){
            return thisRoute[key].children;
          }else{
            return true;
          }
        }else{
          if(thisRoute[key].children){
            return thisRoute[key].children;
          }
        }
      }
    }
  }

  return false;
}
