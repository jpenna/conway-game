describe('API: players', () => {
  it('signalStart: send socket message `game:start`');
  it('signalStop: send socket message `game:stop`');

  it('updateWorld: send socket message `world:update`');

  it('on `world`: emit global event with payload');

});
