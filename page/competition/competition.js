exports.competition = function(page, data){
  console.log(data);
  var template = selectTemplate(data);

  return ejs.render(template, {
    com_id: data.com_id
  });
}
