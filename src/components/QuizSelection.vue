<template>
  <div class="max-w-6xl mx-auto px-4">
    <div class="card-gradient shadow-hard">
      <h2 class="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent text-center mb-10">
        Chọn bộ đề và chế độ học tập
      </h2>

      <!-- Mode Selection -->
      <div class="mb-10">
        <h3 class="text-lg font-semibold text-gray-700 mb-4 flex items-center">
          <svg class="w-5 h-5 mr-2 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"/>
          </svg>
          Chế độ học tập:
        </h3>
        <div class="grid md:grid-cols-2 gap-5">
          <div
            class="mode-card group"
            :class="{ selected: selectedMode === 'exam' }"
            @click="selectedMode = 'exam'"
          >
            <div class="flex items-start w-full">
              <div class="flex-shrink-0 mt-1">
                <div class="w-5 h-5 rounded-full border-2 transition-all duration-200"
                     :class="selectedMode === 'exam' ? 'border-primary-500 bg-primary-500' : 'border-gray-300 group-hover:border-primary-400'">
                  <svg v-if="selectedMode === 'exam'" class="w-full h-full text-white p-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                  </svg>
                </div>
              </div>
              <div class="ml-4 flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <svg class="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"/>
                  </svg>
                  <label for="mode-exam" class="font-bold text-lg text-gray-800 cursor-pointer">
                    Chế độ thi (Exam Mode)
                  </label>
                </div>
                <p class="text-sm text-gray-600">
                  Làm bài thi với thời gian và tính điểm như kỳ thi thật
                </p>
              </div>
            </div>
          </div>

          <div
            class="mode-card group"
            :class="{ selected: selectedMode === 'study' }"
            @click="selectedMode = 'study'"
          >
            <div class="flex items-start w-full">
              <div class="flex-shrink-0 mt-1">
                <div class="w-5 h-5 rounded-full border-2 transition-all duration-200"
                     :class="selectedMode === 'study' ? 'border-primary-500 bg-primary-500' : 'border-gray-300 group-hover:border-primary-400'">
                  <svg v-if="selectedMode === 'study'" class="w-full h-full text-white p-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                  </svg>
                </div>
              </div>
              <div class="ml-4 flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z"/>
                    <path d="M3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zm14.37 0l-1.69.723v4.102c.355.052.706.114 1.05.174a1 1 0 00.89-.89c.072-1.25.048-2.508-.25-3.762z"/>
                  </svg>
                  <label for="mode-study" class="font-bold text-lg text-gray-800 cursor-pointer">
                    Chế độ học (Study Mode)
                  </label>
                </div>
                <p class="text-sm text-gray-600">
                  Học tập với đáp án ngay lập tức, không giới hạn thời gian
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Test Selection -->
      <div class="mb-10">
        <h3 class="text-lg font-semibold text-gray-700 mb-4 flex items-center">
          <svg class="w-5 h-5 mr-2 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
            <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"/>
          </svg>
          Chọn bộ đề:
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div
            v-for="test in testList"
            :key="test.id"
            class="test-card group"
            :class="{ selected: selectedTest === test.id }"
            @click="selectedTest = test.id"
          >
            <div class="flex items-center justify-center w-full">
              <div class="w-4 h-4 rounded-full border-2 transition-all duration-200 mr-3"
                   :class="selectedTest === test.id ? 'border-primary-500 bg-primary-500' : 'border-gray-300 group-hover:border-primary-400'">
                <svg v-if="selectedTest === test.id" class="w-full h-full text-white p-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
              </div>
              <label :for="test.id" class="font-bold text-gray-800 cursor-pointer text-center flex-1">
                {{ test.name }}
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Start Button -->
      <div class="text-center pt-4">
        <button @click="startQuiz" class="btn btn-primary text-lg px-16 py-4 shadow-hard text-white font-bold">
          <svg class="w-6 h-6 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/>
          </svg>
          Bắt đầu làm bài
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
  @apply p-6 border-2 border-gray-200 rounded-2xl cursor-pointer 
         transition-all duration-300 hover:border-primary-400 hover:shadow-medium hover:-translate-y-0.5
         bg-white;
}

.mode-card.selected {
  @apply border-primary-500 bg-gradient-to-br from-primary-50 to-white shadow-medium;
}

.test-card {
  @apply p-4 border-2 border-gray-200 rounded-xl cursor-pointer 
         transition-all duration-300 hover:border-primary-400 hover:shadow-soft hover:-translate-y-0.5
         bg-white;
}

.test-card.selected {
  @apply border-primary-500 bg-gradient-to-br from-primary-50 to-white shadow-soft;
}
</style>

