const startButtonEl = document.getElementById("start-btn");
const questionTextEl = document.getElementById("question-text");
const openingTextEl = document.getElementById("opening-text");
const questionContainerEl = document.getElementById("question-container");
// const answerBoxEl = document.getElementById("answer-box");
const answerOne = document.getElementById("answer-one");
const answerTwo = document.getElementById("answer-two");
const answerThree = document.getElementById("answer-three");
const answerFour = document.getElementById("answer-four");
var time = document.getElementById("timer");
var timer;
var secondsLeft = 10;
// const resultsEl = document.getElementById("results");

startButtonEl.addEventListener("click", beginQuiz);

function beginQuiz() {
  openingTextEl.classList.add("hidden");
  startButtonEl.classList.add("hidden");
  console.log(openingTextEl);
  console.log(startButtonEl);
  startTimer();
  displayQuestion();
}

function startTimer() {
  timer = setInterval(myFunction, 1000);
}

function myFunction() {
  secondsLeft--;
  time.textContent = secondsLeft;
  if (secondsLeft <= 0) {
    clearInterval(timer);
    time.textContent = "";
  }
}

function displayQuestion() {
  questionContainerEl.classList.remove("hidden");
  questionTextEl.textContent = questions[0].question;
  answerOne.textContent = questions[0].answers[0].text;
  answerTwo.textContent = questions[0].answers[1].text;
  answerThree.textContent = questions[0].answers[2].text;
  answerFour.textContent = questions[0].answers[3].text;
  answerOne.setAttribute("data-iscorrect", questions[0].answers[0].correct);
  answerTwo.setAttribute("data-iscorrect", questions[0].answers[1].correct);
  answerThree.setAttribute("data-iscorrect", questions[0].answers[2].correct);
  answerFour.setAttribute("data-iscorrect", questions[0].answers[3].correct);
}

answerOne.addEventListener("click", evaluateAnswer);
answerTwo.addEventListener("click", evaluateAnswer);
answerThree.addEventListener("click", evaluateAnswer);
answerFour.addEventListener("click", evaluateAnswer);

function evaluateAnswer(event) {
  console.log(event.target);
  if (event.target.getAttribute("data-iscorrect") === "true") {
    alert("test");
  }
  //   } else ()
}

const questions = [
  {
    question: "If/else conditional statements are evaluated within:",
    answers: [
      { text: "1. quotes", correct: false },
      { text: "2. parentheses", correct: true },
      { text: "3. curly brackets", correct: false },
      { text: "4. square brackets", correct: false },
    ],
  },

  {
    question: "Please select the answer below that is not a valid data type:",
    answers: [
      { text: "1. booleans", correct: false },
      { text: "2. strings", correct: false },
      { text: "3. static", correct: true },
      { text: "4. number", correct: false },
    ],
  },

  {
    question:
      "A very usefful tool used during development and debugging for printing content to the debugger is:",
    answers: [
      { text: "1. JavaScript", correct: false },
      { text: "2. terminal/bash", correct: false },
      { text: "3. for loops", correct: false },
      { text: "4. console.log", correct: true },
    ],
  },

  {
    question:
      "What must strings be enclosed within when being assigned to a variable?",
    answers: [
      { text: "1. commas", correct: false },
      { text: "2. curly brackets", correct: false },
      { text: "3. quotes", correct: true },
      { text: "4. parentheses", correct: false },
    ],
  },
];

// pseudo code

// When the start button is clicked, a timer starts and the first question is presented

// After the first question is answered, the next question presents itself

// When an answer is incorrect, time is subtracted from the clock

// when all questions are answered or timed hits 0, then the game is over

// when the game is over, the score can be saved along with the users initials
