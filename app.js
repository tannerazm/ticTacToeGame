// This is because my live server wasn't working //
// http://localhost:5500/

const gameState = {
  active: true,
  playerName: [null, null], // Updates player names as you enter them into the inputs //
  winnerName: [null, null], // Let's the game know when someone has won //
  winnerCounterX: [1], // Starts the count at 1, for player X after someone has won at least once (will update later) //
  winnerCounterO: [1], // Starts the count at 1, for player O after someone has won at least once (will update later) //
  players: ["X", "O"], // Characters that are displayed in both the HTML and the gameState.board //
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
};
let tdElement = document.getElementsByTagName("td");
let board = document.getElementById("tictactoeTable");
let resetAll = document.getElementById("resetAll");
let clear = document.getElementById("clearButton");

// If either input is null, instructions are set to display to guide players to assign themselves //

if (gameState.playerName[0] === null || gameState.playerName[1] === null) {
  winnerWinnerChickenDinner.innerHTML = `Insert Player Names Above And Push Enter or Tab <br /> If Single Player, Hit Enter or Tab On Right Input Without Typing Anything`;
  winnerWinnerChickenDinner.style.color = "#839788";
}

// ---------------------------------------------------------------------------------- //
// Returns row as an array to be checked //

function checkRow(puzzle, rowNum) {
  let boardRow = puzzle[rowNum];
  return boardRow;
}

// checkRow(gameState.board, 1);

// ---------------------------------------------------------------------------------- //
// Returns column as an array to be checked //

function checkColumn(puzzle, colNum) {
  let boardCol = [];
  for (let i = 0; i < puzzle.length; i++) {
    boardCol.push(puzzle[i][colNum]);
  }
  return boardCol;
}

// checkColumn(gameState.board, 0);

// ---------------------------------------------------------------------------------- //
// Returns forward diagonal as an array to be checked //

function checkForwardDiagonal(puzzle) {
  boardDiag = [];
  for (let i = 0; i < puzzle.length; i++) {
    boardDiag.push(puzzle[i][i]);
  }
  return boardDiag;
}

// checkForwardDiagonal(gameState.board);

// ---------------------------------------------------------------------------------- //
// Returns backward diagonal as an array to be checked //

function checkBackwardDiagonal(puzzle) {
  boardDiagTwo = [];
  for (let i = 0; i < puzzle.length; i++) {
    boardDiagTwo.push(puzzle[i][(i * 2 + 5) % 3]);
  }
  return boardDiagTwo;
}

// checkBackwardDiagonal(gameState.board);

// ---------------------------------------------------------------------------------- //
// Checks arrays above to see if any of them have a winner && converts those arrays into strings //

function checkForWin(arr) {
  for (let i = 0; i < arr.length; i++) {
    let newArray = arr.join("");
    if (newArray === "XXX") {
      gameState.winnerName[0] = gameState.playerName[0];
      winCounterX.innerHTML = `${gameState.playerName[0]} Score  =  ${gameState.winnerCounterX[0]}`;
      gameState.winnerCounterX[0]++;
      gameState.active = false;
      return true;
    } else if (newArray === "OOO") {
      gameState.winnerName[1] = gameState.playerName[1];
      winCounterO.innerHTML = `${gameState.playerName[1]} Score  =  ${gameState.winnerCounterO[0]}`;
      gameState.winnerCounterO[0]++;
      gameState.active = false;
      return true;
    } else {
      return false;
    }
  }
}

checkForWin(gameState.board);

// ---------------------------------------------------------------------------------- //
// Allows for the other functions to be ran through the checkForWin function to determine if there is a winner //

