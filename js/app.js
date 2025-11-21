/*-------------------------------- constants --------------------------------*/
const textMessage = {
  start: "Press deal to start.",
  playerTurn: "Your turn: Hit or Stand.",
  bustDealer: "Dealer busts. Player wins!",
  bustPlayer: "Player busts. Dealer wins.",
  dealerTurn: "Dealer's turn.",
  push: "Push. It's a tie.",
  playerWins: "You win!",
  dealerWins: "Dealer wins.",
  pushBlackJack: "Push. Both have blackjack.",
  dealerBlackjack: "🃏 Dealer has blackjack. You lose! 🃏",
  playerBlackjack: "🃏 Blackjack! You win. 🃏",
  gameOver: "Game Over! You're broke. Press RESET to play again.",
};
const bgMusic = new Audio("./audio/jazzM-background.mp3");
const winSound = new Audio("./audio/mixkit-achievement-bell-600.wav");
const loseSound = new Audio("./audio/mixkit-losing-bleeps-2026.wav");
const blackjackSound = new Audio("./audio/mixkit-video-game-win-2016.wav");
const gameOverSound = new Audio(
  "./audio/mixkit-player-losing-or-failing-2042.wav"
);

/*-------------------------------- variables --------------------------------*/
let deckCards = [];
let playerCards = [];
let dealerCards = [];
let playerTotal = 0;
let dealerTotal = 0;
let coins = 0;
let bet = 0;

// 'player', 'dealer' or 'none'
let turn = "none";

// 'idle', 'playing', 'player win', 'dealer win', 'push', 'bust', "DoubleBJ"
let outcome = "idle";

let blackjackPlayer = false;
let blackjackDealer = false;

let message = textMessage.start;
let lastOutcomeWithSound = null;
let isMusicMuted = false;
// Game Bg music
bgMusic.loop = true;
bgMusic.volume = 0.1;

/*------------------------ cached element references ------------------------*/

const deckTotalEl = document.getElementById("deck-total");
const playerTotalEl = document.getElementById("player-total");
const dealerTotalEl = document.getElementById("dealer-total");
const messageEl = document.getElementById("message");

const playerHandEl = document.getElementById("player-hand");
const dealerHandEl = document.getElementById("dealer-hand");
const coinEl = document.getElementById("bankroll");
const betEl = document.getElementById("current-bet");

const dealBtn = document.getElementById("btn-deal");
const hitBtn = document.getElementById("btn-hit");
const standBtn = document.getElementById("btn-stand");
const resetBtn = document.getElementById("btn-reset");

const musicBtn = document.getElementById("btn-music");
const rulesBtn = document.getElementById("btn-rules");
const rulesModal = document.getElementById("rules-modal");
const closeRulesBtn = document.getElementById("btn-close-rules");

/*----------------------------- event listeners -----------------------------*/

// Deal
dealBtn.addEventListener("click", (event) => {
  console.log("Deal button clicked:", event);
  handleDeal();
});
// Hit
hitBtn.addEventListener("click", (event) => {
  console.log("hit button clicked:", event);
  handleHit();
});
// stand
standBtn.addEventListener("click", (event) => {
  console.log("Stand button clicked:", event);
  handleStand();
});

// Reset
resetBtn.addEventListener("click", (event) => {
  console.log("Reset button clicked:", event);
  init();
});

// Music toggle
musicBtn.addEventListener("click", () => {
  toggleMusic();
});

// Show rules (open modal)
rulesBtn.addEventListener("click", () => {
  rulesModal.classList.remove("hidden");
});

// Close modal (X button)
closeRulesBtn.addEventListener("click", () => {
  rulesModal.classList.add("hidden");
});

