var trivia = {

    phase: 0,
    time: 30,
    intervalId: 0,
    correct: 0,
    incorrect: 0,
    unanswered: 0,

    questions: [{
                question: "What was the first capital of ancient Egypt?",
                answers: [{answer: "Memphis", value: true}, 
                          {answer: "Thebes", value: false}, 
                          {answer: "Alexandria", value: false}, 
                          {answer: "Cairo", value: false}]
                },
                {
                question: "What Roman Emperor was once captured by pirates and held for a 12,000 gold-piece ransom?",
                answers: [{answer: "Caesar Augustus", value: false}, 
                          {answer: "Julius Caesar", value: true}, 
                          {answer: "Nero", value: false}, 
                          {answer: "Caligula", value: false}]
                },
                {
                question: "On what island did ancient Greek civilization originate?",
                answers: [{answer: "Samos", value: false}, 
                          {answer: "Olympia", value: false}, 
                          {answer: "Crete", value: true}, 
                          {answer: "Rhodes", value: false}]
                },
                {
                question: "Who is considered the founder of the Xia Dynasty in ancient China?",
                answers: [{answer: "Tang", value: false}, 
                          {answer: "Qi", value: false}, 
                          {answer: "Shun", value: false}, 
                          {answer: "Yu", value: true}]
                },
                {
                question: "How many of the Seven Wonders of the Ancient World still exist?",
                answers: [{answer: "0", value: false}, 
                          {answer: "1", value: true}, 
                          {answer: "2", value: false}, 
                          {answer: "3", value: false}]
                },
                {
                question: "When did the first documented Olympic Games take place?",
                answers: [{answer: "776 B.C.", value: true}, 
                          {answer: "432 B.C.", value: false}, 
                          {answer: "112 B.C.", value: false}, 
                          {answer: "6 A.D.", value: false}]
                },
                {
                question: "What is the name for the Warring States period in Japan?",
                answers: [{answer: "The Edo Period", value: false}, 
                          {answer: "The Muromachi Period", value: false}, 
                          {answer: "The Kamakura Period", value: false}, 
                          {answer: "The Sengoku Period", value: true}]
                },
                {
                question: "What is the name of the person that the Iroquois refer to as 'The Great Peacemaker'?",
                answers: [{answer: "Onondaga", value: false}, 
                          {answer: "Jigonhsasee", value: false}, 
                          {answer: "Hiawatha", value: false}, 
                          {answer: "Deganawida", value: true}]
                },
                {
                question: "In what year did Genghis Khan found Mongolia?",
                answers: [{answer: "1129 A.D.", value: false}, 
                          {answer: "1183 A.D.", value: false}, 
                          {answer: "1206 A.D.", value: true}, 
                          {answer: "1241 A.D.", value: false}]
                },
                {
                question: "What was the capital of the Assyrian empire at its founding in 745 B.C.?",
                answers: [{answer: "Nimrud", value: false}, 
                          {answer: "Ashur", value: true}, 
                          {answer: "Babylon", value: false}, 
                          {answer: "Khattusha", value: false}]
                }],

    displayQuestion: function() {
        $(".question").html($("<h3>").text(this.questions[this.phase].question));
    },

    displayAnswers: function() {
        $(".answers").empty();
        for (var i = 0; i < 4; i++) {
            var thisAnswer = $("<h2>").text(this.questions[this.phase].answers[i].answer);
            var stringID = "answer" + i;
            $(thisAnswer).attr("id", stringID);
            $(".answers").append(thisAnswer);
        };
    },

    displayCorrectAnswer: function() {
        for (var i = 0; i < 4; i++) {
            if (this.questions[this.phase].answers[i].value === true) {
                $(".answers").append($("<h2>").text(this.questions[this.phase].answers[i].answer));
            }
        };
    },

    pickAnswer: function(x) {
        this.stopTimer();
        if (this.questions[trivia.phase].answers[x].value === true) {
            $(".answers").html("<h2>You are correct! The answer is: </h2>");
            $(".answers").append($("<h2>").text(trivia.questions[trivia.phase].answers[x].answer));
            this.correct++;
        }
        else if (this.questions[trivia.phase].answers[x].value === false) {
            $(".answers").html("<h2>You are incorrect! The answer is: </h2>");
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
        $(".question").append($("<h3>").text("Results"));
        $(".answers").append($("<h2>").text("Correct: " + this.correct));
        $(".answers").append($("<h2>").text("Incorrect: " + this.incorrect));
        $(".answers").append($("<h2>").text("Unanswered: " + this.unanswered));
    },

    mainTimer: function() {
        trivia.time = 30;
        trivia.intervalId = setInterval(trivia.mainDecrement, 1000);
        $(".timer").html("<h3>Time Remaining: " + trivia.time + "</h3>");
        trivia.displayQuestion();
        trivia.displayAnswers();
    },

    mainDecrement: function() {
        trivia.time--;
        $(".timer").html("<h3>Time Remaining: " + trivia.time + "</h3>");

        if (trivia.time === 0) {
            trivia.stopTimer();
            $(".answers").html("<h2>You did not guess in time! The answer is: </h2>");
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