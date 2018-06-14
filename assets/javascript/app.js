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
  
      //Use clearInterval to stop the count and set the clock to not be running.
      clearInterval(intervalId);
      clockRunning = false;
    },
    count: function() {
  
      // Decrement time by 1 to count down
      stopwatch.time--;
  
      // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
      //       and save the result in a variable.

      let timeFormat = '';

    if(stopwatch.time < 10){
        timeFormat= "00:0"+stopwatch.time;
    }
    else{
        timeFormat= "00:"+stopwatch.time;
    }
     
  
      // DONE: Use the variable we just created to show the converted time in the "display" div.
      $("#timer").text(timeFormat);

      if(stopwatch.time === 0){

        //Check to see if the game is over

        if(!isGameOver()){
            console.log("Here");
            incorrectGuess(questionsArray[currentQuestionIndex].answerIndex, true);
        }
        else{
            displayGameOver();
        }
       
      }
    }
  };



//Initalize Trivia Questions

function initalizeQuestions() {

    new Question("Question 1: What is the answer?", "Answer 1", "Answer 2", "Answer 3", "Answer 4", 1);
    new Question("Question 2: What is the answer?", "Answer 1", "Answer 2", "Answer 3", "Answer 4", 1);
    // new Question("Question 3: What is the answer?", "Answer 1", "Answer 2", "Answer 3", "Answer 4", 1);
    // new Question("Question 4: What is the answer?", "Answer 1", "Answer 2", "Answer 3", "Answer 4", 1);

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

    //Check to see if the game is over before displaying the next question or else display the game over screen
    if(!isGameOver()){

        //console.log("Inside displayQuestion");

        stopwatch.reset();
        stopwatch.start();

        //Grab the current div for the question
        let questionDiv = $('#question');

        //Clear out the question div to start
        questionDiv.html('');

        //Create a new div for the the question and append it to the question div
        let questionDisplay = $('<div>');
        questionDiv.append(questionDisplay);

        //Create a new div for the answers to the question
        let answersDisplay = $('<div>');
        answersDisplay.addClass("answers-display");
        answersDisplay.attr("id", "answers-display");
        questionDiv.append(answersDisplay);


        //Create new divs and display answer options 
        for (let i = 0; i < questionsArray[currentQuestionIndex].answersArray.length; i++){
            let answerDiv = $("<div>");
            answerDiv.addClass("answer-option");
            answerDiv.attr("id", "answer-option");
            answerDiv.attr("index-value", i);
            answerDiv.text(questionsArray[currentQuestionIndex].answersArray[i]);
            answersDisplay.append(answerDiv);

        }

        //Display the text for the question
        questionDisplay.text(questionsArray[currentQuestionIndex].question);
 

    }
    else{
        displayGameOver();
    }
}

function processGuess(guess, answerIndex){

    //console.log("This was the guess: " + guess);
    //console.log("This was the actual answer: " + answerIndex);

    //Check to see if the guess matches the actual trivia answer 
    if (parseInt(guess) === parseInt(answerIndex)){
        correctGuess(answerIndex);
    }
    else { 
        incorrectGuess(answerIndex, false); 
    }

}

//Function to process a correct guess 
function correctGuess(answerIndex){
    stopwatch.stop();
    correctAnswers++;

    //Clear out current question div 
    $('#question').html('');

    //Display a congratulations message

    let congratsDiv = $(`
        <div class="results-div">
            <div> Congrats! You guessed correctly. </div>
            <div> Your answer was ${questionsArray[currentQuestionIndex].answersArray[answerIndex]}. </div>

        </div>
        
        `);

        $('#question').append(congratsDiv);

        nextQuestionTimer();

}

//Function to process an incorrect guess 
function incorrectGuess(answerIndex, didTimeout){
    stopwatch.stop();

    //Create string to hold default incorrect guess text
    let message = "Sorry! That wasn't the correct answer.";

    if(didTimeout){
        unansweredQuestions++;
        //console.log("You ran out of time");
        message = "Oops! You ran out of time."
    }
    else{ 
        incorrectAnswers++;
    }

    //Clear out the contents of the question div
    $('#question').html('');

    //Create new messaging for incorrect guess or a timeout guess
    let incorrectGuessDiv = $(`
        <div class="results-div">
            <div>${message}</div>
            <div> The correct answer was ${questionsArray[currentQuestionIndex].answersArray[answerIndex]}. </div>

        </div>
        
        `);

        $('#question').append(incorrectGuessDiv);
    
    //Begin the timer to count down to display the next question    
    nextQuestionTimer();

}

//Function for when someone runs out of time
function nextQuestionTimer(){
    setTimeout(displayQuestion, 3000);

    //Incrament the question Index for the next time you display a question
    currentQuestionIndex++;
}

//Function for when game is over 
function isGameOver(){

    if (currentQuestionIndex === questionsArray.length){
        console.log("game over!");
        return true;
    }

    else return false;

}

function displayGameOver(){
    console.log("Inside of displayGameOVer");

    //Stop the timer 
    stopwatch.stop();

    //Clear out current timer and question / answer content 
    $('#timer').html('');
    $('#question').html('');

    let gameOverDiv = $(`
    
    <div results-div> Game over! </div>
    <div> Results </div>
    <div> Total Correct Answers: ${correctAnswers} </div>
    <div> Total Incorrect Answers: ${incorrectAnswers} </div>
    <div> Total Unanswered Answers: ${unansweredQuestions} </div>
    <button class="start-over-button" id="start-over"> Star Over </button>
    
    `);

    $('#question').append(gameOverDiv);


    $(document).on('click', '.start-over-button', function(){
        console.log("here");
        currentQuestionIndex = 0;
        displayQuestion();
    })


}



//Begin the game 
initalizeQuestions();
displayQuestion();


//Process clicking on an answer option

    $(document).on('click', ".answer-option", function(){
        //TODO grab the value of which button you just clicked on 
        console.log("Option was clicked" + $(this).attr('index-value'));
        console.log(questionsArray[currentQuestionIndex]);
        console.log("Actual answer: " + questionsArray[currentQuestionIndex].answerIndex);
        processGuess( $(this).attr('index-value'), questionsArray[currentQuestionIndex].answerIndex);
     
     } );


