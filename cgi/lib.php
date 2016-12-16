<?php
require_once("db.php");

function connect_pdo(){
  global $databaseid,$databasepass,$databasedomain,$databasename;
  
  try {
    $pdo = new PDO('mysql:host='.$databasedomain.';dbname='.$databasename.';charset=utf8',$databaseid,$databasepass,
    array(PDO::ATTR_EMULATE_PREPARES => false));
  } catch (PDOException $e) {
    exit('データベース接続失敗。'.$e->getMessage());
  }
  return $pdo;
}

function val_check_empty_default($val){
  if(!empty($val)){
    $val = htmlspecialchars($val,ENT_QUOTES);
  }else{
    $val = "";
  }
  return $val;
}

//値のissetチェック
function val_check_isset($val){
  if(isset($val)){
    $val = htmlspecialchars($val,ENT_QUOTES);
  }else{
    $val = "";
  }
  return $val;
}