import { expect } from 'chai';
import helpers from '@/game/helpers';

describe('Helpers', () => {
  let event;
  const maxHeight = 500;
  const maxWidth = 500;

  beforeEach(() => {
    event = { offsetX: 300, offsetY: 400 };
  });

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
