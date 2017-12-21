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
  if(pathname.match(/\/\d+/i)){
    return 'OK';
  }else{
    return 'NO';
  }
}
