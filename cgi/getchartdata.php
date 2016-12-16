<?php
header('Access-Control-Allow-Origin: *');
require_once("lib.php");
require_once("model/graphmodel.php");

$daytype_arr = val_check_empty_default($_POST["daytype"]);
$get_date = val_check_empty_default($_POST["date"]);
$get_date_start = val_check_empty_default($_POST["date_start"]);
$getSearchMenuIds = val_check_empty_default($_POST["searchids"]);
$getSearchMenuIds = json_decode($getSearchMenuIds);
$getCheckMenuIds_str = val_check_empty_default($_POST["checkids"]);
$getCheckMenuIds = json_decode($getCheckMenuIds_str);
$ca_y = date("Y",strtotime($get_date));
$ca_n = date("n",strtotime($get_date));
$ca_j = date("j",strtotime($get_date));
$ca_m = (string)date("m",strtotime($get_date));
$ca_d = (string)date("d",strtotime($get_date));
$ts="";

if(empty($get_date)){
  $ca_y = date("Y");
  $ca_n = date("n");
  $ca_j = date("j");
  $ca_m = (string)date("m");
  $ca_d = (string)date("d");
}

//pdo初期化
$pdo = connect_pdo();

//グラフのデータ
$chart_data = array();
$SearchTextTmpArr = convertChildArr();

if($daytype_arr == "m"){
  //月間で検索

  //zero padding
  $last_day = (int)date('t', strtotime($get_date));
  for($i=1;$i<=$last_day;$i++){
    $chart_data[$i][0] = "{$i}";
    for($j=1;$j<=count($getSearchMenuIds);$j++){
      $chart_data[$i][$j] = 0;
    }
  }

  //search each searchmenu type
  for($i=1;$i<=count($getSearchMenuIds);$i++){
    for($j=0;$j<count($SeachTableArr);$j++){
      $stmt = $pdo->query( getSearchSql( $getSearchMenuIds[$i - 1] , $daytype_arr , $j ) );
      while($row = $stmt -> fetch(PDO::FETCH_ASSOC)) {
        $index = (int)date("j", strtotime($row["date"]));
        $chart_data[$index][$i] += (int)$row["num"];
      }
    }
  }

}else if($daytype_arr == "y"){
  //年間で検索

  //zero padding
  for($i=0;$i<12;$i++){
    $chart_data[$i][0] = "".($i + 1)."";
    for($j=1;$j<=count($getSearchMenuIds);$j++){
      $chart_data[$i][$j] = 0;
    }
  }

  //search each searchmenu type
  for($i=1;$i<=count($getSearchMenuIds);$i++){
    for($j=0;$j<count($SeachTableArr);$j++){
      $stmt = $pdo->query( getSearchSql( $getSearchMenuIds[$i - 1] , $daytype_arr , $j ) );
      while($row = $stmt -> fetch(PDO::FETCH_ASSOC)) {
        $index = (int)date("n", strtotime($row["date"]));
        $chart_data[$index - 1][$i] += (int)$row["num"];
      }
    }
  }

}else if($daytype_arr == "d"){
  //日間で検索

  //zero padding
  for($i=0;$i<=23;$i++){
    $chart_data[$i][0] = "{$i}";
    for($j=1;$j<=count($getSearchMenuIds);$j++){
      $chart_data[$i][$j] = 0;
    }
  }

  //search each searchmenu type
  for($i=1;$i<=count($getSearchMenuIds);$i++){
    for($j=0;$j<count($SeachTableArr);$j++){
      $stmt = $pdo->query( getSearchSql( $getSearchMenuIds[$i - 1] , $daytype_arr , $j ) );
      while($row = $stmt -> fetch(PDO::FETCH_ASSOC)) {
        $index = (int)date("G", strtotime($row["date"]));
        $chart_data[$index][$i] += (int)$row["num"];
      }
    }
  }
  
}else if($daytype_arr == "w"){
  //週間で検索

  //zero padding
  for($i=0;$i<7;$i++){
    $ca_d_week = date("Y-m-d",strtotime($get_date." -{$i} days")); 
    $chart_data[$i][0] = "{$ca_d_week}";
    for($j=1;$j<=count($getSearchMenuIds);$j++){
      $chart_data[$i][$j] = 0;
    }
  }

  //search each searchmenu type
  for($i=1;$i<=count($getSearchMenuIds);$i++){
    for($j=0;$j<count($SeachTableArr);$j++){
      $c=0;
      $stmt = $pdo->query( getSearchSql( $getSearchMenuIds[$i - 1] , $daytype_arr , $j ) );
      while($row = $stmt -> fetch(PDO::FETCH_ASSOC)) {
        $chart_data[$c][$i] += (int)$row["num"];
        $c++;
      }
    }
  }

}else if($daytype_arr == "p"){
  //指定した範囲で検索

  //期間の日数
  $daydiff = (int)(strtotime($get_date) - strtotime($get_date_start))/(24*3600) + 1;

  //zero padding
  for($i=0;$i<$daydiff;$i++){
    $ca_d_week = date("Y-m-d",strtotime($get_date." -{$i} days")); 
    $chart_data[$i][0] = "{$ca_d_week}";
    for($j=1;$j<=count($getSearchMenuIds);$j++){
      $chart_data[$i][$j] = 0;
    }
  }

  //search each searchmenu type
  for($i=1;$i<=count($getSearchMenuIds);$i++){
    for($j=0;$j<count($SeachTableArr);$j++){
      $stmt = $pdo->query( getSearchSql( $getSearchMenuIds[$i - 1] , $daytype_arr , $j ) );
      while($row = $stmt -> fetch(PDO::FETCH_ASSOC)) {
        $datestr = date("Y-m-d", strtotime($row["date"]));
        
        //dateを検索してそのindexに数値を代入
        for($k=0;$k<$daydiff;$k++){
          if($datestr == $chart_data[$k][0]){
            $chart_data[$k][$i] += (int)$row["num"];
          }
        }
      }
    }
  }
  
}

