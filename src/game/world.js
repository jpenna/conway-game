import styleVars from '@/styles/_variables.scss';

export default class World {
  constructor(rowNumber, colNumber) {
    this.rowNumber = rowNumber;
    this.colNumber = colNumber;
    this.worldModel = [];

    window.addEventListener('resize', this.resizeCanvas);
  }

  // Cleanup class listener
  destruct() {
    window.removeEventListener('resize', this.resizeCanvas);
  }

  // Initialize world and model
  create() {
    this.worldContainer = document.getElementById('worldContainer');
    this.canvas = document.getElementById('world');
    this.context = this.canvas.getContext('2d');

    this.resizeCanvas();

    for (let row = 0; row <= this.rowNumber; row++) {
      this.worldModel.push([]);
    }

    this.drawCellDelimiters();
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
  drawCellDelimiters() {
    for (let row = 0; row < this.rowNumber; row++) {
      this.drawLine({ num: row, isRow: true });
    }
    for (let col = 0; col < this.colNumber; col++) {
      this.drawLine({ num: col, isRow: false });
    }
  }

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
}
