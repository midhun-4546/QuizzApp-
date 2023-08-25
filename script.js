
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;



const quizArray = [
  {
    id: "0",
    question: "Javascript is an ______language?",
    options: ["Object-Oriented", "Object-Based", "Procedural", "None of the above"],
    correct: "Object-Oriented",
  },
  {
    id: "1",
    question: "Which of the following keywords is used to define a variable in Javascript?",
    options: ["var", "let", "All of the above", "None of the above"],
    correct: "All of the above",
  },
  {
    id: "2",
    question: "Which of the following method is used to access HTML element using Javascript",
    options: ["getElementbyId", "getElementsByClassName()", "Both A and B", "None of the above"],
    correct: "Both A and B",
  },
  {
    id: "3",
    question: "What Keyword is used to check whether a given property is valid or not",
    options: ["Object-Oriented", "in", "is in", "exists"],
    correct: "in",
  },
  {
    id: "4",
    question: "When an Operator's value is NULL,the typeof returned by the unary operator is:",
    options: ["Boolean", "undefined", "Object", "Integer"],
    correct: "Object",
  },
  {
    id: "5",
    question: "Which of the following are closures in js?",
    options: ["Variables", "Functions", "Objects", "All of the above"],
    correct: "All of the above",
  },
  {
    id: "6",
    question: "Which function is used to serialize an object into a JSON string in javascript?",
    options: ["stringify()", "parse()", "convert()", "None of the above"],
    correct: "stringify()",
  },
  {
    id: "7",
    question: "Which of the following methods can be used to display in some form using javascript?",
    options: ["document.write()", "console.log()", "window.alert()", "All of the above"],
    correct: "All of the above",
  },
  {
    id: "8",
    question: "How can a datatype be declared to be a constant type?",
    options: ["const", "var", "let", "constant"],
    correct: "const",
  },
  {
    id: "9",
    question: "When an operator's value is NULL , the typeof returned by the unary operator is:",
    options: ["Boolean", "undefined", "Object", "Integer"],
    correct: "Object",
  },
];


restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});


nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    
    questionCount += 1;
    
    if (questionCount == quizArray.length) {
      
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      
      userScore.innerHTML =
        "Your score is " + scoreCount + " out of " + questionCount;
    } else {
      
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      
      quizDisplay(questionCount);
      count = 11;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);


const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};


const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  
  quizCards[questionCount].classList.remove("hide");
};


function quizCreator() {

  quizArray.sort(() => Math.random() - 0.5);
  
  for (let i of quizArray) {
    
    i.options.sort(() => Math.random() - 0.5);
    
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
    
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}


function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  
  clearInterval(countdown);
  
  options.forEach((element) => {
    element.disabled = true;
  });
}


function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}


startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});


window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};