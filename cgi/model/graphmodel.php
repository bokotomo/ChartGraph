<?php
//multiple search
$SearchTextArr2 = array(
  array("title"=>"総アクセス数",
    "child"=>array(
      array("title"=>"チュートリアル完了(ニックネーム登録)","wheresql"=>"tag = 1"),
      array("title"=>"インターステシャル(すごろく外)","wheresql"=>"tag = 2"),
      array("title"=>"インターステシャル(すごろく内)","wheresql"=>"tag = 3"),
      array("title"=>"フッター","wheresql"=>"adcode = 1"),
      array("title"=>"フッターネイティブ","wheresql"=>"adcode = 2"),
      array("title"=>"掲示板(imp、スクロール後加算)","wheresql"=>"adcode = 3"),
      array("title"=>"プレゼントボックス(今は止めている)","wheresql"=>"type = 1"),
      array("title"=>"応募ページ(2imp)","wheresql"=>"type = 2"),
      array("title"=>"3倍ボーナス(動画)","wheresql"=>"type = 3"),
      array("title"=>"すごろく開始数","wheresql"=>"type = 4")
    ))
);

$SearchTextArr = array(
  array("title"=>"総アクセス数","wheresql"=>""),
  array("title"=>"チュートリアル完了(ニックネーム登録)","wheresql"=>"tag = 1"),
  array("title"=>"インターステシャル(すごろく外)","wheresql"=>"tag = 2"),
  array("title"=>"インターステシャル(すごろく内)","wheresql"=>"tag = 3"),
  array("title"=>"フッター","wheresql"=>"adcode = 1"),
  array("title"=>"フッターネイティブ","wheresql"=>"adcode = 2"),
  array("title"=>"掲示板(imp、スクロール後加算)","wheresql"=>"adcode = 3"),
  array("title"=>"プレゼントボックス(今は止めている)","wheresql"=>"type = 1"),
  array("title"=>"応募ページ(2imp)","wheresql"=>"type = 2"),
  array("title"=>"3倍ボーナス(動画)","wheresql"=>"type = 3"),
  array("title"=>"すごろく開始数","wheresql"=>"type = 4")
);

//AND_(A_OR_B) search
$CheckBoxArr = array(
  array("title"=>"iOS", "flag"=>true, "wheresql"=>"terminal = 1"),
  array("title"=>"Android", "flag"=>false, "wheresql"=>"terminal = 2"),
  array("title"=>"web_iOS", "flag"=>true, "wheresql"=>"terminal = 3"),
  array("title"=>"web_Android", "flag"=>false, "wheresql"=>"terminal = 4")
);

$MenuBarArr = array(
  array("title"=>"日間", "id"=>"d", "flag"=>false),
  array("title"=>"週間", "id"=>"w", "flag"=>false),
  array("title"=>"月間", "id"=>"m", "flag"=>false),
  array("title"=>"年間", "id"=>"y", "flag"=>true)
);

$SeachTableArr = array(
  array("tablename"=>"count_tag", "groupdatecolomn"=>"registration_date"),
  array("tablename"=>"count_tag2", "groupdatecolomn"=>"registration_date")
);