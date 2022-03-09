var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var gameStartIndicator = false;
var level = 0;

// Start the game by pressing any key
$("body").keypress(function () {
	if (!gameStartIndicator) {
		gameStartIndicator = true;
		$("#level-title").text("Level " + level);
		nextSequence();
	}
});

// mouse click on button
$(".btn").click(function () {
	var userChosenColor = $(this).attr("id");
	userClickedPattern.push(userChosenColor);

	playSound(userChosenColor);
	animatePress(userChosenColor);
	checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
	if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
		console.log("Success");
		if (userClickedPattern.length === gamePattern.length) {
			setTimeout(function () {
				nextSequence();
			}, 1000);
		}
	} else {
		console.log("Wrong");
		playSound("wrong");
		$("body").addClass("game-over");
		setTimeout(function () {
			$("body").removeClass("game-over");
		}, 200);
		$("#level-title").text("Game Over, Perss Any Key to Restart");
		startOver();
	}
}

function nextSequence() {
	userClickedPattern = [];

	++level;
	$("#level-title").text("Level " + level);

	var randomNumber = Math.floor(Math.random() * 4);
	var randomChosenColor = buttonColors[randomNumber];
	gamePattern.push(randomChosenColor);

	$("#" + randomChosenColor)
		.fadeIn(100)
		.fadeOut(100)
		.fadeIn(100);
	playSound(randomChosenColor);
}

function playSound(name) {
	var audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}

function animatePress(currentColor) {
	$("#" + currentColor).addClass("pressed");
	setTimeout(function () {
		// document.querySelector("#" + currentColor).classList.remove("pressed"); //js
		$("#" + currentColor).removeClass("pressed"); //jquery
	}, 100);
}

function startOver() {
	level = 0;
	gamePattern = [];
	gameStartIndicator = false;
}
