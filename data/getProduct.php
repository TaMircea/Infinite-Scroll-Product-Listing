<?php
$username = "root";
$password = "root";
$hostname = "localhost";
$database = "Shop";
$conn = new mysqli($hostname, $username, $password, $database);
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }
  $id = $_GET["id"];
  $result = mysqli_query($conn,"SELECT * FROM Products");
  $result->close();
  $conn->close();

