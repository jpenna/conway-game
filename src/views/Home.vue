<template>
  <div class="home">
    <RoomHeader
      :world="world"
      :is-running="isRunning"
      @toggleRunning="toggleRunning"
    />

    <div id="worldContainer" class="canvas-container">
      <canvas id="world" />
    </div>
  </div>
</template>

<script>
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
      isRunning: false,
    };
  },

  mounted() {
    this.world = new World(50, 50);
    this.world.create();
  },

  destroyed() {
    this.world.destruct();
  },

  methods: {
    toggleRunning() {
      this.isRunning = !this.isRunning;
      if (this.isRunning) this.world.start();
      else this.world.stop();
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
  cursor: pointer;
}
</style>
