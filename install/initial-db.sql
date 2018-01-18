CREATE TABLE IF NOT EXISTS event (
  `id` INT(5) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `event` VARCHAR(64) NOT NULL,
  `sex` ENUM('男子', '女子') DEFAULT '男子',
  `record` BOOLEAN DEFAULT false,
  `order` INT(5),
  `relay_flag` BOOLEAN DEFAULT false,
  `conbined_flag` BOOLEAN DEFAULT false
)
