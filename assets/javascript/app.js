//Declare variables

let correctAnswers = 0;
let incorrectAnswers = 0;
let unansweredQuestions = 0;
let currentQuestionIndex = 0;

let triviaQuestion = {

    question: '',
    answersArray: [],
    answerIndex: ''

};

let questionsArray = [];


//Initalize Trivia Questions

function initalizeQuestions() {

    new Question("Question 1: What is the answer?", "Answer 1", "Answer 2", "Answer 3", "Answer 4", 1);
    new Question("Question 2: What is the answer?", "Answer 1", "Answer 2", "Answer 3", "Answer 4", 1);
    new Question("Question 3: What is the answer?", "Answer 1", "Answer 2", "Answer 3", "Answer 4", 1);
    new Question("Question 4: What is the answer?", "Answer 1", "Answer 2", "Answer 3", "Answer 4", 1);

}

//Question constructor 
function Question(question, answer1, answer2, answer3, answer4, index){
    
    //Inialize object with values passed into the function
    this.question = question;
    this.answersArray = [answer1, answer2, answer3, answer4];
    this.answerIndex = index; 
   
    //Add new object to the array
    questionsArray.push(this);

}

function displayQuestion(){

    console.log("Inside displayQuestion");

    //Grab the current div for the question
    let questionDiv = $('#question');

    //Create a new div for the the question and append it to the question div
    // let questionDisplay = questionDiv.append('<div>');
    let questionDisplay = $('<div>');
    questionDiv.append(questionDisplay);

    //Create new divs and display answer options 
    for (let i = 0; i < questionsArray.length; i++){
        let answerDiv = $("<div>");
        answerDiv.text("hi");
        answerDiv.text(questionsArray[currentQuestionIndex].answersArray[i]);
        // console.log(questionsArray[currentQuestionIndex].answersArray[i]);
        questionDiv.append(answerDiv);

    }

    //Display the text for the question
    questionDisplay.text(questionsArray[currentQuestionIndex].question);
    console.log(questionsArray);

}


//Begin the game 
initalizeQuestions();
displayQuestion();