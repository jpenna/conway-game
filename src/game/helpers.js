/* eslint-disable no-nested-ternary */

// --------------- Utils ---------------
function getMousePosition(event, maxWidth, maxHeight) {
  const { offsetX, offsetY } = event;

  const mouseX = offsetX <= 0 ? 0 : (offsetX >= maxWidth ? (maxWidth - 1) : offsetX);
  const mouseY = offsetY <= 0 ? 0 : (offsetY >= maxHeight ? (maxHeight - 1) : offsetY);

  return [mouseX, mouseY];
}

// --------------- Game ---------------
function checkSurvivals(liveCells, deadCells, killCells, posX, posY) {
  let countNeighbors = 0;
  for (let i = -1; i < 2; i++) {
    const neighborX = posX + i;
    for (let j = -1; j < 2; j++) {
      if (!j && !i) continue; // eslint-disable-line no-continue
      const neighborY = posY + j;
      if (posX === 1 && posY === 2) console.log(neighborX, neighborY, 'count:', countNeighbors)

      const key = `${neighborX},${neighborY}`;
      if (liveCells.has(key)) countNeighbors += 1;
      if (posX === 1 && posY === 2) console.log('count:', countNeighbors)
      else deadCells.set(key, (deadCells.get(key) || 0) + 1);
    }
  }

  // Should die (under-population or overcrowded)
  if (countNeighbors < 2 || countNeighbors > 3) killCells.add(`${posX},${posY}`);
}

function runRound(liveCells) {
  const deadCells = new Map();
  const killCells = new Set();
  for (const [, cell] of liveCells) {
    checkSurvivals(liveCells, deadCells, killCells, cell[0], cell[1]);
  }

  for (const [key, count] of deadCells) {
    const coords = key.split(',');
    if (count === 3) liveCells.set(key, coords);
  }

  for (const cell of killCells) {
    liveCells.delete(cell);
  }
  console.log(liveCells)
}

// TODO Find out how to stub when doing `export function...` and `import * as helpers`
export default {
  getMousePosition,
  runRound,
};
