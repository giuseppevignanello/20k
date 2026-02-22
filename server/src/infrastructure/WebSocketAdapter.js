import { WebSocket } from "ws";
import RoomsController from "../controllers/RoomsController.js";

class WebSocketAdapter {
    /**
     * WebSocketAdapter is responsible for managing WebSocket connections 
     * and broadcasting messages to clients in specific rooms.
     * @param {WebSocket.Server} wss 
     */
  constructor(wss) {
    this.wss = wss;
    this.roomService = null;
    this.rooms = new Map(); // Map of roomId to WebSocket clients
  }

  setRoomService(service) {
    this.roomService = service;
  }

  handleConnection(socket) {
    socket.on("message", (data) => {
      const message = JSON.parse(data);
      this.handleMessage(socket, message);
    });
  }

  handleMessage(socket, message) {
    const roomController = new RoomsController(this.roomService);
    switch (message.type) {
      case "join-room":
        roomController.joinRoom(socket, message);
        break;
    }
  }

  broadcastToRoom(room, message) {
    const clients = room.getPlayers().map(player => player.socket);
    clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(JSON.stringify(message));
      }
    });
  }
}

export default WebSocketAdapter;
