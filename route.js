const fs		= require('fs'),
      yaml  = require('js-yaml');

var route;
try{
  route = yaml.safeLoad(fs.readFileSync('./route.yml', 'utf8'));
}catch(e){
  console.log(e);
}

exports.routes = function(pathname){
  if(pathname == "/"){
    var returnData = [];
    returnData[0] = 'index';
    data = {};
    data['title'] = route[""].title;
    returnData[1] = data;
    return returnData;
  }

  var pathArray = pathname.split('/');
  pathArray.shift();
  // console.log(pathArray);
  var returnData = [], thisRoute = route;
  for(var i in pathArray){
    if(pathArray[i] == ''){
      if(returnData[0]){
        return returnData;
      }else{
        return false;
      }
    }
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
      returnData[0] = thisRoute[key].page;
      data = {};
      data['title'] = thisRoute[key].title;
      returnData[1] = data;
      if(thisRoute[key].children){
        return thisRoute[key].children;
      }
      return true;
    }else if(key == "_num_"){
      if(param.match(/\d+/i)){
        returnData[0] = thisRoute[key].page;
        data = {};
        data['title'] = thisRoute[key].title;
        data[thisRoute[key].var] = param;
        returnData[1] = data;
        if(thisRoute[key].children){
          return thisRoute[key].children;
        }
        return true;
      }
    }else if(key == "_string_"){
      if(param.match(/\w+/i)){
        returnData[0] = thisRoute[key].page;
        data = {};
        data['title'] = thisRoute[key].title;
        data[thisRoute[key].var] = param;
        returnData[1] = data;
        if(thisRoute[key].children){
          return thisRoute[key].children;
        }
        return true;
      }
    }
  }

  return false;
}
