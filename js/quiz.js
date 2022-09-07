export class Quiz {
  constructor(response,numberOfQuestions) {
    this.response = response;
    this.numOfQuistion = response.length
    this.currentQuestion = 0;
    this.showQuestion();
    this.nextBtn = document.getElementById("next")
    this.nextBtn.addEventListener("click", this.nextQuestion.bind(this))
    this.score = 0;
    this.correct = document.getElementById("correct")
    this.startBtn = document.getElementById('startBtn')
    this.numberOfQuestions = numberOfQuestions;
    $("#correct").fadeOut()

  }
  showQuestion() {
    document.getElementById("question").innerHTML = `${this.response[this.currentQuestion].question}`;
    document.getElementById("numOfCurrentQuestion").innerHTML = this.currentQuestion + 1;
    document.getElementById("numsOfQuastions").innerHTML = this.numOfQuistion;
    let answers = [...this.response[this.currentQuestion].incorrect_answers, this.response[this.currentQuestion].correct_answer]
    function shuffle(array) {
      let currentIndex = array.length;
      let randomIndex;
      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
      }
      return array;
    }
    shuffle(answers);
    let temp = "";
    for (let i = 0; i < answers.length; i++) {
      temp += `
      <div class="form-check">
        <input class="form-check-input" type="radio" name="answer" id="${answers[i]}" value="${answers[i]}">
        <label class="form-check-label" for="${answers[i]}">${answers[i]}</label>
      </div>`
    }
    document.getElementById("rowAnswer").innerHTML = temp
  }
  nextQuestion() {
    let userAnswerElement = document.getElementsByName("answer");
    if ([...userAnswerElement].filter(el => el.checked).length == 1) {
      $("#alert").fadeOut(300)
      this.checkUserAnswer();
      this.currentQuestion++;
      if (this.currentQuestion < this.numOfQuistion) {
        this.showQuestion();
      } else {
        $("#quiz").fadeOut(1000, () => {
          $("#finish").fadeIn(1000)
          document.getElementById("score").innerHTML = this.score;
          document.getElementById("tryAgain").addEventListener("click",()=>{
            $("#finish").fadeOut(1000,()=>{
              $("#setting").fadeIn(1000)
              location.reload();
            });
          })
        })
      }
    } else {
      $("#alert").fadeIn(300)
    }
  }
  checkUserAnswer() {
    let userAnswerElement = document.getElementsByName("answer");

    let userAnswer = [...userAnswerElement].filter(el => el.checked)[0].value;
    $("#correct").fadeIn(500, () => {
      $("#correct").fadeOut(500)
    })
    if (userAnswer === this.response[this.currentQuestion].correct_answer) {
      this.score++;
      this.correct.innerHTML = 'Correct';
      this.correct.classList.add("bg-success")
      this.correct.classList.remove("bg-danger")
    } else {
      this.correct.innerHTML = 'InCorrect'
      this.correct.classList.add("bg-danger")
      this.correct.classList.remove("bg-success")
    }
  }
}