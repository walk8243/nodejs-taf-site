-- 初期データ
INSERT INTO event (`event`, `sex`, `record`, `order`, `relay_flag`, `combined_flag`)
  VALUES
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
  ('club_name', '偽津斗大学陸上競技部', '部活名'),
  ('admin_member', 'NULL', '管理者（member_id）'),
  ('admin_mail', 'NULL', '管理者メールアドレス');

INSERT INTO competition (`competition`, `place`, `start`, `end`)
  VALUES
  ('第1回陸上長距離競技会', '駒沢オリンピック公園総合運動場陸上競技場', '2018-04-14', '2018-04-15'),
  ('第1回体育大学競技会', '江東区夢の島競技場', '2018-04-14', NULL),
  ('第1回体育大学長距離競技会', '江東区夢の島競技場', '2018-04-14', NULL),
  ('第1回体育大学競技会', 'ヤンマーフィールド長居', '2017-04-02', NULL),
  ('第1回体育大学長距離競技会', 'ヤンマーフィールド長居', '2017-04-02', NULL),
  ('第1回陸連記録会', 'ヤンマーフィールド長居', '2018-03-10', '2018-03-11');

INSERT INTO member (`name1`, `name2`, `phonetic1`, `phonetic2`, `sex`, `grade`, `degree`, `expert`, `graduate`, `position`)
  VALUES
  ('陸上', '悠真', 'りくじょう', 'ゆうま', '男子', 1, '学位', '短距離', '東京', NULL),
  ('陸上', '結菜', 'りくじょう', 'ゆうな', '女子', 1, '学位', '短距離', '東京', NULL),
  ('東京', '悠人', 'りくじょう', 'ゆうと', '男子', 1, '学位', '短距離', '東京', NULL),
  ('東京', '咲良', 'りくじょう', 'さくら', '女子', 1, '学位', '短距離', '東京', NULL);

INSERT INTO result (`result`, `competition`, `event`, `round`, `member`)
  VALUES
  ('11\"11(+1.0)', 2, 1, NULL, 1),
  ('12\"03(+1.0)', 2, 2, NULL, 2),
  ('11\"37(+1.0)', 2, 1, NULL, 3),
  ('12\"21(+1.0)', 2, 2, NULL, 4);
