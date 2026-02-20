import { createApp } from 'vue';
import App from './App.vue';

const socket = new WebSocket('ws://localhost:3000');

socket.addEventListener('open', () => {
  console.log('Connected to WebSocket server');
  socket.send('Hello from the frontend!');
});

socket.addEventListener('message', (event) => {
  console.log('Message from server:', event.data);
});

createApp(App).mount('#app');
