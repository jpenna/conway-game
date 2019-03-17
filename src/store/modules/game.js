import * as types from '../types';

const initialState = {
  connected: false,
};

const actions = {
  initConnection({ commit }) {
    commit(types.CONNECTED);
  },
};

const mutations = {
  // Connection
  [types.CONNECTED](state) {
    state.connected = true;
  },
};

export default {
  state: initialState,
  mutations,
  actions,
};
