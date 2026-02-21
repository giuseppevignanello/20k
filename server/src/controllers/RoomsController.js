import RoomService from "../application/RoomService.js";

class RoomsController {
  
  /**
   * 
   * @param {RoomService} roomService 
   */
  constructor(roomService) {
    this.roomService = roomService;
  }

  createRoom(req, res) {
    const { maxPoints, maxPlayers } = req.body;

    if (!maxPoints || !maxPlayers) {
      return res.status(400).json({ error: 'Max points and max players are required.' });
    }

    try {
      const roomId = this.roomService.createRoom(maxPoints, maxPlayers);
      res.status(201).json({ message: 'Room created successfully.', roomId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  joinRoom(socket, message) {
    const { roomUuid, playerName } = message;

    if (!playerName) {
      return socket.send(JSON.stringify({ error: 'Player name is required.' }));kw
    }

    try {
      // Add player to the room and associate WebSocket
      this.roomService.addPlayerToRoom(roomUuid, playerName, socket);

      const room = this.roomService.getRoom(roomUuid);
      socket.send(
        JSON.stringify({
          type: "room-details", 
          roomUuid, 
          players: room.players, 
          maxPlayers: room.maxPlayers,
          maxPoints: room.maxPoints
        })
      );
    } catch (error) {
      socket.send(JSON.stringify({ error: error.message }));
    }
  }

}

export default RoomsController;