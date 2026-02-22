<template>
  <div
    class="player"
    :style="position"
  >
    {{ player.name }}
  </div>
</template>

<script>
export default {
  name: 'Player',
  props: {
    player: {
      type: Object,
      required: true,
    },
    position: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.player {
  position: absolute;
  text-align: center;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}
</style>