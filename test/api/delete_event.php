<?php 

include 'DB_connect.php';

session_start();
$userId = $_SESSION['currID'];


$_POST = json_decode(file_get_contents('php://input'), true);

$data = new DB_connect('calendar');

$id = $_POST['id'];

$deleteEvent = $data->getHandle()->query('DELETE FROM wydarzenia WHERE id="'.$id.'"');
?>