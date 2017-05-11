/**Reset function**/
function reset() {
	var questionsArr = [];
	var intervalId;
	totalTime = 15;
	counterCorrect = 0;
	counterIncorrect = 0;
	counterNoAnswer = 0;
	questionCount = 0;
	$("#reset").hide();
	$("#start").show();
	$("#results").html("");
};

/**Array that holds question objects**/
questionsArr = [
{ 
	question: "What is Appa?", 
	answer1: "Flying Buffalo", 
	answer2: "Flying Bison", 
	answer3: "Flying Bovine", 
	answer4: "Flying Bull",
	image: "assets/images/appa3.gif",
	correct: "Flying Bison"
	},
{
	question: "Which tribe of people did Aang and Zukko meet to learn firebending?",
	answer1: "Kyoshi Warriors",
	answer2: "Freedom Fighters",
	answer3: "The Dai Li",
	answer4: "Sun Warriors",
	image: "assets/images/fire.gif",
	correct: "Sun Warriors"
	},
{
	question: "What baby creature did Sokka have a run in with while in the Earth Kingdom?",
	answer1: "Sabertooth Moose Lion",
	answer2: "Badger Mole",
	answer3: "Platypus Bear",
	answer4: "Turtle Duck",
	image: "assets/images/sokka2.gif",
	correct: "Sabertooth Moose Lion"
	},
{
	question: "Who is Zuko's sister?",
	answer1: "Mai",
	answer2: "Ty Lee",
	answer3: "Azula",
	answer4: "Jin",
	image: "assets/images/azula.gif",
	correct: "Azula"
	},
{
	question: "Mistaken for Sokka, who was actually Toph's savior at Serpent's Pass?",
	answer1: "Katara",
	answer2: "Suki",
	answer3: "Bolin",
	answer4: "Haru",
	image: "assets/images/toph2.gif",
	correct: "Suki"
	}
];


/**Trivia Screen with Questions**/
function startTrivia(){
	//Remove .gif image
	$("#gif").html("");

	//Hide Start button from screen
	$("#start").hide();
	$("#reset").hide();

	//Add timer here
	$("#timer").html("<div>Time Remaining: " + totalTime + "</div>"); //This line here to print initial time
	intervalId = setInterval(decrement, 1000);

	//Questions listed and conditions to show them
	if (questionCount === 0) {
		$("#questions").html("<div class='question'>" + questionsArr[questionCount].question + "</div>");
		$("#questions").append("<div class='answer' value='incorrect'>" + questionsArr[questionCount].answer1 + "</div>");
		$("#questions").append("<div class='answer' value='correct'>" + questionsArr[questionCount].answer2 + "</div>");
		$("#questions").append("<div class='answer' value='incorrect'>" + questionsArr[questionCount].answer3 + "</div>");
		$("#questions").append("<div class='answer' value='incorrect'>" + questionsArr[questionCount].answer4 + "</div>");
	}
	else if (questionCount === 1) {
		$("#questions").html("<div class='question'>" + questionsArr[questionCount].question + "</div>");
		$("#questions").append("<div class='answer' value='incorrect'>" + questionsArr[questionCount].answer1 + "</div>");
		$("#questions").append("<div class='answer' value='incorrect'>" + questionsArr[questionCount].answer2 + "</div>");
		$("#questions").append("<div class='answer' value='incorrect'>" + questionsArr[questionCount].answer3 + "</div>");
		$("#questions").append("<div class='answer' value='correct'>" + questionsArr[questionCount].answer4 + "</div>");
	}
	else if (questionCount === 2) {
		$("#questions").html("<div class='question'>" + questionsArr[questionCount].question + "</div>");
		$("#questions").append("<div class='answer' value='correct'>" + questionsArr[questionCount].answer1 + "</div>");
		$("#questions").append("<div class='answer' value='incorrect'>" + questionsArr[questionCount].answer2 + "</div>");
		$("#questions").append("<div class='answer' value='incorrect'>" + questionsArr[questionCount].answer3 + "</div>");
		$("#questions").append("<div class='answer' value='incorrect'>" + questionsArr[questionCount].answer4 + "</div>");
	}
		else if (questionCount === 3) {
		$("#questions").html("<div class='question'>" + questionsArr[questionCount].question + "</div>");
		$("#questions").append("<div class='answer' value='incorrect'>" + questionsArr[questionCount].answer1 + "</div>");
		$("#questions").append("<div class='answer' value='incorrect'>" + questionsArr[questionCount].answer2 + "</div>");
		$("#questions").append("<div class='answer' value='correct'>" + questionsArr[questionCount].answer3 + "</div>");
		$("#questions").append("<div class='answer' value='incorrect'>" + questionsArr[questionCount].answer4 + "</div>");
	}
	else if (questionCount === 4) {
		$("#questions").html("<div class='question'>" + questionsArr[questionCount].question + "</div>");
		$("#questions").append("<div class='answer' value='incorrect'>" + questionsArr[questionCount].answer1 + "</div>");
		$("#questions").append("<div class='answer' value='correct'>" + questionsArr[questionCount].answer2 + "</div>");
		$("#questions").append("<div class='answer' value='incorrect'>" + questionsArr[questionCount].answer3 + "</div>");
		$("#questions").append("<div class='answer' value='incorrect'>" + questionsArr[questionCount].answer4 + "</div>");
	}
	//Display gif and whether user is correct or not
	answerDisplay();

	//Condition that determines if all questions have been asked. If yes, go to results.
	if(questionCount === questionsArr.length) {
		results();
	}
};