/*-------------------------------- functions --------------------------------*/
const init = () => {
  deckCards = [
    "dA",
    "dQ",
    "dK",
    "dJ",
    "d10",
    "d09",
    "d08",
    "d07",
    "d06",
    "d05",
    "d04",
    "d03",
    "d02",
    "hA",
    "hQ",
    "hK",
    "hJ",
    "h10",
    "h09",
    "h08",
    "h07",
    "h06",
    "h05",
    "h04",
    "h03",
    "h02",
    "cA",
    "cQ",
    "cK",
    "cJ",
    "c10",
    "c09",
    "c08",
    "c07",
    "c06",
    "c05",
    "c04",
    "c03",
    "c02",
    "sA",
    "sQ",
    "sK",
    "sJ",
    "s10",
    "s09",
    "s08",
    "s07",
    "s06",
    "s05",
    "s04",
    "s03",
    "s02",
  ];
  blackjackPlayer = false;
  blackjackDealer = false;
  lastOutcomeWithSound = null;
  playerCards = [];
  dealerCards = [];
  playerTotal = 0;
  dealerTotal = 0;
  turn = "none";
  outcome = "idle";
  message = textMessage.start;
  dealBtn.disabled = false;
  hitBtn.disabled = true;
  standBtn.disabled = true;
  startBetting();
  deleteMessage();
  render();
};

const toggleMusic = () => {
  if (isMusicMuted === true) {
    isMusicMuted = false;
  } else {
    isMusicMuted = true;
  }

  if (isMusicMuted) {
    bgMusic.pause();
    bgMusic.currentTime = 0;
    musicBtn.textContent = "🔇";
  } else {
    musicBtn.textContent = "🔊";
    playMusicBg();
  }
};

const playMusicBg = () => {
  if (isMusicMuted) return;

  bgMusic.currentTime = 0;
  bgMusic.play();
};

const manageMusic = () => {
  if (isMusicMuted) return;

  if (outcome === lastOutcomeWithSound) return;

  deleteEfectMusic();

  if (outcome === "player win") {
    winSound.currentTime = 0;
    winSound.play();
  } else if (outcome === "dealer win") {
    loseSound.currentTime = 0;
    loseSound.play();
  } else if (outcome === "player blackjack") {
    blackjackSound.currentTime = 0;
    blackjackSound.play();
  } else if (outcome === "game over") {
    gameOverSound.currentTime = 0;
    gameOverSound.play();
  }

  lastOutcomeWithSound = outcome;
};

const deleteEfectMusic = () => {
  winSound.pause();
  winSound.currentTime = 0;
  loseSound.pause();
  loseSound.currentTime = 0;
  blackjackSound.pause();
  blackjackSound.currentTime = 0;
  gameOverSound.pause();
  gameOverSound.currentTime = 0;
};

const stopMusic = () => {
  bgMusic.pause();
  bgMusic.currentTime = 0;
};

const startBetting = () => {
  coins = 100;
  bet = 10;
};

// 'idle', 'playing', 'player win', 'dealer win', 'push', 'bust', "DoubleBJ"
const calcBetting = () => {
  if (
    outcome === "idle" ||
    outcome === "playing" ||
    outcome === "push" ||
    outcome === "DoubleBJ"
  ) {
    return;
  }

  if (outcome === "dealer win" || outcome === "dealer blackjack") {
    coins = coins - bet;
  } else if (outcome === "player win") {
    coins = coins + bet;
  } else if (outcome === "player blackjack") {
    coins = coins + Math.floor(bet * 1.5);
  }

  if (coins <= 0) {
    coins = 0;
    outcome = "game over";
    gameOver();
  }
  render();
};

const render = () => {
  messageEl.textContent = message;
  deckTotalEl.textContent = deckCards.length;
  playerTotalEl.textContent = `Total: ${playerTotal}`;
  coinEl.textContent = `${coins}`;
  betEl.textContent = `${bet}`;

  playerHandEl.innerHTML = "";
  playerCards.forEach((card) => {
    const cardEl = document.createElement("div");
    cardEl.classList.add("card", "large", card);
    playerHandEl.appendChild(cardEl);
  });

  dealerHandEl.innerHTML = "";

  if (outcome === "playing" && turn === "player") {
    if (dealerCards.length > 0) {
      let firstCardEl = document.createElement("div");
      firstCardEl.classList.add("card", "large", dealerCards[0]);
      dealerHandEl.appendChild(firstCardEl);

      if (dealerCards.length > 1) {
        const firstCard = dealerCards.slice(0, 1);
        const dealerFirstValue = getHandTotal(firstCard);
        dealerTotalEl.textContent = `Total: ${dealerFirstValue}`;
        const hiddenCard = document.createElement("div");
        hiddenCard.classList.add("card", "large", "back");
        dealerHandEl.appendChild(hiddenCard);
      }
    }
  } else if (outcome !== "playing" || turn !== "player") {
    dealerTotalEl.textContent = `Total: ${dealerTotal}`;
    dealerCards.forEach((card) => {
      const cardEl = document.createElement("div");
      cardEl.classList.add("card", "large", card);
      dealerHandEl.appendChild(cardEl);
    });
  }
};

