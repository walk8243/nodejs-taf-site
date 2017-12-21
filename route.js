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
  var i = 0, returnData = [];
  for(var key in route){
    if(key == pathArray[i]){
      returnData[0] = route[key].title;
      returnData[1] = "";
      return returnData;
    }else if(key == "_num_"){
      if(pathArray[i].match(/\d+/i)){
        returnData[0] = route[key].title;
        data = {};
        data[route[key].var] = pathArray[i];
        returnData[1] = data;
        return returnData;
      }
    }else if(key == "_string_"){
      if(pathArray[i].match(/\w+/i)){
        returnData[0] = route[key].title;
        data = {};
        data[route[key].var] = pathArray[i];
        returnData[1] = data;
        return returnData;
      }
    }
  }

  return false;
}
