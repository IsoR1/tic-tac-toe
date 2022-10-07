


(function() {

    let gameBoard = {
        gameBoard:  ['','', '',
                     '','', '',
                     '','', ''],
        init: function() {
            this.cacheDom();
            this.renderGameBoard();
            this.bindEvents();
        },
        cacheDom: function() {
            this.ul = document.querySelector(".game-ul")
        },
        renderGameBoard: function() {
            let board = {
                gameBoard: this.gameBoard,
            };
            let id = 0;
            board.gameBoard.forEach(el => { 
                this.li = document.createElement("li");
                this.li.setAttribute("id", id);
                id++;
                this.li.innerHTML += el;
                this.ul.append(this.li);
             });
        },
        bindEvents: function() {
            this.ul.addEventListener("click", this.makeMove.bind(this));
            this.ul.addEventListener("click", this.win.bind(this))
        },
        makeMove: function(e) {
            let board = {
                gameBoard: this.gameBoard,
            }

            if (this.validMove(e)) {
                let pos = e.target
                let posId = e.target.id;
                board.gameBoard[posId] = 'X'
                pos.innerHTML = 'X';
            } else {
                throw 'ERROR'
            }
        },
        validMove: function(e) {
            if (e.target.innerHTML == '') {
                return true;
            } else {
                return false;
            }
        },
        win() {
            let board = {
                gameBoard: this.gameBoard
            }
            if (board.gameBoard[0] !== '' && board.gameBoard[1] !== '' && board.gameBoard[2] !== '' ||
                board.gameBoard[3] !== '' && board.gameBoard[4] !== '' && board.gameBoard[5] !== '' ||
                board.gameBoard[6] !== '' && board.gameBoard[7] !== '' && board.gameBoard[8] !== '' ||
                board.gameBoard[0] !== '' && board.gameBoard[3] !== '' && board.gameBoard[6] !== '' ||
                board.gameBoard[1] !== '' && board.gameBoard[4] !== '' && board.gameBoard[7] !== '' ||
                board.gameBoard[2] !== '' && board.gameBoard[5] !== '' && board.gameBoard[8] !== '' ||
                board.gameBoard[0] !== '' && board.gameBoard[4] !== '' && board.gameBoard[8] !== '' ||
                board.gameBoard[6] !== '' && board.gameBoard[4] !== '' && board.gameBoard[2] !== '' ||
                board.gameBoard[6] !== '' && board.gameBoard[4] !== '' && board.gameBoard[2] !== '' ) {
                console.log("s")
                return true;
            }
        },
        test: function() {
            let board = {
                gameBoard: this.gameBoard,
            }
            if (board.gameBoard[0] !== '' && board.gameBoard[1] !== '' && board.gameBoard[2] !== '') {
                return true;
            }
        }
    }
    gameBoard.init();
})()