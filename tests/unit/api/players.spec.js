describe.skip('API: players', () => {
  it('init: send `init` socket message with player\'s data');
  it('changeColor: send WS message to update player\'s color');

  it('message: if type `players`, commit SET_PLAYERS with players');
  it('message: if type `players:self`, commit SET_MYSELF with player\'s data');
});