function ticTacToeValidator(checker) {
  let currentForwardDiagonal = checkForwardDiagonal(checker);
  let checksOutForwardDiagonal = checkForWin(currentForwardDiagonal);
  let currentBackwardDiagonal = checkBackwardDiagonal(checker);
  let checksOutBackwardDiagonal = checkForWin(currentBackwardDiagonal);

  if (!checksOutBackwardDiagonal) {
  }

  if (!checksOutForwardDiagonal) {
  }

  for (let i = 0; i < checker.length; i++) {
    let currentRow = checkRow(checker, i);
    let checksOut = checkForWin(currentRow);
    if (!checksOut) {
    }
  }

  for (let i = 0; i < checker.length; i++) {
    let currentCol = checkColumn(checker, i);
    let checksOut = checkForWin(currentCol);
    if (!checksOut) {
    }
  }

  if (!gameState.active) {
    if (gameState.winnerName[0]) {
      winnerWinnerChickenDinner.innerHTML = `${gameState.winnerName[0]} has won the game!`;
      winnerWinnerChickenDinner.style.color = "rgb(0,255,0)";
    }
    if (gameState.winnerName[1]) {
      winnerWinnerChickenDinner.innerHTML = `${gameState.winnerName[1]} has won the game!`;
      winnerWinnerChickenDinner.style.color = "rgb(0,255,0)";
    }
    // Changes class and allows me to update CSS based on the new class name //
    Array.from(tdElement).forEach((element) =>
      element.classList.add("theGameHasEnded")
    );
    gameState.winnerName = [null, null];
  }

  // Allows for me to check to check to see if the board is filled and displays if the board is full //

  let flatBoard = gameState.board.flat();

  if (!flatBoard.includes(null)) {
    winnerWinnerChickenDinner.innerHTML = `The board is filled, click 'Clear' to reset the game!`;
    winnerWinnerChickenDinner.style.color = "#BFD7EA";
  }
}

// ---------------------------------------------------------------------------------- //
// Allows for the game to determine who starts the game and what player they are //

function chosenPlayer() {
  let randomNumber = Math.random();
  let gameStatePlayerX = gameState.playerName[0]
  let gameStatePlayerO = gameState.playerName[1]

  if (randomNumber < 0.5 && gameState.playerName[1] !== "Computer" && gameStatePlayerX && gameStatePlayerO) {
    boardCounter = 0;
    winnerWinnerChickenDinner.innerHTML = `${gameState.playerName[0]} is currently playing.`;
    winnerWinnerChickenDinner.style.color = "#BFD7EA";
  } else if (randomNumber >= 0.5 && gameState.playerName[1] !== "Computer" && gameStatePlayerX && gameStatePlayerO) {
    boardCounter = 1;
    winnerWinnerChickenDinner.innerHTML = `${gameState.playerName[1]} is currently playing.`;
    winnerWinnerChickenDinner.style.color = "#BFD7EA";
  } else if (randomNumber < 0.5 && gameState.playerName[1] === "Computer" && gameStatePlayerX && gameStatePlayerO) {
    winnerWinnerChickenDinner.innerHTML = `${gameState.playerName[0]} is currently playing.`;
    winnerWinnerChickenDinner.style.color = "#BFD7EA";
    boardCounter = 0;
  } else if (randomNumber >= 0.5 && gameState.playerName[1] === "Computer" && gameStatePlayerX && gameStatePlayerO) {
    winnerWinnerChickenDinner.innerHTML = `${gameState.playerName[0]} is currently playing.`;
    winnerWinnerChickenDinner.style.color = "#BFD7EA";
    boardCounter = 1;
    computerPlays();
  }
}

// ---------------------------------------------------------------------------------- //
// Allows for me to press enter to officially enter the names into our arrays for player 1 and 2 //

let inputX = document.getElementById("boxX");
let inputO = document.getElementById("boxO");
let playerX = document.getElementById("playerX");
let playerO = document.getElementById("playerO");
let form = document.getElementsByTagName("form");

inputX.addEventListener("keydown", (event) => {
  if (
    (event.key === "Enter" || event.key === "Tab") &&
    inputX.value.length > 0
  ) {
    playerX.style.marginRight = "30px";
    playerX.style.fontSize = "30px";
    playerX.style.textDecoration = "underline";
    inputX.style.border = "none";
    playerX.innerHTML = inputX.value;
    inputO.style.pointerEvents = "all";
    gameState.playerName[0] = inputX.value;
    winCounterX.innerHTML = `${gameState.playerName[0]} Score  =  0`;
    if (gameState.playerName[0] && gameState.playerName[1]) {
      board.style.pointerEvents = "all";
      board.style.display = "block";
      resetAll.style.display = "block";
      clear.style.display = "block";
      chosenPlayer();
    }
  } else if (
    (event.key === "Enter" || event.key === "Tab") &&
    inputX.value.length === 0
  ) {
    inputX.style.border = "2px solid red";
    inputX.placeholder = "You must enter a name!";
  }
});

