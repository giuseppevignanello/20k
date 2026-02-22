import Deck from '../domain/Deck.js';

class Room {
  static DEFAULT_NUMBER_OF_PLAYERS = 4;
  static DEFAULT_MAX_POINTS = 20;

  constructor(id, maxPoints = Room.DEFAULT_MAX_POINTS, maxPlayers = Room.DEFAULT_NUMBER_OF_PLAYERS) {
    this.id = id;
    this.players = [];
    this.maxPoints = maxPoints;
    this.maxPlayers = maxPlayers;
    this.deck = new Deck();
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
    return this.players.length == this.maxPlayers;
  }

  getPlayers() {
    return this.players;
  }

  startDealerSelection() {
    if (!this.isComplete()) {
      throw new Error('Room is not complete');
    }

    const dealer = this.deck.deal(this.players);
    return dealer;
  }
}

export default Room;