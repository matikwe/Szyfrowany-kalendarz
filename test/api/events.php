<?php 
include 'DB_connect.php';

session_start();
$userId = $_SESSION['currID'];


$_POST = json_decode(file_get_contents('php://input'), true);

$allDay = 1;

$data = new DB_connect('calendar');

$password = $data->getHandle()->query('SELECT * FROM user WHERE user_id="'.$userId.'"');

 foreach($password as $item){
	$currPassword = $item['password'];
 }

$title = encrypt_decrypt($_POST['title'], $currPassword, "encrypt");
$start = encrypt_decrypt($_POST['start'], $currPassword, "encrypt");
$end = encrypt_decrypt($_POST['end'], $currPassword, "encrypt");

$addEvents = $data->getHandle()->query('INSERT INTO wydarzenia(title, start, end ,iduser) 
    values("'.$title.'", "'.$start.'", "'.$end.'", '.$userId.')');

$lastID = $data->getHandle()->query('SELECT id FROM wydarzenia WHERE id=(SELECT max(id) FROM wydarzenia);');    

foreach($lastID as $item){
    if(count($item) <= 0){
        $lastIDValue = 0;
    }else{
        $lastIDValue = $item['id'];
    }
}

//lastIDValue to ostatnio dodane ID do bazy




echo json_encode($lastIDValue);


function encrypt_decrypt($string, $secret_key, $action)
{
    $encrypt_method = "AES-256-CBC";
    $secret_iv = '5fgf5HJ5g27'; // user define secret key
    $key = hash('sha256', $secret_key);
    $iv = substr(hash('sha256', $secret_iv), 0, 16); // sha256 is hash_hmac_algo
    if ($action == 'encrypt') {
        $output = openssl_encrypt($string, $encrypt_method, $key, 0, $iv);
        $output = base64_encode($output);
    } else if ($action == 'decrypt') {
        $output = openssl_decrypt(base64_decode($string), $encrypt_method, $key, 0, $iv);
    }
    return $output;
}
 ?>
