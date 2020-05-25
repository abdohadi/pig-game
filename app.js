/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// All variables
var finalScores   = [0, 0], 
	currentScore  = 0,
	activePlayerNum 	= 0,
	gamePlaying   = true,
	playerPanel0  = document.getElementsByClassName('player-0-panel'),
	playerPanel1  = document.getElementsByClassName('player-1-panel'),
	playerName0   = document.getElementById('name-0'),
	playerName1   = document.getElementById('name-1'),
	playerScore0  = document.getElementById('score-0'),
	playerScore1  = document.getElementById('score-1'),
	playerCurrentScore0 = document.getElementById('current-0'),
	playerCurrentScore1 = document.getElementById('current-1'),
	diceImg1	  = document.querySelector('.dice1'),
	diceImg2	  = document.querySelector('.dice2'),
	targetScore   = 100,
	targetScoreInput 	= document.querySelector('.target-score');

// Set everything to default when clicking 'new game' button
document.querySelector('.btn-new').onclick = newGame;	// when calling a function instead of an anonymous func we don't use '()'

function newGame() {
	gamePlaying = true;
	finalScores = [0, 0];
	currentScore = 0;

	playerScore0.textContent = 0;
	playerScore1.textContent = 0;

	playerCurrentScore0.textContent = 0;
	playerCurrentScore1.textContent = 0;

	window[`playerName${activePlayerNum}`].classList.remove('winner');
	window[`playerName${activePlayerNum}`].textContent = `Player ${activePlayerNum + 1}`;
	
	activePlayerNum = 0;

	playerPanel0[0].classList.add('active');
	playerPanel1[0].classList.remove('active');

	// Hide dice imgs
	hideDice();	

	targetScore = 100;
	targetScoreInput.value = '';
}

// Show random dice when clicking 'roll dice' button 
// and add its value to 'current score' if its value isnot 1
// if its 1 then 'current score' return to 0
document.querySelector('.btn-roll').onclick = function() {
	if (gamePlaying) {
		// Set target Score
		targetScore = targetScoreInput.value ? targetScoreInput.value : 100;

		// Set a random dice number - Show a random dice img of this number
		var diceNum1 = Math.ceil(Math.random() * 6),		// form 1 to 6
			diceNum2 = Math.ceil(Math.random() * 6);		// form 1 to 6
		diceImg1.src = `dice-${diceNum1}.png`;
		diceImg2.src = `dice-${diceNum2}.png`;
		diceImg1.style.display = 'block';
		diceImg2.style.display = 'block';

		// If a player rolls two 6 in a row they looses their entire score
		if (diceNum1 == 6 && diceNum2 == 6) {
			finalScores[activePlayerNum] = 0;
			window[`playerScore${activePlayerNum}`].textContent = 0;
		} else if (diceNum1 != 1 && diceNum2 != 1) {
			currentScore += diceNum1 + diceNum2;
			window[`playerCurrentScore${activePlayerNum}`].textContent = currentScore;	
		} else {
			changePlayer();
		}
	}
}

// When clicking on 'hold' button add the active player's current score
// to their final score then make the other player active
document.querySelector('.btn-hold').onclick = function() {
	if (gamePlaying) {
		// final score of the active player
		var finalScore = finalScores[activePlayerNum] += currentScore;
		window[`playerScore${activePlayerNum}`].textContent = finalScore;

		if (finalScore >= targetScore) {
			document.getElementById('name-' + activePlayerNum).classList.add('winner');
			document.getElementById('name-' + activePlayerNum).textContent = 'Winner :)';
			
			// Hide dice imgs
			hideDice();

			gamePlaying = false;
		} else {
			changePlayer();
		}
	}
}

function changePlayer() {
	// Set current score 0
	currentScore = 0;
	window[`playerCurrentScore${activePlayerNum}`].textContent = 0;	

	// Hide dice imgs
	hideDice();
	
	// Change the active player number
	activePlayerNum = activePlayerNum === 0 ? 1 : 0;
	
	// Toggle active class
	playerPanel0[0].classList.toggle('active');
	playerPanel1[0].classList.toggle('active');
}

function hideDice() {
	diceImg1.style.display = 'none';
	diceImg2.style.display = 'none';
} 
/********
FINISHED
*/