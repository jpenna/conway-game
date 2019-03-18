import styleVars from '@/styles/_variables.scss';
import Color from 'color';
import * as api from '@/api/world';
import globalEvent from '../utils/globalEvents';

import helpers from './helpers';

export default class World {
  constructor(rowNumber, colNumber, tick = 500) {
    this.rowNumber = rowNumber;
    this.colNumber = colNumber;
    this.tick = tick;
    this.isRunning = false;
    this.round = 0;
    this.duration = 0;

    this.playersColors = {};
    this.liveCells = new Map();

    this.hoverCol = null;
    this.hoverRow = null;

    this.spawnMove = null;

    this.onResize = helpers.debounce.bind(this, this.resizeCanvas.bind(this));
    window.addEventListener('resize', this.onResize);

    globalEvent.on('world:update', (update) => {
      // TODO use ID of player and get color from players list
      const map = update.reduce((acc, [key, info]) => {
        const [x, y] = key.split(',');
        acc.push([key, [+x, +y, info.color]]);
        return acc;
      }, []);
      this.liveCells = new Map(map);
      this.renderWorld();
    });
    globalEvent.on('game:start', () => {
      this.start();
    });
    globalEvent.on('game:stop', () => {
      this.stop();
    });
  }

  // Cleanup class listener
  destruct() {
    window.removeEventListener('resize', this.onResize);
  }

  // --------------- Properties ---------------
  setColor(color) {
    this.playersColors.me = color;
    this.hoverColor = Color(color).lighten(0.5).hex();
    this.renderWorld();
  }

  // --------------- Run ---------------
  start() {
    this.isRunning = true;
    this.runRound();
    this.triggerDuration();
  }

  runRound() {
    this.startTimeout = setTimeout(() => {
      this.round += 1;
      helpers.runRound(this.liveCells, this.playersColors, this.colNumber, this.rowNumber);
      this.renderWorld();
      this.runRound();
    }, this.tick);
  }

  triggerDuration() {
    this.durationTimeout = setTimeout(() => {
      this.duration += 1;
      this.triggerDuration();
    }, 1000);
  }

  stop() {
    this.isRunning = false;
    clearTimeout(this.startTimeout);
    clearTimeout(this.durationTimeout);
  }

  // --------------- Initial ---------------
  // Initialize world and model
  create() {
    this.worldContainer = document.getElementById('worldContainer');
    this.canvas = document.getElementById('world');
    this.context = this.canvas.getContext('2d');

    this.canvas.addEventListener('mousedown', this.handleClick.bind(this));
    this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
    // this.canvas.addEventListener('mouseout', this.handleMouseOut.bind(this));

    this.resizeCanvas();

    this.renderWorld();
  }

  // Resize canvas on window resize
  resizeCanvas() {
    const containerWidth = this.worldContainer.offsetWidth;
    this.canvasWidth = containerWidth;
    this.canvasHeight = containerWidth;

    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;

    this.cellSize = this.canvasWidth / this.colNumber;
    this.renderWorld();
  }

  // Draw cell horizontal and vertical borders
  renderWorld() {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    for (let row = 0; row < this.rowNumber; row++) {
      this.drawLine({ num: row, isRow: true });
    }
    for (let col = 0; col < this.colNumber; col++) {
      this.drawLine({ num: col, isRow: false });
    }

    this.hoverCell();
    this.renderLiveCells();
  }

  // --------------- Drawings ---------------
  // Draw line
  drawLine({ num, isRow }) {
    if (!num) return;
    const pos = this.cellSize * num;

    this.context.beginPath();
    if (isRow) {
      this.context.moveTo(0, pos);
      this.context.lineTo(this.canvasWidth, pos);
    } else {
      this.context.moveTo(pos, 0);
      this.context.lineTo(pos, this.canvasHeight);
    }
    this.context.strokeStyle = styleVars.worldBorderColor;
    this.context.strokeWidth = 1;
    this.context.stroke();
  }

  // Draw border for hovered cell
  hoverCell() {
    if (this.hoverCol === null && this.hoverRow === null) return;
    this.context.beginPath();
    const posX = this.hoverCol * this.cellSize;
    const posY = this.hoverRow * this.cellSize;
    this.context.strokeStyle = this.hoverColor;
    this.context.strokeRect(posX, posY, this.cellSize, this.cellSize);
  }

  // Fill cell with color
  renderLiveCells() {
    for (const [, cell] of this.liveCells) {
      this.context.beginPath();
      const posX = cell[0] * this.cellSize;
      const posY = cell[1] * this.cellSize;
      this.context.fillStyle = this.playersColors[cell[2]] || cell[2] || 'blue';
      this.context.fillRect(posX, posY, this.cellSize, this.cellSize);
    }
  }

  // --------------- Interaction ---------------
  handleMovingSelection(event) {
    if (event.buttons === 1 && this.spawnMove === null) {
      const key = `${this.hoverCol},${this.hoverRow}`;
      this.spawnMove = !this.liveCells.has(key);
    } else if (this.spawnMove !== null && event.buttons === 0) this.spawnMove = null;

    if (event.buttons === 1) return this.handleClick();
    this.renderWorld();
  }

  handleMouseMove(event) {
    // TODO Update server with world state, so it won't erase everything on player exit
    if (this.round) return;
    const [mouseX, mouseY] = helpers.getMousePosition(event, this.canvasWidth, this.canvasHeight);

    const posX = Math.floor(mouseX / this.cellSize);
    const posY = Math.floor(mouseY / this.cellSize);

    if (posX === this.hoverCol && posY === this.hoverRow) return;

    this.hoverCol = posX;
    this.hoverRow = posY;

    this.handleMovingSelection(event);
  }

  handleClick() {
    // TODO Update server with world state, so it won't erase everything on player exit
    if (this.round) return;
    const key = `${this.hoverCol},${this.hoverRow}`;

    if (this.liveCells.has(key) && this.liveCells.get(key)[2] !== 'me') return;

    // Remove if has cell and is not move spawning
    if (this.liveCells.has(key) && this.spawnMove !== true) {
      this.liveCells.delete(key);
      this.renderWorld();
    // Add if is not move killing
    } else if (this.spawnMove !== false) {
      this.liveCells.set(key, [this.hoverCol, this.hoverRow, 'me']);
      this.renderWorld();
    }
    // TODO render world only once for players change, not now and on server update
    // TODO send multiple at once instead of one by one
    api.updateWorld([{ key }]);
  }
}
