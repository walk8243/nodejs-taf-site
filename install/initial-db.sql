CREATE TABLE IF NOT EXISTS competition (
  `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `competition` VARCHAR(128) NOT NULL COMMENT '試合名',
  `place` VARCHAR(64) COMMENT '場所',
  `start` DATE COMMENT '開始日',
  `end` DATE DEFAULT '0000-00-00' COMMENT '終了日',
  `del_flag` BOOLEAN DEFAULT false COMMENT '削除フラッグ'
);

CREATE TABLE IF NOT EXISTS member (
  `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name1` VARCHAR(64) COMMENT '姓',
  `name2` VARCHAR(64) COMMENT '名',
  `phonetic1` VARCHAR(128) COMMENT '姓（ふりがな）',
  `phonetic2` VARCHAR(128) COMMENT '名（ふりがな）',
  `sex` ENUM('男子', '女子') DEFAULT '男子' COMMENT '性別',
  `grade` INT(3) COMMENT '学年',
  `degree` ENUM('学位', '修士', '博士') DEFAULT '学位' COMMENT '学位',
  `expert` VARCHAR(32) COMMENT '専門',
  `graduate` VARCHAR(64) COMMENT '出身高校',
  `position` VARCHAR(64) DEFAULT NULL COMMENT '幹部役職',
  `image` MEDIUMBLOB DEFAULT NULL COMMENT '顔写真',
  `del_flag` BOOLEAN DEFAULT false COMMENT '削除フラッグ'
);

CREATE TABLE IF NOT EXISTS event (
  `id` INT(5) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `event` VARCHAR(64) NOT NULL COMMENT '種目名',
  `sex` ENUM('男子', '女子') DEFAULT '男子' COMMENT '性別',
  `record` BOOLEAN DEFAULT false COMMENT '歴代記録に残すか',
  `order` INT(5) COMMENT '並び順',
  `relay_flag` BOOLEAN DEFAULT false COMMENT 'リレーフラッグ',
  `conbined_flag` BOOLEAN DEFAULT false COMMENT '混成フラッグ'
);

CREATE TABLE IF NOT EXISTS round (
  `id` INT(2) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `round` VARCHAR(32) NOT NULL COMMENT 'ラウンド名',
  `order` INT(2) COMMENT '並び順'
);

CREATE TABLE IF NOT EXISTS result (
  `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `result` VARCHAR(128) NOT NULL COMMENT '結果',
  `competition` INT(11) COMMENT '試合',
  `event` INT(5) COMMENT '種目',
  `round` INT(2) COMMENT 'ラウンド',
  `member` INT(11) COMMENT '部員',
  `del_flag` BOOLEAN DEFAULT false COMMENT '削除フラッグ',

  FOREIGN KEY (`competition`)
    REFERENCES competition(`id`)
    ON UPDATE CASCADE ON DELETE RESTRICT,

  FOREIGN KEY (`event`)
    REFERENCES event(`id`)
    ON UPDATE CASCADE ON DELETE RESTRICT,

  FOREIGN KEY (`round`)
    REFERENCES round(`id`)
    ON UPDATE CASCADE ON DELETE RESTRICT,

  FOREIGN KEY (`member`)
    REFERENCES member(`id`)
    ON UPDATE CASCADE ON DELETE RESTRICT
);
