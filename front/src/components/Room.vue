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
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { socket } from '../socket';

export default {
  name: 'Room',
  setup() {
    const players = ref([]);

    const handleSocketMessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'PLAYER_JOINED') {
        players.value = data.payload.players;      }
    };

    const handleSocketError = (error) => {
      console.error('WebSocket error:', error);
    };

    onMounted(() => {
      // Attach WebSocket event listeners
      socket.addEventListener('message', handleSocketMessage);
      socket.addEventListener('error', handleSocketError);
    });

    onBeforeUnmount(() => {
      // Detach WebSocket event listeners
      socket.removeEventListener('message', handleSocketMessage);
      socket.removeEventListener('error', handleSocketError);
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