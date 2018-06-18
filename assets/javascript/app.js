var trivia = {

    phase: 0,
    time: 30,
    intervalId: 0,
    correct: 0,
    incorrect: 0,
    unanswered: 0,

    questions: [{
                question: "question1",
                answers: [{answer: "answer1", value: true}, 
                          {answer: "answer2", value: false}, 
                          {answer: "answer3", value: false}, 
                          {answer: "answer4", value: false}]
                },
                {
                question: "question2",
                answers: [{answer: "answer1", value: false}, 
                          {answer: "answer2", value: true}, 
                          {answer: "answer3", value: false}, 
                          {answer: "answer4", value: false}]
                },
                {
                question: "question3",
                answers: [{answer: "answer1", value: false}, 
                          {answer: "answer2", value: false}, 
                          {answer: "answer3", value: true}, 
                          {answer: "answer4", value: false}]
                },
                {
                question: "question4",
                answers: [{answer: "answer1", value: false}, 
                          {answer: "answer2", value: false}, 
                          {answer: "answer3", value: false}, 
                          {answer: "answer4", value: true}]
                },
                {
                question: "question5",
                answers: [{answer: "answer1", value: false}, 
                          {answer: "answer2", value: true}, 
                          {answer: "answer3", value: false}, 
                          {answer: "answer4", value: false}]
                },
                {
                question: "question6",
                answers: [{answer: "answer1", value: true}, 
                          {answer: "answer2", value: false}, 
                          {answer: "answer3", value: false}, 
                          {answer: "answer4", value: false}]
                },
                {
                question: "question7",
                answers: [{answer: "answer1", value: false}, 
                          {answer: "answer2", value: false}, 
                          {answer: "answer3", value: false}, 
                          {answer: "answer4", value: true}]
                },
                {
                question: "question8",
                answers: [{answer: "answer1", value: false}, 
                          {answer: "answer2", value: false}, 
                          {answer: "answer3", value: false}, 
                          {answer: "answer4", value: true}]
                },
                {
                question: "question9",
                answers: [{answer: "answer1", value: false}, 
                          {answer: "answer2", value: false}, 
                          {answer: "answer3", value: true}, 
                          {answer: "answer4", value: false}]
                },
                {
                question: "question10",
                answers: [{answer: "answer1", value: false}, 
                          {answer: "answer2", value: true}, 
                          {answer: "answer3", value: false}, 
                          {answer: "answer4", value: false}]
                }],

    displayQuestion: function() {
        $(".question").html($("<h2>").text(this.questions[this.phase].question));
    },

    displayAnswers: function() {
        $(".answers").empty();
        for (var i = 0; i < 4; i++) {
            var thisAnswer = $("<h3>").text(this.questions[this.phase].answers[i].answer);
            var stringID = "answer" + i;
            $(thisAnswer).attr("id", stringID);
            $(".answers").append(thisAnswer);
        };
    },

    displayCorrectAnswer: function() {
        for (var i = 0; i < 4; i++) {
            if (this.questions[this.phase].answers[i].value === true) {
                $(".answers").append($("<h3>").text(this.questions[this.phase].answers[i].answer));
            }
        };
    },

    pickAnswer: function(x) {
        this.stopTimer();
        if (this.questions[trivia.phase].answers[x].value === true) {
            $(".answers").html("<h3>You are correct! The answer is: </h3>");
            $(".answers").append($("<h3>").text(trivia.questions[trivia.phase].answers[x].answer));
            this.correct++;
        }
        else if (this.questions[trivia.phase].answers[x].value === false) {
            $(".answers").html("<h3>You are incorrect! The answer is: </h3>");
            this.displayCorrectAnswer();
            this.incorrect++;
        }
        this.transTimer();
    },

    displayResults: function() {
        $(".timer").empty();
        $(".question").empty();
        $(".answers").empty();
        var restart = $("<button>").text("Play Again");
        restart.attr("class", "start");
        $(".timer").append(restart);
        $(".question").append($("<h2>").text("Results"));
        $(".answers").append($("<h3>").text("Correct: " + this.correct));
        $(".answers").append($("<h3>").text("Incorrect: " + this.incorrect));
        $(".answers").append($("<h3>").text("Unanswered: " + this.unanswered));
    },

    mainTimer: function() {
        trivia.time = 30;
        trivia.intervalId = setInterval(trivia.mainDecrement, 1000);
        $(".timer").html("Time Remaining: " + trivia.time);
        trivia.displayQuestion();
        trivia.displayAnswers();
    },

    mainDecrement: function() {
        trivia.time--;
        $(".timer").html("Time Remaining: " + trivia.time);

        if (trivia.time === 0) {
            trivia.stopTimer();
            $(".answers").html("<h3>You did not guess in time! The answer is: </h3>");
            trivia.displayCorrectAnswer();
            trivia.unanswered++;
            trivia.transTimer();
        };
    },

    transTimer: function() {
        trivia.time = 3;
        trivia.phase++;
        trivia.intervalId = setInterval(trivia.transDecrement, 1000);
    },

    transDecrement: function() {
        trivia.time--;

        if (trivia.time === 0) {
            trivia.stopTimer();
            if (trivia.phase < trivia.questions.length) {
                trivia.mainTimer();
            }
            else {
                trivia.displayResults();
            }
        };
    },

    stopTimer: function() {
        clearInterval(trivia.intervalId);
    },

    startGame: function() {
        this.phase = 0;
        this.correct = 0;
        this.incorrect = 0;
        this.unanswered = 0;
        this.mainTimer();
    }
};

// Start button click event
$(document).on("click", ".start", function() {
    $(".start").remove();
    trivia.startGame();
});

// Answer click events
$(document).on("click", "#answer0", function() {
    trivia.pickAnswer(0);
});
$(document).on("click", "#answer1", function() {
    trivia.pickAnswer(1);
});
$(document).on("click", "#answer2", function() {
    trivia.pickAnswer(2);
});
$(document).on("click", "#answer3", function() {
    trivia.pickAnswer(3); 
});