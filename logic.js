let currentSyllable = "";
let correctWord = "";
let gameMode = "easy"; // Default mode
let fullWords = [
  "a",
  "i",
  "u",
  "e",
  "o",
  "ka",
  "ki",
  "ku",
  "ke",
  "ko",
  "sa",
  "shi",
  "su",
  "se",
  "so",
  "ta",
  "chi",
  "tsu",
  "te",
  "to",
  "na",
  "ni",
  "nu",
  "ne",
  "no",
  "ha",
  "hi",
  "fu",
  "he",
  "ho",
  "ma",
  "mi",
  "mu",
  "me",
  "mo",
  "ya",
  "yu",
  "yo",
  "ra",
  "ri",
  "ru",
  "re",
  "ro",
  "wa",
  "wo",
  "n",
];
let words = [
  "あ",
  "い",
  "う",
  "え",
  "お",
  "か",
  "き",
  "く",
  "け",
  "こ",
  "さ",
  "し",
  "す",
  "せ",
  "そ",
  "た",
  "ち",
  "つ",
  "て",
  "と",
  "な",
  "に",
  "ぬ",
  "ね",
  "の",
  "は",
  "ひ",
  "ふ",
  "へ",
  "ほ",
  "ま",
  "み",
  "む",
  "め",
  "も",
  "や",
  "ゆ",
  "よ",
  "ら",
  "り",
  "る",
  "れ",
  "ろ",
  "わ",
  "を",
  "ん",
];
let score = 0; // Initialize score

const modeSelection = document.getElementById("mode-selection");
const startGame = document.getElementById("start-game");
const primaryHeading_1 = document.getElementById("primary-heading-output-1");
const primaryHeading_2 = document.getElementById("primary-heading-output-2");
const userInput = document.getElementById("user-input");
const result = document.getElementById("result");
const scoreE = document.getElementById("score");
const containerInput = document.getElementById("container__input");
const resetGame = document.getElementById("reset-game");

// Function to select the game mode
function selectMode(mode) {
  gameMode = mode;
  modeSelection.style.display = "none"; // Hide mode selection
  startGame.style.display = "inline-block"; // Show start game button
}

// Function to show a random syllable and enable the input box
let previousIndex = -1; // To track the last shown word index

function showRandomWord() {
  if (words.length === 0 || fullWords.length === 0) {
    console.error(
      "Word lists are empty. Please add words before starting the game."
    );
    return; // Exit if there are no words to show
  }

  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * words.length);
  } while (randomIndex === previousIndex); // Ensure the same word is not shown consecutively

  previousIndex = randomIndex;

  // Set the current syllable and correct word based on the game mode
  if (gameMode === "hard") {
    currentSyllable = fullWords[randomIndex];
    correctWord = words[randomIndex];
  } else {
    currentSyllable = words[randomIndex];
    correctWord = fullWords[randomIndex];
  }

  // Update the UI
  primaryHeading_1.style.display = "inline-block";
  primaryHeading_2.style.display = "inline-block";
  primaryHeading_2.innerText = currentSyllable;
  userInput.value = ""; // Clear previous input
  result.innerText = ""; // Clear previous result
}
// Function to check the user's input
function checkAnswer() {
  const userInput = document
    .getElementById("user-input")
    .value.trim()
    .toLowerCase();
  const scoreE = document.getElementById("score"); // Ensure you have this reference

  if (userInput === correctWord) {
    score += 10; // Increase score by 10 points
    result.innerText = "You Win 😁! Correct word!";
    result.style.color = "#a6ff6e";

    // Add animation classes
    scoreE.classList.add("shake", "grow");
    result.classList.add("shake", "grow");

    setTimeout(showRandomWord, 2000); // Automatically show a new word after 2 seconds
  } else {
    score -= 10;
    result.innerText = "You Lost 🥺! Wrong word!";
    result.style.color = "#ea8221";
  }

  scoreE.innerText = "Score: " + score; // Update score display

  if (score === -100) {
    scoreE.style.color = "red";
    scoreE.innerText = "Too low score, 💀😭 ";
    setTimeout(resetGameF, 3000);
  }

  // Remove animation classes after animation ends
  setTimeout(() => {
    scoreE.classList.remove("shake", "grow");
    result.classList.remove("shake", "grow");
  }, 1000); // Match this duration with the animation duration
}

// Function to reset the game
function resetGameF() {
  score = 0; // Reset score
  scoreE.innerText = "Score: " + score; // Update score display
  result.innerText = ""; // Clear result message
  containerInput.style.display = "none"; // Hide input box
  startGame.style.display = "none"; // Hide start game button
  startGame.innerHTML = "start game";
  resetGame.style.display = "none"; // Hide reset button
  modeSelection.style.display = "block"; // Show mode selection again
  primaryHeading_1.style.display = "none";
  primaryHeading_2.style.display = "none";
}

// Event listener for the start game button
document.getElementById("start-game").addEventListener("click", function () {
  const selectedLength = parseInt(document.getElementById("length").value);
  words = words.slice(0, selectedLength); // Adjust words array based on selected length
  fullWords = fullWords.slice(0, selectedLength); // Adjust fullWords array based on selected length
  showRandomWord(); // Start the game
  containerInput.style.display = "flex";
  scoreE.style.display = "block";
  resetGame.style.display = "inline-block";
  startGame.innerText = "new word"; // Show reset button
});

// Allow the user to generate a new random word when the Meta key is pressed
document.addEventListener("keydown", function (event) {
  if (event.metaKey || event.key === "Meta") {
    showRandomWord(); // Generate a new random word
  }
});
// Function to check if Enter key is pressed
function checkEnter(event) {
  if (event.key === "Enter") {
    checkAnswer();
  }
}

// Initialize the game by showing the length selection and hiding the input
document.addEventListener("DOMContentLoaded", function () {
  containerInput.style.display = "none"; // Hide input initially
  startGame.style.display = "none"; // Hide start game button initially
  resetGame.style.display = "none"; // Hide reset button initially
});
