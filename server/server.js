const http = require('http');
const path = require('path');
const fs = require('fs');
const { router } = require('./src/config/routes/router');
const { cors } = require('./src/config/routes/cors');
require('./src/config/routes/routes');

const initWebSocket = require('./websocket');

const FRONT_PATH = path.join(__dirname, '../front'); // folder with index.html and src/

/**
 * Serve SPA and static assets
 */
function serveStatic(req, res) {
  let filePath;

  // Serve JS/CSS/other files
  if (req.url.startsWith('/src/')) {
    filePath = path.join(FRONT_PATH, req.url);
  } else {
    // Serve index.html for root or any dynamic frontend route
    filePath = path.join(FRONT_PATH, 'index.html');
  }

  console.log('Serving file:', filePath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      return res.end('Not Found');
    }

    const ext = path.extname(filePath);
    const mime = {
      '.js': 'application/javascript',
      '.css': 'text/css',
      '.html': 'text/html',
      '.json': 'application/json',
    }[ext] || 'text/plain';

    res.writeHead(200, { 'Content-Type': mime });
    res.end(data);
  });
}


const server = http.createServer((req, res) => {
  cors(req, res, () => {
    // Serve SPA and static files for GET requests
    if (req.method === 'GET' && (req.url.startsWith('/') || req.url.startsWith('/src'))) {
      return serveStatic(req, res);
    }

    // Other requests (POST, API calls)
    router.handle(req, res);
  });
});

initWebSocket(server);

server.listen(8080, () => {
  console.log('HTTP + WS server on http://localhost:8080');
});