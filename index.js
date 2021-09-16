'use strict';
const startGameButton = document.getElementById('startGameButton');
const gameResult = document.getElementById('gameResult')
const Board = (() => {
  const board = document.querySelector('.board');
  let _boardArray = new Array(9).fill('');

  // public methods
  const setField = (playerColor, fieldIndex) => {
    if (!_boardArray[fieldIndex]){
      _boardArray[fieldIndex] = playerColor;
    }
  }

  const drawBoard = () => {
    while (board.hasChildNodes()) {
        board.removeChild(board.firstChild);
    }
    _boardArray.forEach((element, index) => {
      let field = document.createElement('div');
      field.classList.add("field");
      board.appendChild(field);
      field.id = index;
      field.innerHTML = element
      if (field.innerHTML) {
        field.style.cssText += 'pointer-events:none;'
      }
    })
  }


  const resetBoard = () => {
    _boardArray = new Array(9).fill('');
    drawBoard();
  }

  //private methods

  const gameOver = () => {
    if (_boardArray[0] !== '' && _boardArray[0] === _boardArray[1] && _boardArray[0] === _boardArray[2] ||
        _boardArray[3] !== '' && _boardArray[3] === _boardArray[4] && _boardArray[3] === _boardArray[5] ||
        _boardArray[6] !== '' && _boardArray[6] === _boardArray[7] && _boardArray[6] === _boardArray[8] ||
        _boardArray[0] !== '' && _boardArray[0] === _boardArray[3] && _boardArray[0] === _boardArray[6] ||
        _boardArray[1] !== '' && _boardArray[1] === _boardArray[4] && _boardArray[1] === _boardArray[7] ||
        _boardArray[2] !== '' && _boardArray[2] === _boardArray[5] && _boardArray[2] === _boardArray[8] ||
        _boardArray[0] !== '' && _boardArray[0] === _boardArray[4] && _boardArray[0] === _boardArray[8] ||
        _boardArray[2] !== '' && _boardArray[2] === _boardArray[4] && _boardArray[2] === _boardArray[6]
    ) {
      return true;
    }
    return false;
  }

  const draw = () => {
    return _boardArray.every(elem => elem !== '')
  }

  return { setField, drawBoard, resetBoard, board, gameOver, draw };

})();

const PlayerFactory = (playerName, playerColor) => {

  return { playerName, playerColor };


}

const Game = (() => {

  const startGame = () => {
    const player1Name = document.getElementById('player1').value;
    const player2Name = document.getElementById('player2').value;
    console.log(player1Name)
    const player1 = PlayerFactory(player1Name, 'X');
    const player2 = PlayerFactory(player2Name, 'O');
    let currentPlayer = player1;
    startGameButton.innerText = 'Reset';
    Board.resetBoard();
    // Board.drawBoard();
    Board.board.onclick = (e) => {
      Board.setField(currentPlayer.playerColor, e.target.id)
      if (e.target.className !== 'field' && e.target.innerText) {
        return
      }
      console.log(currentPlayer)
      Board.drawBoard();

      if (Board.gameOver()) {
        Board.resetBoard();
        gameResult.innerText = currentPlayer.playerName + ' wins';
        currentPlayer = player1;
        setTimeout(() => gameResult.innerText = '', 2000);
      }

      if (Board.draw()) {
        Board.resetBoard();
        gameResult.innerText = 'DRAW';
        currentPlayer = player1;
        setTimeout(() => gameResult.innerText = '', 2000);

      }

      if (currentPlayer === player1) {
        currentPlayer = player2;
      } else {
        currentPlayer = player1;
      }
    }
  }
  return { startGame }

})();


startGameButton.addEventListener('click', Game.startGame);


