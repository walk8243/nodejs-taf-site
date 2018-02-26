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
      sql:    'SELECT * FROM event WHERE id=? OR id=10',
      values: [data.com_id]
    },
    function (error, results, fields) {
      if (error) throw error;
      console.log(results);
      // console.log(fields);

      renderPage(res, template, {
        com_id: results[0]['event']
      });
    }
  );
}
