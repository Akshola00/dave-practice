const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const questions = [
  {
    question: "What is the capital of France?",
    options: ["1. Berlin", "2. Madrid", "3. Paris", "4. Rome"],
    answer: 3,
  },
  {
    question: "Which language is used for web development?",
    options: ["1. Python", "2. JavaScript", "3. C++", "4. Java"],
    answer: 2,
  },
  {
    question: "What does HTML stand for?",
    options: [
      "1. Hyper Text Preprocessor",
      "2. Hyper Text Markup Language",
      "3. Hyper Text Multiple Language",
      "4. Hyper Tool Multi Language",
    ],
    answer: 2,
  },
  {
    question: "What year was JavaScript launched?",
    options: ["1. 1996", "2. 1995", "3. 1994", "4. None of the above"],
    answer: 2,
  },
  {
    question: "Which company developed Java?",
    options: ["1. Microsoft", "2. Sun Microsystems", "3. Google", "4. Apple"],
    answer: 2,
  },
  {
    question: "Which of these is a JavaScript framework?",
    options: ["1. Laravel", "2. Django", "3. React", "4. Flask"],
    answer: 3,
  },
  {
    question: "How do you declare a variable in JavaScript?",
    options: [
      "1. var carName;",
      "2. variable carName;",
      "3. v carName;",
      "4. dim carName;",
    ],
    answer: 1,
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["1. //", "2. /* */", "3. #", "4. <!-- -->"],
    answer: 1,
  },
  {
    question: "What is the output of 2 + '2' in JavaScript?",
    options: ["1. 4", "2. 22", "3. NaN", "4. Error"],
    answer: 2,
  },
  {
    question: "Which method is used to print content to the console?",
    options: [
      "1. console.print()",
      "2. console.log()",
      "3. print()",
      "4. log.console()",
    ],
    answer: 2,
  },
];

let currentQuestionIndex = 0;
let score = 0;

function askQuestion() {
  const q = questions[currentQuestionIndex];
  console.log(`\nQuestion ${currentQuestionIndex + 1}: ${q.question}`);
  q.options.forEach((opt) => console.log(opt));

  rl.question("\nEnter your answer (1-4): ", (input) => {
    const answer = parseInt(input);
    if (isNaN(answer) || answer < 1 || answer > 4) {
      console.log("Invalid input. Please enter a number between 1 and 4.");
      askQuestion(); // Re-ask the same question
    } else {
      if (answer === q.answer) {
        console.log("Correct!");
        score++;
      } else {
        console.log(`Wrong! The correct answer was option ${q.answer}.`);
      }

      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        askQuestion();
      } else {
        showResults();
      }
    }
  });
}

function showResults() {
  console.log("\n--- QUIZ FINISHED ---");
  const percentage = (score / questions.length) * 100;
  console.log(`Your Score: ${score}/${questions.length}`);
  console.log(`Percentage: ${percentage}%`);

  askRestart();
}

function askRestart() {
  rl.question("\nDo you want to play again? (y/n): ", (input) => {
    if (input.toLowerCase() === "y") {
      currentQuestionIndex = 0;
      score = 0;
      askQuestion();
    } else {
      console.log("Thanks for playing! Goodbye.");
      rl.close();
    }
  });
}

console.log("Welcome to the CLI Quiz Game!");
askQuestion();
