import { createApp } from 'vue';
import App from './App.vue';

const url = import.meta.env.VITE_BASE_WS_URL || 'ws://localhost:3000';

const socket = new WebSocket(url);

socket.addEventListener('open', () => {
  // socket.send('Hello from the frontend!');
});

socket.addEventListener('message', (event) => {
});

createApp(App).mount('#app');
