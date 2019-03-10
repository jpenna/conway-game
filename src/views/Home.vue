<template>
  <div class="home">
    <RoomHeader />

    <div id="worldContainer" class="canvas-container">
      <canvas id="world" />
    </div>
  </div>
</template>

<script>
import RoomHeader from '@/components/RoomHeader.vue';
import World from '@/game/world';

export default {
  name: 'Home',

  components: {
    RoomHeader,
  },

  mounted() {
    this.world = new World(50, 50);
  },

  destroyed() {
    this.world.destruct();
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
