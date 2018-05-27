const Page = require(process.cwd() + '/page.js');

class Index extends Page {
  constructor(){
    super();
  }

  outputPage(res, data){
    var pageObj = this;
    // console.log(data);
    pageObj.pageData.param = data;

    var sql = `
SELECT \`years\` AS 'year', COUNT(*) AS 'count'
  FROM (
    SELECT CASE
      WHEN MONTH(\`start\`)>=4 THEN YEAR(\`start\`)
      WHEN MONTH(\`start\`)<=3 THEN YEAR(\`start\`)-1
      END AS 'years'
      FROM \`competition\`
      WHERE \`del_flag\` = 0
  ) AS \`com-year\`
  GROUP BY \`years\`
  ORDER BY \`years\` DESC
`;
    mysqlConnection.query(
      {
        sql: sql,
      },
      function(error, results, fields){
        if(error){throw error;}
        // console.log(results);
        var comYear = [];
        for(var result of results){
          if(result.count > 0){
            comYear.push(result.year);
          }
        }
        pageObj.pageData.years = comYear;
        myFunc.renderEjs(res, pageObj.render());
      }
    );

  }
}

module.exports = new Index();
