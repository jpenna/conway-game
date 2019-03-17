import * as types from '../types';
import * as api from '@/api/players';

export function normalizePlayer(player) {
  return {
    id: player.id,
    color: player.color,
    status: player.status,
  };
}

const initialState = {
  items: {},
  loading: false,
  myself: {},
};

const actions = {
  setMyself({ commit }, { color }) {
    commit(types.SET_MYSELF, { color });
    api.init({ color });
  },

  changeColor({ commit, state }, color) {
    const { id } = state.myself;
    commit(types.SET_COLOR, color);
    api.changeColor({ id, color });
  },
};

const mutations = {
  [types.SET_MYSELF](state, myself) {
    state.loading = true;
    const { id, color } = myself;
    state.myself = { id, color };
  },

  [types.SET_PLAYERS](state, players) {
    state.loading = false;
    state.items = players.map(normalizePlayer);
  },

  [types.SET_COLOR](state, color) {
    state.myself.color = color;
  },
};

export default {
  state: initialState,
  mutations,
  actions,
};
