import { expect } from 'chai';
import sinon from 'sinon';
import World from '@/game/World';
import helpers from '@/game/helpers';

const getMousePositionStub = sinon.stub(helpers, 'getMousePosition').returns([100, 300]);

describe('World', () => {
  const worldSide = 50;
  let world;

  beforeEach(() => {
    world = new World(worldSide, worldSide);
    world.worldContainer = { offsetWidth: 100 };
    world.canvas = {};
  });

  afterEach(() => {
    getMousePositionStub.resetHistory();
  });

  describe('Constructor', () => {
    it('Add `resize` event listener correctly');

    it('On destruction, remove `resize` event listener');

    it('Add `mouse hover` event listener correctly');
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

  describe('Renderer', () => {
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
        strokeRect: sinon.fake(),
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

    it('On hover: skip if nothing hovered', () => {
      world.hoverCell();
      sinon.assert.notCalled(world.context.strokeRect);
    });

    it('On hover: render border over the right cell', () => {
      world.hoverCol = 5;
      world.hoverRow = 10;
      const posX = world.hoverCol * world.cellSize;
      const posY = world.hoverRow * world.cellSize;
      world.hoverCell();
      sinon.assert.calledWith(world.context.strokeRect, posX, posY, world.cellSize, world.cellSize);
    });
  });

  describe('Interactions', () => {
    beforeEach(() => {
      world.cellSize = 2;
      world.hoverCol = 5;
      world.hoverRow = 10;
      world.renderWorld = sinon.fake();
    });

    it('On hover: same cell: don\'t re-render', () => {
      world.handleHover();
      world.handleHover();
      sinon.assert.calledOnce(world.renderWorld);
    });

    it('On hover: should update hovered vars', () => {
      getMousePositionStub.returns([700, 400]);
      world.handleHover();
      expect(world.hoverCol).to.equal(350);
      expect(world.hoverRow).to.equal(200);
    });

    it('On hover: should call re-render', () => {
      world.handleHover();
      world.hoverCol = 50;
      world.hoverRow = 20;
      world.handleHover();
      sinon.assert.calledTwice(world.renderWorld);
    });
  });
});
