'use strict';

let gamePlaying = true;

//----------------Selecting Elements from the Page----------------
//Get score objects of both players
const score1 = document.getElementById('score--1');
const score2 = document.getElementById('score--2');
const current1 = document.getElementById('current--1');
const current2 = document.getElementById('current--2');

const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');

//Get player objects
const player1 = document.querySelector('.player--1');
const player2 = document.querySelector('.player--2');

// Get the dice element
const dice = document.querySelector('.dice');

//----------------Initializing Values----------------
//Reset Score back to 0
score1.textContent = 0;
score2.textContent = 0;

//Hide dice at the start
dice.classList.add('hidden');

//Set up the winning score
let finalScore = 10;
let scores = [0, 0];

//Set up the active player
let activePlayer = 0;

//Initializing all the dice values to zero
let currentScore = 0;

//Add a event to roll the dice
btnRoll.addEventListener('click', function () {
  if (gamePlaying) {
    let randomNumber = Math.floor(Math.random() * 6) + 1;

    //Display the dice
    dice.classList.remove('hidden');
    dice.src = `dice-${randomNumber}.png`;

    if (randomNumber === 1) {
      switchActivePlayer();
    } else {
      currentScore += randomNumber;
      document.getElementById(`current--${activePlayer + 1}`).textContent =
        currentScore;

      checkForWinner();
    }
  }
});

function checkForWinner() {
  if (currentScore + scores[activePlayer] >= finalScore) {
    document
      .querySelector(`.player--${activePlayer + 1}`)
      .classList.add('player--winner');

    if (activePlayer === 0) {
      score1.textContent = scores[activePlayer] + currentScore;
      current1.textContent = 0;
    } else {
      score2.textContent = scores[activePlayer] + currentScore;
      current2.textContent = 0;
    }

    gamePlaying = false;
  }
}

//Switching between players
function switchActivePlayer() {
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');

  ResetCurrentScore();
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
}

function ResetPlayerScore() {
  score1.textContent = 0;
  score2.textContent = 0;
}

function ResetCurrentScore() {
  current1.textContent = 0;
  current2.textContent = 0;
}

function ResetGame() {
  currentScore = 0;
  gamePlaying = true;
  activePlayer = 0;

  //Remove Player Winner Stats
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');

  //Reset Score back to 0
  ResetPlayerScore();
  ResetCurrentScore();

  player1.classList.remove('player--active');
  player2.classList.remove('player--active');
  player1.classList.add('player--active');

  //Hide dice at the start
  dice.classList.add('hidden');
}

//Event when Hold button is clicked for the current player
btnHold.addEventListener('click', function () {
  if (gamePlaying) {
    scores[activePlayer] += currentScore;

    if (activePlayer === 0) {
      score1.textContent = scores[activePlayer];
      current1.textContent = 0;
    } else {
      score2.textContent = scores[activePlayer];
      current2.textContent = 0;
    }

    switchActivePlayer();
  }
});

//Event when New Game button is clicked
btnNewGame.addEventListener('click', function () {
  ResetGame();
  scores = [0, 0];
  activePlayer = 0;
});
