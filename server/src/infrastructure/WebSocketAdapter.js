import { WebSocket } from "ws";

class WebSocketAdapter {
    /**
     * WebSocketAdapter is responsible for managing WebSocket connections 
     * and broadcasting messages to clients in specific rooms.
     * @param {WebSocket.Server} wss 
     */
  constructor(wss) {
    this.wss = wss;
    this.rooms = new Map(); // Map of roomId to WebSocket clients
  }

  addClientToRoom(roomId, ws) {
    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, new Set());
    }
    this.rooms.get(roomId).add(ws);
  }

  broadcastToRoom(roomId, message) {
    const clients = this.rooms.get(roomId) || [];
    clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(JSON.stringify(message));
      }
    });
  }
}

export default WebSocketAdapter;
