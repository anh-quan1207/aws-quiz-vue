<template>
  <div class="grid lg:grid-cols-[1fr_220px] gap-6 px-4">
    <!-- Main Content -->
    <div class="space-y-6 animate-slide-up">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-extrabold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-2">
          Kết quả chi tiết
        </h1>
        <p class="text-gray-600">Xem lại đáp án và giải thích cho từng câu hỏi</p>
      </div>

      <!-- Questions List -->
      <div
        v-for="(question, index) in quizData.questions"
        :key="index"
        :id="`question-${index}`"
        class="card-gradient shadow-medium scroll-mt-4 transition-all duration-300"
        :class="{ 'ring-4 ring-primary-400 scale-[1.02]': highlightedQuestion === index }"
      >
        <!-- Question Header -->
        <div class="flex items-start gap-3 mb-4 pb-4 border-b border-gray-200">
          <div class="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center text-white font-bold shadow-soft">
            {{ index + 1 }}
          </div>
          <div class="flex-1">
            <div class="text-sm text-gray-500 font-medium mb-1">Câu hỏi {{ index + 1 }}</div>
            <div class="flex items-center gap-2">
              <span class="badge" :class="question.assessment_type === 'multi-select' ? 'bg-secondary-100 text-secondary-700 border border-secondary-200' : 'bg-primary-100 text-primary-700 border border-primary-200'">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path v-if="question.assessment_type === 'multi-select'" fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2h-1.528A6 6 0 004 9.528V4zm2 6a4 4 0 00.5 7.969L6 18a2 2 0 002 2h6a2 2 0 002-2v-1.528A4.002 4.002 0 0013 6a4 4 0 00-7 4z"/>
                  <path v-else d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/>
                </svg>
                {{ question.assessment_type === 'multi-select' ? 'Chọn nhiều đáp án' : 'Chọn một đáp án' }}
              </span>
            </div>
          </div>
        </div>

        <!-- Question Text -->
        <div class="mb-4 text-gray-800 leading-relaxed" v-html="question.prompt.question"></div>

        <!-- Answers -->
        <ul class="space-y-3 mb-4">
          <li
            v-for="(answer, answerIndex) in question.prompt.answers"
            :key="answerIndex"
            class="p-4 rounded-xl border-2 transition-all duration-200"
            :class="getAnswerClass(question, index, answerIndex)"
          >
            <div class="text-gray-700" v-html="answer"></div>
          </li>
        </ul>

        <!-- Unanswered Notice -->
        <div v-if="answers[index] === null" class="p-4 bg-gradient-to-r from-warning-50 to-yellow-50 border-l-4 border-warning-500 text-warning-700 mb-4 rounded-xl flex items-start gap-3">
          <svg class="w-6 h-6 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"/>
          </svg>
          <div>
            <div class="font-bold mb-1">Chưa trả lời</div>
            <div>Bạn chưa trả lời câu hỏi này</div>
          </div>
        </div>

        <!-- Explanation -->
        <div class="p-5 bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl border-l-4 border-primary-500">
          <div class="flex items-center gap-2 mb-3">
            <svg class="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"/>
            </svg>
            <h3 class="font-bold text-primary-700 text-lg">Giải thích chi tiết:</h3>
          </div>
          <div class="text-gray-700 leading-relaxed" v-html="question.prompt.explanation"></div>
        </div>
      </div>
    </div>

    <!-- Sidebar Overview -->
    <div class="lg:sticky lg:top-4 lg:h-fit">
      <div class="card-gradient shadow-medium">
        <div class="flex items-center justify-center gap-2 pb-3 mb-4 border-b border-gray-200">
          <svg class="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
          </svg>
          <div class="font-bold text-gray-700 text-center">
            Danh sách câu hỏi
          </div>
        </div>

        <div class="grid grid-cols-5 gap-2 mb-5">
          <div
            v-for="(question, index) in quizData.questions"
            :key="index"
            class="overview-item"
            :class="getOverviewClass(index)"
            @click="scrollToQuestion(index)"
          >
            {{ index + 1 }}
          </div>
        </div>

        <button @click="$emit('back')" class="btn btn-primary w-full flex items-center justify-center gap-2">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"/>
          </svg>
          Quay lại
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

const props = defineProps({
  quizData: {
    type: Object,
    required: true
  },
  answers: {
    type: Array,
    required: true
  }
})

