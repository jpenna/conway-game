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
          <div>
            <div
              v-for="(player, index) in players"
              :key="player.id"
              class="flex-split mb-10"
            >
              <div>
                <span class="mr-10 players-avatar" :style="{ backgroundColor: player.color }" />
                <span>Player {{ index + 1 }}</span>
              </div>
              <el-tag
                size="mini"
                :type="player.labelType"
              >
                {{ player.status }}
              </el-tag>
            </div>
          </div>
        </el-popover>
      </div>
    </div>
  </div>
</template>

<script>
import * as models from './models';

export default {
  name: 'RoomHeader',

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

<style lang="scss" scoped>
@import '@/styles/_variables.scss';

.players-avatar {
  display: inline-block;
  width: 1em;
  height: 1em;
  border: solid 1px $color-disabled-lighter;
  border-radius: 50%;
}
</style>
