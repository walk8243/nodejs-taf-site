# テーブル一覧
| テーブル名 | 目的 |
|:---:|:---|
| result | 試合結果 |
| competition | 試合情報 |
| member | 部員情報 |
| event | 種目 |
| round | ラウンド |
| relay | リレー・駅伝のチーム情報 |
| relay_member | リレー・駅伝の個人情報 |
| special | トップページに作られる特設ページ |
| link | 他サイトへのリンク |
| administrator | ウェブサイトの管理者情報 |
| link_category | 他サイトへのリンクのカテゴリー |

# resultテーブル
| キー名 | 目的 | 型 | デフォルト | 主キー | 外部キー |  |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| id | 主キー | int(11) |  | ◯ |  | auto_increment |
| result | 結果 | varchar |  |  |  |  |
| competition | 試合 | int(11) |  |  | competition |  |
| event | 種目 | int(5) |  |  | event |  |
| round | ラウンド | int(2) |  |  | round |  |
| member | 部員 | int(11) |  |  | member |  |
| del_flag | 削除フラッグ | bool | false |  |  |  |

# competitionテーブル
| キー名 | 目的 | 型 | デフォルト | 主キー | 外部キー |  |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|  |
| id | 主キー | int(11) |  | ◯ |  | auto_increment |
| competition | 試合名 | varchar |  |  |  |  |
| place | 場所 | varchar |  |  |  |  |
| start | 開始日 | date |  |  |  |  |
| end | 終了日 | date |  |  |  |  |
| del_flag | 削除フラッグ | bool | false |  |  |  |

# memberテーブル
| キー名 | 目的 | 型 | デフォルト | 主キー | 外部キー |  |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| id | 主キー | int(11) |  | ◯ |  | auto_increment |
| name1 | 姓 | varchar |  |  |  |  |
| name2 | 名 | varchar |  |  |  |  |
| phonetic1 | 姓（ふりがな） | varchar |  |  |  |  |
| phonetic2 | 名（ふりがな） | varchar |  |  |  |  |
| sex | 性別 | enum('男子', '女子') | '男子' |  |  |  |
| grade | 学年 | int(3) |  |  |  |  |
| degree | 学位 | varchar |  |  |  |  |
| expert | 専門 | varchar |  |  |  |  |
| graduate | 出身高校 | varchar |  |  |  |  |
| position | 幹部役職 | varchar |  |  |  |  |
| image | 顔写真 | mediumblob | NULL |  |  |  |
| del_flag | 削除フラッグ | bool | false |  |  |  |

# eventテーブル
| キー名 | 目的 | 型 | デフォルト | 主キー | 外部キー |  |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| id | 主キー | int(5) |  | ◯ |  | auto_increment |
| event | 種目名 | varchar |  |  |  |  |
| sex | 性別 | enum('男子', '女子') | '男子' |  |  |  |
| record | 歴代記録に残すか | bool | false |  |  |  |
| order | 並び順 | int(5) |  |  |  |  |
| relay_flag | リレーフラッグ | bool | false |  |  |  |
| conbined_flag | 混成フラッグ | bool | false |  |  |  |

# roundテーブル
| キー名 | 目的 | 型 | デフォルト | 主キー | 外部キー |  |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| id | 主キー | int(2) |  | ◯ |  | auto_increment |
| round | ラウンド名 | varchar |  |  |  |  |
| order | 並び順 | int(2) |  |  |  |  |

# relayテーブル
| キー名 | 目的 | 型 | デフォルト | 主キー | 外部キー |  |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| result | 主キー | int(11) |  | ◯ | result |  |
| team | チーム名 | varchar | '和歌山大' |  |  |  |

# relay_memberテーブル
| キー名 | 目的 | 型 | デフォルト | 主キー | 外部キー |  |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| result | 主キー | int(11) |  | ◯ | result |  |
| order | 走順 | int(2) |  |  |  |  |
| belong | 所属 | varchar | '和歌山大' |  |  |  |
| member | 選手（和大所属の場合） | int(2) | NULL |  | member |  |
| name | 選手名(和大以外の所属の場合) | varchar | NULL |  |  |  |
| amount_record | 通過タイム | varchar | NULL |  |  |  |
| section_record | 区間タイム | varchar | NULL |  |  |  |

# combinedテーブル
| キー名 | 目的 | 型 | デフォルト | 主キー | 外部キー |  |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| result | 主キー | int(11) |  | ◯ | result |  |
| score | 点数 | int(3) | 0 |  |  |  |
| parent | 親result | int(11) |  |  |  |  |

# specialテーブル
| キー名 | 目的 | 型 | デフォルト | 主キー | 外部キー |  |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| id | 主キー | int(5) |  | ◯ |  | auto_increment |
| special | ページ名 | varchar |  |  |  |  |
| order | 並び順 | int(5) |  |  |  |  |
| display | 表示 | bool | false |  |  |  |
| del_flag | 削除フラッグ | bool | false |  |  |  |

# linkテーブル
| キー名 | 目的 | 型 | デフォルト | 主キー | 外部キー |  |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| id | 主キー | int(5) |  | ◯ |  | auto_increment |
| link | サイト名 | varchar |  |  |  |  |
| url | リンク先URL | varchar | NULL |  |  |  |
| category | カテゴリー | int(2) | false |  | link_category |  |
| del_flag | 削除フラッグ | bool | false |  |  |  |

# administratorテーブル
| キー名 | 目的 | 型 | デフォルト | 主キー | 外部キー |  |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| id | 主キー | int(3) |  | ◯ |  | auto_increment |
| member | 部員 | int(11) |  |  | member |  |
| mail | メールアドレス | varchar |  |  |  |  |

# link_categoryテーブル
| キー名 | 目的 | 型 | デフォルト | 主キー | 外部キー |  |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| id | 主キー | int(2) |  | ◯ |  | auto_increment |
| category | カテゴリー名 | varchar |  |  |  |  |
| order | メールアドレス | int(2) |  |  |  |  |
