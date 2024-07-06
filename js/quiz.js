const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Which language works as Skelaton of a Website?',
    answers: [
      { text: 'HTML', correct: true },
      { text: 'CSS', correct: false },
      { text: 'JAVASCRIPT', correct: false },
      { text: 'BOOTSTRAP', correct: false }
    ]
  },
  {
    question: 'What is the Full Form of CSS?',
    answers: [
      { text: 'Case Style Sheet', correct: false },
      { text: 'Cascading Style Sheet', correct: true },
      { text: 'Common Style Sheet', correct: false },
      { text: 'Common Style Source', correct: false }
    ]
  },
  {
    question: 'What is the use of JavaScript?',
    answers: [
      { text: 'Frontend Building Language', correct: false },
      { text: 'Provide Response According to user action', correct: true },
      { text: 'Used for styling', correct: false },
      { text: 'A framework of python', correct: false }
    ]
  },
  {
    question: 'Which language is the framework of JavaScript?',
    answers: [
      { text: 'Bootstrap', correct: false },
      { text: 'Spring Boot', correct: false },
      { text: 'Django', correct: false },
      { text: 'React', correct: true }
    ]
  }
]