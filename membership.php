<!-- ユーザー会員登録 -->
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/login.css">
    <title>新規会員登録</title>
</head>
<body>

<form action="insert.php" method="post">
    <main>
<h2>アカウント登録</h2>
    <label for="name">ニックネーム</label>
    <input type="text" id="name" name="name" required><br>
    <label for="lid">メールアドレス</label>
    <input type="email" id="lid" name="lid" required><br>
    <label for="lpw">パスワード</label>
    <input type="password" class="form-control" id="lpw" name="lpw" required>
<p>
    <input type="submit" value="登録する">
</p>

</form>
</main>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // フォームが送信されたときの処理

    // 入力データの取得
    $name = $_POST["name"];
    $lid = $_POST["lid"];
    // $lpw = $_POST["lpw"];
    //ハッシュ化
    $lpw = password_hash($id, PASSWORD_DEFAULT);

    // 例: ファイルに保存する場合
//     $file = fopen("users.txt", "a");
//     fwrite($file, "$name, $email");
//     fclose($file);

//     echo "登録が完了しました。";
//
}
?>

</body>
</html>

<!-- ここまで -->
