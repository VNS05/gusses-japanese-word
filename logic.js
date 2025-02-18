// Game Variables
let currentSyllable = "";
let correctWord = "";
let newWords = [];
let newFullWords = [];
let gameMode = "easy"; // Default mode
let animationPlayed = false;
let score = 0; // Initialize score
let totalWord = 0;
let totalCorrectWord = 0;
let wrongWord = 0;

// Word Lists
const fullWords = [
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

const words = [
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

// DOM Elements
const modeSelection = document.getElementById("mode-selection");
const startGame = document.getElementById("start-game");
const primaryHeading_1 = document.getElementById("primary-heading-output-1");
const primaryHeading_2 = document.getElementById("primary-heading-output-2");
const userInput = document.getElementById("user-input");
const result = document.getElementById("result");
const scoreE = document.getElementById("score");
const scoreItemsE = document.getElementById("score-item");
const containerInput = document.getElementById("container__input");
const resetGame = document.getElementById("reset-game");
const checkButton = document.getElementById("check-button");
const lengthSelector = document.getElementById("length");
let randomIndexObject = null;

class UniqueRandomIndexGenerator {
  constructor(arr) {
    this.originalArray = arr;
    this.shuffledIndices = [];
    this.currentIndex = 0;
    this.shuffle(); // Shuffle the indices on initialization
  }

  shuffle() {
    // Create an array of indices
    this.shuffledIndices = Array.from(Array(this.originalArray.length).keys());
    for (let i = this.shuffledIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.shuffledIndices[i], this.shuffledIndices[j]] = [
        this.shuffledIndices[j],
        this.shuffledIndices[i],
      ]; // Swap elements
    }
    this.currentIndex = 0; // Reset index after shuffling
  }

  getNextUniqueIndex() {
    if (this.currentIndex < this.shuffledIndices.length) {
      return this.shuffledIndices[this.currentIndex++]; // Return the next index and increment index
    } else {
      return null; // Return null if all indices have been used
    }
  }

  reset() {
    this.shuffle(); // Reshuffle the indices and reset the index
  }
}
// Function to update word lists based on selected range
function updateWordLists(start, end) {
  // Ensure the start and end values are within the bounds of the original arrays
  if (start < 0 || end > fullWords.length || start >= end) {
    console.error("Invalid range for word selection.");
    return;
  }

  // Create new arrays based on the selected range
  newWords = words.slice(start, end);
  newFullWords = fullWords.slice(start, end);

  console.log("Updated word lists:", newFullWords, newWords);
  console.log("Updated words length:", newWords.length);

  scoreE.innerText = "Updated words length: " + newWords.length;
  scoreE.style.color = "red";
  setTimeout(() => {
    updateScoreDisplay();
    scoreE.style.color = "";
  }, 2000);

  // 🛑 Reset and reinitialize the random index generator
  randomIndexObject = new UniqueRandomIndexGenerator(newWords);
}
updateWordLists(0, 5);

// Event listener for length selection
lengthSelector.addEventListener("change", function () {
  const selectedValue = this.value; // Get the selected value
  let selectedStartLength, selectedEndLength;

  if (selectedValue.includes("-")) {
    // If the selected value is a range (e.g., "6-10")
    [selectedStartLength, selectedEndLength] = selectedValue
      .split("-")
      .map(Number); // Get the start and end lengths
  } else {
    // If the selected value is a single number (e.g., "5")
    selectedStartLength = 0; // Start from index 0
    selectedEndLength = parseInt(selectedValue); // Set end to the selected value
  }
  console.log("sel" + selectedStartLength);
  console.log("selE" + selectedEndLength);
  updateWordLists(selectedStartLength, selectedEndLength); // Update the word lists
});

// Function to select the game mode
function selectMode(mode) {
  gameMode = mode;
  modeSelection.style.display = "none"; // Hide mode selection
  startGame.style.display = "inline-block"; // Show start game button
}

// Function to show a random syllable and enable the input box

//
//
let isGenerating = false;
//
//
// Event listener for the start game button and select word length
startGame.addEventListener("click", function () {
  if (isGenerating) return; // Prevent multiple clicks
  isGenerating = true;

  showRandomWord(); // Start the game
  containerInput.style.display = "flex";
  scoreE.style.display = "block";
  scoreItemsE.style.display = "block";
  resetGame.style.display = "inline-block";
  startGame.innerText = "New Word"; // Show reset button
  setTimeout(() => {
    isGenerating = false;
  }, 10000);
});
randomIndexObject = new UniqueRandomIndexGenerator(newWords);
function showRandomWord() {
  if (newWords.length === 0 || newFullWords.length === 0) {
    console.error(
      "Word lists are empty. Please add words before starting the game."
    );
    return;
  }

  if (
    !randomIndexObject ||
    newWords.length !== randomIndexObject.originalArray.length
  ) {
    console.warn("Random index generator is outdated. Reinitializing...");
    randomIndexObject = new UniqueRandomIndexGenerator(newWords);
  }

  let randomIndex = randomIndexObject.getNextUniqueIndex();

  // If all indices have been used, reset
  if (randomIndex === null) {
    randomIndexObject.reset();
    randomIndex = randomIndexObject.getNextUniqueIndex();
  }

  console.log("Random Index:", randomIndex);

  // Set the current syllable and correct word based on the game mode
  if (gameMode === "hard") {
    currentSyllable = newFullWords[randomIndex];
    correctWord = newWords[randomIndex];
  } else {
    currentSyllable = newWords[randomIndex];
    correctWord = newFullWords[randomIndex];
  }

  // Update UI
  primaryHeading_1.style.display = "inline-block";
  primaryHeading_2.style.display = "inline-block";
  primaryHeading_2.innerText = currentSyllable;
  resetAnimation(primaryHeading_2);

  userInput.value = ""; // Clear input
  result.innerText = ""; // Clear result message
}

function resetAnimation(element) {
  element.classList.remove("animate"); // Remove the animation class
  void element.offsetWidth; // Trigger reflow
  element.classList.add("animate"); // Re-add the animation class
}

// Function to check the user's input
function checkAnswer(event) {
  if (userInput.value.trim() === "") {
    showInputError("Please type a word");
    return; // Exit the function
  }

  const userInputValue = userInput.value.trim().toLowerCase();
  totalWord += 1;

  if (userInputValue === correctWord) {
    score += 10; // Increase score by 10 points
    totalCorrectWord += 1;
    result.innerText = "You Win 😁! Correct word!";
    result.style.color = "#a6ff6e";
    setTimeout(showRandomWord, 2000); // Automatically show a new word after 2 seconds
  } else {
    score -= 10;
    wrongWord += 1;
    result.innerText = "You Lost 🥺! Wrong word!";
    setTimeout(() => {
      result.innerText = "Try again ☺️";
    }, 2000);
    result.style.color = "#ea8221";
  }

  updateScoreDisplay();

  if (score <= -100) {
    scoreE.style.color = "red";
    scoreE.innerText = "Too low score, 💀😭 ";
    setTimeout(resetGameF, 3000);
  }
}

// Function to show input error
function showInputError(message) {
  userInput.value = message; // Show message in the input box
  userInput.style.color = "red"; // Change text color to red
  setTimeout(() => {
    userInput.value = ""; // Clear the input box
    userInput.style.color = ""; // Reset text color
  }, 2000); // Adjust the delay as needed
}

// Function to update score display
function updateScoreDisplay() {
  scoreE.innerText = "Score: " + score; // Update score display
  scoreItemsE.innerText = `Correct: ${totalCorrectWord}/${totalWord} ; Wrong: ${wrongWord}`; // Update score-item display
}

// Function to enable/disable the check button based on input
function toggleCheckButton() {
  if (userInput.value.trim() === "") {
    checkButton.classList.add("disabled"); // Add a class to style it as disabled
    checkButton.onclick = (event) => event.preventDefault(); // Prevent action
  } else {
    checkButton.classList.remove("disabled"); // Remove the disabled class
    checkButton.onclick = checkAnswer; // Restore the original function
  }
}

// Add event listener to the input field
userInput.addEventListener("input", toggleCheckButton);

// Function to reset the game
function resetGameF() {
  score = 0; // Reset score
  totalWord = 0;
  totalCorrectWord = 0;
  wrongWord = 0;
  scoreItemsE.style.color = "";
  scoreE.style.color = "";
  scoreE.innerText = "Score: " + score; // Update score display
  scoreItemsE.innerText = "Correct: " + totalCorrectWord;
  result.innerText = ""; // Clear result message
  containerInput.style.display = "none"; // Hide input box
  startGame.style.display = "none"; // Hide start game button
  startGame.innerHTML = "start game";
  resetGame.style.display = "none"; // Hide reset button
  modeSelection.style.display = "block"; // Show mode selection again
  primaryHeading_1.style.display = "none";
  primaryHeading_2.style.display = "none";
  animationPlayed = false;
}

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

// Initialize the game by hiding the input and reset button
document.addEventListener("DOMContentLoaded", function () {
  containerInput.style.display = "none"; // Hide input initially
  startGame.style.display = "none"; // Hide start game button initially
  resetGame.style.display = "none"; // Hide reset button initially
});
