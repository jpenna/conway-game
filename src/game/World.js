import styleVars from '@/styles/_variables.scss';
import Color from 'color';

import helpers from './helpers';

export default class World {
  constructor(rowNumber, colNumber) {
    this.rowNumber = rowNumber;
    this.colNumber = colNumber;

    this.initialWorld = [];
    this.currentWorld = [];
    this.nextWorld = [];

    this.playersColors = {};
    this.liveCells = new Map();

    this.hoverCol = null;
    this.hoverRow = null;

    this.spawnMove = null;

    window.addEventListener('resize', this.resizeCanvas);
  }

  // Cleanup class listener
  destruct() {
    window.removeEventListener('resize', this.resizeCanvas);
  }

  setColor(color) {
    this.playersColors.me = color;
    this.hoverColor = Color(color).lighten(0.5).hex();
    this.renderWorld();
  }

  // Initialize world and model
  create() {
    this.worldContainer = document.getElementById('worldContainer');
    this.canvas = document.getElementById('world');
    this.context = this.canvas.getContext('2d');

    this.canvas.addEventListener('mousedown', this.handleClick.bind(this));
    this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
    // this.canvas.addEventListener('mouseout', this.handleMouseOut.bind(this));

    this.resizeCanvas();

    for (let col = 0; col <= this.colNumber; col++) {
      this.initialWorld.push([]);
      this.currentWorld.push([]);
      this.nextWorld.push([]);
    }

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
      this.context.fillStyle = this.playersColors[this.initialWorld[cell[0]][cell[1]]];
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
    const [mouseX, mouseY] = helpers.getMousePosition(event, this.canvasWidth, this.canvasHeight);

    const posX = Math.floor(mouseX / this.cellSize);
    const posY = Math.floor(mouseY / this.cellSize);

    if (posX === this.hoverCol && posY === this.hoverRow) return;

    this.hoverCol = posX;
    this.hoverRow = posY;

    this.handleMovingSelection(event);
  }

  handleClick() {
    const key = `${this.hoverCol},${this.hoverRow}`;

    if (this.liveCells.has(key) && this.initialWorld[this.hoverCol][this.hoverRow] !== 'me') return;

    // Remove if has cell and is not move spawning
    if (this.liveCells.has(key) && this.spawnMove !== true) {
      this.liveCells.delete(key);
      this.initialWorld[this.hoverCol][this.hoverRow] = null;
      this.renderWorld();
    // Add if is not move killing
    } else if (this.spawnMove !== false) {
      this.liveCells.set(key, [this.hoverCol, this.hoverRow]);
      this.initialWorld[this.hoverCol][this.hoverRow] = 'me';
      this.renderWorld();
    }
  }
}
