const fs    = require('fs');

var dummyDataSql  = "",
    counter       = {};

dummyDataSql += createDummyMemberData(50, counter);
dummyDataSql += "\n\n";
dummyDataSql += createDummyCompetitionData(counter);
dummyDataSql += "\n\n";
dummyDataSql += createDummyResultData();

fs.writeFile('install/dummy-data.sql', dummyDataSql, (err) => {
  if(err) {throw err;}
  console.log('The file has been saved!');
});


function createDummyMemberData(num, counter) {
  const lastName  = [
          '佐藤', '鈴木', '高橋', '田中', '伊藤', '渡辺', '山本', '中村', '小林', '加藤'
        ],
        firstName = [
          '大翔', '蓮', '樹', '悠真', '陽太',
          '蒼', '湊', '颯真', '陽翔', '陽斗',
          '陽葵', '葵', '陽菜', '結衣', '凛',
          '咲良', '結菜', '結愛', '心春', '杏', '紬'
        ],
        lastPhonetic  = [
          'さとう', 'すずき', 'たかはし', 'たなか', 'いとう', 'わたなべ', 'やまもと', 'なかむら', 'こばやし', 'かとう'
        ],
        firstPhonetic = [
          'ひろと', 'れん', 'いつき', 'ゆうま', 'ひなた',
          'あおい', 'みなと', 'そうま', 'はると', 'はると',
          'ひまり', 'あおい', 'ひな', 'ゆい', 'りん',
          'さくら', 'ゆいな', 'ゆあ', 'こはる', 'あん', 'つむぎ'
        ];
  var usedValue = [],
      createArray = [];
  counter.member = 0;

  for(let i=0; i<lastName.length; i++) {
    usedValue[i] = [];
  }

  for(let i=0; i<num; i++) {
    let pos1  = getRandomInt(lastName.length),
        pos2  = getRandomInt(firstName.length),
        createValue = [];
    if(usedValue[pos1][pos2]) {continue;}
    // console.log(pos1 + ", " + pos2);
    usedValue[pos1][pos2] = true;
    counter.member++;

    createValue.push(`'${lastName[pos1]}'`);
    createValue.push(`'${firstName[pos2]}'`);
    createValue.push(`'${lastPhonetic[pos1]}'`);
    createValue.push(`'${firstPhonetic[pos2]}'`);
    pos2 < 10 ? createValue.push(`'男子'`) : createValue.push(`'女子'`);
    switch(i % 5) {
      case 0:
        createValue.push(2016); break;
      case 1:
        createValue.push(2017); break;
      case 2:
        createValue.push(2018); break;
      case 3:
        createValue.push(2015); break;
      case 4:
        createValue.push(2014); break;
    }
    if(i < 35) {
      createValue.push(`'学位'`);
      switch(i % 5) {
        case 0:
          createValue.push(`'法学部'`); break;
        case 1:
          createValue.push(`'教育学部'`); break;
        case 2:
          createValue.push(`'工学部'`); break;
        case 3:
          createValue.push(`'理学部'`); break;
        case 4:
          createValue.push(`'経済学部'`); break;
      }
    } else if(i < 45) {
      createValue.push(`'修士'`);
      switch(i % 5) {
        case 0:
          createValue.push(`'法学系研究科'`); break;
        case 1:
          createValue.push(`'教育学研究科'`); break;
        case 2:
          createValue.push(`'工学系研究科'`); break;
        case 3:
          createValue.push(`'理学系研究科'`); break;
        case 4:
          createValue.push(`'経済学研究科'`); break;
      }
    } else {
      createValue.push(`'博士'`);
      switch(i % 5) {
        case 0:
          createValue.push(`'法学系研究科'`); break;
        case 1:
          createValue.push(`'教育学研究科'`); break;
        case 2:
          createValue.push(`'工学系研究科'`); break;
        case 3:
          createValue.push(`'理学系研究科'`); break;
        case 4:
          createValue.push(`'経済学研究科'`); break;
      }
    }
    switch(getRandomInt(5)) {
      case 0:
        createValue.push(`'短距離'`); break;
      case 1:
        createValue.push(`'中距離'`); break;
      case 2:
        createValue.push(`'長距離'`); break;
      case 3:
        createValue.push(`'跳躍'`); break;
      case 4:
        createValue.push(`'投擲'`); break;
    }
    createValue.push(`''`);

    createArray.push('  (' + createValue.join(', ') + ')');
  }

  var dummyMemberDataSql  = "INSERT INTO member (`name1`, `name2`, `phonetic1`, `phonetic2`, `sex`, `admission`, `degree`, `depart`, `expert`, `graduate`)\n";
  dummyMemberDataSql += "  VALUES\n";
  dummyMemberDataSql += createArray.join(',\n') + ';';
  // console.log(dummyMemberDataSql);

  return dummyMemberDataSql;
}

