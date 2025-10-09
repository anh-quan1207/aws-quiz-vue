<template>
  <div class="max-w-5xl mx-auto px-4">
    <div class="card shadow-medium">
      <h2 class="text-2xl font-bold text-navy-900 mb-8">
        Start Quiz
      </h2>

      <!-- Mode Selection -->
      <div class="mb-8">
        <div class="text-sm font-semibold text-navy-700 mb-3 uppercase tracking-wide">
          Select Mode
        </div>
        <div class="grid md:grid-cols-2 gap-4">
          <div
            class="mode-card"
            :class="{ selected: selectedMode === 'exam' }"
            @click="selectedMode = 'exam'"
          >
            <div class="flex items-center gap-3 mb-2">
              <div class="w-2 h-2 rounded-full" :class="selectedMode === 'exam' ? 'bg-primary-500' : 'bg-navy-300'"></div>
              <div class="font-bold text-navy-900">Exam Mode</div>
            </div>
            <p class="text-sm text-navy-600 pl-5">
              Làm bài thi với thời gian và tính điểm
            </p>
          </div>

          <div
            class="mode-card"
            :class="{ selected: selectedMode === 'study' }"
            @click="selectedMode = 'study'"
          >
            <div class="flex items-center gap-3 mb-2">
              <div class="w-2 h-2 rounded-full" :class="selectedMode === 'study' ? 'bg-primary-500' : 'bg-navy-300'"></div>
              <div class="font-bold text-navy-900">Study Mode</div>
            </div>
            <p class="text-sm text-navy-600 pl-5">
              Học tập với đáp án ngay lập tức
            </p>
          </div>
        </div>
      </div>

      <!-- Test Selection -->
      <div class="mb-8">
        <div class="text-sm font-semibold text-navy-700 mb-3 uppercase tracking-wide">
          Select Test
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div
            v-for="test in testList"
            :key="test.id"
            class="test-card"
            :class="{ selected: selectedTest === test.id }"
            @click="selectedTest = test.id"
          >
            <div class="font-semibold text-navy-900 text-center">
              {{ test.name }}
            </div>
          </div>
        </div>
      </div>

      <!-- Start Button -->
      <div class="pt-4 border-t border-navy-200">
        <button @click="startQuiz" class="btn btn-primary w-full py-4 text-base font-bold">
          Start Quiz →
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '@/stores/quiz'
import { testList } from '@/data'

const router = useRouter()
const quizStore = useQuizStore()

const selectedTest = ref('test001')
const selectedMode = ref('exam')

function startQuiz() {
  // Always clear any saved state and start fresh
  quizStore.resetQuiz()

  // Start new quiz
  try {
    quizStore.loadQuiz(selectedTest.value, selectedMode.value)
    router.push('/quiz')
  } catch (error) {
    alert('Không thể tải dữ liệu câu hỏi. Vui lòng thử lại.')
    console.error(error)
  }
}
</script>

<style scoped>
.mode-card {
  @apply p-4 border border-navy-200 rounded-lg cursor-pointer 
         transition-all duration-200 hover:border-primary-300 hover:bg-navy-50
         bg-white;
}

.mode-card.selected {
  @apply border-primary-500 bg-primary-50;
}

.test-card {
  @apply p-4 border border-navy-200 rounded-lg cursor-pointer 
         transition-all duration-200 hover:border-primary-300 hover:bg-navy-50
         bg-white;
}

.test-card.selected {
  @apply border-primary-500 bg-primary-50 text-primary-700;
}
</style>

