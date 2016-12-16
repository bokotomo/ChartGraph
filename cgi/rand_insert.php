<?php
/*
CREATE TABLE IF NOT EXISTS `count_tag` (
  `uid` bigint(20) unsigned NOT NULL,
  `tag` varchar(255) CHARACTER SET utf8 NOT NULL,
  `adcode` varchar(255) CHARACTER SET utf8 NOT NULL,
  `type` varchar(255) CHARACTER SET utf8 NOT NULL,
  `registration_date` varchar(255) CHARACTER SET utf8 NOT NULL,
  `created_at` datetime NOT NULL,
  KEY `uid_idx` (`uid`),
  KEY `tag_adcode_type_registration_date_idx` (`tag`,`adcode`,`type`,`registration_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;  
*/
header('Access-Control-Allow-Origin: *');
require_once("lib.php");
$pdo = connect_pdo();

$chart_data = array();
for($i=1;$i<=15000;$i++){
	$y = sprintf("%d",rand(2015,2016));
	$m = sprintf("%02d",rand(1,12));
	$d = sprintf("%02d",rand(1,31));
	$h = sprintf("%02d",rand(0,23));
	$s = sprintf("%02d",rand(0,59));
	$t = sprintf("%02d",rand(0,59));
	$terminal = rand(1,4);
	
  $tag = 0;
	$adcode = 0;
	$type = 0;
	$randid = rand(1,11);
	if($randid >= 1 && $randid <= 3){
	  $tag = sprintf("%d",rand(1,3));
	}else if($randid >= 4 && $randid <= 6){
	  $adcode = sprintf("%d",rand(1,3));
	}else if($randid >= 7 && $randid <= 10){
	  $type = sprintf("%d",rand(1,4));
	}
	$date = "{$y}/{$m}/{$d} {$h}:{$s}:{$t}";
	$uid = $i;
	
/*
$stmt = $pdo -> prepare("INSERT INTO count_tag (uid, tag, adcode, type, terminal, registration_date) VALUES (:uid, :tag, :adcode, :type, :terminal, :registration_date)");
$stmt->bindParam(':uid', $uid, PDO::PARAM_INT);
$stmt->bindParam(':tag', $tag, PDO::PARAM_STR);
$stmt->bindParam(':adcode', $adcode, PDO::PARAM_STR);
$stmt->bindParam(':type', $type, PDO::PARAM_STR);
$stmt->bindParam(':terminal', $terminal, PDO::PARAM_STR);
$stmt->bindParam(':registration_date', $date, PDO::PARAM_STR);
$stmt->execute();
*/

	array_push($chart_data, array("uid"=>$uid,"tag"=>$tag,"adcode"=>$adcode,"type"=>$type,"registration_date"=>$date,"terminal"=>$terminal));
}

foreach($chart_data as $v){
  print_r($v);
  echo "<hr>";
}

echo json_encode($_POST);