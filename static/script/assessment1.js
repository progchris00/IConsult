const formContents = document.getElementById("form-contents");
const nextQuestionButton = document.getElementById("next-question");
const previousQuestionButton = document.getElementById("previous-question");
const inputBox = document.getElementById("input-box");
const questionCount = document.getElementById("question-number");
const submitButton = document.getElementById("submit");

const allQuestions = [
  {
    id: 0,
    question: "What specific symptoms are you experiencing recently?",
  },
  {
    id: 1,
    question: "For how long have you been experiencing these symptoms?",
  },
  {
    id: 2,
    question:
      "Have these symptoms been persistent, or have they been coming and going?",
  },
  {
    id: 3,
    question:
      "Have you noticed any specific triggers or patterns associated with these symptoms?",
  },
  {
    id: 4,
    question: "What are these triggers or patterns you observed?",
  },
];

let currentQuestionIndex = 0;
const answers = [];

function displayQuestion() {
  formContents.innerHTML = `
  <div class="question-and-number-container" id="question-and-number-container">
    <p id="question-number">Question #${currentQuestionIndex + 1}</p>
    <label class="question" id="question" for="">${
      allQuestions[currentQuestionIndex].question
    }</label>
  </div>
    <input id="input-box" type="text" placeholder="Answer here" value="${
      answers[currentQuestionIndex] || ""
    }" />`;
}

const showNextQuestion = () => {
  const answerInput = document.getElementById("input-box");
  answers[currentQuestionIndex] = answerInput.value;

  if (currentQuestionIndex < allQuestions.length - 1) {
    currentQuestionIndex++;
    console.log(answers);
    displayQuestion();
  } else {
    console.log("sending to server");
    sendAnswersToServer();
  }
};

const showPreviousQuestion = () => {
  currentQuestionIndex--;
  displayQuestion();
};

function sendAnswersToServer() {
  fetch("/result", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ answers: answers }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((html) => {
      document.open();
      document.write(html);
      document.close();
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("There was an error submitting your answers.");
    });
}

nextQuestionButton.addEventListener("click", showNextQuestion);
previousQuestionButton.addEventListener("click", showPreviousQuestion);

displayQuestion();
