describe('API: game', () => {
  it('signalStart: send socket message `game:start`');
  it('signalStop: send socket message `game:stop`');

  it('on `game:start`: emit global event `game:start`');
  it('on `game:stop`: emit global event `game:stop`');
});
