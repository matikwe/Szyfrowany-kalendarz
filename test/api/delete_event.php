<?php 

include 'DB_connect.php';

session_start();
$userId = $_SESSION['currID'];


$_POST = json_decode(file_get_contents('php://input'), true);


$data = "Hi".  $_POST['end'];
echo json_encode($data); ?>