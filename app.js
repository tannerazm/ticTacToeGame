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

ticTacToeValidator(gameState.board)

// let Original = [[null, null, null], [null, null, null], [null, null, null]]
// let clickOriginal = [[["X","O"], ["X","O"], ["X","O"]], [["X","O"], ["X","O"], ["X","O"]], [["X","O"], ["X","O"], ["X","O"]]]
// let clickClear = [[null, null, null], [null, null, null], [null, null, null]]

// console.log (clickOriginal[0][0][0])

// let board = document.getElementById('tictactoeTable')
// let clear = document.getElementById('clearButton')
// console.log(board)

// board.addEventListener('click', (event) => {
//     console.log(event)
//     event.target.innerText = gameState.players[0]
// })

// board.addEventListener('click', (event) => {
//     console.log(event)
//     event.target.innerText = gameState.players[1]
// })

// clear.addEventListener('click', (event) => {
//     console.log(event)
//     event.target.innerText = gameState.clearGame
// })