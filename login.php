<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
  <link rel="stylesheet" href="./css/login.css">
  <title>ログイン</title>
</head>

<body>

  <header>
    <nav class="navbar navbar-expand-lg navbar-dark">会員管理画面</nav>
  </header>

  <form name="form1" action="login_act.php" method="post">
    <div class="form-group">
      <label for="lid">ID:</label>
      <input type="text" class="form-control" id="lid" name="lid" placeholder="Enter ID">
    </div>
    <div class="form-group">
      <label for="lpw">PW:</label>
      <input type="password" class="form-control" id="lpw" name="lpw" placeholder="Password">
    </div>
    <button type="submit" class="btn btn-primary">ログイン</button>
  </form>

</body>

</html>
