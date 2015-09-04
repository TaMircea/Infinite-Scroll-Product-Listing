<?php
$username = "root";
$password = "root";
$hostname = "localhost"; 


$dbhandle = mysql_connect($hostname, $username, $password) 
 or die("Unable to connect to MySQL");

$selected = mysql_select_db("Shop",$dbhandle) 
  or die("Could not select shop");


$data = json_decode(file_get_contents("php://input"));

print_r(array_values($data));

mysql_close($dbhandle);

?> 
