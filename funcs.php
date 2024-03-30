<?php
//XSS対応（ echoする場所で使用！それ以外はNG ）
function h($str){
    return htmlspecialchars($str, ENT_QUOTES);
}

//DB接続
function db_conn(){
  try {
      $db_name = "nina1618_moruq";    //データベース名
      $db_id   = "nina1618";      //アップ前はroot
      $db_pw   = "Mofu_2483";      //アップ前パスワード：XAMPPはパスワード無し。※アップ後はgitにあげない。絶対。
      $db_host = "mysql57.nina1618.sakura.ne.jp"; //DBホスト アップ前は”localhost”
      return new PDO('mysql:dbname='.$db_name.';charset=utf8;host='.$db_host, $db_id, $db_pw);
  } catch (PDOException $e) {
    exit('DB Connection Error:'.$e->getMessage());
  }
}

//SQLエラー
function sql_error($stmt){
    //execute（SQL実行時にエラーがある場合）
    $error = $stmt->errorInfo();
    exit("SQLError:".$error[2]);
}

//リダイレクト
function redirect($file_name){
    header("Location: ".$file_name);
    exit();
}

//SessionCheck(スケルトン)
function sschk(){

}