defineEmits(['back'])

const highlightedQuestion = ref(null)

function getCorrectIndices(question) {
  return question.correct_response.map(response => {
    return 'abcdefghijklmnopqrstuvwxyz'.indexOf(response)
  })
}

function getAnswerClass(question, questionIndex, answerIndex) {
  const correctIndices = getCorrectIndices(question)
  const userAnswer = props.answers[questionIndex]
  const isMultiSelect = question.assessment_type === 'multi-select'

  if (userAnswer === null) {
    // Show correct answers for unanswered questions
    if (correctIndices.includes(answerIndex)) {
      return 'border-success-400 bg-gradient-to-br from-success-50 to-success-100'
    }
    return 'border-gray-300 bg-white'
  }

  if (isMultiSelect) {
    const isUserSelection = Array.isArray(userAnswer) && userAnswer.includes(answerIndex)
    const isCorrect = correctIndices.includes(answerIndex)

    if (isUserSelection && isCorrect) {
      return 'border-success-400 bg-gradient-to-br from-success-50 to-success-100'
    } else if (isUserSelection && !isCorrect) {
      return 'border-danger-400 bg-gradient-to-br from-danger-50 to-danger-100'
    } else if (!isUserSelection && isCorrect) {
      return 'border-success-400 bg-gradient-to-br from-success-50 to-success-100'
    }
  } else {
    const isUserSelection = userAnswer === answerIndex
    const isCorrect = correctIndices.includes(answerIndex)

    if (isUserSelection && isCorrect) {
      return 'border-success-400 bg-gradient-to-br from-success-50 to-success-100'
    } else if (isUserSelection && !isCorrect) {
      return 'border-danger-400 bg-gradient-to-br from-danger-50 to-danger-100'
    } else if (!isUserSelection && isCorrect) {
      return 'border-success-400 bg-gradient-to-br from-success-50 to-success-100'
    }
  }

  return 'border-gray-300 bg-white'
}

function getOverviewClass(index) {
  const question = props.quizData.questions[index]
  const userAnswer = props.answers[index]

  if (userAnswer === null) {
    return 'unanswered'
  }

  const isMultiSelect = question.assessment_type === 'multi-select'
  const correctIndices = getCorrectIndices(question)

  let isCorrect = false

  if (isMultiSelect) {
    const sortedUser = Array.isArray(userAnswer) ? [...userAnswer].sort() : []
    const sortedCorrect = [...correctIndices].sort()
    isCorrect = JSON.stringify(sortedUser) === JSON.stringify(sortedCorrect)
  } else {
    isCorrect = userAnswer === correctIndices[0]
  }

  return isCorrect ? 'correct' : 'incorrect'
}

function scrollToQuestion(index) {
  const element = document.getElementById(`question-${index}`)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    
    // Highlight effect
    highlightedQuestion.value = index
    setTimeout(() => {
      highlightedQuestion.value = null
    }, 1500)
  }
}

// Make links external on mount
onMounted(() => {
  nextTick(() => {
    const links = document.querySelectorAll('.card a')
    links.forEach(link => {
      link.setAttribute('target', '_blank')
      link.setAttribute('rel', 'noopener noreferrer')
    })
  })
})
</script>

<style scoped>
.overview-item {
  @apply aspect-square flex items-center justify-center rounded-xl font-bold text-xs cursor-pointer 
         transition-all duration-300 hover:scale-110 hover:shadow-soft border-2;
}

.overview-item.correct {
  @apply bg-gradient-to-br from-success-100 to-success-200 border-success-400 text-success-700;
}

.overview-item.incorrect {
  @apply bg-gradient-to-br from-danger-100 to-danger-200 border-danger-400 text-danger-700;
}

.overview-item.unanswered {
  @apply bg-gradient-to-br from-warning-100 to-warning-200 border-warning-400 text-warning-700;
}

:deep(img) {
  @apply max-w-full h-auto my-4 rounded-xl shadow-soft;
}

:deep(a) {
  @apply text-primary-600 underline hover:text-primary-700 font-medium;
}

:deep(pre) {
  @apply bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto my-4 shadow-medium;
}

:deep(code) {
  @apply bg-gray-100 px-2 py-1 rounded-lg text-sm font-mono text-gray-800;
}

:deep(pre code) {
  @apply bg-transparent text-gray-100 p-0;
}
</style>

