const board = Array(9).fill(null)
let currentPlayer = 'X'
const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
]

document.querySelectorAll('.cell').forEach(cell => {
  cell.addEventListener('click', handleClick)
})

document.getElementById('restart').addEventListener('click', restartGame)

function handleClick(e) {
  const index = e.target.dataset.index
  if (board[index]) return

  board[index] = currentPlayer
  e.target.textContent = currentPlayer
  e.target.setAttribute('data-value', currentPlayer)

  if (checkWin()) {
    updateStatus(currentPlayer + ' wins! 🏆 Great job!')
    disableBoard()
  } else if (board.every(cell => cell)) {
    updateStatus("It's a draw! 🤝 Well played!")
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
    updateStatus('Next turn: ' + currentPlayer)
  }
}

function checkWin() {
  return winningCombos.some(combo =>
    combo.every(i => board[i] === currentPlayer)
  )
}

function updateStatus(message) {
  document.querySelector('.status-message').textContent = message
}

function disableBoard() {
  document.querySelectorAll('.cell').forEach(cell => {
    cell.removeEventListener('click', handleClick)
  })
}

function restartGame() {
  board.fill(null)
  currentPlayer = 'X'
  document.querySelectorAll('.cell').forEach(cell => {
    cell.textContent = ''
    cell.removeAttribute('data-value')
    cell.addEventListener('click', handleClick)
  })
  updateStatus('Next turn: ' + currentPlayer)
}
