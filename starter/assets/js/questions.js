//test links ok, is fine
console.log (1 + 2);

var listEl = document.getElementById("highscores");
//listEl is now the ordered list in the highscores.html
var question1 = document.getElementById("question-title");
//question1 is now the h2 part in the index.html
var formEl = document.getElementById("choices");
//formEl is now the choices part in the index.html

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
//to be filled in later
}

function playGame() {
    question1 = questions[0].question;//sets question 1
    timer();//starts timer and everything else in timer function
    
    //create form, add to html at the div with id of choices
    var form = document.createElement("form");
    formEl.appendChild(form);
    //create two options, give them content,
    //add to html as options of the form just created
    var choice1 = document.createElement("option");
    choice1.textContent = questions[0].correctAnswer;
    form.appendChild(choice1);
    var choice2 = document.createElement("option");
    choice2.textContent = questions[0].wrongAnswer;
    form.appendChild(choice2);

}

renderLastRegistered();
playGame();

//Make sure to set up any variables in here 
//as you go along and think about the order.
/*
*/