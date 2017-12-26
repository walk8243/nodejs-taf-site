exports.index = function(page, data){
  console.log(data);
  var template = selectTemplate(data);

  return ejs.render(template, {
    title: data.title
  });
}
