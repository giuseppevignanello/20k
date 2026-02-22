class Deck {
  constructor() {
    this.cards = this.generateDeck();
  }

  generateDeck() {
    const suits = ['denari', 'coppe', 'spade', 'bastoni'];
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const deck = [];

    suits.forEach((suit) => {
      numbers.forEach((number) => {
        deck.push({ number, suit });
      });
    });

    return deck;
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  deal(players) {
    this.shuffle();
    let dealer = null;

    while (this.cards.length > 0) {
      for (const player of players) {
        if (this.cards.length === 0) break;
        const card = this.cards.pop();
        player.receiveCard(card);

        if (card.number === 10 && card.suit === 'denari') {
          dealer = player;
          break;
        }
      }

      if (dealer) break;
    }

    return dealer;
  }
}

export default Deck;