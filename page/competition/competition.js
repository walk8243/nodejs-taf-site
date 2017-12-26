var template;

exports.competition = function(page, data){
  // console.log(data);
  if(!template){
    template = selectTemplate(page);
  }

  return ejs.render(template, {
    com_id: data.com_id
  });
}
