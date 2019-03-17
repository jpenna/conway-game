<template>
  <div>
    <div class="flex-split">
      <!-- Left -->
      <div>
        <!-- Duration -->
        <div>Duration</div>

        <!-- Color -->
        <div class="mt-10">
          <span class="d-inline-block mr-10">Your color:</span>
          <el-color-picker
            value="color"
            size="mini"
            class="align-middle"
            :predefine="predefinedColors"
            @active-change="handleColorChange"
          />
        </div>
      </div>

      <!-- Right -->
      <div>
        <!-- Patterns -->
        <el-dropdown>
          <el-button type="primary" plain>
            Patterns
            <i class="el-icon-arrow-down el-icon--right" />
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>Pattern spdfoijaweopifjw 1</el-dropdown-item>
            <el-dropdown-item>Pattern 2</el-dropdown-item>
            <el-dropdown-item>Pattern 3</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <!-- Start/Stop -->
        <el-popover trigger="hover">
          <el-button
            slot="reference"
            :type="isRunning ? 'danger' : 'success'"
            plain
            @click="handleRunning"
          >
            {{ isRunning ? 'Stop' : 'Start' }}
          </el-button>
          <Players />
        </el-popover>
      </div>
    </div>
  </div>
</template>

<script>
import * as models from './models';

import Players from '@/components/Players.vue';

export default {
  name: 'RoomHeader',

  components: {
    Players,
  },

  props: {
    world: { type: Object, required: true },
    isRunning: { type: Boolean, required: true },
  },

  data() {
    return {
      color: '#ff4500',
      predefinedColors: models.predefinedColors,

      players: models.players,
    };
  },

  watch: {
    world() {
      if (this.world.setColor) this.world.setColor(this.color);
    },
  },

  methods: {
    // Change color on picker's color change
    handleColorChange(color) {
      this.color = color;
      this.world.setColor(color);

      this.$emit('colorChange', color);
    },

    handleRunning() {
      this.$emit('toggleRunning');
    },
  },
};
</script>
