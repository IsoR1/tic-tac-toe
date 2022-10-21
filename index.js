const player = (name, mark) => {
  let wins = 0;
  
  const addWin = () => wins++;
  const getName = () => name;
  const getWins = () => wins; 
  const getMark = () => mark;
  return { getName, addWin, getWins, getMark}
}

const gameBoard = (() => {
  let gameBoard = ['', '', '', '', '', '', '', '', ''];
  const getGameBoard = () => gameBoard;

  // cache dom
  let ul = document.querySelector(".game-ul");

  // render game board
  function renderGameBoard() {
    gameBoard.forEach(el => {
      let li = document.createElement('li');
      li.innerHTML += el;
      ul.append(li);
    })
  };

  function addId() {
    let li = document.querySelectorAll('li');
    let id = 0;

    li.forEach(el => {
      el.setAttribute('id', id);
      id++;
    })
  };
  
  renderGameBoard();
  addId();

  return {
    getGameBoard,
    ul: ul
  };
})();

// update score display

const displayController = (() =>  {
  let userOneP = document.querySelector(".u1");
  let userTwoP = document.querySelector(".u2");

  function getPlayer1Name() {
    const firstPlayerName = prompt("What is your name?");
    const firstPlayerMark = prompt("What is your mark?");
    return player1 = player(firstPlayerName, firstPlayerMark)
  }

  function getPlayer2Name() {
    const secondPlayerName = prompt("What is your name?");
    const secondPlayerMark = prompt("What is your mark?");
    return player2 = player(secondPlayerName, secondPlayerMark)
  }

  getPlayer1Name()
  getPlayer2Name()

  function renderScoreDisplay() {
    userOneP.innerHTML = `${player1.getName()} has a score of ${player1.getWins()}!`
    userTwoP.innerHTML = `${player2.getName()} has a score of ${player2.getWins()}!`
  };

  renderScoreDisplay();

  return {
    player1,
    player2,
    renderScoreDisplay,
    userOneP,
    userTwoP
  }

})()

// run game

const game = ((player1, player2) => {
  const gb = gameBoard.getGameBoard();
  const renderScoreDisplay = displayController.renderScoreDisplay;
  let ul = gameBoard.ul;
  let moveCounter = 0;


  let currentPlayer = player1;
  let roundWin = false;
  
  ul.addEventListener("click", makeMove);



  function makeMove(e) {
    let pos = e.target;
    let posId = e.target.id;



    if(validMove(e) && currentPlayer == player1) {
      pos.innerHTML = player1.getMark();
      gb[posId] = player1.getMark();
    } else if (validMove(e) && currentPlayer == player2) {
      pos.innerHTML = player2.getMark();
      gb[posId] = player2.getMark();
    } 
    moveCounter++;
    if (win()) {
      alert(`${currentPlayer.getName()} wins!`)
      reset()
      return;
    }
    
    tie()

    changePlayer();
  };
  
  function tie() {
    if (moveCounter == 9) {
      alert("It's a draw");
      reset();
    }
  }


  function validMove(e) {
    if (e.target.innerHTML == '') {
      return true;
    } else {
      throw "error";
    }
  };

  function changePlayer() {
    if (currentPlayer == player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  };

  function win() {

    if (gb[0] == currentPlayer.getMark() && gb[1] == currentPlayer.getMark() && gb[2] == currentPlayer.getMark() ||
        gb[0] == currentPlayer.getMark() && gb[3] == currentPlayer.getMark() && gb[6] == currentPlayer.getMark()||
        gb[0] == currentPlayer.getMark() && gb[4] == currentPlayer.getMark() && gb[8] == currentPlayer.getMark() ||

        gb[1] == currentPlayer.getMark() && gb[4] == currentPlayer.getMark()  && gb[7] == currentPlayer.getMark() ||

        gb[2] == currentPlayer.getMark() && gb[5] == currentPlayer.getMark() && gb[8] == currentPlayer.getMark() ||
        
        gb[3] == currentPlayer.getMark() && gb[4] == currentPlayer.getMark() && gb[5] == currentPlayer.getMark() ||

        gb[6] == currentPlayer.getMark() && gb[7] == currentPlayer.getMark() && gb[8] == currentPlayer.getMark() ||
        gb[6] == currentPlayer.getMark() && gb[4] == currentPlayer.getMark() && gb[2] == currentPlayer.getMark()  
      ) {
      currentPlayer.addWin();
      renderScoreDisplay();
      roundWin = true
      return true;
      }
  };

  function reset() {
    for (let i = 0; i < gb.length; i++) {
      gb[i] = ''
    }
    
    let li = document.querySelectorAll("li");
    li.forEach(el => {
      el.innerHTML = ''
    })

    roundWin = false;
    moveCounter = 0;
  };

})(player1, player2)
