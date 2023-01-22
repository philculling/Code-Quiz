//test links ok, is fine
console.log (1 + 2);

var listEl = document.getElementById("highscores");
//listEl is now the ordered list in the highscores.html
var questionDiv = document.getElementById("questions");
//questionDiv is now the div containing question title and choices
var questionEl = document.getElementById("question-title");
//questionEl is now the h2 part in the index.html
var formEl = document.getElementById("choices");
//formEl is now the choices part in the index.html
var userChoice = document.getElementById("option");
/*userChoice, when selected later in the playGame function, 
should now link to the option section of the form
which will be created later*/
var start = document.getElementById("start");
//start now linked to the button so can now be used in eventListener
var timeEl = document.getElementById("time");
//timeEl now linked to the countdown

var chosenAnswer;
/*The above is undefined at the start, gets defined in the playGame function.
*/

var userWin = false;//default so that end is not triggered until user has won
var score = 0;//tracks score, adds when userWins
var winMusic = new Audio ("correct.wav");//unlikely to work, come back to it
var lossMusic = new Audio ("incorrect.wav");//Sim.
var secondsLeft = 75;

var questions = [
  {
      question: "Commonly used data types do NOT include:",
      correctAnswer: "alerts",
      wrongAnswer1: "Booleans",
      wrongAnswer2: "Strings",
      wrongAnswer3: "numbers",
  },
  {
      question: "The condition in an if / else statement is enclosed with _____",
      correctAnswer: "parentheses",
      wrongAnswer1: "quotes",
      wrongAnswer2: "curly brackets",
      wrongAnswer3: "square brackets",
  },
  {
      question: "Arrays in JavaScript can be used to store_____",
      correctAnswer: "all of the above",
      wrongAnswer1: "numbers and strings",
      wrongAnswer2: "other arrays",
      wrongAnswer3: "booleans",
  },
{
      question: "String values must be enclosed within_____ when being assigned to variables.",
      correctAnswer: "quotes",
      wrongAnswer1: "commas",
      wrongAnswer2: "parentheses",
      wrongAnswer3: "curly brackets",
  },
  {
      question: "A very useful tool used during development and debugging for printing content to the debugger is:",
      correctAnswer: "console log",
      wrongAnswer1: "JavaScript",
      wrongAnswer2: "terminal/bash",
      wrongAnswer3: "for loops",
  }

];

function renderLastRegistered() {
  //Retrieves all previous scores and user initials
  var prevScores = localStorage.getItem("prevScores");
  var prevInitials = localStorage.getItem("prevInitials");
  // If they are null, return early from this function
  if (prevScores === "" || prevInitials === "") {
    return;
  }
  else {
    var listItem = document.createElement("li");
    listItem.textContent = (prevInitials + " " + prevScores);
    listEl.appendChild(listItem);
  }
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

function startGame() {
  //test
  console.log("Has the event listener worked?");//not sure if working
    //starts timer and everything else in timer function
    timer();
    //default userWin = false, not sure if necessary or desirable
    userWin = false;
    playGame();
}

function playGame() {
  //reveal div that contains questions
    questionDiv.setAttribute("style", "display:block; ");
  /*  commit and short break
  Research how buttons work in W3Schools and re-think how to do this section
  do function endGame
  commit
  do function clear
  commit
  do README
  commit
  do README screenshot
  commit
  */
    /*create form element, add to html at the div with id of choices
    should we be creating a button instead?
    There must be a button within the div that has the class of choices
    because it's been targeted in the CSS*/
    var form = document.createElement("form");
    formEl.appendChild(form);

    for (i = 0; i < questions.length; i++) {
    //sets questions by looping through array
    questionEl = questions[i].question;
    //create 4 options for inside the form, give them content, append
    var choice1 = document.createElement("option");
    var choice2 = document.createElement("option");
    var choice3 = document.createElement("option");
    var choice4 = document.createElement("options");
     /*If you can, think about changing the position of the correctAnswer
    each time; at the moment it's always the first option*/
    /*Need to change from option drop down to buttons.
    Don't know how. Buttons have input with type AND label with text.
    Create input with type radio AND label with text? So 8 additions?
    */
    choice1.textContent = questions[i].correctAnswer;
    form.appendChild(choice1);
    choice2.textContent = questions[i].wrongAnswer1;
    form.appendChild(choice2);
    choice3.textContent = questions[i].wrongAnswer2;
    form.appendChild(choice3);
    choice4.textContent = questions[i].wrongAnswer3;
    form.appendChild(choice4);
    /*addEventListener that tracks the user's choice
    and updates the variable to be used in the if statement.*/
    userChoice.addEventListener('click', function (event) {
      event.preventDefault();
      chosenAnswer = userChoice.option;/*wanted to write value
      here, but the computer would let me, kept subbing in 
      ariaValueMax...?! So I tried option instead but this is a guess.
      Might be different when changing to radio buttons anyway.
      */
    });
    if (chosenAnswer === questions[i].correctAnswer) {
      userWins();
    }
    else {
      userLoss();
    }
}}

function userWins() {
  //updates score, will be retrieved later.
  score ++;
  //activates sound - optional extra if time
  winMusic.play();
}

function userLoss() {
  secondsLeft = (secondsLeft - 10);
  //activates sound - optional extra if time
  lossMusic.play();
}

function endGame() {
  /*
  Change class of the div with id of questions back to hide
  Change class of the div with id of end-screen off being hide,
  which will open the input where the user enters initials
  Display score
  addEventListener to the submit button to take to highscores.html
  sets results in local storage
  */
}

function clear() {
  /*resets local storage - see Thursday activity 2 lines 45 to 47
  */
}

//update from last played
renderLastRegistered();

//start game when user clicks on button
start.addEventListener('click', startGame);//not yet working, don't understand why

/*Make sure to set up any variables in here 
as you go along and think about the order.
*/