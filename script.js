document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('resetButton');
  
    let currentPlayer = 'X';
    let boardState = Array(9).fill(null);
    let isGameActive = true;
  
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    function handleClick(event) {
      const cell = event.target;
      const cellIndex = cell.getAttribute('data-index');
  
      if (boardState[cellIndex] || !isGameActive || currentPlayer === 'O') {
        return;
      }
  
      makeMove(cell, cellIndex);
  
      if (isGameActive && currentPlayer === 'O') {
        setTimeout(makeAIMove, 500); // AI makes its move after 500ms
      }
    }
  
    function makeMove(cell, index) {
      cell.textContent = currentPlayer;
      boardState[index] = currentPlayer;
  
      if (checkWinner()) {
        alert(`${currentPlayer} wins!`);
        isGameActive = false;
      } else if (boardState.every(cell => cell)) {
        alert("It's a draw!");
        isGameActive = false;
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  
    function checkWinner() {
      return winningCombinations.some(combination => {
        return combination.every(index => {
          return boardState[index] === currentPlayer;
        });
      });
    }
  
    function resetGame() {
      currentPlayer = 'X';
      boardState.fill(null);
      cells.forEach(cell => (cell.textContent = ''));
      isGameActive = true;
    }
  
    function makeAIMove() {
      let availableCells = boardState.map((cell, index) => cell === null ? index : null).filter(val => val !== null);
      if (availableCells.length > 0) {
        let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        let aiCell = cells[randomIndex];
        makeMove(aiCell, randomIndex);
      }
    }
  
    cells.forEach(cell => cell.addEventListener('click', handleClick));
    resetButton.addEventListener('click', resetGame);
  });
  