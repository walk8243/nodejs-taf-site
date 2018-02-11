# ファイル構成
```
|- config(Directory)
|  |- default.yml
|  |- development.yml
|  |- product.yml(No default)
|  `- route.yml
|- docs(Directory)
|  |- db-design.yml
|  |- editing-way.yml
|  |- external-design.yml
|  |- file-configuration.yml
|  |- get-started.yml
|  |- internal-design.yml
|  |- mysql-install.yml
|  |- reference.yml
|  |- requirement-definition.yml
|  `- restriction.yml
|- install(Directory)
|  |- db.js
|  |- initial-data.sql
|  `- initial-table.sql
|- lib(Directory)
|  `- sample.js
|- page(Directory)
|- template(Directory)
|- app.js
|- page.js
`- route.js
```

## app.js
Node.js起動プログラム  
本システムを起動する場合は、こちらを起動して下さい。

## page.js
ページを表示するプログラムへの振り分けを行っています。

## route.js
URLからページの振り分けやデータの作成を行っています。

## config(Directory)
### default.yml

### development.yml

### product.yml(No default)

### route.yml
ページの構成を記述しています。

## docs(Directory)

## install(Directory)

## lib(Directory)

## page(Directory)
各ページを表示する`js`が格納されています。

## template(Directory)
各ページのテンプレートファイルが格納されています。  
テンプレートファイルとして機能するのは、`EJS`ファイルのみです。
