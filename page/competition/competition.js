var template;

exports.competition = function(page, data, res){
  // console.log(data);
  if(!template){
    template = selectTemplate(page);
  }

  // console.log(mysqlConnection);
  console.log('comID = ' + data.com_id);

  mysqlConnection.query(
    {
      sql:    'SELECT * FROM event WHERE id=?',
      values: [data.com_id]
    },
    function (error, results, fields) {
      if (error) throw error;
      console.log(results);
      // console.log(fields);
      eventName = results[0]['sex'] + results[0]['event'];

      renderPage(res, template, {
        com_id: eventName
      });
    }
  );
}
