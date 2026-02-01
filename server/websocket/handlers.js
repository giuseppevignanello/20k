/**
* @param {import('ws').WebSocket} ws
* @param {Buffer} message
* @param {import('ws').WebSocketServer} wss
* Handle the single WS message
*/
function handleMessage(ws, message, wss) {
  const data = JSON.parse(message);
}

/**
* @param {import('ws').WebSocket} ws
* Single client disconnected
*/
function handleClose(ws) {
  
}

/**
* @param {import('ws').WebSocketServer} wss
* @param {JSON} payload
* Handle the single WS message
*/
function universalBroadcast(wss, payload) {
  wss.clients.forEach(client => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(payload));
    }
  });
}

module.exports = { handleMessage, handleClose };