//test linked ok
console.log (1 + 2);

renderLastRegistered();

function renderLastRegistered() {
  // Fill in code here to retrieve all scores and user initials
  var prevScores = localStorage.getItem("prevScores");
  var prevInitials = localStorage.getItem("prevInitials");
  // If they are null, return early from this function
  if (prevScores === "" || prevInitials === "") {
    return;
  }
  /* Else
  1. create a li DONE
  2. add textcontent to that list item that will use the above variable DONE
  3. append that list item to the the ol in the highscores.html
  */
  else {
    var listItem = document.createElement("li");
    li.textContent = prevInitials + prevScores;
    //document.body. want to append to ol
  }
}
//Make sure to set up any variables in here as you go along and think about the order.