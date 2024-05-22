const questionContainer = document.getElementById("question");
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

const showNextQuestion = () => {
  const nextQuestionId = (currentQuestionIndex += 1);

  loadQuestion(nextQuestionId);
  inputBox.value = "";
};

const showPreviousQuestion = () => {
  const previousQuestionId = (currentQuestionIndex -= 1);

  loadQuestion(previousQuestionId);
  inputBox.value = "";
};

const loadQuestion = (id) => {
  if (currentQuestionIndex === allQuestions.length - 1) {
    submitButton.classList.remove("hide");
    nextQuestionButton.classList.add("hide");
  }
  if (currentQuestionIndex > 0) {
    previousQuestionButton.classList.remove("inactive");
  }
  if (currentQuestionIndex === 0) {
    previousQuestionButton.classList.add("inactive");
  }
  questionCount.innerHTML = `Question #${currentQuestionIndex + 1}`;
  questionContainer.innerHTML = allQuestions[id].question;
};

nextQuestionButton.addEventListener("click", showNextQuestion);
previousQuestionButton.addEventListener("click", showPreviousQuestion);

loadQuestion(currentQuestionIndex);
