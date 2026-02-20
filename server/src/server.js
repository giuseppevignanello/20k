const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const cors = require('cors');
const roomsRouter = require('./routes/rooms');

const app = express();
const port = 3000;

// Create an HTTP server
const server = http.createServer(app);

// Create a WebSocket server
const wss = new WebSocket.Server({ server });

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static files (optional, if needed for frontend)
app.use(express.static('../front'));

// Enable CORS
app.use(cors());

// Routes
app.use(roomsRouter);

// WebSocket connection handler
wss.on('connection', (ws) => {
  console.log('A player connected');

  ws.on('message', (message) => {
    console.log('Received:', message);
    ws.send('Hello from the backend!');
  });

  ws.on('close', () => {
    console.log('A player disconnected');
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});