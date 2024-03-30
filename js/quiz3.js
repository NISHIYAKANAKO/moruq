(function ($) {
    'use strict';

    //合計問題数
    let $questionTotalNum = 10;
    const prefecturalCapital = [
      {
        id: "01",
        question: "文字のデザインに関する説明で正しいものはどれでしょうか？",
        answer01: "伝達手段として重要。デザインの一部。",
        answer02: "単なる記号に過ぎない。",
        answer03: "文字がないとデザインではない",
        answer04: "側頭部のらせん形の角と、縮れた毛をもつ。",
      },
      {
        id: "02",
        question: "スクリプト体とはどんな書体でしょうか？",
        answer01: "手書き文字や筆記体を模した書体。",
        answer02: "文字の形が明確で読みやすい。",
        answer03: "直線的でシンプルで視認性が高い。",
        answer04: "要約文としての意味がある。",
      },
      {
        id: "03",
        question: "ゴシック体の特徴として正しいものはどれでしょうか？",
        answer01: "線の太さが均一で、装飾的な要素がない。",
        answer02: "線の太さに変化があり、装飾的な要素がない。",
        answer03: "興味本位のうわさ話。",
        answer04: "どこか不気味な雰囲気がある",
      },
      {
        id: "04",
        question: "明朝体について、正しいものはどれでしょうか？",
        answer01: "装飾的な要素が付いている。",
        answer02: "文字に飾りが付いていない。",
        answer03: "ダークミステリアス",
        answer04: "間隔を調整する必要がある",
      },
      {
        id: "05",
        question: "Webサイトの文章でゴシック体が多く使われている理由とは？",
        answer01: "画面の解像度の関係",
        answer02: "伝統的なイメージを持ち、信頼感がある",
        answer03: "ゴシック体は装飾的だから。",
        answer04: "明朝体は可読性が低いから",
      },
      {
        id: "06",
        question: "欧文フォントではないものを次の中から選んでください。",
        answer01: "明朝体",
        answer02: "セリフ体",
        answer03: "サンセリフ体",
        answer04: "スクリプト体",
      },
      {
        id: "07",
        question: "行書について正しい説明は以下のうちどれでしょうか？",
        answer01: "流れるように書く書体で、書道の一種。",
        answer02: "シンプルで直線的であり、セリフがない。",
        answer03: "文字の形が明確で読みやすい。",
        answer04: "ポスターや見出しに多く使われる。",
      },
      {
        id: "08",
        question: "古代の文字はどうして変わってきたんですか？",
        answer01: "文化や技術が進化し、単純化されたから。",
        answer02: "古代文字は装飾的要素が少なかったから。",
        answer03: "意味を表現しなかったから",
        answer04: "地球外知的生命体からの指示",
      },
      {
        id: "09",
        question: "細めのゴシック体が与えるイメージはなんですか？",
        answer01: "洗練されており、柔らかく親しやすさがある。",
        answer02: "高級感があり、伝統的で格式がある。",
        answer03: "信頼感や尊厳を与える。",
        answer04: "元気や力強さを与える。",
      },
      {
        id: "10",
        question: "ゴシック体について間違っている説明はどれですか",
        answer01: "文字を流れるように連続して書く",
        answer02: "横線と縦線の太さがほぼ同じで、装飾的でない。",
        answer03: "Webサイトの文章に多く使われる。",
        answer04: "太めのゴシック体は、元気や力強さを与える。",
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