const O = 'o';
const X = 'x';

const cells = document.getElementsByClassName('cell');
const turnInfo = document.querySelectorAll('.turn-info span')[0];

const placed = new Array(9);
let activePlayer = O;

function onCellClick(cell, idx) {
  if (cell.className === 'cell') {
    //no other class is added -> cell is empty
    cell.classList.add(activePlayer);
    activePlayer = activePlayer === O ? X : O;
    turnInfo.className = activePlayer;
  }
}

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
