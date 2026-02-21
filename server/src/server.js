import express from 'express';
import { WebSocketServer } from 'ws';
import http from 'http';
import cors from 'cors';
import RoomsRouter from './routes/rooms.js';
import RoomService from './application/RoomService.js';
import WebSocketAdapter from './infrastructure/WebSocketAdapter.js';


const app = express();
const port = 3000;
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.use(express.json());
app.use(express.static('../front'));
app.use(cors());

const webSocketAdapter = new WebSocketAdapter(wss);
const roomService = new RoomService();

// Set dependencies after instantiation to break circular dependency
webSocketAdapter.setRoomService(roomService);
roomService.setWebSocketAdapter(webSocketAdapter);

// Initialize and use the RoomsRouter
const roomsRouter = new RoomsRouter(roomService);
app.use(roomsRouter.getRouter());


wss.on("connection", (socket) => {
  webSocketAdapter.handleConnection(socket, roomService);
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});