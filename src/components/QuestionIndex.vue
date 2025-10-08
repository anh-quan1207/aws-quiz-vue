<template>
  <div class="card-gradient sticky top-4 h-fit shadow-medium">
    <div class="flex items-center justify-center gap-2 pb-3 mb-4 border-b border-gray-200">
      <svg class="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
      </svg>
      <div class="font-bold text-gray-700 text-center">
        Danh sách câu hỏi
      </div>
    </div>

    <div class="grid grid-cols-5 gap-2">
      <div
        v-for="(_, index) in totalQuestions"
        :key="index"
        class="index-item group"
        :class="getItemClass(index)"
        @click="$emit('go-to', index)"
      >
        <span class="relative z-10">{{ index + 1 }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  totalQuestions: {
    type: Number,
    required: true
  },
  currentQuestion: {
    type: Number,
    required: true
  },
  answers: {
    type: Array,
    required: true
  }
})

defineEmits(['go-to'])

function getItemClass(index) {
  const classes = []
  
  if (index === props.currentQuestion) {
    classes.push('active')
  }
  
  if (props.answers[index] !== null && props.answers[index] !== undefined) {
    classes.push('answered')
  }
  
  return classes
}
</script>

<style scoped>
.index-item {
  @apply aspect-square flex items-center justify-center bg-gray-100
         rounded-xl cursor-pointer font-bold text-sm transition-all duration-300
         hover:bg-gray-200 hover:scale-110 hover:shadow-soft
         border-2 border-transparent;
}

.index-item.active {
  @apply bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-glow
         border-primary-400 scale-110;
}

.index-item.answered {
  @apply bg-gradient-to-br from-success-100 to-success-50 text-success-700 
         border-success-400;
}

.index-item.answered.active {
  @apply bg-gradient-to-br from-primary-500 to-primary-600 text-white 
         border-success-400 shadow-glow scale-110;
}
</style>

