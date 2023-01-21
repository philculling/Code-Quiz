//test linked ok
console.log (1 + 2);

var listEl = document.getElementById("highscores");
//listEl is now the ordered list

renderLastRegistered();

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
    listItem.textContent = prevInitials + prevScores;
    listEl.appendChild(listItem);
  }
}
//Make sure to set up any variables in here 
//as you go along and think about the order.