/**Decrement function for timer**/
function decrement(){
	//Decrement totalTime by 1 and print new value on page
	totalTime--;
	$("#timer").html("<div>Time Remaining: " + totalTime + "</div>");

	//Once timer reaches 0 seconds, go to Answer Screen with no user input
	if (totalTime === 0){
		answerDisplayNoClick();
	}
}

/**Answer Screen WITH click**/
function answerDisplay() {
	$(".answer").on("click", function(){
		//Sreen layout when Answer Screen shows
		clearInterval(intervalId);
		$("#timer").html("");
		$("#questions").html("");
		$("#gif").html("<img src="+ questionsArr[questionCount].image + ">");

		//Time values. setTimeout() for how long to show gif before returning to startTrivia()
		var gifShow = setTimeout(startTrivia, 5000);
		totalTime = 15;

		//Condition to display if user answered correctly and to increment counters
		var answer = $(this).attr("value");
		if (answer === "correct"){
			$("#timer").append("You're right! ");
			$("#timer").append("The correct answer is " + questionsArr[questionCount].correct);
			counterCorrect++;
		}
		else if (answer === "incorrect") {
			$("#timer").append("Wrong... ");
			$("#timer").append("The correct answer is " + questionsArr[questionCount].correct);
			counterIncorrect++;
		}

		//Increment questionCount to display next question
		questionCount++;
	});
}

/**Answer Screen if no click from user**/
function answerDisplayNoClick(){
		//Sreen layout when Answer Screen shows
		clearInterval(intervalId);
		$("#timer").html("");
		$("#timer").append("You ran out of time! ");
		$("#timer").append("The correct answer is " + questionsArr[questionCount].correct);
		$("#questions").html("");
		$("#gif").html("<img src="+ questionsArr[questionCount].image + ">");

		//Time values. setTimeout() for how long to show gif before returning to startTrivia()
		var gifShow = setTimeout(startTrivia, 5000);
		totalTime = 15;

		//Increment questionCount to display next question
		questionCount++;

		//Increment counter for when there is no user input
		counterNoAnswer++;
}

/**Results screen**/
function results(){
	//Sreen layout when Results Screen shows
	clearInterval(intervalId);
	$("#timer").html("");
	$("#results").append("You're finished, here's how you did!");
	$("#results").append("<div>Correct: " + counterCorrect + "</div>");
	$("#results").append("<div>Incorrect: " + counterIncorrect + "</div>");
	$("#results").append("<div>Not answered: " + counterNoAnswer + "</div>");
	$("#reset").show();
}

/**Call functions**/
reset();
$("#start").on("click", function(){
	startTrivia();
});
$("#reset").on("click", function(){
	reset();
});