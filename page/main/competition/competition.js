const Page = require(process.cwd() + '/page.js');

class Competition extends Page {
  constructor(){
    super();
  }

  outputPage(res, data){
    var pageObj = this;
    // console.log(data);
    pageObj.pageData.param = data;

    var sql = `
SELECT
  result.id,
  result.result,
  competition.competition,
  result.event AS 'event_id',
  CONCAT(event.sex, event.event) AS 'event',
  result.round AS 'round_id',
  round.round,
  CONCAT(member.name1, '　', member.name2) AS 'member'
  FROM \`result\`
  INNER JOIN \`competition\` ON result.competition = competition.id
  INNER JOIN \`event\` ON result.event = event.id
  LEFT JOIN \`round\` ON result.round = round.id
  INNER JOIN \`member\` ON result.member = member.id
  WHERE
    result.competition = ${data.com_id}
      AND result.del_flag = 0
`;
    mysqlConnection.query(
      {
        sql: sql,
      },
      function(error, results, fields){
        if(error){throw error;}
        // console.log(results);
        var com_results = {};
        for(var result of results){
          // com_results.push(result);
          console.log(result);
          if(!com_results.hasOwnProperty(result.event_id)){
            console.log('not');
            com_results[result.event_id] = {};
            com_results[result.event_id][result.round_id] = [];
          }else if(!com_results[result.event_id].hasOwnProperty(result.round_id)){
            com_results[result.event_id][result.round_id] = [];
          }
          com_results[result.event_id][result.round_id].push(result);
        }
        pageObj.pageData.results = com_results;
        console.log(com_results);
        myFunc.renderEjs(res, pageObj.render());
      }
    );

  }
}

module.exports = new Competition();
