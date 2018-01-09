# テーブル一覧
| テーブル名 | 目的 |
|:---:|:---|
| result | 試合結果 |
| competition | 試合情報 |
| member | 部員情報 |
| event | 種目 |
| round | ラウンド |
| special | トップページに作られる特設ページ |
| link | 他サイトのリンク |
| administrator | ウェブサイトの管理者情報 |

# resultテーブル
| キー名 | 目的 | 型 | 主キー | 外部キー |
|:---:|:---:|:---:|:---:|:---:|
| id | 主キー | int(11) | ◯ |  |
| result | 結果 | varchar |  |  |
| competition | 試合 | int(11) |  | competition |
| event | 種目 | int(5) |  | event |
| round | ラウンド | int(2) |  | round |
| member | 部員 | int(11) |  | member |

# competitionテーブル
| キー名 | 目的 | 型 | 主キー | 外部キー |
|:---:|:---:|:---:|:---:|:---:|
| id | 主キー | int(11) | ◯ |  |
| competition | 試合名 | varchar |  |  |
| place | 場所 | varchar |  |  |
| start | 開始日 | date |  |  |
| end | 終了日 | date |  |  |

# memberテーブル
| キー名 | 目的 | 型 | 主キー | 外部キー |
|:---:|:---:|:---:|:---:|:---:|
| id | 主キー | int(11) | ◯ |  |
| name1 | 姓 | varchar |  |  |
| name2 | 名 | varchar |  |  |
| phonetic1 | 姓（ふりがな） | varchar |  |  |
| phonetic2 | 名（ふりがな） | varchar |  |  |
| sex | 性別 | enum('男子', '女子') |  |  |
| grade | 学年 | int(3) |  |  |
| degree | 学位 | varchar |  |  |
| expert | 専門 | varchar |  |  |
| graduate | 出身高校 | varchar |  |  |
| position | 幹部役職 | varchar |  |  |
| image | 顔写真 | mediumblob |  |  |

# eventテーブル
| キー名 | 目的 | 型 | 主キー | 外部キー |
|:---:|:---:|:---:|:---:|:---:|
| id | 主キー | int(5) | ◯ |  |
| event | 種目名 | varchar |  |  |
| sex | 性別 | enum('男子', '女子') |  |  |
| record | 歴代記録に残すか | bool |  |  |
| order | 並び順 | int(5) |  |  |

# roundテーブル


# specialテーブル


# linkテーブル


# administratorテーブル
| キー名 | 目的 | 型 | 主キー | 外部キー |
|:---:|:---:|:---:|:---:|:---:|
| id | 主キー | int(3) | ◯ |  |
| member | 部員 | int(11) |  | member |
| mail | メールアドレス | varchar |  |  |
