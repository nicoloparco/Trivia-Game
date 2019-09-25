$(document).ready(function () {

//Create a variable that houses the array of trivia questions as independent objects
const triviaQuestions = [
    {
        question: "What was the name of the main character in the 80's hit movie Karate Kid?",
        choices: ["John", "Ralph", "Lucas", "Daniel"],
        answer: "Daniel"
    },
    {
        question: 'The song "Blue Monday" was created by which new age band?',
        choices: ["Devo", "Flock of Seagulls", "New Order", "Depeche Mode" ],
        answer: "New Order"
    },
    {
        question: "This famous artist had the best selling album for two years in a row (1984 & 1985) and is also well known for both his dance moves and his signature noise. Who is it?",
        choices: ["Steven Tyler", "Sting", "Michael Jackson", "Prince"],
        answer: "Michael Jackson"
    },
    {
        question: "The featured car in this movie featuring time travel and a whacky scientist is which one of the following?",
        choices: ["DeLorean", "Firebird", "Camaro", "Countach"],
        answer: "DeLorean"
    }
]

const triviaGIFS = [
    "../assets/images/trivia-game-gif-1.webp" , "../assets/images/trivia-game-gif-2.webp", "../assets/images/trivia-game-gif-3.webp", "../assets/images/trivia-game-gif-4.webp",
    "../assets/images/trivia-game-gif-5.webp" , "../assets/images/trivia-game-gif-6.webp"
]

//Starting variables
let counter = 30;
let currentQuestion = 0;
let score = 0;
let timer;

//Created a function that handles the timer for each question
function countDown() {
    counter--;
    $("#timer").html("Timer :" + counter)
//Once timer reaches 0 it will stop and move onto the next question
    if (counter === 0){
        clearInterval(timer)
        displayGIF();
        setTimeout(nextQuestion(), 3 * 1000);
    }
}

//Function that determines whether to move onto the next question or stop if there are none left
function nextQuestion(){
    console.log('Next Question fired..')
    if((triviaQuestions.length -1) === currentQuestion){
        triviaResult()
    } 
    else {
        currentQuestion++;
        $("#currentQuestion").empty();
        displayQuestion()
    }
}

//Created function to display current question on the webpage along with its respective answer
function displayQuestion () {
    counter = 30;
    timer = setInterval(countDown, 1000);
 //Set both the question and choices as variables   
    const question = triviaQuestions[currentQuestion].question;
    const choices = triviaQuestions[currentQuestion].choices;
 //Add the question and its answers into the html as well as remaining questions 
    $(".triviaText").html(`
    <h4>${question}</h4>${displayChoices(choices)}
    <h4>${remainingQuestions()}</h4>`)
    $("#timer").html(`<h4>Timer: ${counter}`)
}

//Created a function that will display the possible choices of answers for a given question
function displayChoices(choices) {
    let result = "";
    for (let i = 0; i < choices.length; i++) {
        result += `<p class=choice data-answer="${choices[i]}">${choices[i]}</p>`
    }
    return result;
}

//Created function to display remaining questions
function remainingQuestions () {
    const questionsLeft = triviaQuestions.length - (currentQuestion + 1);
    const totalQuestions = triviaQuestions.length;
    return `Remaining Questions: ${questionsLeft}/${totalQuestions}`
}


//Created a function that uses on click event to compare chosen answer
$(document).on("click", ".choice", function () {
    clearInterval(timer);
    const chosenAnswer = $(this).attr("data-answer");
    const correctAnswer = triviaQuestions[currentQuestion].answer;
 //If chosen answer is correct, score will increase by 1 
    if (chosenAnswer === correctAnswer){
        score++;
        displayGIF("win",correctAnswer);
        setTimeout(nextQuestion, 3 * 1000)
        
    }
    else {
        displayGIF("lose",correctAnswer);
        setTimeout(nextQuestion, 3 * 1000)
    }
    
});

//Created a function to display result of chosen answers
function triviaResult() {
    const result = `<p> You got ${score} correct out of a possible ${triviaQuestions.length}</p>`
    $(".triviaText").html(result)

}

//Created a function to select a random gif from an array
function randomImage() {
    let randomNumber = Math.floor(Math.random() * triviaGIFS.length);
    let randomImage = triviaGIFS[randomNumber];
    return randomImage
}

//Created a function to display a GIF after answering a question
function displayGIF(status,correctAnswer) {
    
    if(status === "win") {
        $(".triviaText").html(`
        <p>Congrats you chose correctly!</p>
        <p>The correct answer was ${correctAnswer}</p>
        <img src="${randomImage()}"/>
        `)
    }
    else if (status === "lose") {
        $(".triviaText").html(`
        <p>The answer you chose was incorrect!</p>
        <p>The correct answer was ${correctAnswer}</p>
        <img src="${randomImage()}"/>
        `)
    }
}

//Created a reset button
$("#resetButton").on("click", function () {
    counter = 30;
    currentQuestion = 0;
    score = 0;
    timer = null;
    displayQuestion()
})



})
