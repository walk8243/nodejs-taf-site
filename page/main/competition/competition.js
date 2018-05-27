const Page = require(process.cwd() + '/page.js');

class Competition extends Page {
  constructor(){
    super();
  }

  outputPage(res, data){
    var pageObj = this;
    // console.log(data);
    pageObj.pageData.param = data;

    new Promise(function(resolve, reject) {
      var sql = `
        SELECT id, competition, place, DATE_FORMAT(start, GET_FORMAT(DATE, 'ISO')) AS 'start', DATE_FORMAT(end, GET_FORMAT(DATE, 'ISO')) AS 'end'
          FROM \`competition\`
          WHERE id = ${data.com_id}
        `;
      mysqlConnection.query(
        {
          sql: sql
        },
        function(error, results, fields) {
          // console.log(results);
          pageObj.pageData.comInfo = {
            id: results[0].id,
            competition: results[0].competition,
            place: results[0].place,
            date: Competition.createDateString(results[0].start, results[0].end)
          };
          resolve();
        }
      );
    }).then(function() {
      var sql = `
        SELECT
          result.id,
          result.result,
          CONCAT(event.sex, event.event) AS 'event',
          round.round,
          CONCAT(member.name1, '　', member.name2) AS 'name'
          FROM \`result\`
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
          for(let result of results){
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
    });
  }

  static createDateString(start, end) {
    var startArr  = start ? start.split('-') : null,
        endArr    = end ? end.split('-') : null,
        date      = null;
    if(startArr) {
      if(endArr) {
        if(startArr[0] == endArr[0]) {
          if(startArr[1] == endArr[1]) {
            if(startArr[2] == endArr[2]) {
              date = startArr.join('/');
            } else {
              date = startArr.join('/') + ' - ' + endArr[2];
            }
          } else {
            endArr.shift();
            date = startArr.join('/') + ' - ' + endArr.join('/');
          }
        } else {
          date = startArr.join('/') + ' - ' + endArr.join('/');
        }
      } else {
        date = startArr.join('/');
      }
    }

    return date;
  }
}

module.exports = new Competition();
