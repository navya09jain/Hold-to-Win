'use strict';
//selecting the elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1'); //this is the method of selecting elements by id.
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const gameRulesTitle = document.querySelector('.game-rules-title');
const wrapper = document.querySelector('.wrapper');

//starting conditions
score0.textContent = 0;
score1.textContent = 0;
dice.classList.add('hidden');

let currentScore = 0; //this cannot be in the  btnRoll function bacuse then it would be set to zero each time we clicked the button.
let activePlayer = 0;
let scores = [0, 0];
let gamePlay = true;

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}
//rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (gamePlay) {
    //1.generating a random number on dice
    const numberOnDice = Math.trunc(Math.random() * 6) + 1;
    //2.displaying a number on the dice
    dice.classList.remove('hidden');
    dice.src = `dice-${numberOnDice}.png`;
    //3.check if 1 appears on the dice , if yes switch to next player.
    if (numberOnDice !== 1) {
      //add number on dice to the current score
      currentScore = currentScore + numberOnDice;
      // currentScore0.textContent = currentScore;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      // document.getElementById(`current--${activePlayer}`).textContent = 0;
      // currentScore = 0;
      // activePlayer = activePlayer === 0 ? 1 : 0;
      // player0.classList.toggle('player--active');
      // player1.classList.toggle('player--active');
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  const inactivePlayer = activePlayer === 1 ? 0 : 1;
  if (gamePlay) {
    //1.add current score to the active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2.Check if player's score is >=100
    if (scores[activePlayer] >= 75) {
      //if yes , then finish the game
      gamePlay = false;
      dice.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${inactivePlayer}`)
        .classList.add('player--looser');
    } else {
      //if not ,then switch to next player
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', function () {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  score0.textContent = 0;
  score1.textContent = 0;
  gamePlay = true;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  dice.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--looser');
  player1.classList.remove('player--looser');
});
gameRulesTitle.addEventListener('click', function () {
  wrapper.classList.remove('hidden');
});

wrapper.addEventListener('click', function () {
  wrapper.classList.add('hidden');
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    wrapper.classList.add('hidden');
  }
});
