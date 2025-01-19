const Deck = require("../Models/Deck");

class DealerSelectionService {
  constructor(room) {
    this.room = room;
    this.randomDeck = [];
    this.distributedCards = [];
    this.tenOfDenariPlayer = null;
  }
  selectFirstDealer() {
    const deck = new Deck();
    this.randomDeck = deck.getRandomDeck(); // Ottiene un mazzo mescolato
    this.distributeRandomDeck();
  }

  distributeRandomDeck() {
    const players = this.room.players;
    let playerIndex = 0;

    while (true) {
      if (this.randomDeck.length === 0) {
        break;
      }

      const card = this.randomDeck.shift();

      const currentPlayer = players[playerIndex];

      this.distributedCards.push(card);

      if (card.suit == "denari" && card.value == 10) {
        this.tenOfDenariPlayer = currentPlayer;
        break;
      }

      playerIndex = (playerIndex + 1) % players.length;
    }

    this.buildResponse();
  }

  buildResponse() {
    const response = {
      type: "dealer-selection",
      distributedCards: this.distributedCards,
      tenOfDenariPlayer: this.tenOfDenariPlayer,
    };

    this.room.broadcast(response);
    console.log(response);
    return response;
  }
}
module.exports = DealerSelectionService;
