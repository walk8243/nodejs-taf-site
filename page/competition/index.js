var template;

exports.index = function(page, data, res){
  // console.log(data);
  if(!template){
    template = selectTemplate(page);
  }

  renderPage(res, template, {
    title: data.title
  });
}
