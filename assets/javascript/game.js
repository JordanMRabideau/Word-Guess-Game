

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
    "FINAL FANTASY",
    "LEGACY OF KAIN",
    "MONKEY ISLAND",
    "RATCHET AND CLANK",
    "SLY COOPER",
    "KATAMARI DAMACY",
    "PERSONA",
    "DRAGON QUEST",
    "MONSTER HUNTER",
    "YAKUZA",
    "OVERWATCH",
    "GRAND THEFT AUTO",
    "WOLFENSTEIN",
    "SPYRO",
    "STARCRAFT",
    "CALL OF DUTY",
    "SONIC",
    "GUILD WARS",
    "DIABLO",
    "LEAGUE OF LEGENDS",
    "SLIME RANCHER",
    "RAYMAN",
    "CRASH BANDICOOT",
    "POKEMON",
];

// Variables that reference the html


const maxTries = 6         //Max number of tries
var currentWordIndex;       //current word's index number
var guessingWord = [];      //stores properly guessed letters
var remainingGuesses = 0;
var gameFinished = false;   //used to tell if the game has finished
var wins = 0;               //number of times user has successfully guessed a word
var guessedLetters = [];    //array of previously guessed letters

var zelda = new Audio('assets/sounds/LOZ_Chest.mp3');
var finalFant = new Audio('assets/sounds/ffwin.mp3');
var marioWin = new Audio('assets/sounds/marioWin.mp3');
var winSounds = [
    zelda,
    finalFant,
    marioWin,
];

var pacman = new Audio('assets/sounds/pacman.mp3')

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
        document.getElementById("winImage").style.cssText= "display: flex-center";
        document.getElementById("tryAgain").style.cssText= "display: block";
   }
};

function checkLoss() {
    if (remainingGuesses <= 0) {
        pacman.play();
        document.getElementById("loseImage").style.cssText= "display: flex-center";
        document.getElementById("tryAgain").style.cssText= "display: block";
    }
}

document.onkeydown = function(event) {
    if(gameFinished == true) {
        resetGame();
        gameFinished = false;
    } else {
        if (event.keyCode >= 65 && event.keyCode <= 90) {
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
