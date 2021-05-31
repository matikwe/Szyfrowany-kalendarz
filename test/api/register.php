<?php 
include 'DB_connect.php';
session_start();

$_POST = json_decode(file_get_contents('php://input'), true);

if(!empty($_POST['email']) && !empty($_POST['username']) && !empty($_POST['email'])){

    $email = $_POST['email'];
    $username = $_POST['username'];
    $password = $_POST['password'];

    $data = new DB_connect('calendar');
    $verification = $data->getHandle()->query(sprintf("SELECT * FROM user 
    WHERE login=\"%s\" OR email=\"%s\" ", $username, $email));

    $repeatingData = 0;

    foreach($verification as $item)
    {
        $repeatingData++;
    }

    //email lub login istnieje
    if($repeatingData > 0)
    {
        ?>
        {
            "success":false,
            "message": "Konto o podanych danych już istnieje"
        }
        <?php
    }else{
      //dobre dane  
      $passHash = password_hash($password, PASSWORD_DEFAULT);


    //   $query = $database->getHandle()->query('INSERT INTO wydarzenia(iduser) values(321)');
      $addUser = $data->getHandle()->query(sprintf("INSERT INTO user(login, password, email) 
      values(\"%s\", \"%s\", \"%s\")", $username, $passHash, $email));
      ?>
      {
          "success":true,
          "message": "Zarejestrowano konto"
      }
      <?php
    }
    

    
}else{
    ?>
    {
        "success":false,
        "message": "Wpisz wszystkie dane"
    }
    <?php
}