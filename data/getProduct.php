<?php
$username = "root";
$password = "root";
$hostname = "localhost";
$dbhandle = mysql_connect($hostname, $username, $password)
 or die("Unable to connect to MySQL");
$selected = mysql_select_db("Shop",$dbhandle)
  or die("Could not select shop");
$id = $_GET["id"];
$result = mysql_query(" SELECT * FROM Products WHERE Id = $id");
$jsonData = array();
  while ($res = mysql_fetch_object($result)) {
  $jsonData[] = $res;
  }
echo json_encode($jsonData, true);
mysql_close($dbhandle);
