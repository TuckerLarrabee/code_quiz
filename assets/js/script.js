const startButtonEl = document.getElementById("start-btn");
const questionTextEl = document.getElementById("question-text");
const openingTextEl = document.getElementById("opening-text");
const questionContainerEl = document.getElementById("question-container");
// const answerBoxEl = document.getElementById("answer-box");
const answerOne = document.getElementById("answer-one");
const answerTwo = document.getElementById("answer-two");
const answerThree = document.getElementById("answer-three");
const answerFour = document.getElementById("answer-four");
const buttonList = document.getElementsByClassName("all-btns");
const nextButton = document.getElementById("next-question");
const scoreForm = document.getElementById("initialsSubmit");
const allDone = document.getElementById("allDone");
const lastScreen = document.getElementById("lastScreen");
const buttonHome = document.getElementById("return");
const buttonClear = document.getElementById("clearMemory");
var time = document.getElementById("timer");
var timer;
var secondsLeft = 60;
var playerScore = 0;
var scores = [];
var highScoreCounter = 0;
// const resultsEl = document.getElementById("results");

startButtonEl.addEventListener("click", beginQuiz);
nextButton.addEventListener("click", proceed);
buttonHome.addEventListener("click", homeScreen);

function homeScreen() {
  lastScreen.classList.add("hidden");
}

function beginQuiz() {
  openingTextEl.classList.add("hidden");
  startButtonEl.classList.add("hidden");
  nextButton.classList.remove("hidden");
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
    // time.textContent = "";
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
    rightAnswer();
    questions.shift();
    if (questions.length < 1) {
      submitScore();
    }
    // playerScore increases by 25
  } else {
    wrongAnswer();
    questions.shift();
    var timeRemaining = time.textContent - 9;
    secondsLeft = Math.max(1, timeRemaining);
    if (questions.length < 1) {
      submitScore();
    }
  }
  answerOne.removeEventListener("click", evaluateAnswer);
  answerTwo.removeEventListener("click", evaluateAnswer);
  answerThree.removeEventListener("click", evaluateAnswer);
  answerFour.removeEventListener("click", evaluateAnswer);
}

function proceed() {
  displayQuestion();
  answerOne.addEventListener("click", evaluateAnswer);
  answerTwo.addEventListener("click", evaluateAnswer);
  answerThree.addEventListener("click", evaluateAnswer);
  answerFour.addEventListener("click", evaluateAnswer);
  console.log("string");
  var answerRight = document.querySelector(".format");
  answerRight.remove();
}

var rightAnswer = function () {
  var correctAnswer = document.createElement("div");
  correctAnswer.className = "format";
  correctAnswer.textContent = "Correct!";
  questionContainerEl.appendChild(correctAnswer);
  playerScore = playerScore + 25;
};

var wrongAnswer = function () {
  var incorrectAnswer = document.createElement("div");
  incorrectAnswer.className = "format";
  incorrectAnswer.textContent = "Wrong!";
  questionContainerEl.appendChild(incorrectAnswer);
};

var submitScore = function () {
  questionContainerEl.classList.add("hidden");
  nextButton.classList.add("hidden");
  scoreForm.classList.remove("hidden");
  allDone.classList.remove("hidden");
  var yourScore = document.createElement("p");
  yourScore.setAttribute("id", "yourScore");
  yourScore.innerHTML = "Your score is " + playerScore + ".";
  lastScreen.appendChild(yourScore);
  scoreForm.addEventListener("submit", storeScore);
};

function storeScore(event) {
  event.preventDefault();

  var scoreInitialsValue = document.querySelector(
    "input[name='task-name']"
  ).value;

  var highScoreListUl = document.createElement("ol");
  var highScoreList = document.createElement("li");
  highScoreList.className = "score-list";

  highScoreList.setAttribute("data-task-id", highScoreCounter);
  highScoreList.innerHTML =
    "<h3 class = 'inline'>" +
    scoreInitialsValue +
    ": </h3><span>" +
    playerScore +
    "</span>";

  allDone.classList.add("hidden");

  lastScreen.appendChild(highScoreListUl);
  highScoreListUl.appendChild(highScoreList);

  buttonClear.classList.remove("hidden");
  buttonHome.classList.remove("hidden");

  highScoreCounter++;

  var playerObject = {
    name: scoreInitialsValue,
    score: playerScore,
    id: highScoreCounter,
  };

  scoreForm.reset();

  var saveTasks = function () {
    localStorage.setItem("players", JSON.stringify(playerObject));
  };

  scores.push(playerObject);
  console.log(scores);

  console.log(playerObject);
  saveTasks();
  //   scoreInitials.classList.add("hidden");

  var highScores = document.createElement("h1");
  highScores.className = "yourScore";
  highScores.textContent = "High Scores";
  lastScreen.prepend(highScores);

  scoreForm.classList.add("hidden");
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
      "A very useful tool used during development and debugging for printing content to the debugger is:",
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
