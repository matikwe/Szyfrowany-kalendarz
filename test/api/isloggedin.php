<?php
session_start();

if(isset($SESSION['user'])) {
    echo '{"status": true}';
}else {
    echo '{"status": false}';
}
?>