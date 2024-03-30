<?php
session_start(); // セッションの開始

$id = $_GET["id"]; // URLパラメータからIDを取得
include("funcs.php"); // データベース接続関数の読み込み
$pdo = db_conn(); // データベース接続
$stmt = $pdo->prepare("SELECT * FROM gs_user_table WHERE id=:id");
$stmt->bindValue(":id", $id, PDO::PARAM_INT);
$status = $stmt->execute();
$row = $stmt->fetch();

//３．データ表示
if($status==false) {
    sql_error($stmt);
}else{
    $row = $stmt->fetch();
}
//4．データ削除
$id = $_GET["id"];
$stmt = $pdo->prepare("DELETE FROM gs_user_table WHERE id=:id");
$stmt->bindValue(':id', $id, PDO::PARAM_INT);
$status = $stmt->execute();
?>

<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>データ更新</title>
  <link href="css/bootstrap.min.css" rel="stylesheet">
  <!-- <style>div{padding: 10px;font-size:16px;}</style> -->
</head>
<body>

<!-- Head[Start] -->
<header>
<form method="POST" action="update.php">
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      ニックネーム:<?= $_SESSION["name"] ?>
      </div>
    </div>
  </nav>
</header>
<!-- Head[End] -->


<!-- Main[Start] -->
<!-- <form method="POST" action="update.php">
  <div class="jumbotron">
   <fieldset>
    <legend>[編集]</legend>
     <label>ニックネーム：<input type="text" name="name" value="<?=$row["name"]?>"></label><br>
     <label>Email：<input type="text" name="lid" value="<?=$row["lid"]?>"></label><br>
     <input type="submit" value="送信">
     <input type="hidden" name="id" value="<?=$id?>">
    </fieldset>
    <input type="text" name="name" value="<?=$row["name"]?>">
<input type="text" name="lid" value="<?=$row["lid"]?>">
<form action="delete.php" method="get">
    <input type="hidden" name="id" value="<?=$id?>">
    <input type="submit" value="削除">
</form> -->

  </div>
</form>
<!-- Main[End] -->


</body>
</html>


