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
    it('Add `resize` event listener to window');

    it('On destruction, remove `resize` event listener from window');
  });

  describe('Properties', () => {
    it('On set color, set hover color');

    it('On set color, re-render world');
  });

  describe('Run', () => {
    describe('On Start', () => {
      it('Flag `running`');
      it('Run one round');
      it('Re-render world');
      it('Schedule next run');
    });
    describe('On Stop', () => {
      it('Flag `not-running`');
      it('Clear schedule for next run');
    });
  });

  describe('Creation', () => {
    beforeEach(() => {
      world.renderWorld = sinon.fake();
      world.resizeCanvas();
    });

    it('Sets canvas context');
    it('Initialize canvas size');
    it('Draw lines');
    it('Add event listener to mousedown');
    it('Add event listener to mousemove');

    it('Creates a squared canvas', () => {
      expect(world.canvas.width).to.equal(world.canvas.height);
    });

    it('Set correct cell size', () => {
      expect(world.cellSize).to.equal(2);
    });
  });

  describe('Resize', () => {
    it('Set square container');
    it('Set new cell size proportional to the container size');
    it('Re-render world');
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

    it('Calls hoverCell method to render the hovered cell');
    it('Calls renderLiveCells method to fill live cells with color');

    describe('Hover Cell', () => {
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
        sinon.assert
          .calledWith(world.context.strokeRect, posX, posY, world.cellSize, world.cellSize);
      });
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

      it('Should set the right color (user color)', () => {
        world.renderLiveCells();
        expect(world.context.fillStyle).to.equal(userColor);
      });

      it('Should draw rectangle in the live cell position', () => {
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

    describe('On Mouse Move', () => {
      it('Same cell: don\'t re-render', () => {
        world.handleMouseMove({});
        world.handleMouseMove({});
        sinon.assert.calledOnce(world.renderWorld);
      });

      it('Should update hovered column and row', () => {
        getMousePositionStub.returns([700, 400]);
        world.handleMouseMove({});
        expect(world.hoverCol).to.equal(350);
        expect(world.hoverRow).to.equal(200);
      });

      it('Should call re-render', () => {
        world.handleMouseMove({});
        world.hoverRow = 20;
        world.hoverCol = 50;
        world.handleMouseMove({});
        sinon.assert.calledTwice(world.renderWorld);
      });

      it('Should call click method if mouse is down', () => {
        world.handleMouseMove({});
        world.hoverRow = 20;
        world.hoverCol = 50;
        world.handleMouseMove({});
        sinon.assert.calledTwice(world.renderWorld);
      });
    });

    describe('On moving', () => {
      beforeEach(() => {
        sinon.stub(world, 'handleClick');
      });

      it('Set spawnMove if mouse is down and it is the first action', () => {
        expect(world.spawnMove).to.be.null;
        world.handleMovingSelection({ buttons: 1 });
        expect(world.spawnMove).to.be.true;
      });

      it('Unset spawnMove if the button is not clicked and is finishing spawning action', () => {
        world.handleMovingSelection({ buttons: 1 });
        expect(world.spawnMove).to.be.true;
        world.handleMovingSelection({ buttons: 0 });
        expect(world.spawnMove).to.be.null;
      });

      it('Unset spawnMove if the button is not clicked and is finishing killing action', () => {
        const key = `${world.hoverCol},${world.hoverRow}`;
        world.liveCells.set(key, 'set');
        world.handleMovingSelection({ buttons: 1 });
        expect(world.spawnMove).to.be.false;
        world.handleMovingSelection({ buttons: 0 });
        expect(world.spawnMove).to.be.null;
      });

      it('Handles click if mouse is down', () => {
        world.handleMovingSelection({ buttons: 1 });
        sinon.assert.calledOnce(world.handleClick);
      });

      it('Render world', () => {
        world.handleMovingSelection({});
        sinon.assert.calledOnce(world.renderWorld);
      });
    });

    describe('On Click', () => {
      // it('Add `me` cell to Initial World if not alive', () => {
      //   world.handleClick();
      //   expect(world.initialWorld[world.hoverCol][world.hoverRow]).to.equal('me');
      // });

      it('Set position of `me` live cell in live cells', () => {
        world.handleClick();
        expect(world.liveCells.has(`${world.hoverCol},${world.hoverRow}`)).to.be.true;
      });

      // it('Remove `me` cell from Initial World if alive', () => {
      //   world.handleClick();
      //   world.handleClick();
      //   expect(world.initialWorld[world.hoverCol][world.hoverRow]).to.equal(null);
      // });

      it('Remove `me` cell from live cells', () => {
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

      it('Skip rendering if there was no model change', () => {
        world.spawnMove = true;
        const key = `${world.hoverCol},${world.hoverRow}`;
        world.liveCells.set(key, 'set');
        world.handleClick();
        sinon.assert.notCalled(world.renderWorld);
      });

      it('Skip killing cell if it is move spawning', () => {
        const key = `${world.hoverCol},${world.hoverRow}`;
        expect(world.liveCells.has(key)).to.be.false;
        world.spawnMove = true;
        world.liveCells.set(key, 'set');
        world.handleClick();
        expect(world.liveCells.has(key)).to.be.true;
      });

      it('Skip spawning cell if it is move killing', () => {
        const key = `${world.hoverCol},${world.hoverRow}`;
        expect(world.liveCells.has(key)).to.be.false;
        world.spawnMove = false;
        world.handleClick();
        expect(world.liveCells.has(key)).to.be.false;
      });

      it('Re-render canvas', () => {
        world.handleClick();
        sinon.assert.calledOnce(world.renderWorld);
      });
    });
  });
});
