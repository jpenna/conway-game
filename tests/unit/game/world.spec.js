import { expect } from 'chai';
import sinon from 'sinon';
import World from '@/game/World';

describe('World', () => {
  const worldSide = 50;
  let world;

  beforeEach(() => {
    world = new World(worldSide, worldSide);
    world.worldContainer = { offsetWidth: 100 };
    world.canvas = {};
  });

  describe('Constructor', () => {
    it('Add `resize` event listener');

    it('On destruction, remove `resize` event listener');
  });

  describe('Initialization', () => {
    beforeEach(() => {
      world.resizeCanvas();
    });

    it('Sets canvas context');

    it('Initialize canvas size');

    it('Draw lines');

    it('Creates a squared canvas', () => {
      expect(world.canvas.width).to.equal(world.canvas.height);
    });

    it('Set correct cell size', () => {
      expect(world.cellSize).to.equal(2);
    });
  });

  describe('Delimiters', () => {
    beforeEach(() => {
      world.cellSize = 2;
      world.canvasWidth = 30;
      world.canvasHeight = 40;
      world.context = {
        beginPath: () => {},
        moveTo: sinon.fake(),
        lineTo: sinon.fake(),
        stroke: () => {},
        clearRect: sinon.fake(),

      };
    });

    it('Clears canvas before rendering', () => {
      world.renderWorld();
      sinon.assert.calledWith(world.context.clearRect, 0, 0, world.canvasWidth, world.canvasHeight);
    });

    it('Draws the correct amount of columns and row lines', () => {
      world.drawLine = sinon.fake();
      world.renderWorld();
      expect(world.drawLine.callCount).to.equal(worldSide + worldSide);
    });

    it('Draws a row line correctly', () => {
      const num = 5;
      world.drawLine({ num, isRow: true });
      sinon.assert.calledWith(world.context.moveTo, 0, num * world.cellSize);
      sinon.assert.calledWith(world.context.lineTo, world.canvasWidth, num * world.cellSize);
    });

    it('Draws a column line correctly', () => {
      const num = 5;
      world.drawLine({ num, isRow: false });
      sinon.assert.calledWith(world.context.moveTo, num * world.cellSize, 0);
      sinon.assert.calledWith(world.context.lineTo, num * world.cellSize, world.canvasHeight);
    });
  });
});
