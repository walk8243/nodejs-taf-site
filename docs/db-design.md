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
| link_category | 他サイトへのリンクのカテゴリー |
| image | サイト全体で使用出来る画像 |
| constant | 定数 |


# resultテーブル
| キー名 | 目的 | 型 | デフォルト | 主キー | 外部キー |  |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| id | 主キー | int(11) |  | ◯ |  | NOT NULL, auto_increment |
| result | 結果 | varchar |  |  |  |  |
| competition | 試合 | int(11) |  |  | competition |  |
| event | 種目 | int(5) |  |  | event |  |
| round | ラウンド | int(2) |  |  | round |  |
| member | 部員 | int(11) |  |  | member |  |
| del_flag | 削除フラッグ | bool | false |  |  |  |

# competitionテーブル
| キー名 | 目的 | 型 | デフォルト | 主キー | 外部キー |  |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|  |
| id | 主キー | int(11) |  | ◯ |  | NOT NULL, auto_increment |
| competition | 試合名 | varchar |  |  |  |  |
| place | 場所 | varchar |  |  |  |  |
| start | 開始日 | date |  |  |  |  |
| end | 終了日 | date | '0000-00-00' |  |  |  |
| del_flag | 削除フラッグ | bool | false |  |  |  |

# memberテーブル
| キー名 | 目的 | 型 | デフォルト | 主キー | 外部キー |  |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| id | 主キー | int(11) |  | ◯ |  | NOT NULL, auto_increment |
| name1 | 姓 | varchar |  |  |  |  |
| name2 | 名 | varchar |  |  |  |  |
| phonetic1 | 姓（ふりがな） | varchar |  |  |  |  |
| phonetic2 | 名（ふりがな） | varchar |  |  |  |  |
| sex | 性別 | enum('男子', '女子') | '男子' |  |  |  |
| grade | 学年 | int(3) |  |  |  |  |
| degree | 学位 | enum('学位', '修士', '博士') | '学位' |  |  |  |
| expert | 専門 | varchar |  |  |  |  |
| graduate | 出身高校 | varchar |  |  |  |  |
| position | 幹部役職 | varchar | NULL |  |  |  |
| image | 顔写真 | mediumblob | NULL |  |  |  |
| del_flag | 削除フラッグ | bool | false |  |  |  |

# eventテーブル
| キー名 | 目的 | 型 | デフォルト | 主キー | 外部キー |  |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| id | 主キー | int(5) |  | ◯ |  | NOT NULL, auto_increment |
| event | 種目名 | varchar |  |  |  |  |
| sex | 性別 | enum('男子', '女子') | '男子' |  |  |  |
| record | 歴代記録に残すか | bool | false |  |  |  |
| order | 並び順 | int(5) |  |  |  |  |
| relay_flag | リレーフラッグ | bool | false |  |  |  |
| conbined_flag | 混成フラッグ | bool | false |  |  |  |

# roundテーブル
| キー名 | 目的 | 型 | デフォルト | 主キー | 外部キー |  |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| id | 主キー | int(2) |  | ◯ |  | NOT NULL, auto_increment |
| round | ラウンド名 | varchar |  |  |  |  |
| order | 並び順 | int(2) |  |  |  |  |

# relayテーブル
| キー名 | 目的 | 型 | デフォルト | 主キー | 外部キー |  |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| result | 主キー | int(11) |  | ◯ | result | NOT NULL |
| team | チーム名 | varchar | '和歌山大' |  |  |  |

# relay_memberテーブル
| キー名 | 目的 | 型 | デフォルト | 主キー | 外部キー |  |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| result | 主キー | int(11) |  | ◯ | result | NOT NULL |
| order | 走順 | int(2) |  |  |  |  |
| belong | 所属 | varchar | '和歌山大' |  |  |  |
| member | 選手（和大所属の場合） | int(2) | NULL |  | member |  |
| name | 選手名(和大以外の所属の場合) | varchar | NULL |  |  |  |
| amount_record | 通過タイム | varchar | NULL |  |  |  |
| section_record | 区間タイム | varchar | NULL |  |  |  |

# combinedテーブル
| キー名 | 目的 | 型 | デフォルト | 主キー | 外部キー |  |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| result | 主キー | int(11) |  | ◯ | result | NOT NULL |
| score | 点数 | int(3) | 0 |  |  |  |
| parent | 親result | int(11) |  |  |  | NOT NULL |

# specialテーブル
| キー名 | 目的 | 型 | デフォルト | 主キー | 外部キー |  |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| id | 主キー | int(5) |  | ◯ |  | NOT NULL, auto_increment |
| special | ページ名 | varchar |  |  |  |  |
| order | 並び順 | int(5) |  |  |  |  |
| display | 表示 | bool | false |  |  |  |
| del_flag | 削除フラッグ | bool | false |  |  |  |

# linkテーブル
| キー名 | 目的 | 型 | デフォルト | 主キー | 外部キー |  |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| id | 主キー | int(5) |  | ◯ |  | NOT NULL, auto_increment |
| link | サイト名 | varchar |  |  |  |  |
| url | リンク先URL | varchar | NULL |  |  |  |
| category | カテゴリー | int(2) | false |  | link_category |  |
| del_flag | 削除フラッグ | bool | false |  |  |  |

# link_categoryテーブル
| キー名 | 目的 | 型 | デフォルト | 主キー | 外部キー |  |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| id | 主キー | int(2) |  | ◯ |  | NOT NULL, auto_increment |
| category | カテゴリー名 | varchar |  |  |  |  |
| order | 並び順 | int(2) |  |  |  |  |

