<template>
  <div id="app">
    <AppHeader />
    <h1>Welcome to Vue!</h1>
    <p>This is your App.vue component.</p>
    <Lobby />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import Lobby from './components/Lobby.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    Lobby
  },
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