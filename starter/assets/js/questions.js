//test links ok, is fine
console.log (1 + 2);

var listEl = document.getElementById("highscores");
//listEl is now the ordered list in the highscores.html
var questionEl = document.getElementById("question-title");
//questionEl is now the h2 part in the index.html
var formEl = document.getElementById("choices");
//formEl is now the choices part in the index.html
var userChoice = document.getElementById("option");
/*userChoice, when selected later in the playGame function, 
should now link to the option section of the form*/
var start = document.getElementById("start");
//start now linked to the button so can now be used in eventListener

var chosenAnswer;
/*The above is undefined at the start, gets defined in the playGame function.
*/

var userWin = false;//default so that end is not triggered until user has won
var score = 0;//tracks score, adds when userWins
var winMusic = new Audio ("correct.wav");//unlikely to work, come back to it
var lossMusic = new Audio ("incorrect.wav");//Sim.
var timer = 75;

var questions = [
  {
      question: "The type of bracket used after the word if in an if statement is?",
      correctAnswer: "parentheses, as in: (",
      wrongAnswer: "square brackets, as in [",
  },
  {
      question: "A function within an object is called?",
      correctAnswer: "a method",
      wrongAnswer: "a sub-function",
  },
  {
      question: "Arrays in JavaScript can be used to store...?",
      correctAnswer: "other arrays",
      wrongAnswer: "html",
  }//Add more later, make this 5 questions with 4 choices each
  //If you can, think about changing the position of the correctAnswer
  //each time
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
    listItem.textContent = prevInitials + " " + prevScores;
    listEl.appendChild(listItem);
  }
}

function timer() {
/*to be filled in later
You've got a variable above called timer.
You've set it to be 75.
You have NOT yet linked it to where it should display in the html.
You have made userLoss subtract 10 from it.
*/
}

function startGame() {
    //starts timer and everything else in timer function
    timer();
    //default userWin = false, not sure if necessary or desirable
    userWin = false;
    playGame();
}

function playGame() {
    //create form element, add to html at the div with id of choices
    var form = document.createElement("form");
    formEl.appendChild(form);

    for (i = 0; i < questions.length; i++) {
    //sets first question
    questionEl = questions[i].question;
    //create two options for inside the form, give them content, append
    var choice1 = document.createElement("option");
    choice1.textContent = questions[i].correctAnswer;
    form.appendChild(choice1);
    var choice2 = document.createElement("option");
    choice2.textContent = questions[i].wrongAnswer;
    form.appendChild(choice2);
    /*addEventListener that tracks the user's choice
    and updates the variable to be used in the if statement.*/
    userChoice.addEventListener('click', function (event) {
      event.preventDefault();
      chosenAnswer = userChoice.option;/*wanted to write value
      here, but the computer would let me, kept subbing in 
      ariaValueMax...?! So I tried option instead but this is a guess.
      */
    });
    if (chosenAnswer === questions[i].correctAnswer) {
      userWins();
    }
    else {
      userLoss();//function not yet created
    }
}}

function userWins() {
  //updates score, will be retrieved later.
  score ++;
  //activates sound - optional extra if time
  winMusic.play();
}

function userLoss() {
  timer = timer - 10;
  //activates sound - optional extra if time
  lossMusic.play();
}

//update from last played
renderLastRegistered();
//start game when user clicks on button
start.addEventListener ('click', startGame);//not yet working, don't understand why yet

/*Make sure to set up any variables in here 
as you go along and think about the order.
*/