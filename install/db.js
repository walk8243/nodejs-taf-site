const fs    = require('fs'),
      mysql = require('mysql'),
      ConfigFile	= require('config');

// mysqlの接続設定
var mysqlConnection = mysql.createConnection({
	host		: ConfigFile.mysql.host,
	user		: ConfigFile.mysql.user,
	password: ConfigFile.mysql.pass,
	database: ConfigFile.mysql.database,
  multipleStatements: true
});

mysqlConnection.connect(function(error){
  if(error){throw error;}
  console.log('Connected!');
});

mysqlConnection.query({
  sql: 'SHOW TABLES'
}, function(error, results, fields){
  if(error){throw error;}
  // console.log(results);
  // console.log(results.length);

  if(results.length == 0){
    fs.readFile('install/initial-table.sql', 'utf-8', function(error, sql){
      if(error){throw error;}
      // console.log(sql);

      mysqlConnection.query(sql, function(error, results, fields){
        if(error){throw error;}
        // console.log(results);

        console.error('Table is Completed!');
        // mysqlConnection.end();
      });
    });

    fs.readFile('install/initial-data.sql', 'utf-8', function(error, sql){
      if(error){throw error;}
      // console.log(sql);

      mysqlConnection.query(sql, function(error, results, fields){
        if(error){throw error;}
        // console.log(results);

        console.log('Data is Completed!');
        // mysqlConnection.end();
      });
    });
  }else{
    var errorMessage = `
全てのテーブルを削除し、データベースを初期化した上で、実行して下さい。
`;
    console.log(errorMessage);
  }

  /*
  // console.log(fields[0].name);
  var table_name = fields[0].name;
  var queryString = '';
  for (var i in results) {
    if (results.hasOwnProperty(i)) {
      // console.log(results[i][table_name]);
      queryString += results[i][table_name] + ', '
    }
  }

  queryString = 'DROP TABLE ' + queryString.slice(0,-2) + ';';
  console.log(queryString);

  mysqlConnection.query({
    sql: queryString
  }, function(error, results, fields){
    if(error){throw error;}

    console.log(results);
  });
  */
  // mysqlConnection.end();
});

/*
*/
