<template>
  <div class="max-w-5xl mx-auto px-4 animate-scale-in">
    <div class="card-gradient shadow-hard text-center">
      <!-- Header -->
      <div class="mb-8">
        <div class="inline-flex items-center justify-center w-20 h-20 mb-4 rounded-full"
             :class="results.passed ? 'bg-gradient-to-br from-success-400 to-success-600' : 'bg-gradient-to-br from-danger-400 to-danger-600'">
          <svg v-if="results.passed" class="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
          </svg>
          <svg v-else class="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"/>
          </svg>
        </div>
        <h1 class="text-4xl font-extrabold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-3">
          Kết quả bài thi
        </h1>
        <span
          class="inline-block px-8 py-3 rounded-2xl font-bold text-xl shadow-hard"
          :class="results.passed ? 'bg-gradient-to-r from-success-500 to-success-600 text-white' : 'bg-gradient-to-r from-danger-500 to-danger-600 text-white'"
        >
          {{ results.passed ? '🎉 ĐẠT' : '😔 KHÔNG ĐẠT' }}
        </span>
      </div>

      <!-- Score Display -->
      <div class="mb-8 p-8 bg-gradient-to-br from-primary-50 to-purple-50 rounded-2xl">
        <div class="text-6xl font-extrabold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-3">
          {{ results.score }}%
        </div>
        <div class="text-xl text-gray-600 font-medium">
          {{ results.correctAnswers }}/{{ results.totalQuestions }} câu đúng
        </div>
        
        <!-- Progress Bar -->
        <div class="mt-6 w-full max-w-md mx-auto h-4 bg-gray-200 rounded-full overflow-hidden">
          <div 
            class="h-full transition-all duration-1000 ease-out"
            :class="results.passed ? 'bg-gradient-to-r from-success-500 to-success-600' : 'bg-gradient-to-r from-danger-500 to-danger-600'"
            :style="{ width: `${results.score}%` }"
          ></div>
        </div>
      </div>

      <!-- Test Info -->
      <div class="grid md:grid-cols-2 gap-4 mb-8 max-w-2xl mx-auto">
        <div class="p-4 bg-white rounded-xl border border-gray-200">
          <div class="flex items-center justify-center gap-2 text-gray-600">
            <svg class="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
              <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"/>
            </svg>
            <span class="font-medium">Bộ đề:</span>
            <strong class="text-gray-800">{{ selectedTest.toUpperCase() }}</strong>
          </div>
        </div>
        <div class="p-4 bg-white rounded-xl border border-gray-200">
          <div class="flex items-center justify-center gap-2 text-gray-600">
            <svg class="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"/>
            </svg>
            <span class="font-medium">Thời gian:</span>
            <strong class="text-gray-800">{{ formattedDuration }}</strong>
          </div>
        </div>
      </div>

      <!-- Question Overview -->
      <div class="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl mb-8 border border-gray-200">
        <div class="flex items-center justify-center gap-2 mb-5">
          <svg class="w-6 h-6 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
          </svg>
          <div class="font-bold text-gray-800 text-lg">Tổng quan câu hỏi</div>
        </div>
        <div class="grid grid-cols-10 gap-3 max-w-3xl mx-auto">
          <div
            v-for="(question, index) in quizData.questions"
            :key="index"
            class="overview-item"
            :class="getOverviewClass(index)"
          >
            {{ index + 1 }}
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-wrap justify-center gap-4">
        <button @click="$emit('view-details')" class="btn btn-primary text-lg px-8 py-3 flex items-center gap-2">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
            <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"/>
          </svg>
          Xem chi tiết bài làm
        </button>
        <button @click="$emit('retry')" class="btn btn-secondary text-lg px-8 py-3 flex items-center gap-2">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"/>
          </svg>
          Làm lại bài thi
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  results: {
    type: Object,
    required: true
  },
  timer: {
    type: Object,
    default: () => ({ minutes: 0, seconds: 0 })
  },
  selectedTest: {
    type: String,
    required: true
  },
  quizData: {
    type: Object,
    required: true
  },
  answers: {
    type: Array,
    required: true
  }
})

defineEmits(['view-details', 'retry'])

const formattedDuration = computed(() => {
  const minutes = (props.timer && typeof props.timer.minutes === 'number') ? props.timer.minutes : 0
  const seconds = (props.timer && typeof props.timer.seconds === 'number') ? props.timer.seconds : 0
  const m = String(minutes).padStart(2, '0')
  const s = String(seconds).padStart(2, '0')
  return `${m}:${s}`
})

function getOverviewClass(index) {
  const question = props.quizData.questions[index]
  const userAnswer = props.answers[index]
  
  if (userAnswer === null) {
    return 'unanswered'
  }
  
  const isMultiSelect = question.assessment_type === 'multi-select'
  const correctIndices = question.correct_response.map(response => {
    return 'abcdefghijklmnopqrstuvwxyz'.indexOf(response)
  })
  
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
</script>

<style scoped>
.overview-item {
  @apply aspect-square flex items-center justify-center rounded-xl font-bold text-sm
         transition-all duration-300 hover:scale-110 cursor-default;
}

.overview-item.correct {
  @apply bg-gradient-to-br from-success-100 to-success-200 border-2 border-success-400 
         text-success-700 shadow-soft;
}

.overview-item.incorrect {
  @apply bg-gradient-to-br from-danger-100 to-danger-200 border-2 border-danger-400 
         text-danger-700 shadow-soft;
}

.overview-item.unanswered {
  @apply bg-gradient-to-br from-warning-100 to-warning-200 border-2 border-warning-400 
         text-warning-700 shadow-soft;
}
</style>

