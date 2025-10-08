<template>
  <div class="card-gradient shadow-medium">
    <div class="flex flex-wrap justify-between items-center gap-4">
      <!-- Progress Info -->
      <div class="flex items-center gap-4 flex-wrap">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"/>
          </svg>
          <div class="font-semibold text-gray-700">
            Câu hỏi: <span class="text-primary-600 font-bold">{{ currentQuestion + 1 }}</span>
            <span class="text-gray-400">/</span>
            <span class="text-gray-600">{{ totalQuestions }}</span>
          </div>
        </div>

        <div class="h-6 w-px bg-gray-300"></div>

        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-success-500" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
          </svg>
          <div class="font-semibold text-gray-700">
            Đã trả lời: <span class="text-success-600 font-bold">{{ answeredQuestions }}</span> câu
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="w-full sm:w-40 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            class="h-full bg-gradient-to-r from-primary-500 to-success-500 transition-all duration-500"
            :style="{ width: `${(answeredQuestions / totalQuestions) * 100}%` }"
          ></div>
        </div>
      </div>

      <!-- Timer (only in exam mode) -->
      <div v-if="mode === 'exam'" class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-orange-50 rounded-xl border border-orange-200">
        <svg class="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"/>
        </svg>
        <span class="font-bold text-orange-700 text-lg tabular-nums">{{ formattedTime }}</span>
      </div>

      <!-- Mode Indicator (in study mode) -->
      <div v-else class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-xl shadow-glow-purple">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z"/>
          <path d="M3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zm14.37 0l-1.69.723v4.102c.355.052.706.114 1.05.174a1 1 0 00.89-.89c.072-1.25.048-2.508-.25-3.762z"/>
        </svg>
        <span class="font-bold text-sm">Chế độ học</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentQuestion: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  answeredQuestions: {
    type: Number,
    required: true
  },
  mode: {
    type: String,
    required: true
  },
  timer: {
    type: Object,
    default: () => ({ minutes: 0, seconds: 0 })
  }
})

const formattedTime = computed(() => {
  const minutes = String(props.timer.minutes).padStart(2, '0')
  const seconds = String(props.timer.seconds).padStart(2, '0')
  return `${minutes}:${seconds}`
})
</script>

