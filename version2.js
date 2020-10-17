/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. 
After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, 
so that they can change the predefined score of 100. 
(Hint: you can read that value with the .value property in JavaScript. 
    This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. 
The player looses his current score when one of them is a 1.
 (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

/*  --------Rules--------------
    Each turn, a player repeatedly rolls a dice until either a 1 is rolled or the player decides to "hold":
    If the player rolls a 1, they score nothing and it becomes the next player's turn.
    If the player rolls any other number, it is added to their turn total and the player's turn continues.
    If a player chooses to "hold", their turn total is added to their score, and it becomes the next player's turn.
    The first player to score 100 or more points wins!   */

    var scores, activePlayer, activeGame, currScore, currDice, prev1Dice,prev2Dice;
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
      var input=document.querySelector(".score-limit").value;
        if(!input) input=100;
        if(scores[activePlayer]>=input){
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
        var prevActiveDice;
        currDice = Math.floor(Math.random() * 6) + 1;
        var domDice = document.querySelector(".dice");
        domDice.src = "dice-" + currDice + ".png";
        domDice.style.display = "block";
        if(activePlayer) prevActiveDice=prev2Dice;
        else prevActiveDice=prev1Dice;
        if(prevActiveDice==6 && currDice==6){
            scores[activePlayer] = 0;
            document.getElementById('score-'+(activePlayer+1)).textContent=0;
            moveTurn();
        }
        else{
            if (currDice != 1) {
                currScore += currDice;
                document.getElementById(
                  "current-" + (activePlayer + 1)
                ).textContent = currScore;
            }
            else {
                moveTurn();
            }
            if(activePlayer) prev2Dice=currDice;
            else prev1Dice=currDice;
        }
      }
    });
    
    
    
    