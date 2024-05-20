const questionContainer = document.getElementById("assessment-question");
const nextQuestionButton = document.getElementById("next-question");

const allQuestions = [
  {
    id: 0,
    question: "What specific symptoms are you experiencing recently?",
  },
  {
    id: 1,
    question: "How long have you been experiencing these symptoms?",
  },
  {
    id: 2,
    question:
      "Have these symptoms been persistent or have they been coming and going?",
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
};

const loadQuestion = (id) => {
  questionContainer.innerHTML = allQuestions[id].question;
};

nextQuestionButton.addEventListener("click", showNextQuestion);

loadQuestion(currentQuestionIndex);
