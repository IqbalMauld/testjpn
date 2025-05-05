const questions = [
    { kana: "あ", correct: "a" }, { kana: "い", correct: "i" }, { kana: "う", correct: "u" },
    { kana: "え", correct: "e" }, { kana: "お", correct: "o" }, { kana: "か", correct: "ka" },
    { kana: "き", correct: "ki" }, { kana: "く", correct: "ku" }, { kana: "け", correct: "ke" },
    { kana: "こ", correct: "ko" }, { kana: "さ", correct: "sa" }, { kana: "し", correct: "shi" },
    { kana: "す", correct: "su" }, { kana: "せ", correct: "se" }, { kana: "そ", correct: "so" },
    { kana: "た", correct: "ta" }, { kana: "ち", correct: "chi" }, { kana: "つ", correct: "tsu" },
    { kana: "て", correct: "te" }, { kana: "と", correct: "to" }, { kana: "な", correct: "na" },
    { kana: "に", correct: "ni" }, { kana: "ぬ", correct: "nu" }, { kana: "ね", correct: "ne" },
    { kana: "の", correct: "no" }, { kana: "は", correct: "ha" }, { kana: "ひ", correct: "hi" },
    { kana: "ふ", correct: "fu" }, { kana: "へ", correct: "he" }, { kana: "ほ", correct: "ho" },
    { kana: "ま", correct: "ma" }, { kana: "み", correct: "mi" }, { kana: "む", correct: "mu" },
    { kana: "め", correct: "me" }, { kana: "も", correct: "mo" }, { kana: "や", correct: "ya" },
    { kana: "ゆ", correct: "yu" }, { kana: "よ", correct: "yo" }, { kana: "ら", correct: "ra" },
    { kana: "り", correct: "ri" }, { kana: "る", correct: "ru" }, { kana: "れ", correct: "re" },
    { kana: "ろ", correct: "ro" }, { kana: "わ", correct: "wa" }, { kana: "を", correct: "wo" },
    { kana: "ん", correct: "n" }
  ];

  let current = 0;
  let score = 0;
  let quizData = [];

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  function generateQuiz() {
    quizData = shuffle([...questions]).slice(0, ); // 10 soal per kuis
    loadQuestion();
  }

  function loadQuestion() {
    document.getElementById("progress").textContent = `Soal ${current + 1} dari ${quizData.length}`;
    const q = quizData[current];
    document.getElementById("kana").textContent = q.kana;

    const options = shuffle([
      q.correct,
      ...shuffle(questions)
        .filter(x => x.correct !== q.correct)
        .slice(0, 3)
        .map(x => x.correct)
    ]);

    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";

    options.forEach(opt => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.onclick = () => checkAnswer(opt, q.correct, btn);
      optionsContainer.appendChild(btn);
    });

    document.getElementById("nextBtn").style.display = "none";
  }

  function checkAnswer(selected, correct, btn) {
    const buttons = document.querySelectorAll("#options button");
    buttons.forEach(b => b.disabled = true);

    if (selected === correct) {
      btn.style.background = "rgb(2, 169, 2)";
      score++;
      current++;
      if (current < quizData.length) {
        setTimeout(()=>{
            loadQuestion();
        },600)
      } else {
        setTimeout(() => {
            showResult();
        }, 600);
      }
    } else {
      btn.style.background = "salmon";
      buttons.forEach(b => {
        if (b.textContent === correct) b.style.background = "lightgreen";
      });
      current++;
      if (current < quizData.length) {
        setTimeout(()=>{
            loadQuestion();
        },600)
      } else {
        setTimeout(() => {
            showResult();
        }, 600);
      }
    }

    // document.getElementById("nextBtn").style.display = "block";
  }

//   document.getElementById("nextBtn").onclick = () => {
//     current++;
//     if (current < quizData.length) {
//       loadQuestion();
//     } else {
//       showResult();
//     }
//   };

  function showResult() {
    document.getElementById("quiz").style.display = "none";
    document.getElementById("result").style.display = "block";
    document.getElementById("score").textContent = `${score} dari ${quizData.length}`;
  }

  generateQuiz();