import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getTest } from '@/data'
import { shuffleArray } from '@/utils/shuffle'
import { saveQuizState, loadQuizState, clearQuizState } from '@/utils/localStorage'

export const useQuizStore = defineStore('quiz', () => {
  // State
  const currentQuestion = ref(0)
  const answers = ref([])
  const timer = ref({
    minutes: 0,
    seconds: 0,
    interval: null
  })
  const quizStarted = ref(false)
  const quizCompleted = ref(false)
  const selectedTest = ref('test001')
  const mode = ref('exam') // 'exam' or 'study'
  const quizData = ref(null)
  const studyMode = ref({
    answerRevealed: false,
    currentAnswer: null
  })

  // Computed
  const totalQuestions = computed(() => {
    return quizData.value?.questions?.length || 0
  })

  const answeredQuestions = computed(() => {
    return answers.value.filter(answer => answer !== null).length
  })

  const isLastQuestion = computed(() => {
    return currentQuestion.value === totalQuestions.value - 1
  })

  const passPercent = computed(() => {
    return quizData.value?.pass_percent || 70
  })

  // Actions
  function loadQuiz(testId, quizMode = 'exam') {
    selectedTest.value = testId
    mode.value = quizMode
    
    // Load test data
    const testData = getTest(testId)
    if (!testData) {
      throw new Error(`Test ${testId} not found`)
    }

    // Shuffle questions
    const shuffledQuestions = shuffleArray(testData.questions)
    quizData.value = {
      pass_percent: testData.pass_percent,
      questions: shuffledQuestions
    }

    // Initialize answers array
    answers.value = Array(shuffledQuestions.length).fill(null)
    
    // Reset state
    currentQuestion.value = 0
    quizStarted.value = true
    quizCompleted.value = false
    studyMode.value = {
      answerRevealed: false,
      currentAnswer: null
    }

    // Start timer for exam mode
    if (quizMode === 'exam') {
      startTimer()
    }

    // Save initial state
    saveProgress()
  }

  function setAnswer(questionIndex, answer) {
    answers.value[questionIndex] = answer
    saveProgress()
  }

  function nextQuestion() {
    if (currentQuestion.value < totalQuestions.value - 1) {
      currentQuestion.value++
      resetStudyMode()
      saveProgress()
    }
  }

  function prevQuestion() {
    if (currentQuestion.value > 0) {
      currentQuestion.value--
      resetStudyMode()
      saveProgress()
    }
  }

  function goToQuestion(index) {
    if (index >= 0 && index < totalQuestions.value) {
      currentQuestion.value = index
      resetStudyMode()
      saveProgress()
    }
  }

  function resetStudyMode() {
    studyMode.value.answerRevealed = false
    studyMode.value.currentAnswer = null
  }

  function revealAnswer() {
    studyMode.value.answerRevealed = true
  }

  function startTimer() {
    timer.value.minutes = 0
    timer.value.seconds = 0
    
    if (timer.value.interval) {
      clearInterval(timer.value.interval)
    }

    timer.value.interval = setInterval(() => {
      timer.value.seconds++
      if (timer.value.seconds === 60) {
        timer.value.minutes++
        timer.value.seconds = 0
      }
      saveProgress()
    }, 1000)
  }

  function stopTimer() {
    if (timer.value.interval) {
      clearInterval(timer.value.interval)
      timer.value.interval = null
    }
  }

  function submitQuiz() {
    stopTimer()
    quizCompleted.value = true
    clearQuizState() // Clear saved state after submission
  }

  function calculateResults() {
    let correctAnswers = 0

    quizData.value.questions.forEach((question, index) => {
      const userAnswer = answers.value[index]
      
      if (userAnswer === null) return

      if (question.assessment_type === 'multi-select') {
        const correctIndices = question.correct_response.map(response => {
          return 'abcdefghijklmnopqrstuvwxyz'.indexOf(response)
        })
        
        if (arraysEqual(userAnswer.sort(), correctIndices.sort())) {
          correctAnswers++
        }
      } else {
        const correctIndex = 'abcdefghijklmnopqrstuvwxyz'.indexOf(question.correct_response[0])
        if (userAnswer === correctIndex) {
          correctAnswers++
        }
      }
    })

    const score = Math.round((correctAnswers / totalQuestions.value) * 100)
    const passed = score >= passPercent.value

    return {
      correctAnswers,
      totalQuestions: totalQuestions.value,
      score,
      passed
    }
  }

  function saveProgress() {
    if (!quizStarted.value || quizCompleted.value) return

    const state = {
      currentQuestion: currentQuestion.value,
      answers: answers.value,
      timer: {
        minutes: timer.value.minutes,
        seconds: timer.value.seconds
      },
      selectedTest: selectedTest.value,
      mode: mode.value,
      quizData: quizData.value,
      studyMode: studyMode.value
    }

    saveQuizState(state)
  }

  function restoreProgress() {
    const saved = loadQuizState()
    if (!saved) return false

    currentQuestion.value = saved.currentQuestion
    answers.value = saved.answers
    timer.value.minutes = saved.timer.minutes
    timer.value.seconds = saved.timer.seconds
    selectedTest.value = saved.selectedTest
    mode.value = saved.mode
    quizData.value = saved.quizData
    studyMode.value = saved.studyMode
    quizStarted.value = true

    // Resume timer if in exam mode
    if (mode.value === 'exam') {
      startTimer()
    }

    return true
  }

  function resetQuiz() {
    currentQuestion.value = 0
    answers.value = []
    timer.value = {
      minutes: 0,
      seconds: 0,
      interval: null
    }
    quizStarted.value = false
    quizCompleted.value = false
    selectedTest.value = 'test001'
    mode.value = 'exam'
    quizData.value = null
    studyMode.value = {
      answerRevealed: false,
      currentAnswer: null
    }
    
    stopTimer()
    clearQuizState()
  }

  // Helper function
  function arraysEqual(a, b) {
    if (a === b) return true
    if (a == null || b == null) return false
    if (a.length !== b.length) return false

    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false
    }
    return true
  }

  return {
    // State
    currentQuestion,
    answers,
    timer,
    quizStarted,
    quizCompleted,
    selectedTest,
    mode,
    quizData,
    studyMode,

    // Computed
    totalQuestions,
    answeredQuestions,
    isLastQuestion,
    passPercent,

    // Actions
    loadQuiz,
    setAnswer,
    nextQuestion,
    prevQuestion,
    goToQuestion,
    resetStudyMode,
    revealAnswer,
    startTimer,
    stopTimer,
    submitQuiz,
    calculateResults,
    saveProgress,
    restoreProgress,
    resetQuiz
  }
})

