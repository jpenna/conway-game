<template>
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
</template>

<script>
export default {
  name: 'Players',
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
