<template>
  <div class="card">
    <!-- Question Number -->
    <div class="text-lg font-bold text-primary mb-3">
      Câu hỏi {{ questionIndex + 1 }}:
    </div>

    <!-- Question Text -->
    <div
      class="text-base mb-6 question-content"
      v-html="question.prompt.question"
      ref="questionEl"
    ></div>

    <!-- Answers List -->
    <ul class="space-y-3">
      <li
        v-for="(answer, index) in question.prompt.answers"
        :key="index"
        class="answer-item"
        :class="getAnswerClass(index)"
        @click="selectAnswer(index)"
      >
        <label class="flex items-start cursor-pointer w-full">
          <input
            :type="isMultiSelect ? 'checkbox' : 'radio'"
            :name="`question-${questionIndex}`"
            :value="index"
            v-model="selectedAnswer"
            class="mt-1 mr-3 flex-shrink-0"
            @click.stop="selectAnswer(index)"
          />
          <span class="flex-1 answer-content" v-html="answer" :ref="el => answerRefs[index] = el"></span>
        </label>
      </li>
    </ul>

    <!-- Explanation (only in study mode when revealed) -->
    <div
      v-if="mode === 'study' && answerRevealed"
      class="mt-6 p-4 bg-gray-50 rounded-lg border-l-4 border-primary"
    >
      <h3 class="font-bold text-primary mb-2">Giải thích:</h3>
      <div class="explanation-content" v-html="question.prompt.explanation" ref="explanationEl"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUpdated, nextTick } from 'vue'
import { useQuizStore } from '@/stores/quiz'

const props = defineProps({
  question: {
    type: Object,
    required: true
  },
  questionIndex: {
    type: Number,
    required: true
  },
  userAnswer: {
    default: null
  },
  answerRevealed: {
    type: Boolean,
    default: false
  }
})

const quizStore = useQuizStore()
const mode = computed(() => quizStore.mode)

// Refs for DOM elements
const questionEl = ref(null)
const explanationEl = ref(null)
const answerRefs = ref([])

// Local state
const selectedAnswer = ref(props.userAnswer)

// Computed
const isMultiSelect = computed(() => {
  return props.question.assessment_type === 'multi-select'
})

const correctIndices = computed(() => {
  return props.question.correct_response.map(response => {
    return 'abcdefghijklmnopqrstuvwxyz'.indexOf(response)
  })
})

// Watch for changes in userAnswer prop
watch(() => props.userAnswer, (newVal) => {
  selectedAnswer.value = newVal
})

// Watch for changes in selectedAnswer
watch(selectedAnswer, (newVal) => {
  if (isMultiSelect.value) {
    // For multi-select, ensure we have an array
    const answerArray = Array.isArray(newVal) ? newVal : []
    quizStore.setAnswer(props.questionIndex, answerArray.length > 0 ? answerArray : null)
  } else {
    quizStore.setAnswer(props.questionIndex, newVal)
  }
}, { deep: true })

// Methods
function selectAnswer(index) {
  if (isMultiSelect.value) {
    if (!Array.isArray(selectedAnswer.value)) {
      selectedAnswer.value = []
    }
    
    const currentIndex = selectedAnswer.value.indexOf(index)
    if (currentIndex > -1) {
      selectedAnswer.value.splice(currentIndex, 1)
    } else {
      selectedAnswer.value.push(index)
    }
  } else {
    selectedAnswer.value = index
  }
}

function getAnswerClass(index) {
  const classes = []
  
  // Check if selected
  if (isMultiSelect.value) {
    if (Array.isArray(selectedAnswer.value) && selectedAnswer.value.includes(index)) {
      classes.push('selected')
    }
  } else {
    if (selectedAnswer.value === index) {
      classes.push('selected')
    }
  }

  // Add correct/incorrect classes in study mode when answer is revealed
  if (props.answerRevealed) {
    if (correctIndices.value.includes(index)) {
      classes.push('correct')
    } else if (isMultiSelect.value) {
      if (Array.isArray(selectedAnswer.value) && selectedAnswer.value.includes(index)) {
        classes.push('incorrect')
      }
    } else {
      if (selectedAnswer.value === index) {
        classes.push('incorrect')
      }
    }
  }

  return classes
}

// Make links open in new tab
function makeLinksExternal(element) {
  if (!element) return
  
  const links = element.querySelectorAll('a')
  links.forEach(link => {
    link.setAttribute('target', '_blank')
    link.setAttribute('rel', 'noopener noreferrer')
  })
}

// Initialize - make all links external
onMounted(() => {
  nextTick(() => {
    makeLinksExternal(questionEl.value)
    makeLinksExternal(explanationEl.value)
    answerRefs.value.forEach(el => makeLinksExternal(el))
  })
})

// Update when content changes
onUpdated(() => {
  nextTick(() => {
    makeLinksExternal(questionEl.value)
    makeLinksExternal(explanationEl.value)
    answerRefs.value.forEach(el => makeLinksExternal(el))
  })
})
</script>

<style scoped>
.answer-item {
  @apply p-4 border-2 border-gray-300 rounded-lg cursor-pointer 
         transition-all hover:border-primary hover:bg-blue-50;
}

.answer-item.selected {
  @apply border-primary bg-blue-100;
}

.answer-item.correct {
  @apply border-success bg-green-50;
}

.answer-item.incorrect {
  @apply border-danger bg-red-50;
}

:deep(.question-content img),
:deep(.answer-content img),
:deep(.explanation-content img) {
  @apply max-w-full h-auto my-4 rounded shadow;
}

:deep(.question-content a),
:deep(.answer-content a),
:deep(.explanation-content a) {
  @apply text-blue-600 underline hover:text-blue-800;
}

:deep(.question-content pre),
:deep(.explanation-content pre) {
  @apply bg-gray-800 text-white p-4 rounded overflow-x-auto my-4;
}

:deep(.question-content code),
:deep(.explanation-content code) {
  @apply bg-gray-100 px-2 py-1 rounded text-sm;
}
</style>

