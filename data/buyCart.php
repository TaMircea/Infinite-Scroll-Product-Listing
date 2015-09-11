<?php
$username = "root";
$password = "root";
$hostname = "localhost"; 
$database = "Shop";
$conn = new mysqli($hostname, $username, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$newOrder = "INSERT INTO OrdersBig (buyer)
	VALUES ('John')";
$data = json_decode(file_get_contents("php://input"), true);
if ($conn->query($newOrder) === TRUE) {
    echo "POST SUCCESSFUL \r\n";
    $currOrder = mysqli_insert_id($conn);
	foreach ($data as $value){  
		$id = $value['Id'];
		$qInCart = $value['qInCart'];
	    $newOrderLine = "INSERT INTO Orders ( id, productId, quantity) 
	    				 VALUES ('$currOrder','$id','$qInCart')";
	    if ($conn->query($newOrderLine) === TRUE) {
	    }
	    else{
	    	echo "Error: " . $newOrderLine . "<br>" . $conn->error;
	    }
	}
	echo json_encode($data);
} 
else {
    echo "Error: " . $newOrder . "<br>" . $conn->error;
}
$conn->close();


