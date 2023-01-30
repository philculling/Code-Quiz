//test links ok, is fine
console.log (1 + 2);

var listEl = document.getElementById("highscores");
//listEl is now the ordered list in the highscores.html
var questionDiv = document.getElementById("questions");
//questionDiv is now the div containing question title and choices
var endScreenDiv = document.getElementById("end-screen");
//endScreenDiv is now the div containing the all done and final score message
var questionEl = document.getElementById("question-title");
//questionEl is now the h2 part in the index.html
var formEl = document.getElementById("choices");
//formEl is now the choices part in the index.html
var start = document.getElementById("start");
//start now linked to the button so can now be used in eventListener
var timeEl = document.getElementById("time");
//timeEl now linked to the countdown
var finalScoreEl = document.getElementById("final-score");
//finalScoreEl now linked to where it should display
var initialsEl = document.getElementById("initials");
var submitEl = document.getElementById("submit");
//submitEl now linked to where user clicks submit after submitting initials
var clearEl = document.getElementById("clear");
//clearEl now linked to where user clicks to Clear Highscores
var startScreen = document.getElementById("start-screen");
var finalPage = document.getElementById("finalPage");

var score = 0;//tracks score, adds when userWins
var winMusic = new Audio ("./assets/sfx/correct.wav");
var lossMusic = new Audio ("./assets/sfx/incorrect.wav");
var secondsLeft = 75;
var currentQuestion = 0;

var questions = [
  {
      question: "Commonly used data types do NOT include:",
      choices: ["alerts", "Booleans", "Strings", "numbers"],
      correctAnswer: "alerts",
  },
  {
      question: "The condition in an if / else statement is enclosed with _____",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      correctAnswer: "parentheses",
  },
  {
      question: "Arrays in JavaScript can be used to store_____",
      choices: ["other arrays", "booleans", "numbers and strings", "all of the above"],
      correctAnswer: "all of the above",
  },
  {
      question: "String values must be enclosed within_____ when being assigned to variables.",
      choices: ["commas", "parentheses", "curly brackets", "quotes"],
      correctAnswer: "quotes",
  },
  {
      question: "A very useful tool used during development and debugging for printing content to the debugger is:",
      choices: ["JavaScript", "console log", "terminal/bash", "for loops"],
      correctAnswer: "console log",
  }
];

finalPage.style.display="none";

function renderLastRegistered() {
  console.log("insidefunction");
  endScreenDiv.style.display="none";
  finalPage.style.display="block";
  let localStorageData= JSON.parse(localStorage.getItem("quizscore"));
  if (localStorageData != null) {
    let table = document.createElement("table");
    let tr1 = document.createElement("tr");
    let th1 = document.createElement("th");
    th1.innerHTML="Name";
    let th2 = document.createElement("th");
    th2.innerHTML="Score";
    tr1.append(th1, th2);
    table.append(tr1);

    for (let i = 0; i < localStorageData.length; i++) {
      let tr = document.createElement("tr");
      let td1 = document.createElement("td");
      td1.innerHTML=localStorageData[i].name;

      let td2 = document.createElement("td");
      td2.innerHTML=localStorageData[i].score;

      tr.append(td1, td2);
      table.append(tr);

    }

    finalPage.append(table);
    
  }
 }

function setScoresAndInitials(event) {
  event.preventDefault();
  //set results in local storage
  let localStorageData= JSON.parse(localStorage.getItem("quizscore"));
  let userdata={
    name:initialsEl.value,
    score: score
  }
  if (localStorageData === null) {
    localStorageData = []
    localStorageData.push(userdata);
  }
  else {
    localStorageData.push(userdata);
  }

  localStorage.setItem("quizscore", JSON.stringify(localStorageData));
  renderLastRegistered();
}

function endGame() {
  //Change display of the div with id of questions back to none
  questionDiv.setAttribute("style", "display:none;");//not working
  //Change class of the div with id of end-screen out of none
  endScreenDiv.setAttribute("style", "display:block;");
  //Display score
  finalScoreEl.textContent = score;
  submitEl.addEventListener('click', setScoresAndInitials)
}

function timer() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft;
    if(secondsLeft === 0) {
      clearInterval(timerInterval);
      endGame();//executes endGame function
    }
  }, 1000);
}

function userWins() {
  //updates score, will be retrieved later.
  score ++;
  winMusic.play();
}

function userLoss() {
  secondsLeft = (secondsLeft - 10);
  lossMusic.play();
}

function playGame() {
  //reveal div that contains questions
    if (currentQuestion < 5) {
      questionDiv.classList.remove('hide');
  
      formEl.innerHTML="";
      var form = document.createElement("form");
      formEl.appendChild(form);//makes the form appear
  
      questionEl.textContent = questions[currentQuestion].question;
      for (i = 0; i < questions[currentQuestion].choices.length; i++) {
        var choices = document.createElement("button");
        choices.textContent = questions[currentQuestion].choices[i];
        choices.setAttribute("data-choice", questions[currentQuestion].choices[i]);
        choices.addEventListener('click', verifyAnswer);
        form.appendChild(choices);
      }  
    } else {
      endGame();
    }
   }

function verifyAnswer(event) {
  event.preventDefault();
  console.log (this.dataset.choice);
  if (this.dataset.choice === questions[currentQuestion].correctAnswer) {
    userWins();
    currentQuestion++;
    playGame();
  }
  else {
    currentQuestion++;
    userLoss();
    playGame();
  }

  if (currentQuestion > questions.length) { 
    endGame();
  }
}

function startGame() {
  //test
  console.log("Has the event listener worked?");
    //starts timer and everything else in timer function
    startScreen.classList.add('hide');
    timer();
    playGame();
}

//reset local storage
function clear() {
  prevScores = 0;
  prevInitials = "";
  //updates local storage with blanks
  setScoresAndInitials();
}

//start game when user clicks on button
start.addEventListener('click', startGame);