# imageテーブル
| キー名 | 目的 | 型 | デフォルト | 主キー | 外部キー |  |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| id | 主キー | int(11) |  | ◯ |  | NOT NULL, auto_increment |
| image | 画像 | mediumblob |  |  |  | NOT NULL |
| unique_string | 識別文字列 | varchar(32) |  |  |  | NOT NULL |

# constantテーブル
| キー名 | 目的 | 型 | デフォルト | 主キー | 外部キー |  |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| id | 主キー | int(11) |  | ◯ |  | NOT NULL, auto_increment |
| index | 変数名 | varchar(32) |  |  |  | UNIQUE KEY, NOT NULL |
| value | 値 | varchar |  |  |  |  |
| comment | 説明 | varchar | NULL |  |  |  |


# 初期DB
## eventテーブル
| event | sex | record | order | relay_flag | conbined_flag |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 100m | '男子' | true | 1 | false | false |
| 100m | '女子' | true | 2 | false | false |
| 200m | '男子' | true | 3 | false | false |
| 200m | '女子' | true | 4 | false | false |
| 400m | '男子' | true | 5 | false | false |
| 400m | '女子' | true | 6 | false | false |
| 800m | '男子' | true | 7 | false | false |
| 800m | '女子' | true | 8 | false | false |
| 1500m | '男子' | true | 9 | false | false |
| 1500m | '女子' | true | 10 | false | false |
| 3000m | '男子' | true | 11 | false | false |
| 3000m | '女子' | true | 12 | false | false |
| 5000m | '男子' | true | 13 | false | false |
| 5000m | '女子' | true | 14 | false | false |
| 10000m | '男子' | true | 15 | false | false |
| 10000m | '女子' | true | 16 | false | false |
| 110mH | '男子' | true | 17 | false | false |
| 100mH | '女子' | true | 18 | false | false |
| 400mH | '男子' | true | 19 | false | false |
| 400mH | '女子' | true | 20 | false | false |
| 3000mSC | '男子' | true | 21 | false | false |
| 3000mSC | '女子' | true | 22 | false | false |
| 4×100mR | '男子' | true | 23 | true | false |
| 4×100mR | '女子' | true | 24 | true | false |
| 4×400mR | '男子' | true | 25 | true | false |
| 4×400mR | '女子' | true | 26 | true | false |
| スウェーデンR | '男子' | true | 27 | true | false |
| 3000mW | '男子' | false | 28 | false | false |
| 3000mW | '女子' | true | 29 | false | false |
| 5000mW | '男子' | true | 30 | false | false |
| 5000mW | '女子' | true | 31 | false | false |
| 10000mW | '男子' | true | 32 | false | false |
| 10000mW | '女子' | true | 33 | false | false |
| 走高跳 | '男子' | true | 34 | false | false |
| 走高跳 | '女子' | true | 35 | false | false |
| 棒高跳 | '男子' | true | 36 | false | false |
| 棒高跳 | '女子' | true | 37 | false | false |
| 走幅跳 | '男子' | true | 38 | false | false |
| 走幅跳 | '女子' | true | 39 | false | false |
| 三段跳 | '男子' | true | 40 | false | false |
| 三段跳 | '女子' | true | 41 | false | false |
| 砲丸投 | '男子' | true | 42 | false | false |
| 砲丸投 | '女子' | true | 43 | false | false |
| 円盤投 | '男子' | true | 44 | false | false |
| 円盤投 | '女子' | true | 45 | false | false |
| ハンマー投 | '男子' | true | 46 | false | false |
| ハンマー投 | '女子' | true | 47 | false | false |
| やり投 | '男子' | true | 48 | false | false |
| やり投 | '女子' | true | 49 | false | false |
| 五種競技 | '男子' | true | 50 | false | true |
| 七種競技 | '女子' | true | 51 | false | true |
| 八種競技 | '男子' | false | 52 | false | true |
| 十種競技 | '男子' | true | 53 | false | true |
| ハーフマラソン | '男子' | true | 54 | false | false |
| ハーフマラソン | '女子' | true | 55 | false | false |
| マラソン | '男子' | true | 56 | false | false |
| マラソン | '女子' | true | 57 | false | false |
| 10km | '男子' | false | 58 | false | false |
| 10km | '女子' | false | 59 | false | false |
| 10マイル | '男子' | false | 60 | false | false |
| 10マイル | '女子' | false | 61 | false | false |
| 20km | '男子' | false | 62 | false | false |
| 20km | '女子' | false | 63 | false | false |
| 30km | '男子' | false | 64 | false | false |
| 30km | '女子' | false | 65 | false | false |
| 100km | '男子' | false | 66 | false | false |
| 100km | '女子' | false | 67 | false | false |
| 10kmW | '男子' | false | 68 | false | false |
| 10kmW | '女子' | true | 69 | false | false |
| 20kmW | '男子' | true | 70 | false | false |
| 20kmW | '女子' | true | 71 | false | false |
| 50kmW | '男子' | true | 72 | false | false |
| 駅伝 | '男子' | false | 73 | false | false |
| 駅伝 | '女子' | false | 74 | false | false |

## constantテーブル
| index | value | comment |
|:---:|:---:|:---:|
| admin_member | NULL | 管理者（member_id） |
| admin_mail | NULL | 管理者メールアドレス |
