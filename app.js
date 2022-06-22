// http://localhost:5500/

const gameState = {
    players: ['x', 'o'],
    board: [
      ['X', 'X', 'O'],
      ['X', 'O', 'O'],
      ['X', 'O', 'X']
    ]
  }



// -------------------------------------------- //



  function checkRow (puzzle, rowNum) {
    let boardRow = puzzle[rowNum]
    // console.log(boardRow)
    return boardRow
  }

//   checkRow(gameState.board, 1)



// -------------------------------------------- //



  function checkColumn (puzzle, colNum) {
    let boardCol = []
    for(let i = 0; i < puzzle.length; i++) {
        boardCol.push(puzzle[i][colNum])
    }
    // console.log(boardCol)
    return boardCol
  }

// checkColumn(gameState.board, 0)



// -------------------------------------------- //



function checkForwardDiagonal (puzzle) {
    boardDiag = []
    for (let i = 0; i < puzzle.length; i++) {
        boardDiag.push(puzzle[i][i])
    }
    // console.log(boardDiag)
    return boardDiag
}

// checkForwardDiagonal(gameState.board)



// -------------------------------------------- //



function checkBackwardDiagonal (puzzle) {
    boardDiagTwo = []
    for (let i = 0; i < puzzle.length; i++) {
        boardDiagTwo.push(puzzle[i][(i * 2 + 5) % 3])
    }
    // console.log(boardDiagTwo)
    return boardDiagTwo
}

// checkBackwardDiagonal(gameState.board)



// -------------------------------------------- //



function checkForWin (arr) {
    for (let i = 0; i < arr.length; i++) {
    let newArray = arr.join('')
        if(newArray === 'XXX') {
        // console.log('true')
        return true
        }
        else if (newArray === 'OOO') {
        // console.log('false')
        return true
        }
        else {        
        return false
        }
    }
}

// checkForWin(gameState.board)



// -------------------------------------------- //



function ticTacToeValidator (checker) {
    let currentForwardDiagonal = checkForwardDiagonal(checker)
    let checksOutForwardDiagonal = checkForWin(currentForwardDiagonal)
    let currentBackwardDiagonal = checkBackwardDiagonal(checker)
    let checksOutBackwardDiagonal = checkForWin(currentBackwardDiagonal)

    if (!checksOutBackwardDiagonal) {
        console.log("No Winner Backward Diagonal")
    }

    if (!checksOutForwardDiagonal) {
        console.log("No Winner Forward Diagonal")
    }


    for (let i = 0; i < checker.length; i++) {
        let currentRow = checkRow(checker, i)
        let checksOut = checkForWin(currentRow)
        if (!checksOut) {
            console.log("No Winner Row", i)
        }
    }

    for (let i = 0; i < checker.length; i++) {
        let currentCol = checkColumn(checker, i)
        let checksOut = checkForWin(currentCol)
        if (!checksOut) {
            console.log("No Winner Column", i)
        }
    }

}

ticTacToeValidator(gameState.board)