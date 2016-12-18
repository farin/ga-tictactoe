const O = 'o';
const X = 'x';

// DOM elements
const cells = document.getElementsByClassName('cell');
const turnInfo = document.querySelectorAll('.turn-info')[0];
const turnInfoPlayer = document.querySelectorAll('.turn-info span')[0];
const winInfo = document.querySelectorAll('.win-info')[0];
const winInfoPlayer = document.querySelectorAll('.win-info span')[0];
const resetBtn = document.querySelectorAll('.reset-box a')[0];

let placed = new Array(9);
let activePlayer = O;
let gameIsRunning = true;

/* First prepare triples checked for straight winning line */

//simple helper which converts coordinates to index
const xy = (x, y) => y*3 + x;
// all possible lines checked for victiry
const rows = [];
for (let i = 0; i < 3; i++) {
  rows.push([xy(0, i), xy(1, i), xy(2, i)]); //grid rows
  rows.push([xy(i, 0), xy(i, 1), xy(i, 2)]); //grid columns
}
rows.push([xy(0, 0), xy(1, 1), xy(2, 2)]); //diagonal 1
rows.push([xy(2, 0), xy(1, 1), xy(0, 2)]); //diagonal 2

/*
// Or simply list triples manually
const rows = [[0,1,2], [0,3,6], [3,4,5], [1,4,7], [6,7,8], [2,5,8], [0,4,8], [2,4,6]];
*/

function findWinningRow(player) {
  for (const row of rows) {
    // convert list of indexes to list of values and than compare
    const values = row.map(idx => placed[idx]);
    if (values.every(v => v === player)) {
      return row
    }
    /*
    // or use Array.reduce directly
    if (row.reduce((acc, idx) => acc === placed[idx], player)) {
      return true;
    }
    */
  }
  return false;
}

function gameEnded(winRow, player) {
  for (const idx of winRow) {
    cells[idx].classList.add('win');
  }
  gameIsRunning = false;
  turnInfo.style.display = 'none';
  winInfoPlayer.className = player;
  winInfo.style.display = 'block';
}


function onCellClick(cell, idx) {
  if (gameIsRunning && cell.className === 'cell') {
    //no other class is added -> cell is empty
    cell.classList.add(activePlayer);
    placed[idx] = activePlayer;

    const winRow = findWinningRow(activePlayer);
    if (winRow) {
      gameEnded(winRow, activePlayer);
    } else {
      activePlayer = activePlayer === O ? X : O;
      turnInfoPlayer.className = activePlayer;
    }
  }
}

resetBtn.addEventListener('click', (ev) => {
  ev.preventDefault(); // cancel redirect to <A> href
  for (const cell of cells) {
    cell.className = 'cell';
  }
  placed = new Array(9);
  activePlayer = O;
  gameIsRunning = true;
  turnInfoPlayer.className = activePlayer;
  turnInfo.style.display = 'block';
  winInfo.style.display = 'none';
})

// Alternative 1 (Function.bind):

let i = 0;
for (const cell of cells) {
  /* There is many possibilities how send index to handle
      you can set attribute on DOM element and use single callback
      or use for each and bind index using closure
  */
  cell.addEventListener('click', onCellClick.bind(this, cell, i++));
}

/*
// Alternative 2 (Closure):

[...cells].forEach((cell, i) =>
  cell.addEventListener('click', (ev) => onCellClick(cell, i))
);
*/

/*
// Alternative 3 (DOM Attribute)

function handleClick(ev) {
  const cell = ev.target;
  onCellClick(cell, cell.idx);
}

let i = 0;
for (const cell of cells) {
  cell.idx = i++;
  cell.addEventListener('click', handleClick);
}
*/
