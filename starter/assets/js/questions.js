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
//var userChoice = document.getElementById("option");
/*userChoice, when selected later in the playGame function, 
should now link to the option section of the form
which will be created later*/
var start = document.getElementById("start");
//start now linked to the button so can now be used in eventListener
var timeEl = document.getElementById("time");
//timeEl now linked to the countdown
var finalScoreEl = document.getElementById("final-score");
//finalScoreEl now linked to where it should display
var submitEl = document.getElementById("submit");
//submitEl now linked to where user clicks submit after submitting initials
var clearEl = document.getElementById("clear");
//clearEl now linked to where user clicks to Clear Highscores

var chosenAnswer;
/*The above is undefined at the start, gets defined in the playGame function.
*/
var initials;//starts undefined, gets defined in the endGame function.

var userWin = false;//default so that end is not triggered until user has won
var score = 0;//tracks score, adds when userWins
var winMusic = new Audio ("../sfx/correct.wav");//unlikely to work, come back to it
var lossMusic = new Audio ("../sfx/incorrect.wav");//Sim. CHECK PATHS but otherwise this is the right way to do it
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

var prevScores = localStorage.getItem("prevScores");
var prevInitials = localStorage.getItem("prevInitials");

function renderLastRegistered() {
  //Retrieves all previous scores and user initials
  // If they are null, return early from this function
  if (prevScores === "" || prevInitials === "") {
    return;
  }
  else {
    var listItem = document.createElement("li");
    listItem.textContent = (prevInitials + " " + prevScores);
  //  listEl.appendChild(listItem);
  }
}

function setScoresAndInitials() {
  //set results in local storage
  localStorage.setItem("prevScores", prevScores);
  localStorage.setItem("prevInitials", prevInitials);
  renderLastRegistered();
}

function endGame() {
  //Change class of the div with id of questions back to hide
  questionDiv.setAttribute("style", "display:hide; ");
  //Change class of the div with id of end-screen out of hide
  endScreenDiv.setAttribute("style", "display:block; ");
  //Display score
  finalScoreEl = score;
  submitEl.addEventListener('click', function(event) {//check this against the one you know works
    event.preventDefault();
    initials = submitEl.input;
    setScoresAndInitials()
  })
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
  //activates sound - optional extra if time
 // winMusic.play();
}

function userLoss() {
  secondsLeft = (secondsLeft - 10);
  //activates sound - optional extra if time
//  lossMusic.play();
}

function playGame() {
  //reveal div that contains questions
    questionDiv.classList.remove('hide');
  
    var form = document.createElement("form");
    formEl.appendChild(form);

    //for (i = 0; i < questions.length; i++) {
    //sets questions by looping through array
    questionEl.textContent = questions[currentQuestion].question;
    for (i = 0; i < questions[currentQuestion].choices.length; i++) {
      var choices = document.createElement("button");
      choices.textContent = questions[currentQuestion].choices[i];
      choices.setAttribute("data-choice", questions[currentQuestion].choices[i]);
      choices.addEventListener('click', verifyAnswer);
      form.appendChild(choices);
    }}
    //create 4 options for inside the form, give them content, append
/*    var choice1 = document.createElement("button");
    var label1 = document.createElement("label");
    var choice2 = document.createElement("button");
    var label2 = document.createElement("label");
    var choice3 = document.createElement("button");
    var label3 = document.createElement("label");
    var choice4 = document.createElement("button");
    var label4 = document.createElement("label");*/
     /*If you can, think about changing the position of the correctAnswer
    each time; at the moment it's always the first option*/
    
    /*label1.textContent = questions[i].correctAnswer;
    form.appendChild(choice1);
    choice1.appendChild(label1);
    //add later for each:
    //choice1.setAttribute('type', 'radio');
    label2.textContent = questions[i].wrongAnswer1;
    form.appendChild(choice2);
    choice2.appendChild(label2);
    label3.textContent = questions[i].wrongAnswer2;
    form.appendChild(choice3);
    choice3.appendChild(label3);
    label4.textContent = questions[i].wrongAnswer3;
    form.appendChild(choice4);
    choice4.appendChild(label4);
    /*addEventListener that tracks the user's choice
    and updates the variable to be used in the if statement.*/
 /*   verifyAnswer {
      event.preventDefault();
      chosenAnswer = userChoice.input;//not sure this is the correct way
    });
    if (chosenAnswer === questions[i].correctAnswer) {
      userWins();
    }
    else {
      userLoss();
    }
}*/

function verifyAnswer(event) {
  event.preventDefault();
  console.log (this.dataset.choice);
  if (this.dataset.choice === questions[currentQuestion].correctAnswer) {
    userWins();
    currentQuestion++;
    playGame();
  }
  userLoss();
  if (currentQuestion = questions.length) {
    endGame();
  }
}

function startGame() {
  //test
  console.log("Has the event listener worked?");
    //starts timer and everything else in timer function
    timer();
    //default userWin = false, not sure if necessary or desirable
    userWin = false;
    playGame();
}

//reset local storage
function clear() {
  prevScores = 0;
  prevInitials = "";
  //updates local storage with blanks
  setScoresAndInitials();
}

//clearEl.addEventListener('click', clear);

//update from last played
renderLastRegistered();

//start game when user clicks on button
start.addEventListener('click', startGame);