class RoomsController {
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

  joinRoom(req, res) {
    const { roomName, playerName } = req.body;

    if (!roomName || !playerName) {
      return res.status(400).json({ error: 'Room name and player name are required.' });
    }

    try {
      const players = this.roomService.addPlayerToRoom(roomName, playerName);
      res.status(200).json({ message: 'Joined room successfully.', roomName, players });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default RoomsController;