function createDummyCompetitionData(counter) {
  var createArray = [],
      comDate     = new Date(2018, 4-1, 1);
  const regions = [
          '日本', '北海道', '東北', '関東', '中部', '近畿', '中国', '四国', '九州'
        ],
        prefectures = [
          '北海道',
          '青森県', '岩手県', '秋田県', '宮城県', '山形県', '福島県',
          '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
          '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県',
          '三重県', '滋賀県', '奈良県', '和歌山県', '京都府', '大阪府', '兵庫県',
          '岡山県', '広島県', '鳥取県', '島根県', '山口県',
          '香川県', '徳島県', '愛媛県', '高知県',
          '福岡県', '佐賀県', '長崎県', '大分県', '熊本県', '宮崎県', '鹿児島県', '沖縄県'
        ],
        sponsors  = [
          '富士ソフト', '富士通', 'Sky', 'リクルート', 'ピクシブ',
          'マーベラス', 'Cygames', '大塚商会', 'NECソリューションイノベータ', 'NTTデータ',
          'SCSK', '富士通マーケティング', '日立システムズ', 'フロム・ソフトウェア', '楽天'
        ];
  counter.competition = 0;

  for(let value of regions.concat(prefectures, sponsors)) {
    let createValue = [];
    counter.competition++;
    createValue.push(`'${value}選手権大会'`);
    createValue.push(`'${value}競技場'`);
    createValue.push(`'${getDateMyFormatToString(comDate)}'`);
    let rand    = getRandomInt(50),
        endDate = '';
    if(rand < 10) {
      endDate = 'NULL';
    } else if(rand < 32) {
      comDate = addDays(comDate, 1);
      endDate = `'${getDateMyFormatToString(comDate)}'`;
    } else if(rand < 41) {
      comDate = addDays(comDate, 2);
      endDate = `'${getDateMyFormatToString(comDate)}'`;
      comDate = addDays(comDate, 1);
    } else if(rand < 47) {
      comDate = addDays(comDate, 3);
      endDate = `'${getDateMyFormatToString(comDate)}'`;
      comDate = addDays(comDate, 1);
    } else {
      comDate = addDays(comDate, 4);
      endDate = `'${getDateMyFormatToString(comDate)}'`;
      comDate = addDays(comDate, 1);
    }
    createValue.push(endDate);
    createArray.push('  (' + createValue.join(', ') + ')');
  }

  var dummyCompetitionDataSql  = "INSERT INTO competition (`competition`, `place`, `start`, `end`)\n";
  dummyCompetitionDataSql += "  VALUES\n";
  dummyCompetitionDataSql += createArray.join(',\n') + ';';
  // console.log(dummyCompetitionDataSql);

  return dummyCompetitionDataSql;
}

function createDummyResultData() {
  var createArray = [];

  var i = 0;
  while(true) {
    i += getRandomInt(5) + 1;
    if(i > counter.member) {break;}
    // console.log(i);
    let createValue = [],
        resultStr   = (getRandomInt(200) + 1000).toString(),
        windNumber  = (getRandomInt(50) - 20) / 10;
        windStr     = windNumber>0 ? `+${windNumber.toFixed(1)}` : windNumber.toFixed(1);

    createValue.push(`'${resultStr.substr(0, 2)}"${resultStr.substr(2)}(${windStr})'`);
    createValue.push(getRandomInt(counter.competition) + 1);
    createValue.push(1);
    createValue.push(i);
    createValue.push(windNumber<=2.0 ? Number(resultStr) : 'NULL');
    // console.log(createValue);
    createArray.push('  (' + createValue.join(', ') + ')');
  }

  var dummyCompetitionDataSql  = "INSERT INTO result (`result`, `competition`, `event`, `member`, `record`)\n";
  dummyCompetitionDataSql += "  VALUES\n";
  dummyCompetitionDataSql += createArray.join(',\n') + ';';
  // console.log(dummyCompetitionDataSql);

  return dummyCompetitionDataSql;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getDateMyFormatToString(date) {
  return date.getFullYear()
          + '-' + ('0' + (date.getMonth() + 1)).slice(-2)
          + '-' + ('0' + date.getDate()).slice(-2);
}

function addDays(date, days) {
  date.setDate(date.getDate() + days);
  return date;
}
