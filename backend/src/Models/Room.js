class Room {
  constructor(roomId, players, score) {
    this.roomId = roomId;
    this.players = players;
    this.score = score;
    this.users = [];
    this.clients = new Set();
    this.state = "waiting";
    this.currentTurn = 0;
    this.currentDeck = [];
  }

  addPlayer(player) {
    if (this.users.length < this.players) {
      this.users.push(player);
      this.clients.add(player.socket);
      return true;
    }
    return false;
  }

  broadcast(message) {
    this.clients.forEach((client) => {
      client.send(JSON.stringify(message));
    });
  }

  isFull() {
    return this.users.length == this.players;
  }

  nextTurn() {
    this.currentTurn = (this.currentTurn + 1) % this.users.length;
    return this.users[this.currentTurn];
  }

  updateRoom() {
    this.broadcast({
      type: "room-update",
      roomId: this.roomId,
      users: this.users.map((user) => user.username),
      score: this.score,
    });
  }

  //Check this function
  reorderUsers(dealer) {
    const dealerIndex = this.users.findIndex(
      (user) => user.username === dealer
    );
    if (dealerIndex !== -1) {
      this.users = [
        ...this.users.slice(dealerIndex),
        ...this.users.slice(0, dealerIndex),
      ];
    }
  }
}

module.exports = Room;
