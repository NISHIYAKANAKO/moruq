<?php
session_start();

//１．関数群の読み込み
include("funcs.php");

//LOGINチェック → funcs.phpへ関数化
sschk();

//２．データ登録SQL作成
$pdo = db_conn();
$sql = "SELECT * FROM gs_user_table";
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
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="img/icon.png">
    <title>デザモルアカデミー_Member</title>
    <link rel="stylesheet" type="text/css" href="css/top.css">
    <script src="js/script.js"></script>
</head>

<body>
    <link href="https://fonts.googleapis.com/earlyaccess/nicomoji.css" rel="stylesheet">
    <audio id="bgm" src="mp3/Triple_Time.mp3"></audio>
    <h1>デザモル<br>
        <img src="img/star3.png" class="hidden-on-mobile resize">
        <img src="img/star2.png" class="hidden-on-mobile resize">
        <img src="img/star1.png" class="resize">
        <img src="img/moru.png" class="m-resize">
        <img src="img/star1.png" class="resize">
        <img src="img/star2.png" class="hidden-on-mobile resize">
        <img src="img/star3.png" class="hidden-on-mobile resize">
        <br>アカデミー
    </h1>
    <p>デザインの勉強やデザインに関する情報を提供しております。<br>
        <span class="catch"><a href="https://nina1618.my.canva.site/">デザインをモルっと楽しく学ぼう！</a></span>
    </p>
    <div class="card-container">
        <div class="card">
            <a href="lesson1.html">
                <img src="img/flower.png">
                <dt>初めてのデザイン</dt>
                <dd>デザインの基本四原則や、デザインをどう考えればよいのか解説します。</dd>
            </a>
        </div>
        <div class="card">
            <a href="lesson2.html">
                <img src="img/flower.png">
                <dt>デザインの歴史</dt>
                <dd>デザインについて振り返り、「デザイン」という意味を理解しよう。</dd>
            </a>
        </div>
        <div class="card">
            <a href="lesson3.html">
                <img src="img/flower.png">
                <dt>文字と奥深いフォントの世界</dt>
                <dd>フォントの種類によって印象は大きく変わります。奥深い世界をのぞこう。</dd>
            </a>
        </div>
        <div class="card">
            <img src="img/flower.png">
            <dt>ユーザーヒアリング</dt>
            <dd>ヒアリング力を前進させるためのマインドとメソッドについて</dd>
        </div>

        <div class="card">
            <a href="fgmlsn1.html">
                <img src="img/balloon1.png">
                <dt>Figma入門</dt>
                <dd>新しいデザインツールとして注目を浴びる「Figma」について学べるカリキュラムです。</dd>
            </a>
        </div>

            <div class="card">
            <a href="notdate.html">
                <img src="img/balloon1.png">
                <dt>STUDIO入門</dt>
                <dd>コーディングなしでWebサイトがつくれるデザインツール「STUDIO」について学ぼう。</dd>
            </a>
        </div>


            <div class="card">
            <a href="notdate.html">
                <img src="img/balloon1.png">
                <dt>WordPress入門</dt>
                <dd>世界で最も利用されているサイトが多いCMS「WordPress」について学ぼう。</dd>
            </a>
            </div>

            <div class="card">
            <a href="notdate.html">
                <img src="img/balloon1.png">
                <dt>Photoshop入門</dt>
                <dd>写真補正や画像合成などが行える「Photoshop」について勉強しましょう。</dd>
            </a>
            </div>

    </div>
    <!-- ログインと新規登録のリンク -->
    <div class="user-links">
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <div><a href="detail.php">こんにちは、<?= $_SESSION["name"] ?>さん</a></div>
                <a href="index.html">ログアウト</a>
            </div>
        </nav>
    </div>
    <div class="bgm-control">
        <button id="bgmControl" class="bgm-button">BGM STOP</button>
    </div>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            var audio = document.getElementById('bgm');
            var controlButton = document.getElementById('bgmControl');

            audio.play().catch(function(error) {
                console.log("自動再生がブロックされました: ", error);
            });

            var isPlaying = true;

            controlButton.addEventListener('click', function() {
                if (isPlaying) {
                    audio.pause();
                    controlButton.textContent = 'BGM START';
                } else {
                    audio.play();
                    controlButton.textContent = 'BGM STOP';
                }
                isPlaying = !isPlaying;
            });
        });
    </script>

</body>

<script>
    const a = '<?php echo $json; ?>';
    console.log(JSON.parse(a));
</script>
</body>

</html>