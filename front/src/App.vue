<template>
  <div id="app">
    <AppHeader />
    <h1>Welcome to Vue!</h1>
    <p>This is your App.vue component.</p>
    <Lobby v-if="!joinedRoom" @join-room="handleJoinRoom" />
    <Room v-else />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import Lobby from './components/Lobby.vue';
import Room from './components/Room.vue';
import { ref } from 'vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    Lobby,
    Room
  },
  setup() {
    const joinedRoom = ref(false);

    const handleJoinRoom = () => {
      joinedRoom.value = true;
    };

    return {
      joinedRoom,
      handleJoinRoom
    };
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>