# 内部設計
## ファイル構成
[file-configuration.md](https://github.com/walk8243/nodejs-taf-site/blob/master/docs/file-configuration.md)を参照

## データベース
### リレー競技の場合
1. `event`テーブルの`relay_flag`が`true`であることを確認する。なっていなければ`true`にする。
2. `result`テーブルに`member`以外を埋めたデータを作成する。
3. 作成されたデータの`id`をコピーしておく。
4. `relay`テーブルにコピーした`id`でチーム情報のデータを作成する。
5. `relay_member`テーブルにもコピーした`id`で競技を行った選手のデータを作成する。埋める項目は`result`,`order`,`member`のみで良い。

### 駅伝競技の場合
1. `event`テーブルの`relay_flag`が`true`であることを確認する。なっていなければ`true`にする。
2. `result`テーブルに`member`以外を埋めたデータを作成する。
3. 作成されたデータの`id`をコピーしておく。
4. `relay`テーブルにコピーした`id`でチーム情報のデータを作成する。
5. `relay_member`テーブルにもコピーした`id`で競技を行った選手のデータを作成する。
  - 選手が和歌山大学の場合  
  `belong`は和歌山大のままで、`member`を選択する。
  - 選手が和歌山大学でない場合  
  `belong`をその選手の所属に変更し、`member`は選択せず、`name`にその選手の名前を記入する。

### 混成競技の場合
1. `event`テーブルの`conbined_flag`が`true`であることを確認する。なっていなければ`true`にする。
2. `result`テーブルに後で編集すれば良いので`result`には途中経過を入れてデータを作成する。
3. さらに`result`テーブルに既に終了した種目の結果のデータを作成する。
4. `combined`テーブルに混成競技の結果と個別のデータを結び付けるデータを作成する。
  - `result`には、3.で作成されたデータの`id`を入れる。
  - `score`には、その結果の混成競技おける点数を入れる。
  - `parent`には、2.で作成されたデータの`id`を入れる。
