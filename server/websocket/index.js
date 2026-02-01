const WebSocket = require('ws');
const {handleMessage, handleClose} = require('./handlers');

module.exports = function initWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws, req) => {
    ws.on('message', msg => handleMessage(ws, msg, wss));
    ws.on('close', () => handleClose(ws));
  });
};