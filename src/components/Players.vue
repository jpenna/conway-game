<template>
  <div>
    <div
      v-for="(player, index) in players"
      :key="player.id"
      v-loading="loadingPlayers"
      class="flex-split mb-10"
    >
      <div>
        <span class="mr-10 players-avatar" :style="{ backgroundColor: player.color }" />
        <span>Player {{ index + 1 }}</span>
      </div>
      <el-tag
        size="mini"
        :type="labelType[player.status]"
      >
        {{ PLAYER_STATUS_MAP.get(player.status) }}
      </el-tag>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { PLAYER_STATUS_MAP } from '@/utils/consts';

const labelType = {
  pending: 'warning',
  ready: 'ready',
};

export default {
  name: 'Players',

  data() {
    return {
      labelType,
      PLAYER_STATUS_MAP,
    };
  },

  computed: {
    ...mapState({
      players: state => state.players.items,
      loadingPlayers: state => state.players.loading,
    }),
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
