<?php
session_start();
$user = $_SESSION['user'];

if($user =='admin'){
    echo  '{
        "message": "Ta sekretna wiadomośc jest widoczna jedynie dla administratora",
        "success": true
    }';
} else {
    echo '{
        "message": "Kim jesteś?",
        "success": false
    }';
}
?>