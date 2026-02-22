<template>
  <div class="room">
    <div v-if="phase === 'dealer-selection'">
      <CardDistribution :players="players" :distributionOrder="distributionOrder" />
    </div>
    <div class="players-container" v-else>
        <Player
          v-for="(player, index) in orderedPlayers"
          :key="player.id"
          :player="player"
          :position="getPlayerPosition(index, orderedPlayers.length)"
        />
    </div>
  </div>
</template>

<script>
import { socket } from '../socket';
import Player from './Player.vue';
import CardDistribution from './CardDistribution.vue';

export default {
  name: 'Room',
  components: {
    Player,
    CardDistribution,
  },
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
      phase: 'waiting',
      distributionOrder: [],
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
      if (data.type === 'ROOM_COMPLETE') {
        this.phase = 'dealer-selection';
        this.distributionOrder = data.payload.distributionOrder;
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

</style>