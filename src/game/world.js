import styleVars from '@/styles/_variables.scss';
import Color from 'color';

import * as helpers from './helpers';

export default class World {
  constructor(rowNumber, colNumber) {
    this.rowNumber = rowNumber;
    this.colNumber = colNumber;
    this.worldModel = [];

    this.hoverCol = null;
    this.hoverRow = null;

    window.addEventListener('resize', this.resizeCanvas);
  }

  // Cleanup class listener
  destruct() {
    window.removeEventListener('resize', this.resizeCanvas);
  }

  setColor(color) {
    this.color = color;
    this.hoverColor = Color(color).lighten(0.5).hex();
  }

  // Initialize world and model
  create() {
    this.worldContainer = document.getElementById('worldContainer');
    this.canvas = document.getElementById('world');
    this.context = this.canvas.getContext('2d');

    // this.canvas.addEventListener('click', this.handleClick.bind(this));
    this.canvas.addEventListener('mousemove', this.handleHover.bind(this));
    // this.canvas.addEventListener('mouseout', this.handleMouseOut.bind(this));

    this.resizeCanvas();

    for (let row = 0; row <= this.rowNumber; row++) {
      this.worldModel.push([]);
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

  hoverCell() {
    if (this.hoverCol === null && this.hoverRow === null) return;
    this.context.beginPath();
    const posX = this.hoverCol * this.cellSize;
    const posY = this.hoverRow * this.cellSize;
    this.context.strokeStyle = this.hoverColor;
    this.context.strokeRect(posX, posY, this.cellSize, this.cellSize);
  }

  // --------------- Interaction ---------------
  handleHover(event) {
    const [mouseX, mouseY] = helpers.getMousePosition(event, this.canvasWidth, this.canvasHeight);

    const posX = Math.floor(mouseX / this.cellSize);
    const posY = Math.floor(mouseY / this.cellSize);

    if (posX === this.hoverCol && posY === this.hoverRow) return;

    this.hoverCol = posX;
    this.hoverRow = posY;

    // console.log(this.worldModel);
    this.renderWorld();
  }
}
