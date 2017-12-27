var template;

exports.competition = function(page, data){
  // console.log(data);
  if(!template){
    template = selectTemplate(page);
  }

  return renderPage(template, {
    com_id: data.com_id
  });
}
