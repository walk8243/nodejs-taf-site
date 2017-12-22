exports.pages = function(page, data){
  if(typeof eval(page) === 'function'){
    index(data);
  }else{
    // console.log("No!");
  }
}

function index(data){
  console.log("index");
}
