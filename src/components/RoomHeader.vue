<template>
  <div>
    <div class="flex-split">
      <!-- Left -->
      <div>
        <!-- Round -->
        <div>Round: {{ world.round }}</div>

        <!-- Color -->
        <div class="mt-10">
          <span class="d-inline-block mr-10">Your color:</span>
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

      <h2 class="mt-0 mb-0" :class="`text-${world.isRunning ? 'success' : 'danger'}`">
        Game {{ world.isRunning ? 'Running' : 'Stopped' }}
      </h2>

      <!-- Right -->
      <div>
        <!-- Patterns -->
        <el-dropdown>
          <el-button type="primary" plain>
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
  },
};
</script>
