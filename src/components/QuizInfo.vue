<template>
  <div class="card">
    <div class="flex flex-wrap justify-between items-center gap-4">
      <!-- Progress Info -->
      <div class="font-semibold">
        Câu hỏi: <span class="text-primary">{{ currentQuestion + 1 }}</span>/{{ totalQuestions }} |
        Đã trả lời: <span class="text-success">{{ answeredQuestions }}</span> câu
      </div>

      <!-- Timer (only in exam mode) -->
      <div v-if="mode === 'exam'" class="font-bold text-primary">
        Thời gian: {{ formattedTime }}
      </div>

      <!-- Mode Indicator (in study mode) -->
      <div v-else class="px-4 py-2 bg-secondary text-white rounded-full font-bold text-sm">
        Chế độ học
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

