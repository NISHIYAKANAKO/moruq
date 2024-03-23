<?php
//1. POSTデータ取得
$username = $_POST["username"];
$email = $_POST["email"];

//2. DB接続します(エラー処理追加)
include("funcs.php");
$pdo = db_conn();

//３．データ登録SQL作成
$stmt = $pdo->prepare("INSERT INTO gs_an_table( username, email)VALUES(:username, :email, :sysdate())");
$stmt->bindValue(':username', $username);
$stmt->bindValue(':email', $email);
$status = $stmt->execute();

//４．データ登録処理後
if($status==false){
  echo "false";
}else{
  echo "true";
}
?>
