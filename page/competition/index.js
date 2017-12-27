var template;

exports.index = function(page, data){
  // console.log(data);
  if(!template){
    template = selectTemplate(page);
  }

  return renderPage(template, {
    title: data.title
  });
}
