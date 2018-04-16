const Page = require(process.cwd() + '/page.js');

class Member extends Page {
  constructor(){
    super();
  }

  outputPage(res, data){
    var pageObj = this;
    // console.log(data);
    pageObj.pageData.param = data;

    var sql = `
SELECT
  CONCAT(\`name1\`, ' ', \`name2\`) AS 'name',
  CONCAT(\`phonetic1\`, ' ', \`phonetic2\`) AS 'phonetic',
  \`sex\`,
  \`year\`,
  \`grade\`,
  \`degree\`,
  \`expert\`,
  \`graduate\`,
  \`position\`,
  \`image\`
  FROM \`member\`
  WHERE \`del_flag\` = 0
    AND \`id\`=${data['member_id']}
`;
    mysqlConnection.query(
      {
        sql: sql,
      },
      function(error, results, fields){
        if(error){throw error;}
        // console.log(results);
        var member = [];
        for(var result of results){
          member.push(result);
        }
        pageObj.pageData.members = member;
        myFunc.renderEjs(res, pageObj.render());
      }
    );

  }
}

module.exports = new Member();
