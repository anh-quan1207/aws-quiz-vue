<template>
  <div class="card flex justify-between items-center">
    <button
      @click="$emit('prev')"
      :disabled="!canGoPrev"
      class="btn btn-secondary"
      :class="{ 'opacity-50 cursor-not-allowed': !canGoPrev }"
    >
      ← Câu trước
    </button>

    <button
      @click="$emit('next')"
      :disabled="!canGoNext"
      class="btn btn-secondary"
      :class="{ 'opacity-50 cursor-not-allowed': !canGoNext }"
    >
      Câu sau →
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

