const http = require('http'); 
const initWebSocket = require('./websocket');

const server = http.createServer(); 

initWebSocket(server); 

server.listen(8080, () => {
  console.log('HTTP + WS server on http://localhost:8080');
});
