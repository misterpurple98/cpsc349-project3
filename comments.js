class GameState {
  gameDeck = new Array();
  suits = ["spades", "hearts", "diamonds", "clubs"];
  types = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  
  player = new Array();
  dealer = new Array();

  constructor() {
    this.makeDeck();
  };

  clearState() {
    this.player = [];
    this.dealer = [];
    this.makeDeck();
  };

  hitPlayer() {
    this.player.push(this.gameDeck.pop())
  };

  hitDealer() {
    this.dealer.push(this.gameDeck.pop())
  };

  makeDeck() {
    this.gameDeck = [];
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
       let tmp = this.gameDeck[i];
       this.gameDeck[i] = this.gameDeck[j];
       this.gameDeck[j] = tmp;
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

game.shuffleDeck();
console.log(game.deck);
game.hitPlayer();
game.hitDealer();
console.log(game.player);
console.log(game.dealer);
console.log(game.deck);

game.clearState();
console.log(game.deck);
console.log(game.player);
console.log(game.dealer);
