import { Quiz } from './quiz.js'

export class Settings {
  constructor() {
    this.categoryElement = document.getElementById('category')
    this.difficultyElement = document.getElementsByName('difficulty')
    this.numberOfQuestionsElement = document.getElementById('numberOfQuestions')
    this.startBtn = document.getElementById('startBtn')

    this.startBtn.addEventListener('click', this.startQuiz.bind(this))

  }
  async startQuiz() {
    let counter = 0;
    counter++;
    if (counter === 1) {
      this.startBtn.disabled = true;
    }
    let category = this.categoryElement.value;
    let difficulty = [...this.difficultyElement].filter((el) => el.checked)[0].value;
    let numberOfQuestions = this.numberOfQuestionsElement.value;
    let API = `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}`
    let response = await this.fetchAPI(API);
    if (response.length > 0) {
      $("#setting").fadeOut(500, () => {
        $("#quiz").fadeIn(500)
      })
      let quiz = new Quiz(response, numberOfQuestions);
    }
  }
  async fetchAPI(API) {
    let response = await fetch(API);
    let result = await response.json();
    return result.results;
  }
}
