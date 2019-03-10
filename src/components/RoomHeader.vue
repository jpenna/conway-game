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
        <el-button type="primary" plain>Patterns</el-button>
        <el-button type="success" plain>Start</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RoomHeader',

  data() {
    return {
      color: '#ff4500',
      predefinedColors: [
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
      ],
    };
  },

  methods: {
    // Change color on picker's color change
    handleColorChange(color) {
      this.color = color;
    },
  },
};
</script>
