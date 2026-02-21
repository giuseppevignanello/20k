<template>
  <div class="room">
    <h1>Room</h1>
    <ul>
      <li v-for="player in players" :key="player.id">
        {{ player.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'Room',
  setup() {
    const players = ref([]);

    let socket;

    onMounted(() => {
      socket = new WebSocket(import.meta.env.VITE_BASE_WS_URL || 'ws://localhost:3000');

      socket.onopen = () => {
        console.log('WebSocket connection established for Room');
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.type === 'PLAYER_JOINED') {
          console.log('Player joined:', data.payload.playerName);
          players.value.push({ id: players.value.length + 1, name: data.payload.playerName });
        }
      };

      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      socket.onclose = () => {
        console.log('WebSocket connection closed');
      };
    });

    return {
      players,
    };
  },
};
</script>

<style scoped>
.room {
  padding: 20px;
}
</style>