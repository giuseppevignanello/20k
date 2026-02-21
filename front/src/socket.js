const socket = new WebSocket(import.meta.env.VITE_BASE_WS_URL || 'ws://localhost:3000');

socket.addEventListener('open', () => {
  console.log('WebSocket connection established');
});

socket.addEventListener('close', () => {
  console.log('WebSocket connection closed');
});

socket.addEventListener('error', (error) => {
  console.error('WebSocket error:', error);
});

// Helper function to send messages
function sendMessage(message) {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  } else {
    console.error('WebSocket is not open. Message not sent:', message);
  }
}

export { socket, sendMessage };