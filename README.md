# Blackjack Game

![BlackJack Game](https://i.postimg.cc/fbgCpgXn/Screenshot-2025-11-20-at-9-43-18-PM.png)

A simple **Blackjack** game built with **HTML, CSS, and JavaScript** as part of my General Assembly coursework.

The player plays against the dealer, can **hit** or **stand**, and manages a small **bankroll** with fixed bets. The UI simulates a casino table with animated messages and sound effects for wins, losses, blackjack and game over. 

> This game is deployed at: [Play Live Demo Here](https://gabogara.github.io/blackjack-proyect/)
---

## Features

- Classic **Blackjack rules**:
  - Number cards are worth their face value
  - J, Q, K are worth 10
  - Aces can count as **1 or 11**
  - Dealer hits until reaching **17 or more**
- **Single-player vs dealer**
- **Bankroll system**:
  - Start with `40` coins
  - Fixed bet of `10` per round
  - Blackjack pays **1.5x**
  - Game over when bankroll reaches **0**
- **Animated status messages**:
  - Win / Lose / Push / Blackjack / Game Over
- **Background music** that plays during a round
- **Sound effects** for:
  - Player win
  - Dealer win
  - Player blackjack
  - Game over
- **Responsive layout** using media queries (desktop, tablet, mobile)
- Extra UI controls:
  - **Music toggle** button
  - **Rules** button (I) showing basic Blackjack rules

---

## Tech Stack

- **HTML5**
- **CSS3**
  - Custom styles in `style.css`
  - Card styling provided by `cardstarter.css` (starter code)
- **JavaScript**
  - Game logic in `app.js`
  - DOM manipulation for rendering cards and messages
  - Audio management with the `Audio` Class

---

## Project structure

```text
├── index.html
├── css
│   ├── cardstarter.css
│   └── style.css
├── js
│   └── app.js
└── audio
    ├── jazzM-background.mp3
    ├── mixkit-achievement-bell-600.wav
    ├── mixkit-losing-bleeps-2026.wav
    ├── mixkit-video-game-win-2016.wav
    └── mixkit-player-losing-or-failing-2042.wav
```

---

## How to Run the Project

### 1. Clone this repository:

```bash
git clone https://github.com/gabogara/blackjack-proyect
cd blackjack-proyect
```

### 2. Open the project in your browser

**Recommended (VS Code + Live Server):**

1. Open this project folder in **VS Code**.
2. Make sure you have the **Live Server** extension installed.
3. In the file explorer, **right–click** on `index.html` and select **"Open with Live Server"**.
4. Your browser will open automatically at a local URL, for example:

```text
http://127.0.0.1:5500/index.html
```

---

## How to Play

- Press DEAL to start a new round.
- You and the dealer each receive 2 cards (dealer shows one hidden).
- Your options:
  - HIT – draw another card.
  - STAND – end your turn and let the dealer play.
- The dealer draws until reaching at least 17.
- The result will be displayed:
  - Player win / Dealer win / Push (tie).
  - Special messages and sound when there is Blackjack or Game Over.
- When your bankroll reaches 0, the game will show Game Over and disable DEAL until you press RESET.

---

## Audio

This project uses simple sound effects and background music via the `Audio` Class:

```javascript
const bgMusic = new Audio("./audio/jazzM-background.mp3");
const winSound = new Audio("./audio/mixkit-achievement-bell-600.wav");
```

- Background music loops while a round is active.
- Outcome sounds play once at the end of the round.
- The music button toggles background music on/off.

> Sound background was downloaded from [Pixabay](https://pixabay.com/users/backgroundmusicforvideos-46459014/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=249670) and sonds effects were downloaded from [Mixkit](https://mixkit.co/free-sound-effects). Please check licenses before reusing them in another project.

---

## Possible Improvements / Future Work

- Make the bet amount adjustable.
- Use multiple decks instead of resetting the same deck every round.
- Add keyboard shortcuts for Deal / Hit / Stand.
- Add more detailed dealer/player stats.

---

## Acknowledgements

- General Assembly starter code for card styling and DOM structure.
- Thanks to my instructors and peers for feedback and review.

## Attributions

This project was built using starter code provided by General Assembly:

- [Playing Audio in the Browser – Starter Code](https://git.generalassemb.ly/modular-curriculum-all-courses/playing-audio-in-the-browser-starter-code)
- [Card Game – Starter Code](https://git.generalassemb.ly/modular-curriculum-all-courses/card-game-starter-code)

Audio assets:

- Game sound effects from [Mixkit](https://mixkit.co/free-sound-effects/).
- Background music by [Pixabay](https://pixabay.com/users/backgroundmusicforvideos-46459014/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=249670).

Icons:

- Card / game symbols from [PiliApp Facebook Symbols](https://es.piliapp.com/facebook-symbols/).

Fonts:

- [Cinzel Decorative](https://fonts.google.com/specimen/Cinzel+Decorative) – from [Google Fonts](https://fonts.google.com/)
- [Montserrat](https://fonts.google.com/specimen/Montserrat) – from [Google Fonts](https://fonts.google.com/)
