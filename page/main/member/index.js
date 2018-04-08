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
SELECT
  \`id\`,
  CONCAT(\`name1\`, ' ', \`name2\`) AS 'name',
  CONCAT(\`phonetic1\`, ' ', \`phonetic2\`) AS 'phonetic',
  \`year\`,
  \`degree\`,
  \`image\`,
  \`expert\`,
  \`position\`
  FROM \`member\`
  WHERE \`del_flag\` = 0
  ORDER BY \`degree\`, \`grade\` DESC, \`phonetic\`
`;
    mysqlConnection.query(
      {
        sql: sql,
      },
      function(error, results, fields){
        if(error){throw error;}
        // console.log(results);
        var members = {},
            level   = 0;
        /*
         ** 1~4回生　： 1~4
         ** 5回生以上： 5
         ** 院生 　　： 6
        */
        for(var result of results){
          if(result.degree == '学位'){
            if(result.year <= 4){
              if(result.year != level){
                level = result.year;
                members[level] = [];
              }
            }else if(result.year >= 5){
              level = 5;
              if(!Array.isArray(members[level])){
                members[level] = [];
              }
            }
          }else if(result.degree == '修士' || result.degree == '博士'){
            level = 6;
            if(!Array.isArray(members[level])){
              members[level] = [];
            }
          }
          members[level].push(result);
        }
        pageObj.pageData.members = members;
        myFunc.renderEjs(res, pageObj.render());
      }
    );

  }
}

module.exports = new Index();
