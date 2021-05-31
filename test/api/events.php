<?php 

include 'DB_connect.php';
$_POST = json_decode(file_get_contents('php://input'), true);

$data = new DB_connect('calendar');
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
debug_to_console($userId);



$zapytaj = $database->getHandle()->query('INSERT INTO wydarzenia(title, start, end,allDay,iduser) values("qwe",1,1,false,' . $currID . ')');


?>