(function ($) {
    'use strict';

    //合計問題数
    let $questionTotalNum = 10;
    const prefecturalCapital = [
      {
        id: "01",
        question: "デザインの「近接」とは何ですか？",
        answer01: "関連する情報をグループ化して近くに配置すること",
        answer02: "要素を一定の規則に沿って配置すること",
        answer03: "重要な情報を目立たせること",
        answer04: "要素の大きさや色を変えること",
      },
      {
        id: "02",
        question: "デザインの配色では、まず何色を基本にして構成するのがいい？",
        answer01: "３色",
        answer02: "５色",
        answer03: "４色",
        answer04: "２色",
      },
      {
        id: "03",
        question: "「30人」「100％」など、単位のついた数字を読みやすくするためには？",
        answer01: "単位を小さくする",
        answer02: "太い線で囲む",
        answer03: "目立つ色を使う",
        answer04: "単位を大きくする",
      },
      {
        id: "04",
        question: "シンプルでおしゃれなレイアウトにしたいときの大事なポイントは？",
        answer01: "文字量を減らす",
        answer02: "余白を作らない",
        answer03: "情報を詰め込む",
        answer04: "色を多く使う",
      },
      {
        id: "05",
        question: "レイアウトにメリハリをつけるためには？",
        answer01: "大きさに強弱をつける",
        answer02: "画像を入れる",
        answer03: "大きさを揃える",
        answer04: "文字を大きくする",
      },
      {
        id: "06",
        question: "デザインとは何ですか？",
        answer01: "問題解決のために考えて、形にすること",
        answer02: "芸術的な表現や独特な世界観の表現",
        answer03: "気晴らしや健康などのために、ぶらぶら歩くこと",
        answer04: "プログラミングを行い、機能を実装すること",
      },
      {
        id: "07",
        question: "デザインの配色に関する正しい記述はどれですか？",
        answer01: "配色は3色までに制限するのがおすすめである",
        answer02: "色数を増やすと情報が伝わりやすくなる",
        answer03: "メインカラーを70%にする",
        answer04: "文字を大きくする",
      },
      {
        id: "08",
        question: "シンプルなデザインを作るために重要なことは何ですか？",
        answer01: "要素を絞り込み、ムダな装飾を省くこと",
        answer02: "複雑な装飾を加えること",
        answer03: "要素を増やして情報を充実させること",
        answer04: "目立つ色を多用すること",
      },
      {
        id: "09",
        question: "デザインの４大原則に含まれないものはどれですか？",
        answer01: "光陰",
        answer02: "近接",
        answer03: "反復",
        answer04: "強弱",
      },
      {
        id: "10",
        question: "デザインの「反復」について正しい記述はどれですか？",
        answer01: "要素やパターンを繰り返すこと",
        answer02: "側方への反復運動の素早さにより、敏捷性を測定すること",
        answer03: "これ以上はいらないと感ずるほど満ちること。",
        answer04: "感心して敬服すること。",
      }
    ];
    //質問をランダムにする
    function shuffleQuiz(array) {
      for (let i = (array.length - 1); 0 < i; i--) {
        let random = Math.floor(Math.random() * (i + 1));
        let selected = array[i];
        array[i] = array[random];
        array[random] = selected;
      }
      return array;
    }
    let quizId = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"];
    shuffleQuiz(quizId);
  
    //現在の質問数
    let $currentNum = 0;
  
    //得点
    let $pointPerCorrect = 10;
  
    // pinpon再生用のaudio要素を取得
    let pinponAudio = document.getElementById('pinpon');
  
    // Buzzer再生用のaudio要素を取得
    let buzzerAudio = document.getElementById('buzzer');
  
    // rappa再生用のaudio要素を取得
    let rappaAudio = document.getElementById('rappa');
  
    // スコア
    let score = 0;
  
    let questionObject = (function () {
      let Obj = function ($target) {
  
        //質問の番号
        this.$questionNumber = $target.find('.quiz-question-number');
  
        //質問文
        this.$questionName = $target.find('.quiz-question');
  
        //選択肢ボタン
        this.$questionButton = $target.find('.quiz-button');
        this.$button01 = $target.find('.button01');
        this.$button02 = $target.find('.button02');
        this.$button03 = $target.find('.button03');
        this.$button04 = $target.find('.button04');
  
        //選択肢のテキスト
        this.$answer01 = $target.find('.quiz-text01');
        this.$answer02 = $target.find('.quiz-text02');
        this.$answer03 = $target.find('.quiz-text03');
        this.$answer04 = $target.find('.quiz-text04');
  
        //score
        this.$score = $target.find('.score-wrap .score');
  
        this.init();
      };
      Obj.prototype = {
        //初回設定
        init: function () {
          //イベント登録
          this.event();
        },
        event: function () {
          let _this = this;
  
          //ウインドウ読み込み時
          $(window).on('load', function () {
            //value取得
            let value = quizId[$currentNum]; //最初は0（1番目）
            //次の質問を取得
            let nextQuestion = _this.searchQuestion(value);
            //次の質問に切り替える
            _this.changeQuestion(nextQuestion);
            //回答のシャッフル
            _this.shuffleAnswer($('.quiz-answer'));
          });
  // button クリック時の処理
  _this.$questionButton.on("click", function () {
    if ($(this).hasClass('button01')) {
      $(this).parents('.quiz-answer').addClass('is-correct');
      score = score + $pointPerCorrect;
  
      // answer01が選択された時にBGMを再生する
      pinponAudio.play();
    } else {
      $(this).parents('.quiz-answer').addClass('is-incorrect');
  
      // button02、button03、button04が選択された時にBuzzerを再生する
      buzzerAudio.play();
    }
    $(this).addClass('is-checked');
  
    if ($currentNum + 1 == $questionTotalNum) {
      setTimeout(function () {
  // 最後の問題が終了したら、スコア表示を更新する
        $('.finish').addClass('is-show');
        $('.score-wrap .score').text(score);
        // スコアが満点（全問正解）であれば、「rappa.mp3」を再生する
        if (score === $pointPerCorrect * $questionTotalNum) {
          rappaAudio.play();
        }
      }, 1000);
  
    } else {
      setTimeout(function () {
        //現在の数字の更新
        $currentNum = $currentNum + 1;
  
        //次の質問番号を取得
        let value = quizId[$currentNum];
  
        //次の質問を取得
        let nextQuestion = _this.searchQuestion(value);
  
        //次の質問に切り替える
        _this.changeQuestion(nextQuestion);
  
        //クラスを取る
        _this.$questionButton.removeClass('is-checked');
        $('.quiz-answer').removeClass('is-correct').removeClass('is-incorrect');
  
        //回答のシャッフル
        _this.shuffleAnswer($('.quiz-answer'));
  
      }, 1000);
    }
  return false;
          });
        },
        searchQuestion: function (questionId) {
          let nextQuestion = null;
          prefecturalCapital.forEach(function (item) {
            if (item.id == questionId) {
              nextQuestion = item;
            }
          });
          return nextQuestion;
        },
        changeQuestion: function (nextQuestion) {
          let _this = this;
  
          //質問文の入れ替え
          _this.$questionName.text(nextQuestion.question );
  
          //質問番号を1つ増やす
          let numPlusOne = $currentNum + 1;
          _this.$questionNumber.text('Q.' + numPlusOne);
  
          //選択肢のテキストの入れ替え
          _this.$answer01.text(nextQuestion.answer01);
          _this.$answer02.text(nextQuestion.answer02);
          _this.$answer03.text(nextQuestion.answer03);
          _this.$answer04.text(nextQuestion.answer04);
        },
        shuffleAnswer: function (container) {
          let content = container.find("> *");
          let total = content.length;
          content.each(function () {
            content.eq(Math.floor(Math.random() * total)).prependTo(container);
          });
        },
      };
      return Obj;
    })();

    let quiz = $('.quiz');
    if (quiz[0]) {
      let queInstance = new questionObject(quiz);
    }
  })(jQuery);

  const moruImg = document.getElementById('moruImg');
  const music = document.getElementById('music');
  music.volume = 0.5;
  moruImg.addEventListener('click', function() {
    music.play();
  });