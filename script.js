let currentPlayer = 'X';
let gameActive = false;
const board = document.getElementById('board');
const status = document.getElementById('status');
let cells = [];

// Function to create fireworks
function createFireworks() {
  const fireworksContainer = document.createElement('div');
  fireworksContainer.classList.add('fireworks-container');
  document.body.appendChild(fireworksContainer);

  for (let i = 0; i < 30; i++) {
    const firework = document.createElement('div');
    firework.classList.add('firework');
    fireworksContainer.appendChild(firework);

    const xPos = Math.random() * window.innerWidth;
    const yPos = Math.random() * window.innerHeight;
    firework.style.left = `${xPos}px`;
    firework.style.top = `${yPos}px`;
  }

  setTimeout(() => {
    fireworksContainer.remove();
  }, 2000);
}

// Create the game board
function createBoard() {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-index', i);
    cell.addEventListener('click', handleCellClick);
    cells.push(cell);
    board.appendChild(cell);
  }
}

// Start a new game
function startGame() {
  cells.forEach(cell => {
    cell.textContent = '';
  });
  gameActive = true;
  currentPlayer = 'X';
  status.textContent = "Player X's turn";
}

// Handle cell click
function handleCellClick(e) {
  const clickedCell = e.target;
  const clickedIndex = clickedCell.getAttribute('data-index');

  if (!gameActive || cells[clickedIndex].textContent !== '') return;

  cells[clickedIndex].textContent = currentPlayer;
  
  if (checkWin()) {
    gameActive = false;
    status.textContent = `Player ${currentPlayer} wins!`;
    createFireworks(); // Trigger fireworks on win
    return;
  }

  if (checkDraw()) {
    gameActive = false;
    status.textContent = 'It\'s a draw!';
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `Player ${currentPlayer}'s turn`;
}

// Check for a win
function checkWin() {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winConditions.some(combination => {
    const [a, b, c] = combination;
    return cells[a].textContent !== '' &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent;
  });
}

// Check for a draw
function checkDraw() {
  return cells.every(cell => cell.textContent !== '');
}

createBoard();
startGame();
