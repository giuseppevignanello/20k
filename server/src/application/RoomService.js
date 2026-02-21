import WebSocketAdapter from "../infrastructure/WebSocketAdapter.js";

class RoomService {
  /**
   * RoomService is responsible for managing game rooms, including adding players and broadcasting updates.
   * Todo: use an actual repository instead of an in-memory one, and inject it here.
   * @param {WebSocketAdapter} webSocketAdapter 
   */  
  constructor(webSocketAdapter) {
    this.webSocketAdapter = webSocketAdapter;
  }

  createRoom(maxPoints, maxPlayers) {
    const roomId = uuidv4();
    this.roomRepository.createRoom(roomId, maxPoints, maxPlayers);
    return roomId;
  }

  addPlayerToRoom(roomId, player) {
    const room = this.roomRepository.getRoomById(roomId);
    if (!room) {
      throw new Error('Room not found.');
    }

    if (room.players.length >= room.maxPlayers) {
      throw new Error('Room is full.');
    }

    if (room.players.includes(playerName)) {
      throw new Error('Player already in the room.');
    }

    
    room.addPlayer(player);

    this.webSocketAdapter.broadcastToRoom(roomId, {
      type: 'PLAYER_JOINED',
      payload: { players: room.getPlayers() },
    });

    // Check if the room is complete
    if (room.isComplete()) {
      this.webSocketAdapter.broadcastToRoom(roomId, {
        type: 'ROOM_COMPLETE',
        payload: { message: 'Room is complete. Game can start!' },
      });
    }
  }
}

export default RoomService;