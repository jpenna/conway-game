import { expect } from 'chai';
import sinon from 'sinon';
import World from '@/game/World';
import helpers from '@/game/helpers';

const getMousePositionStub = sinon.stub(helpers, 'getMousePosition').returns([100, 300]);

describe('World', () => {
  const worldSize = 50;
  const userColor = 'blue';
  let world;

  beforeEach(() => {
    world = new World(worldSize, worldSize);
    world.worldContainer = { offsetWidth: 100 };
    world.canvas = {};
    world.playersColors.me = userColor;
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
      expect(world.drawLine.callCount).to.equal(worldSize + worldSize);
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

    describe('Render live cells', () => {
      beforeEach(() => {
        world.cellSize = 2;
        world.hoverRow = 10;
        world.hoverCol = 5;
        world.renderWorld = sinon.fake();
        world.context = {
          ...world.context,
          fillRect: sinon.fake(),
        };
        world.initialWorld = new Array(worldSize).fill([]);
        world.initialWorld[world.hoverCol][world.hoverRow] = 'me';
        const key = `${world.hoverCol},${world.hoverRow}`;
        world.liveCells.set(key, [world.hoverCol, world.hoverRow]);
      });

      it('Should set the right color', () => {
        world.renderLiveCells();
        expect(world.context.fillStyle).to.equal(userColor);
      });

      it('Should draw rectangle correctly', () => {
        world.renderLiveCells();
        sinon.assert.calledWith(
          world.context.fillRect,
          world.hoverCol * world.cellSize,
          world.hoverRow * world.cellSize,
          world.cellSize,
          world.cellSize,
        );
        expect(world.context.fillStyle).to.equal(userColor);
      });
    });
  });

  describe('Interactions', () => {
    beforeEach(() => {
      world.cellSize = 2;
      world.hoverRow = 10;
      world.hoverCol = 5;
      world.renderWorld = sinon.fake();
      world.initialWorld = new Array(worldSize).fill([]);
    });

    describe('On Hover', () => {
      it('Same cell: don\'t re-render', () => {
        world.handleHover();
        world.handleHover();
        sinon.assert.calledOnce(world.renderWorld);
      });

      it('Should update hovered vars', () => {
        getMousePositionStub.returns([700, 400]);
        world.handleHover();
        expect(world.hoverCol).to.equal(350);
        expect(world.hoverRow).to.equal(200);
      });

      it('Should call re-render', () => {
        world.handleHover();
        world.hoverRow = 20;
        world.hoverCol = 50;
        world.handleHover();
        sinon.assert.calledTwice(world.renderWorld);
      });
    });

    describe('On Click', () => {
      it('Add `me` cell to Initial World if not alive', () => {
        world.handleClick();
        expect(world.initialWorld[world.hoverCol][world.hoverRow]).to.equal('me');
      });

      it('Set position of `me` live cell in liveCells map', () => {
        world.handleClick();
        expect(world.liveCells.has(`${world.hoverCol},${world.hoverRow}`)).to.be.true;
      });

      it('Remove `me` cell from Initial World if alive', () => {
        world.handleClick();
        world.handleClick();
        expect(world.initialWorld[world.hoverCol][world.hoverRow]).to.equal(null);
      });

      it('Remove `me` cell from liveCells map', () => {
        world.handleClick();
        world.handleClick();
        expect(world.liveCells.has(`${world.hoverCol},${world.hoverRow}`)).to.be.false;
      });

      it('Don\'t do anything if cell is occupied by another player', () => {
        world.initialWorld[world.hoverCol][world.hoverRow] = 'player';
        const key = `${world.hoverCol},${world.hoverRow}`;
        world.liveCells.set(key, 'set');
        world.handleClick();
        expect(world.liveCells.size).to.equal(1);
        expect(world.initialWorld[world.hoverCol][world.hoverRow]).to.equal('player');
      });

      it('Re-render canvas', () => {
        world.handleClick();
        sinon.assert.calledOnce(world.renderWorld);
      });
    });
  });
});
