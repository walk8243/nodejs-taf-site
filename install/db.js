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

fs.readFile('install/initial-db.sql', 'utf-8', function(error, sql){
  if(error){throw error;}
  // console.log(sql);

  mysqlConnection.query(sql, function(error, results, fields){
    if(error){throw error;}
    // console.log(results);

    console.log('Completed!');
    mysqlConnection.end();
  });
});
