<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ログイン</title>
    <!-- Bootstrap CSS -->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="./css/login.css">
</head>
<body>

<div class="container login-container">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="login-form">
                <h2 class="login-header">ログイン</h2>
                <form name="form1" action="login_act.php" method="post">
                    <div class="form-group">
                        <label for="lid">ID:</label>
                        <input type="text" class="form-control" id="lid" name="lid" required>
                    </div>
                    <div class="form-group">
                        <label for="lpw">PW:</label>
                        <input type="password" class="form-control" id="lpw" name="lpw" required>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">ログイン</button>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- Bootstrap JS (optional) -->
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>
