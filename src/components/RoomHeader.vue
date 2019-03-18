<template>
  <div class="room-header">
    <div class="flex-split">
      <!-- Left -->
      <div>
        <!-- Round -->
        <div class="text-left">
          <span class="text-bold text-disabled ">Duration:</span>
          {{ Math.floor(world.duration / 1000) }} seconds
        </div>

        <!-- Color -->
        <div class="mt-10 text-left">
          <span class="d-inline-block mr-10 text-bold text-disabled">Your color:</span>
          <el-color-picker
            :value="myself.color"
            :disabled="world.isRunning"
            size="mini"
            class="align-middle"
            :predefine="predefinedColors"
            @active-change="handleColorChange"
          />
        </div>
      </div>

      <div>
        <h2 class="mt-0 mb-0" :class="`text-${world.isRunning ? 'success' : 'danger'}`">
          Game {{ world.isRunning ? 'Running' : 'Stopped' }}
        </h2>
        <h3 class="text-disabled mt-0 mb-0">Round: {{ world.round }}</h3>
      </div>

      <!-- Right -->
      <div>
        <el-button
          :disabled="this.myself.status === 'ready'"
          type="warning"
          class="mr-10"
          size="small"
          round
          @click="clearWorld"
        >
          Reset
        </el-button>

        <!-- Patterns -->
        <el-dropdown class="mr-10">
          <el-button type="primary" plain round size="small">
            Patterns
            <i class="el-icon-arrow-down el-icon--right" />
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>Pattern 1</el-dropdown-item>
            <el-dropdown-item>Pattern 2</el-dropdown-item>
            <el-dropdown-item>Pattern 3</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <!-- Start/Stop -->
        <el-popover trigger="hover">
          <el-button
            slot="reference"
            :type="myself.status === 'ready' ? 'danger' : 'success'"
            plain
            round
            size="small"
            @click="handleRunning"
          >
            {{ myself.status === 'ready' ? 'Stop' : 'Start' }}
          </el-button>
          <Players />
        </el-popover>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import * as models from './models';

import Players from '@/components/Players.vue';

export default {
  name: 'RoomHeader',

  components: {
    Players,
  },

  props: {
    world: { type: Object, required: true },
    isRunning: { type: Boolean, default: false },
  },

  data() {
    return {
      predefinedColors: models.predefinedColors,
    };
  },

  computed: {
    ...mapState({ myself: state => state.players.myself }),
    // TODO if game if running, disable color change
  },

  watch: {
    world() {
      if (this.world.setColor) this.world.setColor(this.myself.color);
    },
  },

  methods: {
    ...mapActions({ changeColor: 'changeColor' }),

    // Change color on picker's color change
    handleColorChange(color) {
      this.color = color;
      this.world.setColor(color);

      this.changeColor(color);
    },

    handleRunning() {
      this.$emit('toggleRunning');
    },

    clearWorld() {
      this.$confirm('Clearing game will reset EVERYTHING. Proceed?', 'Confirmation', {
        confirmButtonText: 'Clear',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }).then(() => {
        this.$emit('clearWorld');
      }).catch((error) => {
        if (error === 'cancel') return;
        console.error(error);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.room-header {
  max-width: 900px;
  margin: auto;
  margin-top: 30px;
}
</style>
