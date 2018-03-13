const Page = require(process.cwd() + '/page.js');

class Index extends Page {
  constructor(){
    super();
  }

  render(res, data){
    // console.log(data);
    this.pageData.param = data;

    var htmlStr   = this.htmlStr,
        pageData  = this.pageData;
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
        pageData.years = comYear;
        myFunc.renderEjs(res, htmlStr, pageData);
      }
    );

  }
}

module.exports = new Index();
