class GameState {
  // Field declarations for standard 52-card Deck
  gameDeck = []
  suits = ['spades', 'hearts', 'diamonds', 'clubs']
  types = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

  // Field declarations for player/dealer hands and totals
  player = []
  playerTotal = 0
  dealer = []
  dealerTotal = 0

  // Constructor that simply runs method to generate the deck
  constructor (bet = 1) {
    if (window.localStorage.getItem('wDeck')) {
      this.gameDeck = JSON.parse(window.localStorage.wDeck)
      this.player = JSON.parse(window.localStorage.wPlayer)
      this.playerTotal = window.localStorage.wPlayerTotal
      this.dealer = JSON.parse(window.localStorage.wDealer)
      this.dealerTotal = window.localStorage.wDealerTotal
      this.bet = window.localStorage.wBet
    } else {
      this.makeDeck()
      this.shuffleDeck()
      this.bet = bet

      for (let i = 0; i < 2; i++) {
        this.hitDealer()
        this.hitPlayer()
      }
      this.updateCache()
    }
  }

  updateCache () {
    window.localStorage.wDeck = JSON.stringify(this.gameDeck)
    window.localStorage.wPlayer = JSON.stringify(this.player)
    window.localStorage.wPlayerTotal = this.playerTotal
    window.localStorage.wDealer = JSON.stringify(this.dealer)
    window.localStorage.wDealerTotal = this.dealerTotal
    window.localStorage.wBet = this.bet
  };

  // This will check for a win, and (possibly) update HTML

  Stay () {
    let message = ''
    if (this.playerTotal > 21) {
      message = 'You Lost!'
    } else if (this.dealerTotal > 21) {
      message = 'You Win!'
      this.bet = this.bet * 2
    } else if (this.playerTotal === this.dealerTotal) {
      message = 'Tie!'
    } else if (this.playerTotal > this.dealerTotal) {
      message = 'You Win!'
      this.bet = this.bet * 2
    } else if (this.playerTotal < this.dealerTotal) {
      message = 'You Lost!'
    }
    document.getElementById('dealer-total').innerText = this.dealerTotal
    document.getElementById('player-total').innerText = this.playerTotal
    document.getElementById('result').innerText = message
  }

  // Reset cards and deck
  clearState () {
    this.player = []
    this.dealer = []
    this.playerTotal = 0
    this.dealerTotal = 0
    this.makeDeck()
    this.updateCache()
    // this.update();
  }

  // Reads a given card array
  // Returns the card total according to Blackjack Rules
  updateCount (cardArray) {
    let workingCount = 0
    let totalAces = 0
    for (const card in cardArray) {
      switch (cardArray[card][1]) {
        case 'J':
        case 'Q':
        case 'K':
        case '10':
          workingCount += 10
          break
        case 'A':
          totalAces += 1
          break
        default:
          workingCount += parseInt(cardArray[card][1])
      }
    }
    // Checks whether an 11 would bust, and if so evaluates the A to 1
    while (totalAces > 0) {
      if (11 + workingCount < 21) {
        workingCount += 11
      } else {
        workingCount += 1
      }
      totalAces--
    }
    return workingCount
  }

  // Pop the top card off the deck and push it into the players hand
  hitPlayer () {
    this.player.push(this.gameDeck.pop())
    this.playerTotal = this.updateCount(this.player)
    document.getElementById('player-total').innerText = this.playerTotal
    this.updateCache()
    // this.update()
  }

  // Pop the top card off the deck and push it into the dealers hand
  hitDealer () {
    this.dealer.push(this.gameDeck.pop())
    this.dealerTotal = this.updateCount(this.dealer)
    document.getElementById('player-total').innerText = this.playerTotal
    this.updateCache()
    // this.update()
  }

  // Creates cards by assigning their suit/type
  // Pushes the created card into the deck
  makeDeck () {
    this.gameDeck = []
    for (const suit in this.suits) {
      for (const type in this.types) {
        const card = [this.suits[suit], this.types[type]]
        this.gameDeck.push(card)
      }
    }
  }

  // Fisher-Yates shuffle implementation
  shuffleDeck () {
    for (let i = this.gameDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i)
      if (j !== i) {
        const tmp = this.gameDeck[i]
        this.gameDeck[i] = this.gameDeck[j]
        this.gameDeck[j] = tmp
      }
    }
  }

  // Returns the game deck for testing purposes
  get deck () {
    return this.gameDeck
  }
}

game = new GameState()
