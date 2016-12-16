# GoogleChartGraph

![TopImg](http://tk2-251-35336.vs.sakura.ne.jp/alluser/graph/githubimg/githubtop6.png "graph_toppage")

# DEMO
[http://tk2-251-35336.vs.sakura.ne.jp/alluser/graph/](http://tk2-251-35336.vs.sakura.ne.jp/alluser/graph/)

#Graph
・プロダクトの解析が容易にできる。  
・受動的にマイナス面/プラス面/改善面が理解できる。  
・DBから情報を取得できる。    
・アクセス解析、ユーザ解析、UI解析を実装予定

# Getting Started
### js/model/index.js  
<pre><code>var ajax_default_url = "http://tk2-251-35336.vs.sakura.ne.jp/alluser/graph/cgi/";
var getchartmodel_url = ajax_default_url + "getchartmodel.php";
var getchartdata_url = ajax_default_url + "getchartdata.php";
</code></pre>  
getchartmodel_urlをメニュー欄のデータを返すCGIにする必要あり  
getchartdata_urlをグラフデータを返すCGIにする必要あり  

### cgi/model/graphmodel.php  
<pre><code>//左サーチメニュー欄の項目 
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
//チェックボックス欄の項目  
$CheckBoxArr = array(
  array("title"=>"iOS", "flag"=>true, "wheresql"=>"terminal = 1"),
  array("title"=>"Android", "flag"=>false, "wheresql"=>"terminal = 2"),
  array("title"=>"web_iOS", "flag"=>true, "wheresql"=>"terminal = 3"),
  array("title"=>"web_Android", "flag"=>false, "wheresql"=>"terminal = 4")
);
//右メニューの項目  
$MenuBarArr = array(
  array("title"=>"日間", "id"=>"d", "flag"=>false),
  array("title"=>"週間", "id"=>"w", "flag"=>false),
  array("title"=>"月間", "id"=>"m", "flag"=>false),
  array("title"=>"年間", "id"=>"y", "flag"=>true)
);
//検索するDBテーブルの一覧
$SeachTableArr = array(
  array("tablename"=>"count_tag", "groupdatecolomn"=>"registration_date"),
  array("tablename"=>"count_tag2", "groupdatecolomn"=>"registration_date")
);
</code></pre>  


# Using
JQuery  
Ajax  
PHP  
[Google chart api](https://developers.google.com/chart/)  
[Bootstrap](http://getbootstrap.com/)

=====
=====
=====

#今後のGraph
・サービス版は今後ビッグデータとの連携してユーザの性格や傾向を分析する。  

##全体のコード
・jsをライブラリなど使って簡易化する。  
・PHPをさらに必要な分だけMVC化する。  
・現在の「アクセスログ向けグラフ」に加えて、「ユーザデータ解析グラフ」、「UIアクション解析グラフ」、にも対応させる。  
・埋め込みコードを入れると自動的に解析してくれるようにする。  

## アクセス解析
・グラフで詳細を押したら、全メニューの要素を円グラフなどで直感的にわかるようにする。  

## ユーザデータ解析
・ユーザの動きを追えるようにする  
・ユーザの傾向を取得できるようにする  
・ユーザの分類をできるようにする  
・ユーザの全文章とその他情報からユーザの性格を割り出すようにする  
・非離脱ユーザと離脱ユーザとの比較  

## UIアクション解析
・UIに対してのユーザのアクションを直感的にわかるようにする  
・押された回数の多い場所の検出  
・ページからページへの平均移動時間の検出   
・ABテストの結果がわかる   
