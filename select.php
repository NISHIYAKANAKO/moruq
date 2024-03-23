<?php
session_start();

//１．関数群の読み込み
include("funcs.php");

//LOGINチェック → funcs.phpへ関数化
sschk();

//２．データ登録SQL作成
$pdo = db_conn();
$sql = "SELECT * FROM gs_an_table";
$stmt = $pdo->prepare($sql);
$status = $stmt->execute();

//３．データ表示
$values = "";
if ($status == false) {
  sql_error($stmt);
}

//全データ取得
$values =  $stmt->fetchAll(PDO::FETCH_ASSOC); //PDO::FETCH_ASSOC[カラム名のみで取得できるモード]
$json = json_encode($values, JSON_UNESCAPED_UNICODE);
?>

<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>管理画面</title>
  <link rel="stylesheet" type="text/css" href="./css/login.css">
  <link rel="stylesheet" type="text/css" href="./css/top.css">
</head>

<body id="main">

  <body id="main-visual">
    <link href="https://fonts.googleapis.com/earlyaccess/nicomoji.css" rel="stylesheet">
    <h1>デザモル<br>
      <img src="img/star3.png" width="50" height="50">
      <img src="img/star2.png" width="50" height="50">
      <img src="img/star1.png" width="50" height="50">
      <img src="img/moru.png" width="180" height="120">
      <img src="img/star1.png" width="50" height="50">
      <img src="img/star2.png" width="50" height="50">
      <img src="img/star3.png" width="50" height="50">
      <br>アカデミー
    </h1>
    <div class="btn press"><a href="quiz.html">クイズをする</a></div>
    <!-- <div class="btn press"><a href="story.html">物語を読む</a></div> -->

    <!-- ログインと新規登録のリンク -->
    <div class="user-links">
      <nav class="navbar navbar-default">
        <div class="container-fluid">
          <div>こんにちは、<?= $_SESSION["name"] ?>さん</div>
          <a href="index.html">ログアウト</a>
        </div>
      </nav>
    </div>
  </body>

  <script>
    const a = '<?php echo $json; ?>';
    console.log(JSON.parse(a));
  </script>
</body>

</html>