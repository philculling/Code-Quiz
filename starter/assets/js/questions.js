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
var submitEl = document.getElementById("submit");
//submitEl now linked to where user clicks submit after submitting initials
var clearEl = document.getElementById("clear");
//clearEl now linked to where user clicks to Clear Highscores

var initials;//starts undefined, gets defined in the endGame function.

var userWin = false;//default so that end is not triggered until user has won
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
   // listEl.appendChild(listItem);
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
  questionDiv.setAttribute("style", "display:hide; ");//not working
  //Change class of the div with id of end-screen out of hide
  endScreenDiv.setAttribute("style", "display:block; ");
  //Display score
  finalScoreEl = score;//not displaying, needs checking
  submitEl.addEventListener('click', setScoresAndInitials)
    initials = submitEl.input;//check this
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
    questionDiv.classList.remove('hide');
  
    var form = document.createElement("form");
    formEl.appendChild(form);//makes the form appear

    questionEl.textContent = questions[currentQuestion].question;
    for (i = 0; i < questions[currentQuestion].choices.length; i++) {
      var choices = document.createElement("button");
      choices.textContent = questions[currentQuestion].choices[i];
      choices.setAttribute("data-choice", questions[currentQuestion].choices[i]);
      choices.addEventListener('click', verifyAnswer);
      form.appendChild(choices);
    }}

function verifyAnswer(event) {
  event.preventDefault();
  console.log (this.dataset.choice);
  if (this.dataset.choice === questions[currentQuestion].correctAnswer) {
    userWins();
    currentQuestion++;
    //need to clear both the question (which is happenning)
    //and options, which I think isn't.
    //maybe because you've got currentQuestion++; but nothing
    //to get next options (check reference)++?
    playGame();
  }
  userLoss();

  if (currentQuestion = questions.length) { //tried > instead of =
    //made rest of questions load ok, but caused other issues
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

/*
At the moment, on clicking an answer,
whether right or wrong, the first question IS clearing / changing
and the clock is running down, so userLoss must be being called,
and endGame is being called.
1. What in the code triggers the All done! endGame
2. Why is the endGame being called when you don't want it to?
I think it could be line 150.
3. How do you stop it?
4. How are you successfully clearing and loading question 2?
5. Can you apply the same principle to clearing and loading options for 2?
6. Why is it going straight to end game?
7. If you can't find an answer to that, can you insert something
to stop it? e.g. userWin = false, and if userWin
has to be true before endGame can start?
This is all in the verifyAnswer function.

8. Nothing is happening when user clicks on submit button.

9. Check you have correctly tracked the input of the user's initials,
it's about line 93. May have skipped adding textcontent.

10. Check that you have correctly tracked the scores in about line 91.
See line 99 for timer which IS done correctly.

11. Check file paths for winMusic and lossMusic check file paths;
Matthew says they should work if their paths are correct.

12. Why does the whole thing not work when I uncomment line 74?

13. Should line 87 be change class instead of setAttr?
*/