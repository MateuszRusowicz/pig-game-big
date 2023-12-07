'use strict';

//definitions
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const diceImg = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

let currentScore;
let activePlayer;
let playing;
let scores;

//Settings
//ustawienia początkowe i reset gry
const initializeGame = function () {
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  scores = [0, 0];

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
};
initializeGame();

//chowanie okienka z zasadami
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeWindow = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
overlay.addEventListener('click', closeWindow);

document.addEventListener('keydown', function () {
  if (!modal.classList.contains('hidden')) {
    closeWindow();
  }
});

//default setting - dice img hidden
diceImg.classList.add('hidden');

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

//Game mechanics
//rolling the dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.generating a random diceroll
    const diceRoll = Math.trunc(Math.random() * 6) + 1;

    //2.display the dice img
    diceImg.src = `dice-${diceRoll}.png`;
    diceImg.classList.remove('hidden');

    //3.check for rolled 1

    if (diceRoll !== 1) {
      //4.add the result to the score
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

//holding the Score
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      //gracz wygrywa
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceImg.classList.add('hidden');
    } else {
      //gra drugi gracz
      switchPlayer();
    }
  }
});

//reseting the game
btnNew.addEventListener('click', function () {
  initializeGame();
});
