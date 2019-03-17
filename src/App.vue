<template>
  <div id="app">
    <div v-if="!connected" v-loading="!connected" class="loading-full" />
    <router-view v-else />
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'App',

  computed: {
    ...mapState({ connected: state => state.game.connected }),
  },
};
</script>


<style lang="scss"> // NOT SCOPED
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.loading-full {
  height: 90vh;
}
</style>
