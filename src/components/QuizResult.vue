<template>
  <div class="card max-w-4xl mx-auto text-center">
    <h1 class="text-3xl font-bold text-primary mb-6">Kết quả bài thi</h1>

    <!-- Score Display -->
    <div class="text-2xl mb-4">
      Điểm số của bạn: <strong class="text-primary">{{ results.score }}%</strong>
      ({{ results.correctAnswers }}/{{ results.totalQuestions }} câu đúng)
    </div>

    <!-- Test Info -->
    <div class="text-lg mb-4 text-gray-600">
      Bộ đề: <strong>{{ selectedTest.toUpperCase() }}</strong>
    </div>

    <!-- Pass/Fail Badge -->
    <div class="mb-6">
      <span
        class="inline-block px-6 py-2 rounded-full font-bold text-lg"
        :class="results.passed ? 'bg-success text-white' : 'bg-danger text-white'"
      >
        {{ results.passed ? 'ĐẠT' : 'KHÔNG ĐẠT' }}
      </span>
    </div>

    <!-- Question Overview -->
    <div class="bg-gray-50 p-6 rounded-lg mb-6">
      <div class="font-bold text-primary mb-4">Tổng quan câu hỏi:</div>
      <div class="grid grid-cols-10 gap-2 max-w-3xl mx-auto">
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
      <button @click="$emit('view-details')" class="btn btn-primary">
        Xem chi tiết bài làm
      </button>
      <button @click="$emit('retry')" class="btn btn-secondary">
        Làm lại bài kiểm tra
      </button>
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
  @apply aspect-square flex items-center justify-center rounded font-bold text-sm;
}

.overview-item.correct {
  @apply bg-green-100 border-2 border-success text-success;
}

.overview-item.incorrect {
  @apply bg-red-100 border-2 border-danger text-danger;
}

.overview-item.unanswered {
  @apply bg-yellow-100 border-2 border-yellow-500 text-yellow-700;
}
</style>

