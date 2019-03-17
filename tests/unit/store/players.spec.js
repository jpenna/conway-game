describe('Store: players', () => {
  describe('actions', () => {
    it('setMyself: should commit SET_MYSELF type');
    it('setMyself: should init multiplayer');
  });
  describe('mutations', () => {
    it('SET_MYSELF: should set loading = true');
    it('SET_MYSELF: should set player\'s data');

    it('SET_PLAYERS: should set loading = false');
    it('SET_PLAYERS: should set players list');
  });
  describe('normalization', () => {
    it('Should normalize player to frontend expected data');
  });
});
