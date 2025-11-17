/*-------------------------------- constants --------------------------------*/
const textMessage = {
  start: "press deal to start.",
  playerTurn: "your turn: hit or stand.",
  bust: "bust!",
  dealerTurn: "dealer turn",
  push: "push.",
  playerWins: "you win!",
  dealerWins: "dealer wins.",
  dealerBlackjack: "dealer has blackjack.",
  playerBlackjack: "blackjack! you win.",
};

/*-------------------------------- variables --------------------------------*/
let deck = [];
let playerHand = [];
let dealerHand = [];
let playerTotal = 0;
let dealerTotal = 0;

// 'player', 'dealer' or 'none'
let turn = "none";

// 'idle', 'playing', 'player win', 'dealer win', 'push', 'bust'
let outcome = "idle";

let message = textMessage.start;

/*------------------------ cached element references ------------------------*/

const deckEl = document.getElementById("deck");
const playerTotalEl = document.getElementById("player-total");
const dealerTotalEl = document.getElementById("dealer-total");
const messageEl = document.getElementById("message");

const playerHandEl = document.getElementById("player-hand");
const dealerHandEl = document.getElementById("dealer-hand");

const dealBtn = document.getElementById("btn-deal");
const hitBtn = document.getElementById("btn-hit");
const standBtn = document.getElementById("btn-stand");
const resetBtn = document.getElementById("btn-reset");

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

standBtn.addEventListener("click", (event) => {
  console.log("Stand button clicked:", event);
  handleStand();
});

// Reset
resetBtn.addEventListener("click", (event) => {
  console.log("Reset button clicked:", event);
  init();
});

/*-------------------------------- functions --------------------------------*/
const init = () => {
  deck = [
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

  playerHand = [];
  dealerHand = [];
  playerTotal = 0;
  dealerTotal = 0;
  turn = "none";
  outcome = "idle";
  message = textMessage.start;
  dealBtn.disabled = false;
  hitBtn.disabled = true;
  standBtn.disabled = true;
  render();
};

const render = () => {
  playerTotalEl.textContent = `Total: ${playerTotal}`;
  dealerTotalEl.textContent = `Total: ${dealerTotal}`;

  // Status message
  messageEl.textContent = message;

  // Remaining cards in the deck
  deckEl.textContent = deck.length;

  // Player hand
  playerHandEl.innerHTML = "";
  playerHand.forEach((card) => {
    const cardEl = document.createElement("div");
    cardEl.classList.add("card", "large");
    cardEl.classList.add(card); // "dA", "h10"...
    playerHandEl.appendChild(cardEl);
  });

  dealerHandEl.innerHTML = "";
  dealerHand.forEach((card) => {
    const cardEl = document.createElement("div");
    cardEl.classList.add("card", "large");
    cardEl.classList.add(card);
    dealerHandEl.appendChild(cardEl);
  });
};

const drawRandomCard = () => {
  if (deck.length === 0) {
    console.warn("[DRAW] No cards left in deck!");
    return null;
  }

  const randomIdx = Math.floor(Math.random() * deck.length);
  const cardPicked = deck.splice(randomIdx, 1)[0];
  console.log("[DRAW] Card picked:", cardPicked);
  return cardPicked;
};

const checkBust = (points) => {
  return points > 21;
};

const getHandTotal = (hand) => {
  let total = 0;
  hand.forEach((card) => {
    const value = card.slice(1);
    if (value === "A") {
      total += 11;
    } else if (value === "K" || value === "Q" || value === "J") {
      total += 10;
    } else {
      total = total + parseInt(value);
    }
  });

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
  render();
};

const handleDeal = () => {
  if (outcome !== "idle") return;

  turn = "player";
  outcome = "playing";
  message = textMessage.playerTurn;

  const card1 = drawRandomCard();
  if (card1) {
    playerHand.push(card1);
  }
  const card2 = drawRandomCard();
  if (card2) {
    playerHand.push(card2);
  }
  playerTotal = getHandTotal(playerHand);
  console.log("[TOTAL] Player hand total:", playerTotal);
  hitBtn.disabled = false;
  dealBtn.disabled = true;
  standBtn.disabled = false;

  render();
};

const handleDealerTurn = () => {
  if (turn !== "dealer") return;

  const card1 = drawRandomCard();
  if (card1) {
    dealerHand.push(card1);
  }
  const card2 = drawRandomCard();
  if (card2) {
    dealerHand.push(card2);
  }
  dealerTotal = getHandTotal(dealerHand);
  const bustDealer = checkBust(dealerHand);
  if (bustDealer) {
    outcome = "player win";
    message = textMessage.playerWins;
  } else {
  }
};

const handleHit = () => {
  if (outcome !== "playing") return;
  const card = drawRandomCard();
  if (card) {
    playerHand.push(card);
  }
  playerTotal = getHandTotal(playerHand);
  const bustPlayer = checkBust(playerTotal);
  if (bustPlayer) {
    outcome = "bust";
    turn = "none";
    message = textMessage.dealerWins;
    standBtn.disabled = true;
    hitBtn.disabled = true;
  } else {
    message = textMessage.playerTurn;
  }

  render();
};

/*--------------------------------- Start -----------------------------------*/
init();
