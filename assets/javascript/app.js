//Declare variables

let correctAnswers = 0;
let incorrectAnswers = 0;
let unansweredQuestions = 0;
let currentQuestion = 0;

let triviaQuestion = {

    question: '',
    answersArray: [],
    answerIndex: ''

};

let questionsArray = [];


//Initalize Trivia Questions

function initalizeQuestion() {

    for (let i = 0; i < 5; i++){
        let trivQ = triviaQuestion;
        trivQ.question = "Question " + i + ": What is the answer?";
        trivQ.answersArray = ["Answer 1", "Answer 2", "Answer 3", "Answer 4"];
        trivQ.answerIndex = 2; 
        questionsArray.push(trivQ);
    }
}