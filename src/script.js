let game;

function handleStartGame() {
  startGame();
}

function handleBet() {
  const betInputEl = document.getElementById("bet-input");
  game.bet = parseInt(betInputEl.value);

  if (game.bet) {
    const gameContainer = document.getElementById("game-container");
    gameContainer.classList.remove("invisible");

    betInputEl.parentElement.classList.add("invisible");

    document.getElementById(
      "bet-result-text"
    ).innerHTML = `<p>BET: ${game.bet}</p>`;
    updatePlayerHand();
  }
}

function handleHit() {
  game.hitPlayer();
  updatePlayerHand();
}

function handleStay() {
  game.Stay();
  updatePlayerHand();
}

function handlePlayAgain() {
  swapGameToMainMenu();
}

function startGame() {
  swapMainMenuToGame();

  game.clearState();
  game.shuffleDeck();
}

function swapGameToMainMenu() {
  const startMenuEl = document.getElementById("start-menu");
  const bjTableEl = document.getElementById("bj-table");
  const betFormEl = document.getElementById("bet-form");
  bjTableEl.classList.add("invisible");
  startMenuEl.classList.remove("invisible");
  betFormEl.classList.remove("invisible");
}

function swapMainMenuToGame() {
  const startMenuEl = document.getElementById("start-menu");
  const bjTableEl = document.getElementById("bj-table");
  bjTableEl.classList.remove("invisible");
  startMenuEl.classList.add("invisible");

  const gameContainer = document.getElementById("game-container");
  gameContainer.classList.add("invisible");

  document.getElementById("dealer-total").innerText = "";
  document.getElementById("player-total").innerText = "";
  document.getElementById("result").innerText = "";
}

function updatePlayerHand() {
  const playerHandEl = document.getElementById("player-hand");
  playerHandEl.innerHTML = "";
  for (const [suit, value] of game.player) {
    const cardEl = document.createElement("img");
    cardEl.src = `./src/cards/${value}_of_${suit}.svg`;
    playerHandEl.appendChild(cardEl);
  }

  if (game.playerTotal >= 21) {
    console.log("BUST");
    game.Stay();
  }
}
