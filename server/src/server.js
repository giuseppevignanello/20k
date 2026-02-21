import express from 'express';
import { WebSocketServer } from 'ws';
import http from 'http';
import cors from 'cors';
import RoomsRouter from './routes/rooms.js';


const app = express();
const port = 3000;
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.use(express.json());
app.use(express.static('../front'));
app.use(cors());

// Initialize and use the RoomsRouter
const roomsRouter = new RoomsRouter(wss);
app.use(roomsRouter.getRouter());

wss.on('connection', (ws) => {
  console.log('A player connected');

  ws.on('close', () => {
    console.log('A player disconnected');
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});