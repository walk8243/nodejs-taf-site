const mysql = require('mysql'),
      ConfigFile	= require('config');

// mysqlの接続設定
var mysqlConnection = mysql.createConnection({
	host		: ConfigFile.mysql.host,
	user		: ConfigFile.mysql.user,
	password: ConfigFile.mysql.pass,
	database: ConfigFile.mysql.database
});

mysqlConnection.connect(function(error){
  if(error){throw error;}
  console.log('Connected!');
});

var sql;
sql = `CREATE TABLE IF NOT EXISTS event (
  \`id\` INT(5) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  \`event\` VARCHAR(64) NOT NULL,
  \`sex\` ENUM('男子', '女子') DEFAULT '男子',
  \`record\` BOOLEAN DEFAULT false,
  \`order\` INT(5),
  \`relay_flag\` BOOLEAN DEFAULT false,
  \`conbined_flag\` BOOLEAN DEFAULT false
)`;
mysqlConnection.query(sql, function(error, results, fields){
  if(error){throw error;}
  console.log(results);
});

mysqlConnection.end();
