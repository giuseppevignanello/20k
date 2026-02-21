const socket = new WebSocket(import.meta.env.VITE_BASE_WS_URL || 'ws://localhost:3000');

socket.addEventListener('open', () => {
  console.log('WebSocket connection established');
});

export default socket;