//test links ok, is fine
console.log (1 + 2);

var listEl = document.getElementById("highscores");
//listEl is now the ordered list in the highscores.html
var question1 = document.getElementById("question-title");
//question1 is now the h2 part in the index.html
var formEl = document.getElementById("choices");
//formEl is now the choices part in the index.html
var userChoice = document.getElementById("option");
/*userChoice, when selected later in the playGame function, 
should now link to the option section of the form
It might matter that option has not yet been created...*/
var start = document.getElementById("start");
//variable start now linked to the button so can now be used in eventListener

var chosenAnswer;
/*The above is undefined at the start, gets defined in the playGame function.
*/

var userWin = false;//default so that end is not triggered until user has won

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
    listItem.textContent = prevInitials + " " + prevScores;
    listEl.appendChild(listItem);
  }
}

function timer() {
//to be filled in later
}

function playGame() {
    //updates question1 to be first question from array
    question1 = questions[0].question;
    //starts timer and everything else in timer function
    timer();
    //default userWin = false, not sure if necessary or desirable
    userWin = false;

    //create form element, add to html at the div with id of choices
    var form = document.createElement("form");
    formEl.appendChild(form);
    //create two options for inside the form, give them content,
    var choice1 = document.createElement("option");
    choice1.textContent = questions[0].correctAnswer;
    form.appendChild(choice1);
    var choice2 = document.createElement("option");
    choice2.textContent = questions[0].wrongAnswer;
    form.appendChild(choice2);
    /*addEventListener that tracks the user's choice
    and updates the variable to be used in the if statement.*/
    userChoice.addEventListener('click', function (event) {
      event.preventDefault();
      chosenAnswer = userChoice.option;/*wanted to write value
      here, not ariaValueMax, but the computer would let me...?!
      Tried option instead but this is a guess.
      If this ends up being your only question seek help on Slack*/
    });
    if (chosenAnswer === questions[0].correctAnswer) {
      userWins();//function not yet created
    }
    else {
      userLoss();//function not yet created
    }
}

//update from last played
renderLastRegistered();
//start game when user clicks on button
start.addEventListener ('click', function (event) {
  event.preventDefault();
  playGame();
})

/*Make sure to set up any variables in here 
as you go along and think about the order.
*/