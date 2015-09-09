<?php
$username = "root";
$password = "root";
$hostname = "localhost"; 


$dbhandle = mysql_connect($hostname, $username, $password) 
 or die("Unable to connect to MySQL");

$selected = mysql_select_db("Shop",$dbhandle) 
  or die("Could not select shop");

$limit = $_GET["limit"];

$result = mysql_query(" SELECT Id, name, price, picture FROM Products LIMIT $limit, 20 ");
    

	$jsonData = array();
	while ($res = mysql_fetch_object($result)) {
        $curr = $res->Id;    	
        $cats = mysql_query("SELECT Catname as category FROM Categories INNER JOIN ProductCategories 
            ON Categories.ID = ProductCategories.CategoryId INNER JOIN Products ON ProductCategories.ProductId=Products.Id
            WHERE Products.Id = $curr");
        $jsonCategories = array();
        while ($cat=mysql_fetch_assoc($cats)) {
            $jsonCategories[]=$cat['category']; 
        }

        $res->categoriesRaw = $jsonCategories;
    	$jsonData[] = $res;
	}
	echo json_encode($jsonData, true);

mysql_close($dbhandle);
