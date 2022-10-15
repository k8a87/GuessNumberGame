'use strict';

// Secret Number
const createSecretNumber = () => Math.trunc(Math.random() * 20 + 1);

//Functions to change text contents and score
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};
const updateScore = function (score) {
  document.querySelector('.score').textContent = score;
};

//Variables
const checkBtn = document.querySelector('.check');
let secretNumber = createSecretNumber();
let score = 20;
let highScore = 0;

//Function to validate guess
const runCheck = () => {
  const guess = Number(document.querySelector('.guess').value);
  //When no guess
  if (!guess) {
    displayMessage('🔞 No number!');
    // document.querySelector('.message').textContent = '🔞 No number!';

    //When player wins
  } else if (guess === secretNumber) {
    displayMessage('👍 Correct number!');
    document.querySelector('.bg-img').classList.remove('hidden');
    document.querySelector('.number').style.backgroundColor = '#52ff01';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = secretNumber;
    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }

    // When guess is different
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? ' ⬆️ Too high!' : ' ⬇️ Too low!');
      score--;
      updateScore(score);
    } else {
      displayMessage(' 💔😿 You lost the game!');
      updateScore(0);
    }
  }
};

// Setting the event listeners to click on 'Check' and by pressing Enter
checkBtn.addEventListener('click', runCheck);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    runCheck();
  }
});

//Restore all numbers and messages when clicking 'Again'
document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = createSecretNumber();
  updateScore(score);
  // document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  displayMessage('Start guessing...');
  document.querySelector('.bg-img').classList.add('hidden');
  document.querySelector('.number').style.backgroundColor = '#ffbf00';
});