inputO.addEventListener("keydown", (event) => {
  if (
    (event.key === "Enter" || event.key === "Tab") &&
    inputO.value.length > 0
  ) {
    playerO.style.fontSize = "30px";
    playerO.style.textDecoration = "underline";
    playerO.innerHTML = inputO.value;
    gameState.playerName[1] = inputO.value;
    winCounterO.innerHTML = `${gameState.playerName[1]} Score  =  0`;
    if (gameState.playerName[0] && gameState.playerName[1]) {
      board.style.pointerEvents = "all";
      board.style.display = "block";
      resetAll.style.display = "block";
      clear.style.display = "block";
    }
    chosenPlayer();
  } else if (event.key === "Enter" || event.key === "Tab") {
    playerO.style.fontSize = "30px";
    playerO.style.textDecoration = "underline";
    playerO.innerHTML = "Computer";
    gameState.playerName[1] = "Computer";
    winCounterO.innerHTML = `${gameState.playerName[1]} Score  =  0`;
    if (gameState.playerName[0] && gameState.playerName[1]) {
      board.style.pointerEvents = "all";
      board.style.display = "block";
      resetAll.style.display = "block";
      clear.style.display = "block";
    }
    chosenPlayer();
  }
});

// ---------------------------------------------------------------------------------- //
// Allows for specific functions to occur whenever you click on a specific "cell" in the HTML //

let boardCounter = 0;

board.addEventListener("click", (event) => {
  let id = event.target.id;
  if (gameState.active) {
    if (!gameState.board[id[0]][id[1]]) {
      if (boardCounter % 2 === 0) {
        event.target.innerText = gameState.players[0];
        gameState.board[id[0]][id[1]] = gameState.players[0];
        winnerWinnerChickenDinner.innerHTML = `${gameState.playerName[1]} is currently playing.`;
        winnerWinnerChickenDinner.style.color = "#BFD7EA";
        ticTacToeValidator(gameState.board);
      }

      if (boardCounter % 2 === 1) {
        event.target.innerText = gameState.players[1];
        gameState.board[id[0]][id[1]] = gameState.players[1];
        winnerWinnerChickenDinner.innerHTML = `${gameState.playerName[0]} is currently playing.`;
        winnerWinnerChickenDinner.style.color = "#BFD7EA";
        ticTacToeValidator(gameState.board);
      }
      boardCounter++;
      // If the computer needs to play whenever the person is playing against a computer, otherwise it doesn't run //
      let includesNull = gameState.board.flat().includes(null);

      if (includesNull) {
        computerPlays();
      }

      if (!includesNull) {
        winnerWinnerChickenDinner.innerHTML = `The board is filled, click 'Clear Board' to reset the game!`;
        winnerWinnerChickenDinner.style.color = "rgb(255,0,0)";
        Array.from(tdElement).forEach((element) =>
          element.classList.add("theGameHasEnded")
        );
        gameState.winnerName = [null, null];
      }
    }
  }
});

// ---------------------------------------------------------------------------------- //
// Only happens if someone is playing a computer, allows for automatic moves to occur after the user plays //

function computerPlays() {
  let computerWin = checkForWin(gameState.board);
  if (
    boardCounter % 2 === 1 &&
    gameState.playerName[1] === "Computer" &&
    gameState.active
  ) {
    let newArr = [];

    for (let i = 0; i < 9; i++) {
      if (tdElement[i].innerText === "") {
        newArr.push(i);
      }
    }

    let randomNull = Math.floor(Math.random() * newArr.length);
    let computerId = tdElement[newArr[randomNull]].id;
    let computerChosenCell = tdElement[newArr[randomNull]];
    let computerCellInBoard = gameState.board[computerId[0]][computerId[1]];
    computerCellInBoard = gameState.players[1];
    computerChosenCell.click();

    if (computerWin) {
      winnerWinnerChickenDinner.innerHTML = `${gameState.playerName[1]} has won the game!`;
      winnerWinnerChickenDinner.style.color = "#BFD7EA";
    }
  }
}

// ---------------------------------------------------------------------------------- //
// Allows for the clear button to make adjustments to the board as well as the other
// elements that need to be cleared when the board is finished.

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

  winnerWinnerChickenDinner.innerHTML = "";

  chosenPlayer();

  Array.from(tdElement).forEach((element) =>
    element.classList.remove("theGameHasEnded")
  );
});

// ---------------------------------------------------------------------------------- //
// Completely resets the game board, names, and score when clicked by simply refreshing the page.

resetAll.addEventListener("click", () => {
  location.reload();
});
