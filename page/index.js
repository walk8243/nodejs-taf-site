var template;

exports.index = function(page, data){
  // console.log(data);
  if(!template){
    template = selectTemplate(page);
  }

  return ejs.render(template, {
    title: data.title
  });
}