//date_sort_asc
$chart_data = sortChart($chart_data);
//$chart_data = array();
// /array_push($chart_data, $ts);
echo json_encode($chart_data);

function getSearchSql($menuindex,$daytype,$tableindex){
  global $get_date,$ca_y,$ca_n,$ca_j,$ca_m,$ca_d,$get_date_start,$ts,$SeachTableArr;
  $TableGroupDateColomn = $SeachTableArr[$tableindex]["groupdatecolomn"];
  $TableNameColomn = $SeachTableArr[$tableindex]["tablename"];
  
  if($daytype == "d"){
    //日でグループ化して検索
    
    $groupby = "DATE_FORMAT({$TableGroupDateColomn}, '%Y%m%d%H')";
    $datewhere = "DATE_FORMAT({$TableGroupDateColomn}, '%Y-%m-%d') = '{$ca_y}-{$ca_m}-{$ca_d}'";
    
  }else if($daytype == "w"){
    //週でグループ化して検索
    
    $ca_d_week = date("Y-m-d",strtotime("{$get_date} -7 days"));
    $groupby = "DATE_FORMAT({$TableGroupDateColomn}, '%Y%m%d')";
    $datewhere = "DATE_FORMAT({$TableGroupDateColomn}, '%Y-%m-%d') > '{$ca_d_week}' AND DATE_FORMAT({$TableGroupDateColomn}, '%Y-%m-%d') <= '{$ca_y}-{$ca_m}-{$ca_d}'";

  }else if($daytype == "m"){
    //月でグループ化して検索
    
    $groupby = "DATE_FORMAT({$TableGroupDateColomn}, '%Y%m%d')";
    $datewhere = "DATE_FORMAT({$TableGroupDateColomn}, '%Y-%m') = '{$ca_y}-{$ca_m}'";
  }else if($daytype == "y"){
    //年でグループ化して検索
    
    $groupby = "DATE_FORMAT({$TableGroupDateColomn}, '%Y%m')";
    $datewhere = "DATE_FORMAT({$TableGroupDateColomn}, '%Y') = '{$ca_y}'";
    
  }else if($daytype == "p"){
    //指定期間でグループ化して検索
    
    $ca_s_y = date("Y",strtotime($get_date_start));
    $ca_s_m = date("m",strtotime($get_date_start));
    $ca_s_d = date("d",strtotime($get_date_start));
    $groupby = "DATE_FORMAT({$TableGroupDateColomn}, '%Y%m%d')";
    $datewhere = "DATE_FORMAT({$TableGroupDateColomn}, '%Y-%m-%d') >= '{$ca_s_y}-{$ca_s_m}-{$ca_s_d}' AND DATE_FORMAT({$TableGroupDateColomn}, '%Y-%m-%d') <= '{$ca_y}-{$ca_m}-{$ca_d}'";

  }

  $Searchtextwhere = searchtextWhere($menuindex);
  $checkboxwhere = checkBoxWhere();
  $SqlStr = "SELECT COUNT({$TableGroupDateColomn}) as num , {$TableGroupDateColomn} as date FROM {$TableNameColomn} WHERE {$checkboxwhere} {$Searchtextwhere} {$datewhere} GROUP BY {$groupby}";
    
  //$ts=$SqlStr;
  return $SqlStr;
}

function searchtextWhere($menuindex){
  global $SearchTextArr;
  $sql = "";

  if( array_key_exists("child",$SearchTextArr[$menuindex]) ){
    
  }else{
    if(!empty($SearchTextArr[$menuindex]["wheresql"])){
      $sql = "(".$SearchTextArr[$menuindex]["wheresql"].") AND ";
    }
  }
  return $sql;
}

function checkBoxWhere(){
  global $getCheckMenuIds,$CheckBoxArr;
  if(empty($CheckBoxArr)){
    return "";
  }
  
  $sql = "";
  if(!empty($getCheckMenuIds)){
    $sql = "(";
    for($j=0;$j<count($getCheckMenuIds);$j++){
      $sql .= " ".$CheckBoxArr[$getCheckMenuIds[$j]]["wheresql"];
      if($j != count($getCheckMenuIds) - 1){
        $sql .= " OR";
      }
    }
    $sql .= ") AND";
  }else{
    $sql = "false AND";
  }
  return $sql;
}

function convertChildArr($get_arr){
  $arr = array();
  foreach($get_arr as $v){
    if( array_key_exists("child", $v) ){
      array_push($arr, convertChildArr($v));
    }else{
      array_push($arr, $v);
    }
  }
  return $arr;
}

function sortChart($d){
  $t = array();
  foreach($d as $v) {
    array_push($t, $v[0]);
  }
  array_multisort($t, SORT_ASC, $d);
  return $d;
}