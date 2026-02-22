<template>
  <div id="app">
    <AppHeader />
    <h1>Welcome to Vue!</h1>
    <p>This is your App.vue component.</p>
    <Lobby v-if="!joinedRoom" @join-room="handleJoinRoom" />
    <Room v-else :room-data="roomData" />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import Lobby from './components/Lobby.vue';
import Room from './components/Room.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    Lobby,
    Room
  },
  data() {
    return {
      joinedRoom: false,
      roomData: null,
      currentUserId: 'user-id-placeholder', // Replace with the actual logic to get the current user's ID
    };
  },
  methods: {
    handleJoinRoom(data) {
      this.roomData = data;
      this.currentUserId = data.currentUserId; // Set the current user's ID from the room data
      this.joinedRoom = true;
    }
  },  
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height: 75vh;
}
</style>