// http://localhost:5500/

const gameState = {
    active: true,
    players: ['X', 'O'],
    board: [
      ['X', 'O', 'X'],
      ['O', 'X', 'O'],
      ['O', 'X', 'O']
    ],
    clearBoard: [
        [null, null, null],
        [null, null, null], 
        [null, null, null]
    ]
  }



// -------------------------------------------- //



  function checkRow (puzzle, rowNum) {
    let boardRow = puzzle[rowNum]
    // console.log(boardRow)
    return boardRow
  }

  checkRow(gameState.board, 1)



// -------------------------------------------- //



  function checkColumn (puzzle, colNum) {
    let boardCol = []
    for(let i = 0; i < puzzle.length; i++) {
        boardCol.push(puzzle[i][colNum])
    }
    // console.log(boardCol)
    return boardCol
  }

checkColumn(gameState.board, 0)



// -------------------------------------------- //



function checkForwardDiagonal (puzzle) {
    boardDiag = []
    for (let i = 0; i < puzzle.length; i++) {
        boardDiag.push(puzzle[i][i])
    }
    // console.log(boardDiag)
    return boardDiag
}

checkForwardDiagonal(gameState.board)



// -------------------------------------------- //



function checkBackwardDiagonal (puzzle) {
    boardDiagTwo = []
    for (let i = 0; i < puzzle.length; i++) {
        boardDiagTwo.push(puzzle[i][(i * 2 + 5) % 3])
    }
    // console.log(boardDiagTwo)
    return boardDiagTwo
}

checkBackwardDiagonal(gameState.board)



// -------------------------------------------- //



function checkForWin (arr) {
    for (let i = 0; i < arr.length; i++) {
    let newArray = arr.join('')
        if(newArray === 'XXX') {
        // console.log('true')
        gameState.active = false;
        return true
        }
        else if (newArray === 'OOO') {
        // console.log('false')
        gameState.active = false;
        return true
        }
        else {        
        return false
        }
    }
}

checkForWin(gameState.board)



// -------------------------------------------- //



function ticTacToeValidator (checker) {
    let currentForwardDiagonal = checkForwardDiagonal(checker)
    let checksOutForwardDiagonal = checkForWin(currentForwardDiagonal)
    let currentBackwardDiagonal = checkBackwardDiagonal(checker)
    let checksOutBackwardDiagonal = checkForWin(currentBackwardDiagonal)

    if (!checksOutBackwardDiagonal) {
        // console.log("No Winner Backward Diagonal")
    }

    if (!checksOutForwardDiagonal) {
        // console.log("No Winner Forward Diagonal")
    }


    for (let i = 0; i < checker.length; i++) {
        let currentRow = checkRow(checker, i)
        let checksOut = checkForWin(currentRow)
        if (!checksOut) {
            // console.log("No Winner Row", i)
        }
    }

    for (let i = 0; i < checker.length; i++) {
        let currentCol = checkColumn(checker, i)
        let checksOut = checkForWin(currentCol)
        if (!checksOut) {
            // console.log("No Winner Column", i)
        }
    }

    if (!gameState.active) {
        console.log("The game is over!")
    }

    let flatBoard = gameState.board.flat()
    
    if (!flatBoard.includes(null)) {
        console.log("The board is filled, click 'Clear' to reset the game!")
    }
}

// ticTacToeValidator(gameState.board)

// let Original = [[null, null, null], [null, null, null], [null, null, null]]
// let clickOriginal = [[["X","O"], ["X","O"], ["X","O"]], [["X","O"], ["X","O"], ["X","O"]], [["X","O"], ["X","O"], ["X","O"]]]
// let clickClear = [[null, null, null], [null, null, null], [null, null, null]]

let board = document.getElementById('tictactoeTable')
let clear = document.getElementById('clearButton')
let cellOne = document.getElementById('zeroZero')
let cellTwo = document.getElementById('zeroOne')
let cellThree = document.getElementById('zeroTwo')
let cellFour = document.getElementById('oneZero')
let cellFive = document.getElementById('oneOne')
let cellSix = document.getElementById('oneTwo')
let cellSeven = document.getElementById('twoZero')
let cellEight = document.getElementById('twoOne')
let cellNine = document.getElementById('twoTwo')
let boardCounter = 0

board.addEventListener('click', (event) => {

    if (boardCounter % 2 === 0) {
    event.target.innerText = gameState.players[0]
}
    if (boardCounter % 2 === 1) {
        event.target.innerText = gameState.players[1]
    }
    boardCounter++
})

clear.addEventListener('click', (clickEvent) => {
    clickEvent.target.matches('clear');
    cellOne.innerText = null;
    cellTwo.innerText = null;
    cellThree.innerText = null;
    cellFour.innerText = null;
    cellFive.innerText = null;
    cellSix.innerText = null;
    cellSeven.innerText = null;
    cellEight.innerText = null;
    cellNine.innerText = null;
})