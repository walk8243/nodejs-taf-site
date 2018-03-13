const Page = require(process.cwd() + '/page.js');

class Year extends Page {
  constructor(){
    super();
    console.log('year');
  }

  render(res, data){
    // console.log(data);
    this.pageData.param = data;

    // console.log(this.pageData);
    var htmlStr   = this.htmlStr,
        pageData  = this.pageData;
    var sql = `
SELECT *
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
    WHERE \`years\` = ${data.year_id}
    ORDER BY \`start\`, \`id\`
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
        pageData.coms = competitions;
        myFunc.renderEjs(res, htmlStr, pageData);
      }
    );

  }
}

module.exports = new Year();
