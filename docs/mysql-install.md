# MySQLのインストール
このシステムでは、MySQLを使用しています。  
そのため、MySQLのインストールが必須となっています。  
以下はその手順になります。  
注）`Ubuntu`での内容になります。`CentOS`などでは、コマンド等が異なります。

## MySQLのインストール
まず初めに、ファイルをダウンロードするフォルダに移動します。  
例：`cd ~/downloads/`  
次に以下のコマンドを実行します。
```
wget https://dev.mysql.com/get/mysql-apt-config_0.8.9-1_all.deb
sudo dpkg -i mysql-apt-config_0.8.9-1_all.deg
sudo dpkg-reconfigure mysql-apt-config
sudo apt-get update
sudo apt-get install mysql-server
sudo apt-get autoremove
```
一行目で、MySQLをインストールし、  
二行目で、パッケージを読み込んでいます。そのパッケージのデータを最新にし、  
五行目で、MySQLをインストールしています。  
六行目は、不要なパッケージを削除しています。ここは、実行しなくても大丈夫です。  
インストールが出来れば、
```
which mysql
service mysql status
```
で、実行状況を確認しておいて下さい。

## MySQLの文字コードの設定
デフォルトでは、文字コードが`latin1`になっています。  
そこで、文字コードを`UTF-8`に変えます。
```
sudo atom /etc/mysql/my.cnf
```
を実行して下さい。  
`Atom`がインストールされていれば、`Atom`が開きます。  
インストールしていなければ、`vi`コマンド等で編集して下さい。  
`my.cnf`では、MySQLのデフォルトの設定が出来ます。  
以下を最後に追加して下さい。
```
[mysqld]
character-set-server=utf8
skip-character-set-client-handshake
default-storage-engine=INNODB

[mysqldump]
default-character-set=utf8

[mysql]
default-character-set=utf8
```
もしも`[]`内で被っているものがあれば、どちらかに合わせて下さい。  
編集が完了し、保存出来れば、
```
service mysql restart
```
を実行して下さい。

## MySQLへのログイン
```
mysql -u root -p
```
を実行し、パスワード入力して、ログイン出来ることを確認して下さい。  
ログインが確認出来れば、
```
status;
show databases;
create database test;
select * from INFORMATION_SCHEMA.SCHEMATA;
```
で、MySQLの設定や、作成したデータベースのデフォルトの文字コードに間違いがないかどうか確認して下さい。  
問題がなければ、設定は完了です。
