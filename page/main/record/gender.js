const Page = require(process.cwd() + '/page.js');

class Gender extends Page {
  constructor(){
    super();

    this.pageStrMan   = '',
    this.pageStrWoman = '';
    this.genderList   = {
      'man'   : '男子',
      'woman' : '女子'
    };
  }

  createTemplate() {
    super.createTemplate();

    var pageObj = this,
        result;
    ['man', 'woman'].forEach(async (genderCode) => {
      result = await pageObj.asyncOutputEveryGenderBody(genderCode);
      // console.log(this[result]);
    });
  }

  outputPage(res, data){
    var pageObj       = this,
        variableName  = 'pageStr';
    if(data.gender_str === 'man') {
      variableName  += 'Man';
    } else if(data.gender_str === 'woman') {
      variableName  += 'Woman';
    } else {
      res.redirect('/record');
    }
    // console.log(data);
    pageObj.pageData.param = data;

    myFunc.renderEjs(res, ejs.render(pageObj[variableName], pageObj.pageData));
  }

  // 男女毎のページの中身を出力
  asyncOutputEveryGenderBody(genderCode) {
    var variableName = 'pageStr';
    switch(genderCode) {
      case 'man':
        variableName += 'Man';
        break;
      case 'woman':
        variableName += 'Woman';
        break;
      default:
        return new Promise((resolve, reject) => {
          resolve();
        });
    }

    var pageObj = this;
    return new Promise((resolve, reject) => {
      var pageData = {};
      pageData.gender = pageObj.genderList[genderCode];
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
            AND event.sex = '${pageData.gender}'
          ORDER BY event.order
        `;
      mysqlConnection.query(
        {sql: sql},
        async (error, recordEvents, fields) => {
          if(error){reject(error);}
          // console.log(recordEvents);
          var result;
          // pageObj.pageData.events = recordEvents;
          pageData.recordsByEvent = [];
          for(let recordEvent of recordEvents) {
            try {
              result = await pageObj.getRecordTenBest(recordEvent);
              result.unshift(recordEvent);
              // console.log(result);
              pageData.recordsByEvent.push(result);
            } catch(reason) {
              console.log(reason);
            }
          }
          // console.log(pageData);
          pageObj[variableName] = ejs.render(pageObj.pageStr, pageData, {});
          resolve(variableName);
        }
      );
    });
  }

  // 歴代記録を残す種目で、記録のある種目のみを歴代10傑まで取得
  getRecordTenBest(recordEvent) {
    // console.log(recordEvent);
    var tenRecordsByEvent = [],
        sql = `
          SELECT
              result,
              competition,
              member
            FROM result
            WHERE
              event = ${recordEvent.id}
              AND record IS NOT NULL
            ORDER BY record
            LIMIT 10
          `;
    return new Promise((resolve, reject) => {
      mysqlConnection.query(
        {sql: sql},
        (error, recordResults, fields) => {
          if(error) {reject(error);}
          else if(recordResults.length == 0) {reject("No record counts!");}
          // console.log(recordResults);
          resolve(recordResults);
        }
      );
    });
  }
}

module.exports = new Gender();
