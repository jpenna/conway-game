import * as types from '../types';

const initialState = {
  connected: false,
};

const actions = {
  async connect({ commit }) {
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
  namespaced: true,
  state: initialState,
  mutations,
  actions,
};
