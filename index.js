const player = (name, mark) => {
  let wins = 0;
  
  const addWin = () => wins++;
  const getName = () => name;
  const getWins = () => wins; 
  const getMark = () => mark;
  return { getName, addWin, getWins, getMark}
}

const daemon = player("Daemon", 'X');
const aemond = player("Aemond", 'O');

const gameBoard = (() => {
  let gameBoard = ['', '', '', '', '', '', '', '', ''];
  const getGameBoard = () => gameBoard;

  // const getGameBoardArr = () => Array.from("         ");
  // function getGameBoardArr() {
  //   return Array.from("         ");
  // }

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
    // getGameBoardArr,
    ul: ul
  };
})();

const displayController = ((player1, player2) => {
  const gb = gameBoard.getGameBoard();
  // const gb = gameBoard.getGameBoardArr();
  let ul = gameBoard.ul;
  let currentPlayer = player1;
  
  ul.addEventListener("click", makeMove);
  ul.addEventListener("click", win);

  function makeMove(e) {
    let pos = e.target;
    let posId = e.target.id;
    
    console.log(currentPlayer.getMark())
    
    if(validMove(e) && currentPlayer == player1) {
      // pos.innerHTML = "X";
      pos.innerHTML = player1.getMark();
      gb[posId] = player1.getMark();
      console.log(e.target);
      console.log(gb);
    } else if (validMove(e) && currentPlayer == player2) {
      pos.innerHTML = player2.getMark();
      gb[posId] = player2.getMark();
    }
    changePlayer()
  };

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
  }

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

        console.log(currentPlayer.getName())
        currentPlayer.addWin();
        console.log(currentPlayer.getWins());
        return true;
      }
  };

})(daemon, aemond)

const game = (() => {

})()