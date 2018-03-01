var template;

exports.index = function(page, data, res){
  // console.log(data);
  // console.log(page);
  if(!template){
    template = selectTemplate(page);
  }
  // console.log(template);

  renderPage(res, template, {
    title: data.title
  });
}
