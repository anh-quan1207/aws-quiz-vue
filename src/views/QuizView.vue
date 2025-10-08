<template>
  <div v-if="quizStore.quizStarted && !showResults" class="min-h-screen py-8">
    <!-- Header -->
    <header class="card bg-primary text-white text-center mb-6 max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold">AWS Certified Cloud Practitioner</h1>
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
        <div v-if="quizStore.mode === 'study'" class="card">
          <div class="flex justify-center gap-4">
            <button
              v-if="!quizStore.studyMode.answerRevealed"
              @click="checkAnswer"
              class="btn btn-primary"
              :disabled="!hasAnswer"
              :class="{ 'opacity-50 cursor-not-allowed': !hasAnswer }"
            >
              Kiểm tra đáp án
            </button>
            <button
              v-else
              @click="nextOrComplete"
              class="btn btn-secondary"
            >
              {{ quizStore.isLastQuestion ? 'Hoàn thành' : 'Câu tiếp theo' }}
            </button>
          </div>
        </div>

        <!-- Exam Mode Submit -->
        <div v-if="quizStore.mode === 'exam'" class="card">
          <button @click="submitQuiz" class="btn btn-success w-full text-lg py-4">
            Nộp bài
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
    e.preventDefault()
    e.returnValue = ''
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
})
</script>

