const WebSocket = require('ws');

module.exports = function initWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws, req) => {
    ws.on('message', msg => handleMessage(ws, msg, wss));
    ws.on('close', () => handleClose(ws));
  });
};