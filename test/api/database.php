<?php
session_start();
include 'DB_connect.php';
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
// $_POST = json_decode(file_get_contents('php://input'), true);

$user = $_SESSION['user'];
$userId = $_SESSION['currID'];

// $title = $_POST['title'];
// $start = $_POST['start'];
// $end = $_POST['end'];
// $allDay = $_POST['allDay'];
 

function debug_to_console($data) {
    $output = $data;
    if (is_array($output))
        $output = implode(',', $output);

    echo "<script>console.log('Debug Objects: " . $output . "' );</script>";
}
debug_to_console($user);

$data = new DB_connect('calendar');










// if($user =='admin'){
//     echo  '{
//         "message": "Ta sekretna wiadomośc jest widoczna jedynie dla administratora",
//         "success": true
//     }';
// } else {
//     echo '{
//         "message": "Kim jesteś?",
//         "success": false
//     }';
// }
?>