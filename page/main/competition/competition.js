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
  CONCAT(event.sex, event.event) AS 'event',
  round.round,
  CONCAT(member.name1, '　', member.name2) AS 'name'
  FROM \`result\`
  INNER JOIN \`competition\` ON result.competition = competition.id
  INNER JOIN \`event\` ON result.event = event.id
  LEFT JOIN \`round\` ON result.round = round.id
  INNER JOIN \`member\` ON result.member = member.id
  WHERE
    result.competition = ${data.com_id}
      AND result.del_flag = 0
  ORDER BY result.event, result.round, member.phonetic1, member.phonetic2
`;
    mysqlConnection.query(
      {
        sql: sql,
      },
      function(error, results, fields){
        if(error){throw error;}
        // console.log(results);
        var com_results = {},
            eventTmp    = 0,
            roundTmp    = 0;
        for(var result of results){
          // console.log(result);
          if(result.event != eventTmp){
            // console.log('event');
            eventTmp = result.event;
            roundTmp = result.round;
            com_results[result.event] = {};
            com_results[result.event][result.round] = [];
          }else if(result.round != roundTmp){
            // console.log('round');
            roundTmp = result.round;
            com_results[result.event][result.round] = [];
          }
          com_results[result.event][result.round].push(result);
        }
        pageObj.pageData.results  = com_results;
        // console.log(pageObj.pageData.results);
        myFunc.renderEjs(res, pageObj.render());
      }
    );

  }
}

module.exports = new Competition();
