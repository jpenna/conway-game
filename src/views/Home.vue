<template>
  <div class="home">
    <RoomHeader />
  </div>
</template>

<script>
// @ is an alias to /src
import RoomHeader from '@/components/RoomHeader.vue';

export default {
  name: 'Home',
  components: {
    RoomHeader,
  },
};
</script>
