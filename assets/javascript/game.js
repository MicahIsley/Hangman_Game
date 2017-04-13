//Global Variables
//==========================================

var fruitNames = ["apple", "pineapple", "grapefruit", "watermelon", "tangerine", "cantaloupe", "cherry", "raspberry", "strawberry", "honeydew"];
var randomWord = "";
var lettersInWord = [];
var numBlanks = 0;
var blanksAndLetters = [];
var wrongGuess = [];

//Game counters
var winCount = 0;
var lossCount = 0;
var guessesLeft = 9;

//Functions
//===========================================

function startGame () {
	randomWord = fruitNames[Math.floor(Math.random()*fruitNames.length)];
	lettersInWord = randomWord.split("");
	numBlanks = lettersInWord.length;

	//Reset
	guessesLeft = 9;
	wrongGuess = [];
	blanksAndLetters = [];

	//Make number of blanks equal to word length
	for (var i=0; i < numBlanks; i++) {
		blanksAndLetters.push("_");
	}

	//Changes to HTML
	document.getElementById("word").innerHTML = blanksAndLetters.join(" ");
	document.getElementById("guesses").innerHTML = guessesLeft;
	document.getElementById("wins").innerHTML = winCount;
	document.getElementById("loses").innerHTML = lossCount;
	//Testing
	console.log(randomWord);
	console.log(lettersInWord);
	console.log(numBlanks);
	console.log(blanksAndLetters);
}

function checkLetters(letter) {

	var isLetterInWord = false;

	for (var i=0; i<numBlanks; i++){
		if(randomWord[i] == letter) {
			isLetterInWord = true;
		}
	}

	if(isLetterInWord) {
		for (var i=0; i<numBlanks; i++) {
			if(randomWord[i] == letter) {
				blanksAndLetters[i] = letter;
			}
		}
	}

	else {
		wrongGuess.push(letter);
		guessesLeft--
	}

	console.log(blanksAndLetters);
}

function roundComplete() {
	console.log("Win Count: " + winCount + " | Loss Count: " + lossCount + " | Guesses Left" + guessesLeft);

	document.getElementById("guesses").innerHTML = guessesLeft;
	document.getElementById("word").innerHTML = blanksAndLetters.join(" ");
	document.getElementById("wrong").innerHTML = wrongGuess.join(" ");

	if (lettersInWord.toString() == blanksAndLetters.toString()) {
		winCount++;
		alert("You Won!");

		document.getElementById("wins").innerHTML = winCount;

		startGame();
	}

	else if (guessesLeft == 0) {
		lossCount++;
		alert("You Lost!");

		document.getElementById("loses").innerHTML = lossCount;

		startGame();
	}
}

//Main Process
//===================================================

startGame();

//Regisgter keyclicks

document.onkeyup = function(event) {
	var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
	checkLetters(letterGuessed);
	roundComplete();

	console.log(letterGuessed);
}