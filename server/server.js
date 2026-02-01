const http = require('http'); 
const initWebSocket = require('./websocket');

const server = http.createServer(); 

initWebSocket(server); 

server.listenerCount(8080, () => {

})