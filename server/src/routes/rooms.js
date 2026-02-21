import express from 'express';
import RoomService from '../application/RoomService.js';
import WebSocketAdapter from '../infrastructure/WebSocketAdapter.js';
import RoomsController from '../controllers/RoomsController.js';

class RoomsRouter {
  constructor(wss) {
    this.router = express.Router();
    this.webSocketAdapter = new WebSocketAdapter(wss);
    this.roomService = new RoomService(this.webSocketAdapter);
    this.roomsController = new RoomsController(this.roomService);

    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post('/rooms/create', (req, res) => this.roomsController.createRoom(req, res));
    this.router.post('/rooms/join', (req, res) => this.roomsController.joinRoom(req, res));
  }

  getRouter() {
    return this.router;
  }
}

export default RoomsRouter;