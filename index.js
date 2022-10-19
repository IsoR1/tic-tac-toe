
const gameBoard = (() => {
  let gameBoard = ['', '', '', '', '', '', '', '', ''];
  
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
    gameBoard: gameBoard,
    ul: ul
  };
})();

const displayController = (() => {
  const gb = gameBoard.gameBoard
  let ul = gameBoard.ul
  
  ul.addEventListener("click", makeMove)
  ul.addEventListener("click", win)

  function makeMove(e) {
    let pos = e.target;
    let posId = e.target.id;
    
    if(validMove(e)) {
    pos.innerHTML = "X";
    gb[posId] = 'X'
    console.log(e.target)
    console.log(gb)
    }
  };

  function validMove(e) {
    if (e.target.innerHTML == '') {
      return true;
    } else {
      throw "error"
    }
  }

  function win() {
    if (gb[0] !== "" && gb[1] !== "" && gb[2] !== "" ||
        gb[0] !== "" && gb[3] !== "" && gb[6] !== "" ||
        gb[0] !== "" && gb[4] !== "" && gb[8] !== "" ||

        gb[1] !== "" && gb[4] !== "" && gb[7] !== "" ||

        gb[2] !== "" && gb[5] !== "" && gb[8] !== "" ||
        
        gb[3] !== "" && gb[4] !== "" && gb[5] !== "" ||

        gb[6] !== "" && gb[7] !== "" && gb[8] !== "" ||
        gb[6] !== "" && gb[4] !== "" && gb[2] !== ""
      ) {
        console.log("win")
        return true;
      }
  };


})()