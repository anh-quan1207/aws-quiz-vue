<template>
  <div v-if="quizStore.quizStarted && !showResults" class="min-h-screen py-8 px-4">
    <!-- Header -->
    <header class="max-w-7xl mx-auto mb-6 animate-slide-down">
      <div class="card-gradient shadow-hard text-center">
        <div class="flex items-center justify-center gap-3">
          <svg class="w-8 h-8 text-primary-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 2.18l8 3.6v8.55c0 4.35-3.06 8.44-7.5 9.67-4.44-1.23-7.5-5.32-7.5-9.67V7.78l7-3.6z"/>
            <path d="M7 10.5l3 3 6-6"/>
          </svg>
          <h1 class="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            AWS Cloud Practitioner Quiz
          </h1>
        </div>
      </div>
    </header>

    <!-- Quiz Info -->
    <div class="max-w-7xl mx-auto mb-6">
      <QuizInfo
        :current-question="quizStore.currentQuestion"
        :total-questions="quizStore.totalQuestions"
        :answered-questions="quizStore.answeredQuestions"
        :mode="quizStore.mode"
        :timer="quizStore.timer"
      />
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto grid lg:grid-cols-[1fr_250px] gap-6">
      <!-- Left Column -->
      <div class="space-y-6">
        <!-- Navigation -->
        <QuizNavigation
          :can-go-prev="quizStore.currentQuestion > 0"
          :can-go-next="quizStore.currentQuestion < quizStore.totalQuestions - 1"
          @prev="quizStore.prevQuestion()"
          @next="quizStore.nextQuestion()"
        />

        <!-- Question -->
        <QuizQuestion
          v-if="currentQuestion"
          :question="currentQuestion"
          :question-index="quizStore.currentQuestion"
          :user-answer="quizStore.answers[quizStore.currentQuestion]"
          :answer-revealed="quizStore.studyMode.answerRevealed"
        />

        <!-- Study Mode Controls -->
        <div v-if="quizStore.mode === 'study'" class="card-gradient shadow-medium">
          <div class="flex justify-center gap-4">
            <button
              v-if="!quizStore.studyMode.answerRevealed"
              @click="checkAnswer"
              class="btn btn-primary text-lg px-8 py-3 flex items-center gap-2"
              :disabled="!hasAnswer"
              :class="{ 'opacity-50 cursor-not-allowed': !hasAnswer }"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
              </svg>
              Kiểm tra đáp án
            </button>
            <button
              v-else
              @click="nextOrComplete"
              class="btn btn-secondary text-lg px-8 py-3 flex items-center gap-2"
            >
              {{ quizStore.isLastQuestion ? 'Hoàn thành' : 'Câu tiếp theo' }}
              <svg v-if="!quizStore.isLastQuestion" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"/>
              </svg>
              <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Exam Mode Submit -->
        <div v-if="quizStore.mode === 'exam'" class="card-gradient shadow-medium">
          <button @click="submitQuiz" class="btn btn-success w-full text-lg py-4 flex items-center justify-center gap-2">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
              <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
            </svg>
            Nộp bài thi
          </button>
        </div>
      </div>

      <!-- Right Column - Question Index -->
      <div class="hidden lg:block">
        <QuestionIndex
          :total-questions="quizStore.totalQuestions"
          :current-question="quizStore.currentQuestion"
          :answers="quizStore.answers"
          @go-to="quizStore.goToQuestion"
        />
      </div>
    </div>
  </div>

  <!-- Results View -->
  <div v-else-if="showResults && !showDetailedResults" class="min-h-screen py-8">
    <QuizResult
      :results="results"
      :selected-test="quizStore.selectedTest"
      :quiz-data="quizStore.quizData"
      :answers="quizStore.answers"
      :timer="quizStore.timer"
      @view-details="showDetailedResults = true"
      @retry="retryQuiz"
    />
  </div>

  <!-- Detailed Results View -->
  <div v-else-if="showDetailedResults" class="min-h-screen py-8">
    <div class="max-w-7xl mx-auto">
      <DetailedResult
        :quiz-data="quizStore.quizData"
        :answers="quizStore.answers"
        @back="showDetailedResults = false"
      />
    </div>
  </div>

  <!-- Loading/Error State -->
  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="card text-center">
      <p class="text-xl">Đang tải câu hỏi...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '@/stores/quiz'
import QuizInfo from '@/components/QuizInfo.vue'
import QuizNavigation from '@/components/QuizNavigation.vue'
import QuizQuestion from '@/components/QuizQuestion.vue'
import QuestionIndex from '@/components/QuestionIndex.vue'
import QuizResult from '@/components/QuizResult.vue'
import DetailedResult from '@/components/DetailedResult.vue'

const router = useRouter()
const quizStore = useQuizStore()

const showResults = ref(false)
const showDetailedResults = ref(false)
const results = ref(null)

const currentQuestion = computed(() => {
  if (!quizStore.quizData) return null
  return quizStore.quizData.questions[quizStore.currentQuestion]
})

const hasAnswer = computed(() => {
  const answer = quizStore.answers[quizStore.currentQuestion]
  if (answer === null) return false
  if (Array.isArray(answer) && answer.length === 0) return false
  return true
})

function checkAnswer() {
  if (!hasAnswer.value) {
    alert('Vui lòng chọn một đáp án trước khi kiểm tra!')
    return
  }
  quizStore.revealAnswer()
}

function nextOrComplete() {
  if (quizStore.isLastQuestion) {
    alert(`Chúc mừng! Bạn đã hoàn thành tất cả ${quizStore.totalQuestions} câu hỏi trong bộ đề này!`)
    router.push('/')
  } else {
    quizStore.nextQuestion()
  }
}

function submitQuiz() {
  const unansweredCount = quizStore.answers.filter(a => a === null).length
  
  let confirmMessage = 'Bạn có chắc chắn muốn nộp bài?'
  if (unansweredCount > 0) {
    confirmMessage = `Bạn còn ${unansweredCount} câu hỏi chưa trả lời. Bạn có chắc chắn muốn nộp bài?`
  }
  
  if (confirm(confirmMessage)) {
    quizStore.submitQuiz()
    results.value = quizStore.calculateResults()
    showResults.value = true
  }
}

function retryQuiz() {
  quizStore.resetQuiz()
  router.push('/')
}

// Warn before leaving page
function handleBeforeUnload(e) {
  if (quizStore.quizStarted && !quizStore.quizCompleted) {
    const modeText = quizStore.mode === 'exam' ? 'thi' : 'học'
    const message = `Bạn đang làm bài ${modeText} dở. Bạn có chắc chắn muốn thoát ra không?`
    
    e.preventDefault()
    e.returnValue = message
    return message
  }
}

onMounted(() => {
  // Redirect if no quiz started
  if (!quizStore.quizStarted) {
    router.push('/')
  }
  
  // Add beforeunload listener
  window.addEventListener('beforeunload', handleBeforeUnload)
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload)
  // Stop timer when component unmounts
  quizStore.stopTimer()
})
</script>

