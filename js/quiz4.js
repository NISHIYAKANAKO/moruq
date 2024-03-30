(function ($) {
    'use strict';

    //合計問題数
    let $questionTotalNum = 10;
    const prefecturalCapital = [
      {
        id: "01",
        question: "デザインの問題解決において、どの要素が重要ですか？",
        answer01: "ヒアリングによる情報収集",
        answer02: "顧客の要望を無視すること",
        answer03: "自己の好みだけを優先すること",
        answer04: "ヒアリングせず直感でデザインすること",
      },
      {
        id: "02",
        question: "デザインのヒアリングにおいて、相手の声に耳を傾けることの意義は？",
        answer01: "問題解決の鍵を握っているから",
        answer02: "時間の無駄だから",
        answer03: "デザインには関係ないから",
        answer04: "クリエイティブなアイデアを排除するため",
      },
      {
        id: "03",
        question: "ヒアリングシートの利点は次のうちどれですか？",
        answer01: "質問や項目をまとめておくことで漏れがなくなる",
        answer02: "衣服や荷物に汚れを防ぐ",
        answer03: "コミュニケーションを不要にする",
        answer04: "熱を冷ますことが出来る",
      },
      {
        id: "04",
        question: "ヒアリングシートに記載される項目には何が含まれる？",
        answer01: "目的や目標、ターゲットオーディエンスなど",
        answer02: "クライアントの好みだけ",
        answer03: "クリエイティブなアイデアのみ",
        answer04: "材質の仕様や外寸など",
      },
      {
        id: "05",
        question: "WEBサイト制作で、しなくてもよい質問はどれですか？",
        answer01: "好きなお寿司ベスト３",
        answer02: "参考サイトのURLや嫌いなサイトのURL",
        answer03: "必要なコンテンツやイメージカラー",
        answer04: "サイト内に掲載する情報",
      },
      {
        id: "06",
        question: "デザインを作る際、うまく聞き出すために使うと良いのは何？",
        answer01: "ヒアリングシート",
        answer02: "ホットプレート",
        answer03: "クッキングシート",
        answer04: "ファミリーマート",
      },
      {
        id: "07",
        question: "どのような姿勢でヒアリングするといい？",
        answer01: "しっかりと相手の声に耳を傾け、深く掘り下げる",
        answer02: "前を向き、体育座りをする",
        answer03: "しっかりと腕を使って地面を深く掘り下げる",
        answer04: "相手を見下して一方的に従わせる",
      },
      {
        id: "08",
        question: "クライアントの求める成果を知ることで得られる利点は？",
        answer01: "デザインの方針を立てやすくなる",
        answer02: "ヒアリングをスキップすることができる",
        answer03: "成果に関係ないデザインを提案できる",
        answer04: "必要なコンテンツやイメージカラー",
      },
      {
        id: "09",
        question: "イメージカラーを確認することの目的は？",
        answer01: "デザインの統一感を持たせるため",
        answer02: "高級感があり、伝統的で格式がある",
        answer03: "ヒアリングを短縮する",
        answer04: "元気や力強さを与える",
      },
      {
        id: "10",
        question: "要望や問題を理解するために大事ではないものは？",
        answer01: "学歴や家庭環境",
        answer02: "相手の表情や声のトーンを観察すること",
        answer03: "どんなものを作りたいのかを知ること",
        answer04: "何を求めているかをしっかり把握すること",
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