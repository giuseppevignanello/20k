<template>
  <div class="room">
    <div class="players-container">
      <div
        v-for="(player, index) in orderedPlayers"
        :key="player.id"
        class="player"
        :style="getPlayerPosition(index, orderedPlayers.length)"
      >
        {{ player.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { socket } from '../socket';

export default {
  name: 'Room',
  props: {
    roomData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      players: this.roomData.players || [], 
      currentPlayerName: this.roomData.currentPlayerName,
    };
  },
  computed: {
    orderedPlayers() {
      const currentUserIndex = this.players.findIndex(player => player.name === this.currentPlayerName);
      if (currentUserIndex === -1) return this.players; 

      return [
        ...this.players.slice(currentUserIndex),
        ...this.players.slice(0, currentUserIndex),
      ];
    },
  },
  methods: {
    handleSocketMessage(event) {
      const data = JSON.parse(event.data);
      if (data.type === 'PLAYER_JOINED') {
        this.players = data.payload.players; 
      }
    },
    handleSocketError(error) {
      console.error('WebSocket error:', error);
    },
    getPlayerPosition(index, totalPlayers) {
      const radius = 40; 
      const angle = (360 / totalPlayers) * index + 90; // Start at the bottom (+90 degrees)
      const radians = (angle * Math.PI) / 180;

      return {
        top: `${50 + radius * Math.sin(radians)}%`,
        left: `${50 + radius * Math.cos(radians)}%`,
        transform: 'translate(-50%, -50%)',
      };
    },
  },
  mounted() {
    socket.addEventListener('message', this.handleSocketMessage);
    socket.addEventListener('error', this.handleSocketError);
  },
  beforeUnmount() {
    socket.removeEventListener('message', this.handleSocketMessage);
    socket.removeEventListener('error', this.handleSocketError);
  },
};
</script>

<style scoped>
.room {
  position: relative;
  width: 100%;
  height: 100%;
}

.players-container {
  position: relative;
  width: 100%;
  height: 70%;
}

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