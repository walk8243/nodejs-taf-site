const fs		= require('fs'),
      yaml  = require('js-yaml');

var route;
try{
  route = yaml.safeLoad(fs.readFileSync('./route.yml', 'utf8'));
  // console.log(route);
}catch(e){
  console.log(e);
}

exports.func1 = function(){
	console.log('function 1');
}

exports.func2 = function(name){
	console.log('Hello ' + name);
}

exports.func3 = function(){
  return 'aaa';
}

function decisionPath(param, thisRoute, returnData){
  console.log(Object.keys(thisRoute));
  for(var key in thisRoute){
    if(key == param){
      returnData[0] = thisRoute[key].title;
      returnData[1] = "";
      if(thisRoute[key].children){
        return thisRoute[key].children;
      }
      return true;
    }else if(key == "_num_"){
      if(param.match(/\d+/i)){
        returnData[0] = thisRoute[key].title;
        data = {};
        data[thisRoute[key].var] = param;
        returnData[1] = data;
        if(thisRoute[key].children){
          return thisRoute[key].children;
        }
        return true;
      }
    }else if(key == "_string_"){
      if(param.match(/\w+/i)){
        returnData[0] = thisRoute[key].title;
        data = {};
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

exports.func4 = function(pathname){
  // if(pathname.match(/\/\d+/i)){
  //   return 'OK';
  // }else{
  //   return 'NO';
  // }
  // console.log(route);

  if(pathname == "/"){
    return route[""].title;
  }

  var pathArray = pathname.split('/');
  pathArray.shift();
  console.log(pathArray);
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
