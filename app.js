// http://localhost:5500/

const gameState = {
  active: true,
  playerName: [null, null],
  winnerName: [null, null],
  winnerCounter: [1, 1],
  players: ["X", "O"],
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
};

// ---------------------------------------------------------------------------------- //

function checkRow(puzzle, rowNum) {
  let boardRow = puzzle[rowNum];
  // console.log(boardRow)
  return boardRow;
}

checkRow(gameState.board, 1);

// ---------------------------------------------------------------------------------- //

function checkColumn(puzzle, colNum) {
  let boardCol = [];
  for (let i = 0; i < puzzle.length; i++) {
    boardCol.push(puzzle[i][colNum]);
  }
  // console.log(boardCol)
  return boardCol;
}

checkColumn(gameState.board, 0);

// ---------------------------------------------------------------------------------- //

function checkForwardDiagonal(puzzle) {
  boardDiag = [];
  for (let i = 0; i < puzzle.length; i++) {
    boardDiag.push(puzzle[i][i]);
  }
  // console.log(boardDiag)
  return boardDiag;
}

checkForwardDiagonal(gameState.board);

// ---------------------------------------------------------------------------------- //

function checkBackwardDiagonal(puzzle) {
  boardDiagTwo = [];
  for (let i = 0; i < puzzle.length; i++) {
    boardDiagTwo.push(puzzle[i][(i * 2 + 5) % 3]);
  }
  // console.log(boardDiagTwo)
  return boardDiagTwo;
}

checkBackwardDiagonal(gameState.board);

// ---------------------------------------------------------------------------------- //

function checkForWin(arr) {
  for (let i = 0; i < arr.length; i++) {
    let newArray = arr.join("");
    if (newArray === "XXX") {
      // console.log('true')
      gameState.winnerName[0] = `${gameState.playerName[0]} has won the game!`;
      winCounterX.innerHTML = `X Score  =  ${gameState.winnerCounter[0]++}`
      console.log(gameState.winnerName[0]);
      gameState.active = false;
      return true;
    } else if (newArray === "OOO") {
      // console.log('false')
      gameState.winnerName[1] = `${gameState.playerName[1]} has won the game!`;
      winCounterO.innerHTML = `O Score  =  ${gameState.winnerCounter[1]++}`
      console.log(gameState.winnerName[1]);
      gameState.active = false;
      return true;
    } else {
      return false;
    }
  }
}

checkForWin(gameState.board);

// ---------------------------------------------------------------------------------- //

function ticTacToeValidator(checker) {
  let currentForwardDiagonal = checkForwardDiagonal(checker);
  let checksOutForwardDiagonal = checkForWin(currentForwardDiagonal);
  let currentBackwardDiagonal = checkBackwardDiagonal(checker);
  let checksOutBackwardDiagonal = checkForWin(currentBackwardDiagonal);

  if (!checksOutBackwardDiagonal) {
    // console.log("No Winner Backward Diagonal")
  }

  if (!checksOutForwardDiagonal) {
    // console.log("No Winner Forward Diagonal")
  }

  for (let i = 0; i < checker.length; i++) {
    let currentRow = checkRow(checker, i);
    let checksOut = checkForWin(currentRow);
    if (!checksOut) {
      // console.log("No Winner Row", i)
    }
  }

  for (let i = 0; i < checker.length; i++) {
    let currentCol = checkColumn(checker, i);
    let checksOut = checkForWin(currentCol);
    if (!checksOut) {
      // console.log("No Winner Column", i)
    }
  }
  // let counter = 0
  if (!gameState.active) {
    console.log("The game is over!");
    if (gameState.winnerName[0]) {
      // winCounterX.innerHTML = `X Score  =  ${counter}`
      winnerWinnerChickenDinner.innerHTML = `${gameState.playerName[0]} (X) has won the game!`;
      winnerWinnerChickenDinner.style.color = "#BFD7EA"
    }
    if (gameState.winnerName[1]) {
      // winCounterO.innerHTML = `O Score  =  ${counter}`
      winnerWinnerChickenDinner.innerHTML = `${gameState.playerName[1]} (O) has won the game!`;
      winnerWinnerChickenDinner.style.color = "#BFD7EA"
    }
    gameState.winnerName = [null, null]
  }

  // counter++
  let flatBoard = gameState.board.flat();

  if (!flatBoard.includes(null)) {
    winnerWinnerChickenDinner.innerHTML = `The board is filled, click 'Clear' to reset the game!`
    winnerWinnerChickenDinner.style.color = "red"
    console.log("The board is filled, click 'Clear' to reset the game!");
  }
}

// ---------------------------------------------------------------------------------- //

let inputX = document.getElementById("boxX");
let inputO = document.getElementById("boxO");
let playerX = document.getElementById("playerX");
let playerO = document.getElementById("playerO");
let form = document.getElementsByTagName("form");

inputX.addEventListener("keypress", (event) => {
  if (event.key === "Enter" && inputX.value.length > 0) {
    inputX.style.display = "none";
    playerX.style.marginRight = "30px";
    playerX.style.fontSize = "30px";
    playerX.style.textDecoration = "underline";
    playerX.innerHTML = "Player X - " + inputX.value;
    gameState.playerName[0] = inputX.value;
    console.log(gameState.playerName);
  } else if (event.key === "Enter") {
    inputX.style.display = "none";
    playerX.style.marginRight = "30px";
    playerX.style.fontSize = "30px";
    playerX.style.textDecoration = "underline";
    playerX.innerHTML = "Player X - Computer";
    gameState.playerName[0] = "Computer";
    console.log(gameState.playerName);
  }
});

inputO.addEventListener("keypress", (event) => {
  if (event.key === "Enter" && inputO.value.length > 0) {
    inputO.style.display = "none";
    playerO.style.fontSize = "30px";
    playerO.style.textDecoration = "underline";
    playerO.innerHTML = "Player O - " + inputO.value;
    gameState.playerName[1] = inputO.value;
    console.log(gameState.playerName);
  } else if (event.key === "Enter") {
    inputO.style.display = "none";
    playerO.style.fontSize = "30px";
    playerO.style.textDecoration = "underline";
    playerO.innerHTML = "Player O - Computer";
    gameState.playerName[1] = "Computer";
    console.log(gameState.playerName);
  }
});

// ---------------------------------------------------------------------------------- //

let board = document.getElementById("tictactoeTable");
let clear = document.getElementById("clearButton");
let boardCounter = 0;

board.addEventListener("click", (event) => {
  let id = event.target.id;
  if (gameState.active) {
    if (!gameState.board[id[0]][id[1]]) {
      if (boardCounter % 2 === 0) {
        event.target.innerText = gameState.players[0];
        gameState.board[id[0]][id[1]] = gameState.players[0];
        ticTacToeValidator(gameState.board);
      }
      if (boardCounter % 2 === 1) {
        event.target.innerText = gameState.players[1];
        gameState.board[id[0]][id[1]] = gameState.players[1];
        ticTacToeValidator(gameState.board);
      }
      console.log(gameState.board);
      boardCounter++;
    }
  }
});

// ---------------------------------------------------------------------------------- //
let counter = 0
clear.addEventListener("click", () => {
  [...document.querySelectorAll("td")].forEach(
    (tdDomElement) => (tdDomElement.innerHTML = "")
  );

  gameState.board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  gameState.active = true;

  winnerWinnerChickenDinner.innerHTML = ''

});

// ---------------------------------------------------------------------------------- //