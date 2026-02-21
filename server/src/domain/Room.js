class Room {
    static DEFAULT_NUMBER_OF_PLAYERS = 4;
    /**
     * Room entity represents a game room where players can join.
     * It manages the list of players and checks if the room is complete.
     * @param {string} id 
     * @param {number} maxPlayers 
     */
  constructor(id, maxPlayers = Room.DEFAULT_NUMBER_OF_PLAYERS) {
    this.id = id;
    this.players = [];
    this.maxPlayers = maxPlayers;
  }

  addPlayer(player) {
    if (this.players.length >= this.maxPlayers) {
      throw new Error('Room is full');
    }
    this.players.push(player);
  }

  removePlayer(playerId) {
    this.players = this.players.filter((p) => p.id !== playerId);
  }

  isComplete() {
    return this.players.length === this.maxPlayers;
  }

  getPlayers() {
    return this.players;
  }
}

export default Room;