const checkBlackJack = (handCards) => {
  if (handCards.length !== 2) {
    return false;
  } else if (handCards.length === 2 && getHandTotal(handCards) === 21) {
    return true;
  } else {
    return false;
  }
};

const checkWinner = () => {
  if (outcome !== "playing") return;

  if (playerTotal > dealerTotal) {
    outcome = "player win";
    message = textMessage.playerWins;
    updateMessage();
    calcBetting();
    manageMusic();
  } else if (dealerTotal > playerTotal) {
    outcome = "dealer win";
    message = textMessage.dealerWins;
    updateMessage();
    calcBetting();
    manageMusic();
  } else {
    outcome = "push";
    message = textMessage.push;
    updateMessage();
    calcBetting();
    manageMusic();
  }
};

const gameOver = () => {
  message = textMessage.gameOver;
  hitBtn.disabled = true;
  standBtn.disabled = true;
  dealBtn.disabled = true;
  resetBtn.disabled = false;
  updateMessage();
  stopMusic();
  return;
};

const endRound = () => {
  if (outcome === "game over") return;
  turn = "none";
  hitBtn.disabled = true;
  standBtn.disabled = true;
  dealBtn.disabled = false;
  outcome = "idle";
  render();
};

const reStartDeck = () => {
  playerCards = [];
  dealerCards = [];
  playerTotal = 0;
  dealerTotal = 0;
  blackjackPlayer = false;
  blackjackDealer = false;
  lastOutcomeWithSound = null;
  deleteMessage();
  deckCards = [
    "dA",
    "dQ",
    "dK",
    "dJ",
    "d10",
    "d09",
    "d08",
    "d07",
    "d06",
    "d05",
    "d04",
    "d03",
    "d02",
    "hA",
    "hQ",
    "hK",
    "hJ",
    "h10",
    "h09",
    "h08",
    "h07",
    "h06",
    "h05",
    "h04",
    "h03",
    "h02",
    "cA",
    "cQ",
    "cK",
    "cJ",
    "c10",
    "c09",
    "c08",
    "c07",
    "c06",
    "c05",
    "c04",
    "c03",
    "c02",
    "sA",
    "sQ",
    "sK",
    "sJ",
    "s10",
    "s09",
    "s08",
    "s07",
    "s06",
    "s05",
    "s04",
    "s03",
    "s02",
  ];
};

// 'idle', 'playing', 'player win', 'dealer win', 'push', 'bust', "DoubleBJ"
const updateMessage = () => {
  if (outcome === "player win") {
    messageEl.classList.add("win");
    return;
  } else if (outcome === "dealer win") {
    messageEl.classList.add("lose");
    return;
  } else if (outcome === "push") {
    messageEl.classList.add("push");
    return;
  } else if (outcome === "bust") {
    messageEl.classList.add("bust");
    return;
  } else if (outcome === "DoubleBJ") {
    messageEl.classList.add("DoubleBJ");
    return;
  } else if (outcome === "player blackjack") {
    messageEl.classList.add("playerblackjack");
    return;
  } else if (outcome === "dealer blackjack") {
    messageEl.classList.add("dealerblackjack");
    return;
  } else if (outcome === "game over") {
    messageEl.classList.add("gameOver");
    return;
  }
};

const deleteMessage = () => {
  messageEl.classList.remove("win");
  messageEl.classList.remove("lose");
  messageEl.classList.remove("push");
  messageEl.classList.remove("bust");
  messageEl.classList.remove("DoubleBJ");
  messageEl.classList.remove("playerblackjack");
  messageEl.classList.remove("dealerblackjack");
  messageEl.classList.remove("gameOver");
};

