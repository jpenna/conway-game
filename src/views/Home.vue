<template>
  <div class="home">
    <RoomHeader @colorChange="handleColorChange" />

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

  mounted() {
    this.world = new World(50, 50);
    this.world.create();
    this.world.setColor('blue');
  },

  destroyed() {
    this.world.destruct();
  },

  methods: {
    handleColorChange(color) {
      this.world.setColor(color);
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
