<template>
  <div class="home">
    <RoomHeader
      :world="world"
      :is-running="world.isRunning"
      @toggleRunning="toggleRunning"
      @clearWorld="clearWorld"
    />

    <div
      id="worldContainer"
      class="canvas-container"
      :class="world.round ? 'cursor-disabled' : 'cursor-pointer'"
    >
      <canvas id="world" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import * as gameApi from '@/api/game';

import RoomHeader from '@/components/RoomHeader.vue';
import World from '@/game/World';

export default {
  name: 'Home',

  components: {
    RoomHeader,
  },

  data() {
    return {
      // This win't be passwed to other components after we have the Vuex store set up
      world: {},
    };
  },

  computed: {
    ...mapState({ myself: state => state.players.myself }),
  },

  mounted() {
    this.world = new World(50, 50);
    this.world.create();
    this.setMyself({ color: '#FF4500' });
  },

  destroyed() {
    this.world.destruct();
  },

  methods: {
    ...mapActions({ setMyself: 'setMyself' }),

    toggleRunning() {
      // TODO use dict for player status
      if (this.myself.status !== 'ready') gameApi.signalStart();
      else gameApi.signalStop();
    },

    clearWorld() {
      gameApi.signalClear();
      this.world.clear();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/_variables.scss';

#world {
  border: solid 1px $color-disabled-lighter;
}

.canvas-container {
  margin: 2rem auto;
  max-width: 800px;
  text-align: center;
}
</style>
