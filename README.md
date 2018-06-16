# New York Trivia Game 

## Instructions
 
 * To begin the game, click on the "Start" button
 * There are a total of 5 trivia questions. You have 20 seconds to answer each question
 * Click on your answer to see if your guess was correct or incorrect
 * After your guess, you will have 5 seconds before moving to the next question
 * If you don't answer in 20 seconds, you automatically will be shown the answer and move onto the next question
 * When you are done with all 5 questions, you scores will be displayed and you can restart the game if you want 


 ## Project Design

 * I used objects for both the main timer and the questions to easily be able to create more questions if desired
 * I built a constructor function for my Question object and then wrote another function to initalize all of my questions
 * I stored those question objects in an array and use a counter index to determine which question we are currently on
 * All of the answers are stored in an array associated with its Question object 
 * There are a series of functions that build off one another to play the game, start game, check if the game is lost, next question, etc
 
 