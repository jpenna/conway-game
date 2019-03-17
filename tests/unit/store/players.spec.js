describe('Store: players', () => {
  describe('actions', () => {
    it('setMyself: should commit SET_MYSELF type');
    it('setMyself: should init multiplayer');

    it('changeColor: should update players color in server');
    it('changeColor: should commit SET_COLOR to update players color');
  });
  describe('getters', () => {
    it('myself: should return player');
  });
  describe('mutations', () => {
    it('SET_MYSELF: should set loading = true');
    it('SET_MYSELF: should set player\'s data');

    it('SET_PLAYERS: should set loading = false');
    it('SET_PLAYERS: should set players list');
    it('SET_PLAYERS: update self with player from list');

    it('SET_COLOR: updates player color');
  });
  describe('normalization', () => {
    it('Should normalize player to frontend expected data');
  });
});
