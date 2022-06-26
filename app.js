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

// ---------------------------------------------------------------------------------- //
// Returns row as an array to be checked //

function checkRow(puzzle, rowNum) {
  let boardRow = puzzle[rowNum];
  return boardRow;
}

checkRow(gameState.board, 1);

// ---------------------------------------------------------------------------------- //
// Returns column as an array to be checked //

function checkColumn(puzzle, colNum) {
  let boardCol = [];
  for (let i = 0; i < puzzle.length; i++) {
    boardCol.push(puzzle[i][colNum]);
  }
  return boardCol;
}

checkColumn(gameState.board, 0);

// ---------------------------------------------------------------------------------- //
// Returns forward diagonal as an array to be checked //

function checkForwardDiagonal(puzzle) {
  boardDiag = [];
  for (let i = 0; i < puzzle.length; i++) {
    boardDiag.push(puzzle[i][i]);
  }
  return boardDiag;
}

checkForwardDiagonal(gameState.board);

// ---------------------------------------------------------------------------------- //
// Returns backward diagonal as an array to be checked //

function checkBackwardDiagonal(puzzle) {
  boardDiagTwo = [];
  for (let i = 0; i < puzzle.length; i++) {
    boardDiagTwo.push(puzzle[i][(i * 2 + 5) % 3]);
  }
  return boardDiagTwo;
}

checkBackwardDiagonal(gameState.board);

// ---------------------------------------------------------------------------------- //
// Checks arrays above to see if any of them have a winner && converts those arrays into strings //

function checkForWin(arr) {
  for (let i = 0; i < arr.length; i++) {
    let newArray = arr.join("");
    if (newArray === "XXX") {
      gameState.winnerName[0] = `${gameState.playerName[0]} has won the game!`;
      winCounterX.innerHTML = `X Score  =  ${gameState.winnerCounterX[0]++}`;
      gameState.active = false;
      return true;
    } else if (newArray === "OOO") {
      gameState.winnerName[1] = `${gameState.playerName[1]} has won the game!`;
      winCounterO.innerHTML = `O Score  =  ${gameState.winnerCounterO[0]}`;
      gameState.winnerCounterO[0]++
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
      winnerWinnerChickenDinner.innerHTML = gameState.winnerName[0];
    }
    if (gameState.winnerName[1]) {
      console.log(gameState.winnerName[1])
      winnerWinnerChickenDinner.innerHTML = gameState.winnerName[1];
    }
    // Changes class and allows me to update CSS based on the new class name //
    Array.from(tdElement).forEach((element) => element.classList.add('theGameHasEnded'))
    gameState.winnerName = [null, null];
  }

  // Allows for me to check to check to see if the board is filled and displays if the board is full //
  let flatBoard = gameState.board.flat();

  if (!flatBoard.includes(null)) {
    winnerWinnerChickenDinner.innerHTML = `The board is filled, click 'Clear' to reset the game!`;
  }
}

// ---------------------------------------------------------------------------------- //
// Allows for the game to determine who starts the game and what player they are //

function chosenPlayer() {
  if (Math.random() < 0.5) {
    boardCounter = 0
    winnerWinnerChickenDinner.innerHTML = `${gameState.playerName[0]} is currently playing.`
  }
  else {
    boardCounter = 1
    winnerWinnerChickenDinner.innerHTML = `${gameState.playerName[1]} is currently playing.`
  }
}

// ---------------------------------------------------------------------------------- //
// Allows for me to press enter to officially enter the names into our arrays for player 1 and 2 //

let inputX = document.getElementById("boxX");
let inputO = document.getElementById("boxO");
let playerX = document.getElementById("playerX");
let playerO = document.getElementById("playerO");
let form = document.getElementsByTagName("form");

inputX.addEventListener("keypress", (event) => {
  if (event.key === "Enter" && inputX.value.length > 0) {
    playerX.style.marginRight = "30px";
    playerX.style.fontSize = "30px";
    playerX.style.textDecoration = "underline";
    playerX.innerHTML = inputX.value;
    gameState.playerName[0] = inputX.value;
  } 
});

inputO.addEventListener("keypress", (event) => {
  if (event.key === "Enter" && inputO.value.length > 0) {
    playerO.style.fontSize = "30px";
    playerO.style.textDecoration = "underline";
    playerO.innerHTML = inputO.value;
    gameState.playerName[1] = inputO.value;
    chosenPlayer()
  } 
  else if (event.key === "Enter") {
    playerO.style.fontSize = "30px";
    playerO.style.textDecoration = "underline";
    playerO.innerHTML = "Computer";
    gameState.playerName[1] = "Computer";
  }
});


// ---------------------------------------------------------------------------------- //
// Allows for specific functions to occur whenever you click on a specific "cell" in the HTML //

let board = document.getElementById("tictactoeTable");
let tdElement = document.getElementsByTagName('td');
let boardCounter = 0

board.addEventListener("click", (event) => {
  let id = event.target.id;

  if(gameState.active)  {
  if (!gameState.board[id[0]][id[1]]) {
      if(boardCounter % 2 === 0){
          event.target.innerText = gameState.players[0];
          gameState.board[id[0]][id[1]] = gameState.players[0];
          winnerWinnerChickenDinner.innerHTML = `${gameState.playerName[0]} is currently playing.`
          ticTacToeValidator(gameState.board);
      }

      if(boardCounter % 2 === 1){
        event.target.innerText = gameState.players[1];
        gameState.board[id[0]][id[1]] = gameState.players[1];
        winnerWinnerChickenDinner.innerHTML = `${gameState.playerName[1]} is currently playing.`
        ticTacToeValidator(gameState.board);
    }
    boardCounter++;
    // If the computer needs to play whenever the person is playing against a computer, otherwise it doesn't run //
    computerPlays()
    }
  }
  });

// ---------------------------------------------------------------------------------- //
// Only happens if someone is playing a computer, allows for automatic moves to occur after the user plays //

function computerPlays() {

if (boardCounter % 2 === 1 && gameState.playerName[1] === 'Computer' && gameState.active) {
  winnerWinnerChickenDinner.innerHTML = `${gameState.playerName[0]} is currently playing.`
  let newArr = []
  for (let i = 0; i < 9; i++){
    if(tdElement[i].innerText === ''){
    newArr.push(i)
    }
  }

  let randomNull = Math.floor(Math.random() * newArr.length)
  let computerId = tdElement[newArr[randomNull]].id
  let computerChosenCell = tdElement[newArr[randomNull]]
  let computerCellInBoard = gameState.board[computerId[0]][computerId[1]]
  computerCellInBoard = gameState.players[1] 
  computerChosenCell.click()
  winnerWinnerChickenDinner.innerHTML = `${gameState.playerName[0]} is currently playing.`
  ticTacToeValidator(gameState.board);
}
}

// ---------------------------------------------------------------------------------- //
// Allows for the clear button to make adjustments to the board as well as the other
// elements that need to be cleared when the board is cleared. //

let clear = document.getElementById("clearButton");
let counter = 0;
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

  boardCounter = 0

  winnerWinnerChickenDinner.innerHTML = "";
  winnerWinnerChickenDinner.style.color = "BFD7EA";

  Array.from(tdElement).forEach((element) => element.classList.remove('theGameHasEnded'))
});

// ---------------------------------------------------------------------------------- //
