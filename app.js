const gameboard = document.querySelector('.game-board');
const solveBtn = document.getElementById('solve-btn');
const submitBtn = document.getElementById('submit-btn');
const newGameBtn = document.getElementById('newGame-btn');
const titleMessage = document.getElementById('title');
let solveClicked;
let submitClicked;
// Create list of all cells
let cells = gameboard.children;
// Create boards needed to play and solve game
const board = [
     [9, 0, 4, 0, 2, 3, 0, 8, 5],
     [8, 0, 0, 6, 0, 5, 3, 4, 0],
     [0, 3, 0, 0, 0, 0, 0, 0, 2],
     [0, 0, 8, 3, 5, 1, 7, 9, 6],
     [1, 7, 5, 0, 0, 6, 0, 3, 4],
     [0, 9, 3, 2, 0, 7, 0, 5, 0],
     [0, 0, 9, 8, 7, 2, 0, 1, 0],
     [0, 1, 6, 0, 3, 9, 0, 2, 0],
     [3, 8, 2, 0, 6, 0, 5, 7, 9],
];
let cellBoard = [
     [0, 0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0, 0],
];
let checkingBoard = [
     // This gets overwritten to copy the original board
     [0, 0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

// Start the game
startGame();
addbuttonHandlers();

// Starts and sets up the game
function startGame() {
     generateInitialBoard(board);
     handleInputs(cells);
     solveClicked = false;
     submitClicked = false;
     title.innerHTML = 'Sudoku';
     console.log('Game started!');
}

// Generates inital starting board
function generateInitialBoard(board) {
     renderBoard(board);
     copyBoards(board);
}

// Copy board to other variables to preserve original state when editing
function copyBoards(board) {
     let count = 0;
     board.forEach((row, i) => {
          row.forEach((cell, j) => {
               // Copy initial values to checkingBoard
               checkingBoard[i][j] = cell;
               // Copy Cell inputs to correctly formatted array
               cellBoard[i][j] = cells[count];
               count++;
          });
     });
}

// Renders any board
function renderBoard(board) {
     // Clear out any existing board
     gameboard.innerHTML = '';
     // Generate the game board
     board.forEach((row, i) => {
          row.forEach((cell, j) => {
               const input = document.createElement('input');
               input.setAttribute('type', 'text');

               // Set cell to readonly if it already has a value
               if (cell !== 0) {
                    input.setAttribute('readonly', true);
               }
               // Apply styles to the cell
               input.classList += 'cell';
               // Adds thick bottom border
               if (i === 2 || i === 5) {
                    input.classList += ' thick-under';
               }
               // Adds thick right border
               if (j === 2 || j === 5) {
                    input.classList += ' thick-right';
               }
               // Add initial readonly values to the cell
               if (cell === 0) {
                    input.value = '';
               } else {
                    input.value = `${cell}`;
               }
               // Add cell to game board
               gameboard.appendChild(input);
          });
     });
}

// Check the board to see if it is correct
function checkAnswer(board) {
     let result = true;
     solveBoard(checkingBoard);
     board.forEach((row, i) => {
          row.forEach((cell, j) => {
               // Check for correct answers - Change the color of cell if correct or incorrect
               if (cellBoard[i][j].readOnly) {
                    // Add no class
               } else if (
                    cell === Number(cellBoard[i][j].value) &&
                    cellBoard[i][j].value !== ''
               ) {
                    // Add .correct class to right answers
                    cellBoard[i][j].classList.toggle('correct');
               } else {
                    // Add .incorrect class to wrong answers
                    cellBoard[i][j].classList.toggle('incorrect');
                    result = false;
               }
          });
     });
     return result;
}

// Starts a new game
function newGame() {
     for (let i = 0; i < board.length; i++) {
          for (let j = 0; j < board[i].length; j++) {
               checkingBoard[i][j] = 0;
               cellBoard[i][j] = 0;
          }
     }
     // Start game
     startGame(board);
     solveClicked = false;
     submitClicked = false;
}

// Handle cell inputs
function handleInputs(cells) {
     // loop through each cell - Make sure only numbers can be typed
     for (i = 0; i < cells.length; i++) {
          cells[i].addEventListener('keydown', (e) => {
               // Allow tab to be pressed
               if (e.keycode === 9 || e.which === 9) {
                    return;
               }
               // Prevent default
               e.preventDefault();

               // Check if input is readonly
               if (e.target.readOnly) {
                    return;
               }
               // Make sure each input is a number
               const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
               const input = parseInt(e.key);
               // Only enter number if it is 1-9
               if (nums.includes(input)) {
                    e.target.value = input;
               }
               // Delete value if backspace is pressed
               if (
                    e.keycode === 8 ||
                    e.which === 8 ||
                    e.keycode === 46 ||
                    e.which === 46
               ) {
                    e.target.value = '';
               }
          });
     }
}

// Handle button clicks
function addbuttonHandlers() {
     solveBtn.addEventListener('click', () => {
          solveBoard(checkingBoard);
          console.log('-----------------------------------');
          console.log('Original Board: ', board);
          console.log('Solved Board: ', checkingBoard);
          renderBoard(checkingBoard);
          solveClicked = true;
     });

     submitBtn.addEventListener('click', (e) => {
          // Prevent submitting after clicking the solution or clicking submit twice
          if (solveClicked || submitClicked) {
               console.log('ass');
               return;
          }
          // Check players answer against the solution and update the boards styles
          let isCorrect = checkAnswer(checkingBoard);
          if (isCorrect) {
               title.innerHTML = 'Correct!';
               console.log('correct');
          } else {
               title.innerHTML = 'Incorrect!';
               console.log('incorrect');
          }
          submitClicked = true;
     });

     newGameBtn.addEventListener('click', () => {
          // Start a new game
          newGame();
     });
}

/**********************
 * Backtracking algorithm
 */

function solveBoard(board) {
     let row, col;
     let empty = getEmpty(board);
     // Returns true when the board is filled and solved
     if (!empty) {
          return true;
     } else {
          row = empty[0];
          col = empty[1];
     }
     // Make checks to see which numbers are valid
     for (let i = 1; i < 10; i++) {
          if (isValid(board, i, empty)) {
               // Set the cell to a num 1-9
               board[row][col] = i;
               // Try to solve the board
               if (solveBoard(board)) {
                    return true;
               }
               // Set the cell back to 0 if it couldnt be solved
               board[row][col] = 0;
          }
     }
     return false;
}

function isValid(board, num, pos) {
     // Check the row for num
     for (let i = 0; i < board[0].length; i++) {
          if (board[pos[0]][i] === num && pos[1] !== i) {
               // return false if num is already in row
               return false;
          }
     }
     // Check the col for num
     for (let i = 0; i < board.length; i++) {
          if (board[i][pos[1]] === num && pos[0] !== i) {
               // return false if num is already in col
               return false;
          }
     }
     // Check the box for num
     const box_x = Math.floor(pos[1] / 3);
     const box_y = Math.floor(pos[0] / 3);

     for (let i = box_y * 3; i < box_y * 3 + 3; i++) {
          for (let j = box_x * 3; j < box_x * 3 + 3; j++) {
               if (board[i][j] === num && i !== pos[0] && j !== pos[1]) {
                    // return false if num is already in box
                    return false;
               }
          }
     }
     // return true if num is a valid input
     return true;
}

// Finds empty cell - returns the [row, col]
function getEmpty(board) {
     for (let i = 0; i < board.length; i++) {
          for (let j = 0; j < board[i].length; j++) {
               if (board[i][j] === 0) {
                    // Return the coordinates for the next empty cell
                    return [i, j];
               }
          }
     }
     return false;
}

/**********************
 *
 */
