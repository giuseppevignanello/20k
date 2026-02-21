import express from 'express';
import RoomService from '../application/RoomService.js';
import WebSocketAdapter from '../infrastructure/WebSocketAdapter.js';
import RoomsController from '../controllers/RoomsController.js';

class RoomsRouter {
  constructor(service) {
    this.router = express.Router();
    this.roomsController = new RoomsController(service);

    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post('/rooms/create', (req, res) => this.roomsController.createRoom(req, res));
  }

  getRouter() {
    return this.router;
  }
}

export default RoomsRouter;