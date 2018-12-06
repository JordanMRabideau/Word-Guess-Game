
// Array from which the computer picks the word
var wordArray= [
    "MARIO",
    "ZELDA",
    "ANIMAL CROSSING",
    "HALF-LIFE",
    "HALO",
    "SUPER SMASH BROS",
    "METAL GEAR SOLID",
    "DOOM",
    "ASSASINS CREED",
    "STREET FIGHTER",
    "WARCRAFT",
    "COUNTER-STRIKE",
    "CASTLEVANIA",
    "PAC-MAN",
    "FALLOUT", 
    "MONKEY ISLAND",
    "RATCHET AND CLANK",
    "SLY COOPER",
    "PERSONA",
    "WOLFENSTEIN",
    "SPYRO",
    "STARCRAFT",
    "SONIC",
    "DIABLO",
    "POKEMON",
    "KIRBY",
];

var hintArray = [
    "A friendly Italian plumber",
    "A boy in green saves the kingdom",
    "You run a small town full of animal people",
    "You play as the world's worst theoretical physicist",
    "A space marine saves the galaxy from giant jewelry",
    "Everybody gets together from their seperate universes to fight to the death",
    "You find out if love can bloom on the battlefield",
    "An angry mute fights demons forever",
    "Play as different murderers through time",
    "HADOUKEN",
    "For the Horde!",
    "Terrorists and Counterterrorists fight in a dusty place",
    "A family tries to stop an undying evil",
    "Yellow circle eats smaller circles",
    "Post apocalyptic hijinks",
    "An incompetent pirate fights a zombie",
    "A furry animal and his robot pal save multiple galaxies, several times",
    "A racoon steals things",
    "Japanese teenagers solve crimes and fight demons",
    "Fighting nazis, 'nuff said",
    "A dragon gathers treasure",
    "Space marines, space elves, or space bugs: pick your poison",
    "Blue rodent goes fast",
    "Get loot anf fight the Devil",
    "Magical animals are caught and forced to fight each other",
    "A cute pink ball with the power to destroy the universe",
]

// Variables that reference the html


const maxTries = 6         //Max number of tries
var currentWordIndex;       //current word's index number
var wordText = wordArray[currentWordIndex];
var guessingWord = [];      //stores properly guessed letters
var remainingGuesses = 0;
var gameFinished = false;   //used to tell if the game has finished
var wins = 0;               //number of times user has successfully guessed a word
var guessedLetters = [];    //array of previously guessed letters

var type1 = new Audio('assets/sounds/type1.wav');
var type2 = new Audio('assets/sounds/type2.wav');
var type3 = new Audio('assets/sounds/type3.wav');
var type4 = new Audio('assets/sounds/type4.wav');
var type5 = new Audio('assets/sounds/type5.wav');
var zelda = new Audio('assets/sounds/LOZ_Chest.mp3');
var finalFant = new Audio('assets/sounds/ffwin.mp3');
var marioWin = new Audio('assets/sounds/marioWin.mp3');
var pacman = new Audio('assets/sounds/pacman.mp3')

var winSounds = [
    zelda,
    finalFant,
    marioWin,
];

var typeSounds = [
    type1,
    type2,
    type3,
    type4,
    type5,
]

function randomSound(soundArray) {
    var soundIndex = Math.floor(Math.random() * soundArray.length);
    soundArray[soundIndex].play();
}

// This function updates the game display in the event of a new game
function updateDisplay() {
    document.getElementById("winNum").innerText = wins;
    var guessingWordText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        guessingWordText += guessingWord[i]
    }
    document.getElementById("hint").innerText = hintArray[currentWordIndex];
    document.getElementById("word").innerText = guessingWordText;
    document.getElementById("tryNum").innerText = remainingGuesses;
    document.getElementById("guesses").innerText = guessedLetters;
};

function resetGame() {
    remainingGuesses = maxTries;
    currentWordIndex = Math.floor(Math.random() * wordArray.length);
    guessedLetters = [];
    guessingWord = [];
    //reset image will go here//
    for (var i = 0; i < wordArray[currentWordIndex].length; i++) {
        if (wordArray[currentWordIndex][i] === " ") {
            guessingWord.push("-");
        } else if (wordArray[currentWordIndex][i] === "-") {
            guessingWord.push("-");
        } else {
            guessingWord.push("_ ")
        }
        console.log(wordArray[currentWordIndex]);
    }
    gameFinished = false;
    document.getElementById("hintButton").style.cssText= "display: flex-center";
    document.getElementById("hint").innerText = hintArray[currentWordIndex];
    document.getElementById("hint").style.cssText= "display: none";
    document.getElementById("tryAgain").style.cssText= "display: none";
    document.getElementById("winImage").style.cssText= "display: none";
    document.getElementById("loseImage").style.cssText= "display: none";
    updateDisplay();
};

function makeGuess(l) {
    if (remainingGuesses > 0) {
        if (guessedLetters.indexOf(l) === -1) {
            guessedLetters.push(l);
            checkGuess(l);
        }
    }
};

function checkGuess(l) {
    var positions = [];
    for (var i = 0; i < wordArray[currentWordIndex].length; i++) {
        if (wordArray[currentWordIndex][i] === l) {
            positions.push(i);
        }
    }

    if (positions.length <=0) {
        remainingGuesses--;
    } else {
        for (var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = l;
        }
    }
};

function checkWin() {
   if (guessingWord.indexOf("_ ") === -1) {
        wins++;
        randomSound(winSounds);
        gameFinished = true;
        document.getElementById("hintButton").style.cssText= "display: none";
        document.getElementById("hint").style.cssText= "display: none";
        document.getElementById("winImage").style.cssText= "display: flex-center";
        document.getElementById("tryAgain").style.cssText= "display: block";
   }
};

function checkLoss() {
    if (remainingGuesses <= 0) {
        pacman.play();
        gameFinished = true;
        document.getElementById("word").innerText = wordArray[currentWordIndex];
        document.getElementById("loseImage").style.cssText= "display: flex-center";
        document.getElementById("tryAgain").style.cssText= "display: block";
    }
}

document.getElementById("hintButton").onclick = function() {
    document.getElementById("hint").style.cssText = "display: flex-center";
}
document.onkeydown = function(event) {
    if(gameFinished == true) {
        resetGame();
        gameFinished = false;
    } else {
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            randomSound(typeSounds);
            makeGuess(event.key.toUpperCase());
            updateDisplay();
            checkWin();
            checkLoss();
        }
    }
};

resetGame();
updateDisplay();

console.log(guessingWord)
console.log(wordArray[currentWordIndex])