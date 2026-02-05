import './components/app-main.js';
import './components/app-header.js'; 
import './components/app-lobby.js'; 
import { socket } from './services/socket.js';

function getRoomIdFromUrl() {
  const parts = window.location.pathname.split('/');
  return parts[2] || null;
}

window.APP = {
  roomId: getRoomIdFromUrl(),
  connected: false
};

/**
 * Mount the app
 */
const root = document.getElementById('app');
root.innerHTML = `<app-main></app-main>`;

/**
 * Start websocket
 */
socket.connect();

/**
 *  When socket opens, update state and re-render
 */
socket.on('socket:open', () => {
  if (window.APP.roomId) {
    socket.send('room:join', { roomId: window.APP.roomId });
  }

  window.APP.connected = true;

  document.querySelector('app-main')?.update();
});
