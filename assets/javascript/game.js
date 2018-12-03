

// Array from which the computer picks the word
var wordArray= [
    "Mario",
    "Zelda",
    "Animal-Crossing",
    "Half-Life",
    "Halo",
    "Super-Smash-Bros", 
];

const maxTries = 10

var currentWordIndex;       //current word's index number
var guessingWord = [];      //stores properly guessed letters
var gameStarted = false;    //used to tell if the game has started or not
var gameFinished = false;   //used to tell if the game has finished
var wins = 0;               //number of times user has successfully guessed a word
var guessedLetters = [];    //array of previously guessed letters

function updateDisplay() {

}

function resetGame() {
    remainingGuesses = maxTries;
    gameStarted = false;
    currentWordIndex = Math.floor(Math.random() * wordArray.length);
    guessedLetters = [];
    guessingWord = [];
    //reset image will go here//
    for (var i = 0; i < wordArray[currentWordIndex].length; i++) {
        if (wordArray[i] === "-") {
            guessingWord.push("_");
        } else (
            guessingWord.push("_");
        )
    }
}

// Variables that reference the html
var winCount = document.getElementById("winNum");
var wordHolder = document.getElementById("word");
var tryCount = document.getElementById("tryNum");
var prevGuess = document.getElementById("guesses");


