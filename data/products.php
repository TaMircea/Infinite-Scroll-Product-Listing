<?php
$username = "root";
$password = "root";
$hostname = "localhost"; 


//connection to the database
$dbhandle = mysql_connect($hostname, $username, $password) 
 or die("Unable to connect to MySQL");

//select a database to work with
$selected = mysql_select_db("Shop",$dbhandle) 
  or die("Could not select shop");

//execute the SQL query and return records
$result = mysql_query(" SELECT name, price, picture FROM Products  ");


//fetch tha data from the database 
	
	$jsonData = array();
	while ($res = mysql_fetch_object($result)) {
    	


    	$cats = mysql_query("SELECT Catname as category FROM Categories");

    	$jsonCategories = array();

    	while ($cat=mysql_fetch_assoc($cats)) {
    		$jsonCategories[]=$cat['category'];	
    	}

    	$res["categoriesRaw"] = $jsonCategories;
    	$jsonData[] = $res;
	
	}
	echo json_encode($jsonData, true);


//close the connection
mysql_close($dbhandle);

//SELECT Products.Name, Categories.Name FROM Products INNER JOIN ProductCategories ON Products.Id=ProductCategories.ProductId INNER JOIN Categories ON ProductCategories.CategoryId=Categories.ID WHERE Products.Id=1

?> 
