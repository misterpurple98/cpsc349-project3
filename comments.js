class GameState {
  gameDeck = new Array();
  suits = ["spades", "hearts", "diamonds", "clubs"];
  types = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  
  constructor() {
    this.makeDeck();
  };

  makeDeck() {
    this.gameDeck.length = 0;
    for (const suit in this.suits) {
      for (const type in this.types) {
        let card = [this.suits[suit], this.types[type]];
        this.gameDeck.push(card);
      }
    }
  };

  //Fisher-Yates shuffle implementation
  shuffleDeck() {
    for (let i = this.gameDeck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * i);
      if (j != i) {
        let tmp = this.gameDeck[i].slice(0);
        this.gameDeck.copyWithin(i, j, j+1)
      }
    }
  };

  get deck() {
    return this.gameDeck;
  };
};

let game = new GameState();

console.log(game.deck);
game.shuffleDeck();
console.log(game.deck);
game.makeDeck();
console.log(game.deck);