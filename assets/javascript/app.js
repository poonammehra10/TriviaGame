//VARIABLES
let wins = 0;
let losses = 0;
let unanswered = 0;
let triviaBlock = $("#triviaBlock");
let timerBlock = $("#timer");
let counter = 11;
let arrCount = 0;
let timer;


//Do not display trivia questions initially
triviaBlock.hide();


//Once user clicks Play game buton, display trivia questions and call the games' various functions
$("#play").click(function () {

    $("#instructions").hide();
    triviaBlock.show();

    displayQuestions();
    myTimer();

});


$(document).on("click", ".choice", function (event) {

    selectedChoice = $(this).text();

    if (selectedChoice === correctAnswersArr[arrCount]) {
        clearInterval(timer);
        correctAnswer();
    } else {
        clearInterval(timer);
        wrongAnswer();
    }
});

$(document).on("click", ".reset", function (event) {

    playAgain();
});



//Array of the trivia questions and choices
var allQuestionsArr = [
    {
        question:
            "Question 1: What state is famous for giving the United Stated all if it's delicious peaches?",
        choices:
            ["South Carolina", "Florida", "Virgina", "Georgia"]
    },

    {
        question:
            "Question 2: What tasty dip is traditionally made from chickpeas?",
        choices:
            ["Hummus", "Guacamole", "Salsa", "Pete"]
    },

    {
        question:
            "Question 3: What Salty add-on is usally is sprinkled on top of pasta?",
        choices:
            ["Red Pepper Flakes", "Basil", "Parmesan", "Marinara Sauce"]
    },

    {
        question:
            "Question 4: What is sushi traditionally wrapped in?",
        choices:
            ["Seaweed", "Caviar", "Cucumber", "Sashimi"]
    },

    {
        question:
            "Question 5: What ice-cream contains vanilla, stawberry and chocolate flavors?",
        choices:
            ["Pistachio", "Neapolitan", "Rocky Road", "Gelato"]
    }
];


var correctAnswersArr = ["Georgia", "Hummus", "Parmesan", "Seaweed", "Neapolitan"];


function displayQuestions() {

    $(triviaBlock).html(triviaContent(arrCount));

}


function questionCount() {
    if (arrCount < 4) {
        arrCount++;
        displayQuestions();
        counter = 11;
        myTimer();
    } else {
        scorePage();
    }
}


//Timer for each question
function myTimer() {

    timer = setInterval(tenSeconds, 1000);

    //Ten seconds countdown
    function tenSeconds() {

        if (counter === 0) {
            clearInterval(timer);
            noAnswer();
        }

        if (counter > 0) {
            counter--;
        }

        $("#timer").html("<p>Timer: " + counter + "</p>");
    }

}


function noAnswer() {
    unanswered++;
    $(triviaBlock).html("<p>Time's up! The correct answer is </p>" + correctAnswersArr[arrCount]);

    setTimeout(questionCount, 3000);
}


function correctAnswer() {
    wins++;
    $(timerBlock).html("");
    $(triviaBlock).html("<p>That's correct!!</p>");
    setTimeout(questionCount, 3000);
}

function wrongAnswer() {
    losses++;
    $(timerBlock).html("");
    $(triviaBlock).html("<p>That's wrong! The correct answer is </p>" + correctAnswersArr[arrCount]);
    setTimeout(questionCount, 3000);
}

function scorePage() {
    $(timerBlock).html("");
    $(triviaBlock).html("<p>Thanks for playing here are your scores: </p><p>Wins: " + wins + "</p><p>Losses: " + losses + "</p><p>Unanswered: " + unanswered + "</p><button class='reset'>Play again!</button>");
}

function playAgain() {
    arrCount = 0;
    wins = 0;
    losses = 0;
    unanswered = 0;
    counter = 11;
    displayQuestions();
    myTimer();
}



//Trivia questions and loop for the choices
function triviaContent(x) {
    var allQuestions = allQuestionsArr[x];
    var allChoices = allQuestions.choices;
    var eachQuestion = allQuestions.question;
    $(triviaBlock).html("<p>" + eachQuestion + "</p>");
    var buttonContainer = $("<div>");

    for (var i = 0; i < allChoices.length; i++) {
        var myButton = $("<button>");
        myButton.addClass("choice");
        myButton.attr("data-name", allChoices[i]);
        myButton.text(allChoices[i]);
        buttonContainer.append(myButton);
        $(triviaBlock).append(myButton);
    }
}
