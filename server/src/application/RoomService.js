import { v4 as uuidv4 } from 'uuid';
import Room from "../domain/Room.js";
import WebSocketAdapter from "../infrastructure/WebSocketAdapter.js";
import Player from '../domain/Player.js';

class RoomService {
  
  rooms = {};
  /**
   * RoomService is responsible for managing game rooms, including adding players and broadcasting updates.
   * Todo: use an actual repository instead of an in-memory one, and inject it here.
   * ROOM_FULL: means that the room has reached its maximum player capacity and cannot accept more players.
   * ROOM_COMPLETE: indicates that the room has reached the required number of players and is ready to start the game.
   * @param {WebSocketAdapter} webSocketAdapter 
   */  
  constructor(webSocketAdapter) {
    this.webSocketAdapter = webSocketAdapter;
  }

  getRoom(roomUuid) {
    return this.rooms[roomUuid];
  }

  createRoom(maxPoints, maxPlayers) {
    const roomUuid = uuidv4();

    this.rooms[roomUuid] = new Room(roomUuid, maxPoints, maxPlayers);
    return roomUuid;
  }

  addPlayerToRoom(roomUuid, playerName, socket) {
    const room = this.rooms[roomUuid];

    if (!room) {
      throw new Error('Room not found.');
    }

    if (room.players.length >= room.maxPlayers) {
      throw new Error('Room is full.');
    }

    if (room.players.some(player => player.name === playerName)) {
      throw new Error('Player already in the room.');
    }

    const player = new Player(playerName, socket);
    room.addPlayer(player);

    // Broadcast the updated player list to the room
    this.webSocketAdapter.broadcastToRoom(room, {
      type: 'PLAYER_JOINED',
      payload: { players: room.getPlayers() },
    });

    // Check if the room is complete
    if (room.isComplete()) {
      this.webSocketAdapter.broadcastToRoom(roomUuid, {
        type: 'ROOM_COMPLETE',
        payload: { message: 'Room is complete. Game can start!' },
      });
    }
  }

  setWebSocketAdapter(adapter) {
    this.webSocketAdapter = adapter;
  }
}

export default RoomService;