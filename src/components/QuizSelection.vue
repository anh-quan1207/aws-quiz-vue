<template>
  <div class="card max-w-4xl mx-auto">
    <h2 class="text-3xl font-bold text-primary text-center mb-8">
      Chọn bộ đề kiểm tra
    </h2>

    <!-- Mode Selection -->
    <div class="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
      <h3 class="text-xl font-semibold text-primary mb-4">Chọn chế độ:</h3>
      <div class="grid md:grid-cols-2 gap-4">
        <div
          class="mode-card"
          :class="{ selected: selectedMode === 'exam' }"
          @click="selectedMode = 'exam'"
        >
          <input
            type="radio"
            id="mode-exam"
            value="exam"
            v-model="selectedMode"
            class="mr-3"
          />
          <div>
            <label for="mode-exam" class="font-bold text-lg text-primary cursor-pointer">
              Chế độ thi (Exam Mode)
            </label>
            <p class="text-sm text-gray-600 mt-1">
              Làm bài thi với thời gian và tính điểm
            </p>
          </div>
        </div>

        <div
          class="mode-card"
          :class="{ selected: selectedMode === 'study' }"
          @click="selectedMode = 'study'"
        >
          <input
            type="radio"
            id="mode-study"
            value="study"
            v-model="selectedMode"
            class="mr-3"
          />
          <div>
            <label for="mode-study" class="font-bold text-lg text-primary cursor-pointer">
              Chế độ học (Study Mode)
            </label>
            <p class="text-sm text-gray-600 mt-1">
              Học tập với đáp án ngay lập tức, không tính thời gian
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Test Selection -->
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
      <div
        v-for="test in testList"
        :key="test.id"
        class="test-card"
        :class="{ selected: selectedTest === test.id }"
        @click="selectedTest = test.id"
      >
        <input
          type="radio"
          :id="test.id"
          :value="test.id"
          v-model="selectedTest"
          class="mr-2"
        />
        <label :for="test.id" class="font-semibold cursor-pointer">
          {{ test.name }}
        </label>
      </div>
    </div>

    <!-- Start Button -->
    <div class="text-center">
      <button @click="startQuiz" class="btn btn-success text-lg px-12 py-4 shadow-lg">
        Bắt đầu làm bài
      </button>
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
  @apply flex items-start p-4 border-2 border-gray-300 rounded-lg cursor-pointer 
         transition-all hover:border-primary hover:bg-blue-50;
}

.mode-card.selected {
  @apply border-primary bg-blue-50;
}

.test-card {
  @apply flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer 
         transition-all hover:border-primary hover:bg-blue-50;
}

.test-card.selected {
  @apply border-primary bg-blue-100;
}
</style>

