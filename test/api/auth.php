<?php 
include 'DB_connect.php';
session_start();



$_POST = json_decode(file_get_contents('php://input'), true);
if(isset($_POST) && !empty($_POST)){
    $username = $_POST['username'];
    $password = $_POST['password'];
    $currID;
    $currLogin=false;
    $currPassword=false;

    $data = new DB_connect('calendar');

    $query = $data->getHandle()->query(sprintf("SELECT * FROM user WHERE login=\"%s\" AND password=\"%s\" ", $username, $password));

    foreach($query as $item){
        $currID = $item['user_id'];
        $currLogin = $item['login'];
        $currPassword = $item['password'];
    }
    if($username == $currLogin && $password == $currPassword){
        $_SESSION['currID'] = $currID;
        //echo json_encode($currID);
?>
{
    "success":true,
    "secret": "This is the secret no one knows but the admin"
}
<?php }else{
    ?>
    {
        "success": false,
        "message": "Nie prawidłowe dane"
    }
    <?php }
}else{
    ?>
    {
        "success":false,
        "message": "Only POST access accepted"
    }
    <?php
} ?>
