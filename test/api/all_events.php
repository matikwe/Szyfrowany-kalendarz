 <?php
 
 header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
 include 'DB_connect.php';

 session_start();
 $userId = $_SESSION['currID'];
 $data = new DB_connect('calendar');

 $loadAllEvent = $data->getHandle()->query('SELECT * FROM wydarzenia WHERE iduser="'.$userId.'"');

 $password = $data->getHandle()->query('SELECT * FROM user WHERE user_id="'.$userId.'"');

 foreach($password as $item){
	$currPassword = $item['password'];
 }


//  $allData = array();

 $i = 0;
// $allData = [];
 foreach($loadAllEvent as $item)
 {
	$id[$i] = $item['id'];
	$title[$i] = encrypt_decrypt($item['title'], $currPassword, "decrypt");
	$start[$i] = encrypt_decrypt($item['start'], $currPassword, "decrypt");
	$end[$i] = encrypt_decrypt($item['end'], $currPassword, "decrypt");
	$allDay[$i] = 1;
	$userId[$i] = $item['iduser'];

    // $event = new Event($id[i], $title[$i], $start[$i], $end[$i], $allDay[i], $userId[$i]);
	//nie wiem czy dobrze
	$allData[$i] = array($id[$i], $title[$i], $start[$i], $end[$i], $allDay[$i], $userId[$i]);

    // array_push($allData, $event);
    // array_push($allData, $event)
    $i++;
 }
//to tak samo
echo json_encode($allData);

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