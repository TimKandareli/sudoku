const table = document.querySelector('table')
const startGame = document.querySelector('#start')
const loadSudoku = document.querySelector('#load')
const inp = document.querySelector('#inp')
let count = 0
loadSudoku.addEventListener('click', () => {
  table.style.visibility = 'visible'
  inp.style.visibility = 'hidden'
  Array.from(table.tBodies[0].children).forEach(el => {
    Array.from(el.children).map(elem => {
      elem.textContent = inp.value[count]
      if (elem.innerText === '-') {
        elem.style.backgroundColor = '#ec524b'
      }else{
        elem.style.backgroundColor = '#9ad3bc'
      }
      count++
    })
  })
})
function solve(boardString) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (boardString[row][col] === '-') {
        for (let probNum = 1; probNum <= 9; probNum++) {
          if (isSolved(boardString, row, col, probNum)) {
            boardString[row][col] = probNum
            if (solve(boardString)) {
              return boardString
            } else {
              boardString[row][col] = '-'
            }
          }
        }
        return false
      }
    }
  }
  return true
}

function isSolved(board, row, col, probNum) {
  for (let x = 0; x < board.length; x++) {
    if (board[row][x] == probNum || board[x][col] == probNum) {
      return false;
    }
  }
  const topBmin = Math.floor(row / 3) * 3
  const bottomBmax = Math.floor(row / 3) * 3 + 3
  const leftBmin = Math.floor(col / 3) * 3
  const rightBmax = Math.floor(col / 3) * 3 + 3
  for (let row = topBmin; row < bottomBmax; row++) {
    for (let col = leftBmin; col < rightBmax; col++) {
      if (board[row][col] === probNum) {
        return false
      }
    }
  }
  return true
}

function prettyBoard(board) {
  return board.match(/.{1,9}/gmi).map(el => [...el])
}
startGame.addEventListener('click', () => {
  count = 0
  Array.from(table.tBodies[0].children).forEach(el => {
    Array.from(el.children).map((elem, idx) => {
      (function (ind) {
        setTimeout(function () {
          elem.textContent = inp.value[ind]
          if (elem.innerText === '-') {
            elem.style.backgroundColor = '#ec524b'
          }else{
            elem.style.backgroundColor = '#9ad3bc'
          }
        }, 300 * ind);
      })(count);
      count++
    })
  })
  inp.value = solve(prettyBoard(inp.value)).map(el => el.join('')).join('')
})
// module.exports = {
//   solve: solve,
//   isSolved: isSolved,
//   prettyBoard: prettyBoard
// }
//
// console.table(solve(prettyBoard('3-26-9--55--73----------9-----94----------1-9----57-6---85----6--------3-19-82-4-')))
