const gameState = {
    players: ['x', 'o'],
    board: [
      ['x', 'x', 'x'],
      ['x', 'x', 'o'],
      ['x', 'o', 'o']
    ]
  }



// -------------------------------------------- //



  function checkRow (puzzle, rowNum) {
    let boardRow = puzzle[rowNum]
    console.log(boardRow)
    return boardRow
  }

  checkRow(gameState.board, 1)



// -------------------------------------------- //



  function checkColumn (puzzle, colNum) {
    let boardCol = []
    for(let i = 0; i < puzzle.length; i++) {
        boardCol.push(puzzle[i][colNum])
    }
    console.log(boardCol)
    return boardCol
  }

checkColumn(gameState.board, 0)



// -------------------------------------------- //



function checkForwardDiagonal (puzzle) {
    boardDiag = []
    for (let i = 0; i < gameState.board.length; i++) {
        boardDiag.push(gameState.board[i][i])
    }
    console.log(boardDiag)
    return boardDiag
}

checkForwardDiagonal(gameState.board)



// -------------------------------------------- //



function checkBackwardDiagonal (puzzle) {
    boardDiagTwo = []
    for (let i = 0; i < puzzle.length; i++) {
        boardDiagTwo.push(puzzle[i][(i * 2 + 5) % 3])
    }
    console.log(boardDiagTwo)
    return boardDiagTwo
}

checkBackwardDiagonal(gameState.board)



// -------------------------------------------- //



// function checkForWin (arr) {
//     for (let i = 0; i < arr.length; i++) {
//     let newArray = arr[i].join('')
//         if(newArray === 'xxx') {
//         // console.log('true')
//         return true
//         }
//         else if (newArray === 'ooo') {
//         // console.log('false')
//         return true
//         }
//         else {        
//         return false
//         }
//     }
// }

// checkForWin(gameState.board)



// -------------------------------------------- //



function ticTacToeValidator (checker) {
    for (let i = 0; i < checker.length; i++) {
        let currentRow = checkRow(checker, i)
        let checksOut = checkForWin(currentRow)
        if (!checksOut) {
            console.log("No Winner")
        }
    }

    for (let i = 0; i < checker.length; i++) {
        let currentCol = checkCol(checker, i)
        let checksOut = checkForWin(currentCol)
        if (!checksOut) {
            console.log("No Winner")
        }
    }

    for (let i = 0; i < gameState.board.length; i++) {
        let currentForwardDiagonal = checkForwardDiagonal()
        let checksOut = checkForWin(currentForwardDiagonal)
        if (!checksOut) {
            console.log("No Winner")
        }
    }

    for (let i = 0; i < gameState.board.length; i++) {
        let currentBackwardDiagonal = checkBackwardDiagonal()
        let checksOut = checkForWin(currentBackwardDiagonal)
        if (!checksOut) {
            console.log("No Winner")
        }
    }
    console.log('We have a winner')
    return true
}

ticTacToeValidator(gameState.board)