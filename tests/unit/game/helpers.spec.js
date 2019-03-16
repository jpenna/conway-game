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
    it('Calculates the mouse position correctly', () => {
      const res = helpers.getMousePosition(event, maxHeight, maxWidth);
      expect(res).to.deep.equal([event.offsetX, event.offsetY]);
    });

    it('Sets to 0 if X is negative', () => {
      event.offsetX = -1;
      const res = helpers.getMousePosition(event, maxHeight, maxWidth);
      expect(res).to.deep.equal([0, event.offsetY]);
    });

    it('Sets to (max value - 1) if (beyond OR equal) X borders', () => {
      event.offsetX = 500;
      const res = helpers.getMousePosition(event, maxHeight, maxWidth);
      expect(res).to.deep.equal([maxWidth - 1, event.offsetY]);
    });

    it('Sets to 0 if Y is negative', () => {
      event.offsetY = -1;
      const res = helpers.getMousePosition(event, maxHeight, maxWidth);
      expect(res).to.deep.equal([event.offsetX, 0]);
    });

    it('Sets to (max value - 1) if (beyond OR equal) Y borders', () => {
      event.offsetY = 500;
      const res = helpers.getMousePosition(event, maxHeight, maxWidth);
      expect(res).to.deep.equal([event.offsetX, maxHeight - 1]);
    });
  });

  describe('Run Round', () => {
    it('Checks each live cell for survival');
    it('Don\'t revive cells that are out of the canvas bound');
    it('Revives dead cells flagged by survivors with 3 neighbors');
    it('Revives dead cells with mixed colors of the 3 saviors');
    it('Removes the cells that didn\'t survive the round');
  });

  describe('Check survivors', () => {
    it('Skips counting the current cell as neighbor');
    it('Skips neighboring cells that are out of bounds');
    it('Counts the live cells correctly');
    it('Flags the neighboring dead cells correctly');
    it('For a neighboring dead cell, flags with right position, savior\'s color and amount');
    it('For a neighboring dead cell, if has more than 1 neighbor, updates information correctly');
  });
});
