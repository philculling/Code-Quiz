//test links ok, is fine
console.log (1 + 2);

var listEl = document.getElementById("highscores");
//listEl is now the ordered list in the highscores.html
var question1 = document.getElementById("question-title");
//question1 is now the h2 part in the index.html

var questions = [
  {
      question: "The type of bracket used after the word if in an if statement is?",
      correctAnswer: "(",
      wrongAnswer: "[",
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
  // Fill in code here to retrieve all scores and user initials
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

}

function playGame() {
    question1 = questions[0].question;
    timer();
/*
Now we are working out how to add the multiple choices into a drop down
The activity that used a drop down was the one that changed fonts
The area that this will link to in the html is already there
It has the id, and class, if you need it, of choices. Commit first.
*/
}

renderLastRegistered();
playGame();

//Make sure to set up any variables in here 
//as you go along and think about the order.
/*
*/