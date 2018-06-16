const Page = require(process.cwd() + '/page.js');

class Index extends Page {
  constructor(){
    super();
  }

  outputPage(res, data){
    var pageObj = this;
    // console.log(data);
    pageObj.pageData.param  = data;
    pageObj.pageData.gender = {'man': '男子', 'woman': '女子'};
    pageObj.pageData.events = {};

    var promises = [];
    ['man', 'woman'].forEach((gender) => {
      promises.push(pageObj.getEventByRecordEventGender(gender, pageObj.pageData));
    });

    Promise.all(promises).then(function() {
      // console.log(pageObj.pageData.events);
      myFunc.renderEjs(res, pageObj.render());
    });
  }

  // 歴代記録として残し、記録が存在する種目を男女別に取得
  getEventByRecordEventGender(gender, pageData) {
    return new Promise((resolve, reject) => {
      var sql = `
        SELECT
            record_event.event AS 'id',
            CONCAT(event.sex, event.event) AS 'name'
          FROM (
            SELECT
              event,
              COUNT(event) AS 'count'
              FROM result
              WHERE record IS NOT NULL
              GROUP BY event
            ) AS record_event
          INNER JOIN event ON record_event.event = event.id
          WHERE event.record IS TRUE
            AND event.sex = '${pageData.gender[gender]}'
          ORDER BY event.order
        `;
      mysqlConnection.query(
        {
          sql: sql,
        },
        function(error, results, fields){
          if(error){reject(error);}
          // console.log(results);
          var recordEvents = [];
          for(let result of results) {
            recordEvents.push(result);
          }
          pageData.events[gender] = recordEvents;
          resolve();
        }
      );
    });
  }
}

module.exports = new Index();
