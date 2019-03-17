import Vue from 'vue';
import Vuex from 'vuex';

import game from '@/store/modules/game';
import players from '@/store/modules/players';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    game,
    players,
  },
});