const drawRandomCard = () => {
  if (deckCards.length === 0) {
    console.warn("[DRAW] No cards left in deck!");
    return null;
  }
  const randomIdx = Math.floor(Math.random() * deckCards.length);
  const cardPicked = deckCards.splice(randomIdx, 1)[0];
  console.log("[DRAW] Card picked:", cardPicked);
  return cardPicked;
};

const checkBust = (points) => {
  return points > 21;
};

const getHandTotal = (handCards) => {
  let total = 0;
  let aces = 0;
  handCards.forEach((card) => {
    const value = card.slice(1);
    if (value === "A") {
      aces = aces + 1;
      total = total + 11;
    } else if (value === "K" || value === "Q" || value === "J") {
      total = total + 10;
    } else {
      total = total + parseInt(value);
    }
  });
  while (total > 21 && aces > 0) {
    total = total - 10;
    aces = aces - 1;
  }
  return total;
};

const handleStand = () => {
  if (outcome !== "playing" || turn !== "player") return;
  turn = "dealer";
  dealBtn.disabled = true;
  hitBtn.disabled = true;
  standBtn.disabled = true;
  message = textMessage.dealerTurn;
  handleDealerTurn();
};

const handleDeal = () => {
  if (outcome !== "idle") return;
  if (coins <= 0) {
    gameOver();
    outcome = "game over";
    manageMusic();
    return;
  }
  playMusicBg();
  deleteEfectMusic();
  reStartDeck();
  turn = "player";
  outcome = "playing";
  message = textMessage.playerTurn;

  const card1 = drawRandomCard();
  if (card1) {
    playerCards.push(card1);
  }
  const card2 = drawRandomCard();
  if (card2) {
    playerCards.push(card2);
  }

  playerTotal = getHandTotal(playerCards);
  console.log("[TOTAL] Player hand total:", playerTotal);
  blackjackPlayer = checkBlackJack(playerCards);

  const card3 = drawRandomCard();
  if (card3) {
    dealerCards.push(card3);
  }
  const card4 = drawRandomCard();
  if (card4) {
    dealerCards.push(card4);
  }
  dealerTotal = getHandTotal(dealerCards);
  blackjackDealer = checkBlackJack(dealerCards);
  if (blackjackDealer) {
    if (blackjackPlayer) {
      outcome = "DoubleBJ";
      message = textMessage.pushBlackJack;
      updateMessage();
      calcBetting();
      manageMusic();
      endRound();
    } else {
      outcome = "dealer blackjack";
      message = textMessage.dealerBlackjack;
      updateMessage();
      calcBetting();
      manageMusic();
      endRound();
    }
  } else if (blackjackPlayer) {
    message = textMessage.playerBlackjack;
    outcome = "player blackjack";
    updateMessage();
    calcBetting();
    manageMusic();
    endRound();
  }
  if (!blackjackDealer && !blackjackPlayer) {
    hitBtn.disabled = false;
    dealBtn.disabled = true;
    standBtn.disabled = false;
  }
  render();
};

const handleDealerTurn = () => {
  if (outcome !== "playing" || turn !== "dealer") return;

  while (dealerTotal < 17) {
    const card = drawRandomCard();
    if (card) {
      dealerCards.push(card);
    }
    dealerTotal = getHandTotal(dealerCards);
  }
  const bustDealers = checkBust(dealerTotal);
  if (bustDealers) {
    outcome = "player win";
    message = textMessage.bustDealer;
    updateMessage();
    calcBetting();
    manageMusic();
  } else {
    checkWinner();
  }
  endRound();
};

const handleHit = () => {
  if (outcome !== "playing") return;
  const card = drawRandomCard();
  if (card) {
    playerCards.push(card);
  }
  playerTotal = getHandTotal(playerCards);
  const bustPlayers = checkBust(playerTotal);
  if (bustPlayers) {
    outcome = "dealer win";
    message = textMessage.bustPlayer;
    updateMessage();
    calcBetting();
    manageMusic();
    endRound();
  } else {
    message = textMessage.playerTurn;
    render();
  }
};

/*--------------------------------- Start -----------------------------------*/
init();
