<template>
  <div class="card sticky top-4 h-fit">
    <div class="font-bold text-primary text-center pb-3 mb-3 border-b border-gray-200">
      Câu hỏi:
    </div>

    <div class="grid grid-cols-5 gap-2">
      <div
        v-for="(_, index) in totalQuestions"
        :key="index"
        class="index-item"
        :class="getItemClass(index)"
        @click="$emit('go-to', index)"
      >
        {{ index + 1 }}
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
  @apply aspect-square flex items-center justify-center bg-gray-200 
         rounded cursor-pointer font-bold text-sm transition-all hover:bg-gray-300;
}

.index-item.active {
  @apply bg-primary text-white;
}

.index-item.answered {
  @apply bg-blue-100 text-primary border-2 border-success;
}

.index-item.answered.active {
  @apply bg-primary text-white border-2 border-success;
}
</style>

