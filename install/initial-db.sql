-- テーブルの追加
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
  `combined_flag` BOOLEAN DEFAULT false COMMENT '混成フラッグ'
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

CREATE TABLE IF NOT EXISTS relay (
  `result` INT(11) NOT NULL PRIMARY KEY,
  `team` VARCHAR(128) NOT NULL DEFAULT '和歌山大' COMMENT 'チーム名',

  FOREIGN KEY (`result`)
    REFERENCES result(`id`)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS relay_member (
  `result` INT(11) NOT NULL PRIMARY KEY,
  `order` INT(2) COMMENT '走順',
  `belong` VARCHAR(64) DEFAULT '和歌山大' COMMENT '所属',
  `member` INT(2) DEFAULT NULL COMMENT '選手（和大所属の場合）',
  `name` VARCHAR(256) DEFAULT NULL COMMENT '選手名(和大以外の所属の場合)',
  `amount_record` VARCHAR(128) DEFAULT NULL COMMENT '通過タイム',
  `section_record` VARCHAR(128) DEFAULT NULL COMMENT '区間タイム',

  FOREIGN KEY (`result`)
    REFERENCES result(`id`)
    ON UPDATE CASCADE ON DELETE CASCADE,

  FOREIGN KEY (`member`)
    REFERENCES member(`id`)
    ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS combined (
  `result` INT(11) NOT NULL PRIMARY KEY,
  `score` INT(3) DEFAULT 0 COMMENT '点数',
  `parent` INT(11) NOT NULL COMMENT '親result',

  FOREIGN KEY (`result`)
    REFERENCES result(`id`)
    ON UPDATE CASCADE ON DELETE CASCADE,

  FOREIGN KEY (`parent`)
    REFERENCES result(`id`)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS special (
  `id` INT(5) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `special` VARCHAR(128) NOT NULL COMMENT 'ページ名',
  `order` INT(5) COMMENT '並び順',
  `display` BOOLEAN DEFAULT false COMMENT '表示',
  `del_flag` BOOLEAN DEFAULT false COMMENT '削除フラッグ'
);

CREATE TABLE IF NOT EXISTS link_category (
  `id` INT(2) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `category` VARCHAR(64) NOT NULL COMMENT 'カテゴリー名',
  `order` INT(2) COMMENT '並び順'
);

CREATE TABLE IF NOT EXISTS link (
  `id` INT(5) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `link` VARCHAR(128) NOT NULL COMMENT 'サイト名',
  `url` VARCHAR(256) NOT NULL COMMENT 'リンク先URL',
  `category` INT(2) DEFAULT NULL COMMENT 'カテゴリー',
  `del_flag` BOOLEAN DEFAULT false COMMENT '削除フラッグ',

  FOREIGN KEY (`category`)
    REFERENCES link_category(`id`)
    ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS image (
  `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `image` MEDIUMBLOB NOT NULL COMMENT '画像',
  `unique_string` VARCHAR(32) NOT NULL COMMENT '識別文字列'
);

CREATE TABLE IF NOT EXISTS constant (
  `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `index` VARCHAR(32) NOT NULL UNIQUE COMMENT '変数名',
  `value` VARCHAR(128) NOT NULL COMMENT '値',
  `comment` VARCHAR(1024) DEFAULT NULL COMMENT '説明'
);

-- 初期データ
INSERT INTO event (`event`, `sex`, `record`, `order`, `relay_flag`, `combined_flag`)
  VALUES
  ('100m', '男子', true, 1, false, false),
  ('100m', '男子', true, 1, false, false),
  ('100m', '女子', true, 2, false, false),
  ('200m', '男子', true, 3, false, false),
  ('200m', '女子', true, 4, false, false),
  ('400m', '男子', true, 5, false, false),
  ('400m', '女子', true, 6, false, false),
  ('800m', '男子', true, 7, false, false),
  ('800m', '女子', true, 8, false, false),
  ('1500m', '男子', true, 9, false, false),
  ('1500m', '女子', true, 10, false, false),
  ('3000m', '男子', true, 11, false, false),
  ('3000m', '女子', true, 12, false, false),
  ('5000m', '男子', true, 13, false, false),
  ('5000m', '女子', true, 14, false, false),
  ('10000m', '男子', true, 15, false, false),
  ('10000m', '女子', true, 16, false, false),
  ('110mH', '男子', true, 17, false, false),
  ('100mH', '女子', true, 18, false, false),
  ('400mH', '男子', true, 19, false, false),
  ('400mH', '女子', true, 20, false, false),
  ('3000mSC', '男子', true, 21, false, false),
  ('3000mSC', '女子', true, 22, false, false),
  ('4×100mR', '男子', true, 23, true, false),
  ('4×100mR', '女子', true, 24, true, false),
  ('4×400mR', '男子', true, 25, true, false),
  ('4×400mR', '女子', true, 26, true, false),
  ('スウェーデンR', '男子', true, 27, true, false),
  ('3000mW', '男子', false, 28, false, false),
  ('3000mW', '女子', true, 29, false, false),
  ('5000mW', '男子', true, 30, false, false),
  ('5000mW', '女子', true, 31, false, false),
  ('10000mW', '男子', true, 32, false, false),
  ('10000mW', '女子', true, 33, false, false),
  ('走高跳', '男子', true, 34, false, false),
  ('走高跳', '女子', true, 35, false, false),
  ('棒高跳', '男子', true, 36, false, false),
  ('棒高跳', '女子', true, 37, false, false),
  ('走幅跳', '男子', true, 38, false, false),
  ('走幅跳', '女子', true, 39, false, false),
  ('三段跳', '男子', true, 40, false, false),
  ('三段跳', '女子', true, 41, false, false),
  ('砲丸投', '男子', true, 42, false, false),
  ('砲丸投', '女子', true, 43, false, false),
  ('円盤投', '男子', true, 44, false, false),
  ('円盤投', '女子', true, 45, false, false),
  ('ハンマー投', '男子', true, 46, false, false),
  ('ハンマー投', '女子', true, 47, false, false),
  ('やり投', '男子', true, 48, false, false),
  ('やり投', '女子', true, 49, false, false),
  ('五種競技', '男子', true, 50, false, true),
  ('七種競技', '女子', true, 51, false, true),
  ('八種競技', '男子', false, 52, false, true),
  ('十種競技', '男子', true, 53, false, true),
  ('ハーフマラソン', '男子', true, 54, false, false),
  ('ハーフマラソン', '女子', true, 55, false, false),
  ('マラソン', '男子', true, 56, false, false),
  ('マラソン', '女子', true, 57, false, false),
  ('10km', '男子', false, 58, false, false),
  ('10km', '女子', false, 59, false, false),
  ('10マイル', '男子', false, 60, false, false),
  ('10マイル', '女子', false, 61, false, false),
  ('20km', '男子', false, 62, false, false),
  ('20km', '女子', false, 63, false, false),
  ('30km', '男子', false, 64, false, false),
  ('30km', '女子', false, 65, false, false),
  ('100km', '男子', false, 66, false, false),
  ('100km', '女子', false, 67, false, false),
  ('10kmW', '男子', false, 68, false, false),
  ('10kmW', '女子', true, 69, false, false),
  ('20kmW', '男子', true, 70, false, false),
  ('20kmW', '女子', true, 71, false, false),
  ('50kmW', '男子', true, 72, false, false),
  ('駅伝', '男子', false, 73, false, false),
  ('駅伝', '女子', false, 74, false, false);

INSERT INTO round (`round`, `order`)
  VALUES
  ('予選', 1),
  ('準決勝', 2),
  ('決勝', 3);

INSERT INTO constant (`index`, `value`, `comment`)
  VALUES
  ('admin_member', NULL, '管理者（member_id）'),
  ('admin_mail', NULL, '管理者メールアドレス');
