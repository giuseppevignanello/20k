class Player {
    constructor(name, socket) {
        this.name = name;
        this.socket = socket;
        this.cards = [];
    }  

    receiveCard(card) {
        this.cards.push(card);
    }
}

export default Player;