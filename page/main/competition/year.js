const Page = require(process.cwd() + '/page.js');

class Year extends Page {
  constructor(){
    super();
  }

  outputPage(res, data){
    var pageObj = this;
    // console.log(data);
    pageObj.pageData.param = data;

    var sql = `
SELECT com.*, result.count
  FROM (
    SELECT
      \`id\`,
      \`competition\`,
      \`place\`,
      \`start\`,
      \`end\`,
      CASE
        WHEN MONTH(\`start\`)>=4 THEN YEAR(\`start\`)
        WHEN MONTH(\`start\`)<=3 THEN YEAR(\`start\`)-1
      END AS 'years'
      FROM \`competition\`
      WHERE \`del_flag\`=0
  ) AS com
  LEFT JOIN (
    SELECT
      \`competition\`,
      COUNT(*) AS 'count'
      FROM \`result\`
      WHERE \`del_flag\`=0
      GROUP BY \`competition\`
  ) AS result ON com.id=result.competition
  WHERE com.years = ${data.year_id}
  ORDER BY com.start, com.id
`;
    mysqlConnection.query(
      {
        sql: sql,
      },
      function(error, results, fields){
        if(error){throw error;}
        // console.log(results);
        var competitions = [];
        for(var result of results){
          competitions.push(result);
        }
        pageObj.pageData.coms = competitions;
        myFunc.renderEjs(res, pageObj.render());
      }
    );

  }
}

module.exports = new Year();
