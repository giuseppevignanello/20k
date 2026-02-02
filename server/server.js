const http = require('http'); 
const { router } = require('./src/config/routes/router')
const { cors } = require('./src/config/routes/cors');

require('./src/config/routes/routes');

const initWebSocket = require('./websocket');

const server = http.createServer((req, res) => {
  cors(req, res, () => {
      router.handle(req, res);
  })
})

initWebSocket(server); 

server.listen(8080, () => {
  console.log('HTTP + WS server on http://localhost:8080');
});
