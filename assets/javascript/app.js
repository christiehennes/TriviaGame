//Declare variables

let correctAnswers = 0;
let incorrectAnswers = 0;
let unansweredQuestions = 0;
let currentQuestionIndex = 0;
let questionsArray = [];

//Create the timer object 

//  Variable that will hold our setInterval that runs the stopwatch
let intervalId;

// prevents the clock from being sped up unnecessarily
let clockRunning = false;

let stopwatch = {

    time: 10,
  
    reset: function() {
  
      stopwatch.time = 10;
  
      $("#timer").text("00:10");

    },
    start: function() {
  
      // DONE: Use setInterval to start the count here and set the clock to running.
      if (!clockRunning) {
        intervalId = setInterval(stopwatch.count, 1000);
        clockRunning = true;
      }
    },
    stop: function() {
  
      // DONE: Use clearInterval to stop the count here and set the clock to not be running.
      clearInterval(intervalId);
      clockRunning = false;
    },
    count: function() {
  
      // Decrement time by 1 to count down
      stopwatch.time--;
  
      // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
      //       and save the result in a variable.
    //   var converted = stopwatch.timeConverter(stopwatch.time);
      var timeFormat= "00:"+stopwatch.time;
      //console.log(timeFormat);
  
      // DONE: Use the variable we just created to show the converted time in the "display" div.
      $("#timer").text(timeFormat);

      if(stopwatch.time === 0){
        //   window.alert("Times up!");
          stopwatch.stop();
      }
    },
    // timeConverter: function(t) {
  
    // //   var minutes = Math.floor(t / 60);
    // //   console.log(minutes);
    //   var seconds = t - (minutes * 60);
    //   console.log(seconds);
  
    //   if (seconds < 10) {
    //     seconds = "0" + seconds;
    //   }
  
    // //   if (minutes === 0) {
    // //     minutes = "00";
    // //   }
    // //   else if (minutes < 10) {
    // //     minutes = "0" + minutes;
    // //   }
  
    //   return "00:" + seconds;
    // }
  };


//Initalize Trivia Questions

function initalizeQuestions() {

    new Question("Question 1: What is the answer?", "Answer 1", "Answer 2", "Answer 3", "Answer 4", 1);
    new Question("Question 2: What is the answer?", "Answer 1", "Answer 2", "Answer 3", "Answer 4", 1);
    new Question("Question 3: What is the answer?", "Answer 1", "Answer 2", "Answer 3", "Answer 4", 1);
    new Question("Question 4: What is the answer?", "Answer 1", "Answer 2", "Answer 3", "Answer 4", 1);

}

//Question constructor for a Question object 
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

    stopwatch.reset();
    stopwatch.start();

    //Grab the current div for the question
    let questionDiv = $('#question');

    //Create a new div for the the question and append it to the question div
    let questionDisplay = $('<div>');
    questionDiv.append(questionDisplay);

    //Create a new div for the answers to the question
    let answersDisplay = $('<div>');
    answersDisplay.addClass("answers-display");
    answersDisplay.attr("id", "answers-display");
    questionDiv.append(answersDisplay);


    //Create new divs and display answer options 
    for (let i = 0; i < questionsArray.length; i++){
        let answerDiv = $("<div>");
        answerDiv.addClass("answer-option");
        answerDiv.attr("id", "answer-option");
        answerDiv.attr("index-value", i);
        answerDiv.text(questionsArray[currentQuestionIndex].answersArray[i]);
        // console.log(questionsArray[currentQuestionIndex].answersArray[i]);
        answersDisplay.append(answerDiv);

    }

    //Display the text for the question
    questionDisplay.text(questionsArray[currentQuestionIndex].question);
    console.log(questionsArray);

    //Incrament the question Index for the next time you display a question
    currentQuestionIndex++;

}

function processGuess(guess, answerIndex){

    console.log("This was the guess: " + guess);
    console.log("This was the actual answer: " + answerIndex);

    //Check to see if the guess matches the actual trivia answer 
    if (parseInt(guess) === parseInt(answerIndex)){
        correctGuess();
    }
    else { 
        incorrectGuess(); 
    }

}

//Function to process a correct guess 
function correctGuess(){
    console.log("Correct guess");

}

//Function to process an incorrect guess 
function incorrectGuess(){
    console.log("Incorrect guess");

}



//Begin the game 
initalizeQuestions();
displayQuestion();


//Process clicking on an answer option
$('#answers-display').on('click', ".answer-option", function(){
   //TODO grab the value of which button you just clicked on 
   console.log("Option was clicked" + $(this).attr('index-value'));
   processGuess( $(this).attr('index-value'), questionsArray[currentQuestionIndex].answerIndex);


   

} );