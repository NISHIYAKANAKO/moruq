<?php
$id  = "nina1618";
//ハッシュ化
$lpw = password_hash($id, PASSWORD_DEFAULT);
echo $lpw;

?>