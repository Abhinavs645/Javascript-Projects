'use strict';

const secretNumber = Math.trunc(Math.random() * 20) + 1;
let StartingScore = 20;
let Highscore = document.cookie ? Number(document.cookie) : 0;
document.querySelector('.highscore').textContent = Highscore;

document.querySelector('.number').textContent = '?';

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  //Upon wrong input
  if (!guess) {
    displayMessage('message', '🛑 Wrong Number');
  }

  //When the guess is correct
  else if (guess === secretNumber) {
    displayMessage('message', '🎉 Correct Number');
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('.number').style.width = '30rem';

    if (Highscore < StartingScore) {
      Highscore = StartingScore;
      document.querySelector('.highscore').textContent = Highscore;
      document.cookie = `${Highscore}`;
    }
  }

  //Upon wrong but accepted input
  else {
    displayMessage(
      'message',
      guess > secretNumber ? '📈 Too High!' : '📉 Too Low!'
    );

    StartingScore--;
    document.querySelector('.score').textContent = StartingScore;
  }

  if (StartingScore === 0) {
    displayMessage('message', "😭 You've lost the game");
  }
});

document.querySelector('.again').addEventListener('click', function () {
  window.location.reload();
});

function displayMessage(IDElement, MessageToBeDisplayed) {
  document.querySelector(
    `.${IDElement}`
  ).textContent = `${MessageToBeDisplayed}`;
}
