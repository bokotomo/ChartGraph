//変数初期化
var chart_data = [];
//ドメイン側の指定
var ajax_default_url = "http://tk2-251-35336.vs.sakura.ne.jp/alluser/graph/cgi/";
//グラフで検索するデータを返すCGIの指定
var getchartmodel_url = ajax_default_url + "getchartmodel.php";
//グラフデータを返すCGIの指定
var getchartdata_url = ajax_default_url + "getchartdata.php";
//初期セレクト検索タイプ
var NowDayType = "";
var CurrentDate = new Date();
var GraphTitle = "";
var CalenderSelectBoxArr = [1, 2];
var DayOfTheWeek = ["日","月", "火", "水", "木", "金", "土"];

//グラフの種類
var GraphAllTypeArr = [
  "bars",
  "line",
  "area"
];

var GraphColors = ['#F66A78', '#5C8BE5', '#FEB55C', '#92E98C', '#76DDEC', '#E6E458', '#D98BE2', '#4ED1CD', '#8888E5', '#EA8863', '#D660AB', '#FD75B9', '#F0AAC1','#BFB4A8'];

//検索カラムで選択されてるグラフのタイプの配列
var GraphTypeIndexArr = [0];

//サーチメニューのデータ
var SearchTextArr = [];

//チェックボックスのデータ
var CheckboxTextArr = [];

//メニューバーのデータ
var MenuBarTextArr = [];

//テーブル一覧のデータ
var SearchTableArr = [];

function SelectMenuHtml(id){
  var t = "<div class='ca-column-button-wrapper'>" +
  "<select class='ca-column-button form-control' id ='" + id + "'>";

  if(id != 1){
    t = t + "<option value='0'>選択しない</option>";
  }

  for(var i=0;i<SearchTextArr.length;i++){
    t = t + "<option value='" + (i + 1) + "'>" + SearchTextArr[i] + "</option>";
  }

  t = t + "</select>" +
  "</div>";
  return t;
}

function SelectGraphTypeHtml(id){
  var colmunid = parseInt(CalenderSelectBoxArr.length - 1);
  var t = "<div class='clearfix graph-type-select-area'>" +
  "<div class='graph-type-select-text'>カラム" + colmunid + "</div>" +
  "<select class='form-control graph-type-select' id='" + id + "'>";
  for(var i=0;i<GraphAllTypeArr.length;i++){
    if(GraphTypeIndexArr[colmunid - 1] == i){
      t = t + "<option value='" + i + "' selected>" + GraphAllTypeArr[i] + "</option>";
    }else{
      t = t + "<option value='" + i + "'>" + GraphAllTypeArr[i] + "</option>";
    }
  }

  t = t + "</select>" +
  "</div>";
  return t;
}

google.load('visualization', '1', { packages : [ 'corechart' ]});
//google.setOnLoadCallback(drawChart);