/*  --------Rules--------------
    Each turn, a player repeatedly rolls a dice until either a 1 is rolled or the player decides to "hold":
    If the player rolls a 1, they score nothing and it becomes the next player's turn.
    If the player rolls any other number, it is added to their turn total and the player's turn continues.
    If a player chooses to "hold", their turn total is added to their score, and it becomes the next player's turn.
    The first player to score 100 or more points wins!   */

var scores, activePlayer, activeGame, currScore, currDice;
document.querySelector(".dice").style.display = "none";
activeGame = 0;

function init() {
  activeGame = 1;
  activePlayer = currScore = 0;
  scores = [0, 0];
  var totalScores = document.getElementsByClassName("player-score");
  var currentScores = document.getElementsByClassName("player-current-score");
  for (var i = 0; i < totalScores.length; i++) {
    totalScores[i].textContent = scores[i];
    currentScores[i].textContent = scores[i];
  }
  document.querySelector(".dice").style.display = "none";
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-2-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.add("active");
  document.querySelector('#name-1').textContent='Player 1';
  document.querySelector('#name-2').textContent='Player 2';
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-2-panel').classList.remove('winner');
}

function moveTurn() {
    currScore = 0;
    document.getElementById("current-" + (activePlayer + 1)).textContent = 0;
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    document.querySelector(".player-1-panel").classList.toggle("active");
    document.querySelector(".player-2-panel").classList.toggle("active");
}

function checkWinner() {
    if(scores[activePlayer]>99){
        document.querySelector('.player-'+(activePlayer+1)+'-panel').classList.add('winner');
        document.querySelector('.player-'+(activePlayer+1)+'-panel').classList.remove('active');
        document.querySelector('#name-'+(activePlayer+1)).textContent='Winner!'
        activeGame=0;
    }
    else{
        moveTurn();
    }
}

document.querySelector(".new-button").addEventListener("click", init);

document.querySelector(".hold-button").addEventListener("click", function () {
  if (activeGame) {
    scores[activePlayer] += currScore;
    document.getElementById("score-" + (activePlayer + 1)).textContent =scores[activePlayer];
    checkWinner();
  }
});

document.querySelector(".roll-button").addEventListener("click", function () {
  if (activeGame) {
    currDice = Math.floor(Math.random() * 6) + 1;
    var domDice = document.querySelector(".dice");
    domDice.src = "dice-" + currDice + ".png";
    domDice.style.display = "block";
    if (currDice != 1) {
      currScore += currDice;
      document.getElementById(
        "current-" + (activePlayer + 1)
      ).textContent = currScore;
    } else {
      moveTurn();
    }
  }
});




