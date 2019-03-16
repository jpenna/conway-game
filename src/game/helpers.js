/* eslint-disable no-nested-ternary */
import Color from 'color';

// --------------- Utils ---------------
function debounce(method) {
  clearTimeout(this.debounceTimeout);
  this.debounceTimeout = setTimeout(method, 100);
}

function getMousePosition(event, maxWidth, maxHeight) {
  const { offsetX, offsetY } = event;

  const mouseX = offsetX <= 0 ? 0 : (offsetX >= maxWidth ? (maxWidth - 1) : offsetX);
  const mouseY = offsetY <= 0 ? 0 : (offsetY >= maxHeight ? (maxHeight - 1) : offsetY);

  return [mouseX, mouseY];
}

// --------------- Game ---------------
function checkSurvivals(liveCells, deadCells, killCells, playersColors, posX, posY, color) {
  let countNeighbors = 0;
  for (let i = -1; i < 2; i++) {
    const neighborX = posX + i;
    for (let j = -1; j < 2; j++) {
      if (!j && !i) continue; // eslint-disable-line no-continue
      const neighborY = posY + j;
      const key = `${neighborX},${neighborY}`;
      // Count live neighbors
      if (liveCells.has(key)) countNeighbors += 1;
      // If not alive, add neighbor to list of dead cells
      else {
        const [,, count = 0, colorsArray = []] = deadCells.get(key) || [];
        colorsArray.push(playersColors[color] || color);
        deadCells.set(key, [neighborX, neighborY, count + 1, colorsArray]);
      }
    }
  }
  // Should die (under-population or overcrowded)
  if (countNeighbors < 2 || countNeighbors > 3) killCells.add(`${posX},${posY}`);
}

function runRound(liveCells, playersColors, maxCol, maxRow) {
  const deadCells = new Map();
  const killCells = new Set();
  for (const [, cell] of liveCells) {
    checkSurvivals(liveCells, deadCells, killCells, playersColors, cell[0], cell[1], cell[2]);
  }

  // Check which dead cells should be alive
  for (const [key, info] of deadCells) {
    const [x, y, count, colorsArray] = info;
    if (count === 3 && x >= 0 && y >= 0 && x < maxCol && y < maxRow) {
      // Mix colors of the neighbor cells (the saviors)
      const mixColor = colorsArray
        .reduce((acc, color, index) => {
          if (!index) return Color(color);
          return acc.mix(Color(color));
        }, '')
        .hex();
      liveCells.set(key, [+x, +y, mixColor]);
    }
  }

  // Kill cells which didn't survive
  for (const cell of killCells) {
    liveCells.delete(cell);
  }
}

// TODO Find out how to stub when doing `export function...` and `import * as helpers`
export default {
  getMousePosition,
  runRound,
  debounce,
};
