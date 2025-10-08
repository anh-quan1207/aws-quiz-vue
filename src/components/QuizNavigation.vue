<template>
  <div class="card flex justify-between items-center gap-4">
    <button
      @click="$emit('prev')"
      :disabled="!canGoPrev"
      class="btn btn-secondary flex items-center gap-2"
      :class="{ 'opacity-50 cursor-not-allowed': !canGoPrev }"
    >
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"/>
      </svg>
      <span class="hidden sm:inline">Câu trước</span>
    </button>

    <button
      @click="$emit('next')"
      :disabled="!canGoNext"
      class="btn btn-secondary flex items-center gap-2"
      :class="{ 'opacity-50 cursor-not-allowed': !canGoNext }"
    >
      <span class="hidden sm:inline">Câu sau</span>
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"/>
      </svg>
    </button>
  </div>
</template>

<script setup>
defineProps({
  canGoPrev: {
    type: Boolean,
    default: true
  },
  canGoNext: {
    type: Boolean,
    default: true
  }
})

defineEmits(['prev', 'next'])
</script>

