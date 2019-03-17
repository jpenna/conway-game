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
  me: {},
};

const actions = {
  setMyself({ commit }, { color }) {
    commit(types.SET_MYSELF, { color });
    api.init({ color });
  },
};

const mutations = {
  [types.SET_MYSELF](state, myself) {
    state.loading = true;
    state.me = myself;
  },

  [types.SET_PLAYERS](state, players) {
    state.loading = true;
    state.players = players.map(normalizePlayer);
  },
};

export default {
  state: initialState,
  mutations,
  actions,
};
