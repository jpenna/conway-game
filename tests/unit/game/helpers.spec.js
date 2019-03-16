import { expect } from 'chai';
import helpers from '@/game/helpers';

describe('Helpers', () => {
  let event;
  const maxHeight = 500;
  const maxWidth = 500;

  beforeEach(() => {
    event = { offsetX: 300, offsetY: 400 };
  });

  describe('getMousePosition', () => {
    it('Calculate the mouse position correctly', () => {
      const res = helpers.getMousePosition(event, maxHeight, maxWidth);
      expect(res).to.deep.equal([event.offsetX, event.offsetY]);
    });

    it('Set to 0 if X is negative', () => {
      event.offsetX = -1;
      const res = helpers.getMousePosition(event, maxHeight, maxWidth);
      expect(res).to.deep.equal([0, event.offsetY]);
    });

    it('Set to (max value - 1) if (beyond OR equal) X borders', () => {
      event.offsetX = 500;
      const res = helpers.getMousePosition(event, maxHeight, maxWidth);
      expect(res).to.deep.equal([maxWidth - 1, event.offsetY]);
    });

    it('Set to 0 if Y is negative', () => {
      event.offsetY = -1;
      const res = helpers.getMousePosition(event, maxHeight, maxWidth);
      expect(res).to.deep.equal([event.offsetX, 0]);
    });

    it('Set to (max value - 1) if (beyond OR equal) Y borders', () => {
      event.offsetY = 500;
      const res = helpers.getMousePosition(event, maxHeight, maxWidth);
      expect(res).to.deep.equal([event.offsetX, maxHeight - 1]);
    });
  });

  describe('Run Round', () => {
    it('Check each live cell for survival');
    it('Don\'t revive cells that are out of the canvas bound');
    it('Revive dead cells flagged by survivors with 3 neighbors');
    it('Revive dead cells with mixed colors of the 3 saviors');
    it('Remove the cells that didn\'t survive the round');
  });

  describe('Check survivors', () => {
    it('Skip counting the current cell as neighbor');
    it('Counts the live cells correctly');
    it('Flag the neighboring dead cells correctly');
    it('For a neighboring dead cell, flag with right position, savior\'s color and amount');
    it('For a neighboring dead cell, if has more than 1 neighbor, update information correctly');
  });
});
