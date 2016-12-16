<?php
header('Access-Control-Allow-Origin: *');
require_once("model/graphmodel.php");

$result = array();
$result["searchmenu"] = array();
$result["checkboxmenu"] = array();
$result["menubardata"] = array();
$result["searchtabledata"] = array();

foreach($SearchTextArr as $v){
  array_push($result["searchmenu"], $v["title"]);
}
foreach($CheckBoxArr as $v){
  array_push($result["checkboxmenu"], array("title"=>$v["title"],"flag"=>$v["flag"]));
}
foreach($MenuBarArr as $v){
  array_push($result["menubardata"], array("title"=>$v["title"],"flag"=>$v["flag"],"id"=>$v["id"]));
}
foreach($SeachTableArr as $v){
  array_push($result["searchtabledata"], array("tablename"=>$v["tablename"]));
}

echo json_encode($result);

function convertChildArr($get_arr){
  $arr = array();
  foreach($get_arr as $v){
    if( array_key_exists("child", $v) ){
      convertChildArr($v);
    }else{
      array_push($arr2, $v);
    }
  }
  return $arr;
}