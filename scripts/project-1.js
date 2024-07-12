
let scores = JSON.parse(localStorage.getItem('scores')) ||
{
  wins: 0,
  losses: 0,
  ties: 0

};

// !scores
//  if (scores===null) {
// scores={
//  wins:0,
//  losses:0,
//  ties:0

// };
// }

//  console.log(JSON.parse(localStorage.getItem('scores')));

updateScoreElement();  

// function autoPlay(){
//   setInterval(function(){
//     const playerMove=pickcomputerMove();
//     playGame(playerMove);
//   },1000);
// }
let isAutoPlaying= false;
let intervalId;

function autoPlay() {
  if(!isAutoPlaying){
    intervalId=setInterval(function () {
      const playerMove = pickcomputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying=true;
  }else{
    clearInterval(intervalId);
    isAutoPlaying=false;
  }
  
}


document.querySelector('.js-rock-button').addEventListener('click',() => {
  playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click',() => {
  playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click',() => {
  playGame('scissors');
});

document.querySelector('.js-reset-button').addEventListener('click',() => {
  scores.wins=0;
  scores.losses=0;
  scores.ties=0;
  localStorage.removeItem('scores');
  updateScoreElement();
});

document.querySelector('.js-autoPlay-button').addEventListener('click',() => {
  autoPlay();
});

document.body.addEventListener('keydown',(event) => {
  if (event.key==='r') {
    playGame('rock');
  }else if(event.key==='p') {
    playGame('paper');
  }else{
    playGame('scissors');
  }
});



function playGame(playerMove) {
  let result = '';
  let computerMove = pickcomputerMove();
  if (playerMove === 'scissors') {

    if (computerMove === 'Rock') {
      result = 'you lose';
    } else if (computerMove === 'paper') {
      result = 'you win';
    } else {
      result = 'tie';
    }


  } else if (playerMove === 'paper') {

    if (computerMove === 'Rock') {
      result = 'you win';
    } else if (computerMove === 'paper') {
      result = 'tie';
    } else {
      result = 'you lose';
    }



  } else {
    if (computerMove === 'Rock') {
      result = 'tie';
    } else if (computerMove === 'paper') {
      result = 'you lose';
    } else {
      result = 'you win';
    }


  }

  if (result === 'you win') {
    scores.wins += 1;
  } else if (result === 'tie') {
    scores.ties += 1;
  } else {
    scores.losses += 1;
  }

  localStorage.setItem('scores', JSON.stringify(scores));

  document.querySelector('.js-result')
  .innerHTML= result;

  document.querySelector('.js-move')
  .innerHTML=`you
<img src="images/${playerMove}-emoji.png" class="emoji">
<img src="images/${computerMove}-emoji.png" class="emoji">
computer`;

  updateScoreElement();
  

//   alert(`you picked ${playerMove}. Computer picked ${computerMove}. ${result}.
// wins : ${scores.wins}, losses : ${scores.losses}, ties : ${scores.ties}`);
}

function updateScoreElement(){

    document.querySelector('.js-scores')
  .innerHTML=`wins : ${scores.wins}, losses : ${scores.losses}, ties : ${scores.ties}`;
}



function pickcomputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'Rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else {
    computerMove = 'scissors';
  }

  return computerMove;
}




