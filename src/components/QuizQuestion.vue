<template>
  <div class="card-gradient shadow-medium animate-scale-in">
    <!-- Question Header -->
    <div class="flex items-start gap-3 mb-4 pb-4 border-b border-gray-200">
      <div class="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center text-white font-bold shadow-soft">
        {{ questionIndex + 1 }}
      </div>
      <div class="flex-1">
        <div class="text-sm text-gray-500 font-medium mb-1">Câu hỏi {{ questionIndex + 1 }}</div>
        <div class="flex items-center gap-2">
          <span class="badge" :class="isMultiSelect ? 'bg-secondary-100 text-secondary-700 border border-secondary-200' : 'bg-primary-100 text-primary-700 border border-primary-200'">
            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path v-if="isMultiSelect" fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2h-1.528A6 6 0 004 9.528V4zm2 6a4 4 0 00.5 7.969L6 18a2 2 0 002 2h6a2 2 0 002-2v-1.528A4.002 4.002 0 0013 6a4 4 0 00-7 4z"/>
              <path v-else d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/>
            </svg>
            {{ isMultiSelect ? 'Chọn nhiều đáp án' : 'Chọn một đáp án' }}
          </span>
        </div>
      </div>
    </div>

    <!-- Question Text -->
    <div
      class="text-base mb-6 question-content text-gray-800 leading-relaxed"
      v-html="question.prompt.question"
      ref="questionEl"
    ></div>

    <!-- Answers List -->
    <ul class="space-y-3">
      <li
        v-for="(answer, index) in question.prompt.answers"
        :key="index"
        class="answer-item group"
        :class="getAnswerClass(index)"
      >
        <label class="flex items-start cursor-pointer w-full p-4" @click.prevent="handleAnswerClick(index)">
          <div class="flex-shrink-0 mt-0.5">
            <div v-if="isMultiSelect" class="w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center"
                 :class="isAnswerSelected(index) ? 'bg-primary-500 border-primary-500' : 'border-gray-300 group-hover:border-primary-400'">
              <svg v-if="isAnswerSelected(index)" class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
              </svg>
            </div>
            <div v-else class="w-5 h-5 rounded-full border-2 transition-all duration-200 flex items-center justify-center"
                 :class="isAnswerSelected(index) ? 'border-primary-500' : 'border-gray-300 group-hover:border-primary-400'">
              <div v-if="isAnswerSelected(index)" class="w-3 h-3 rounded-full bg-primary-500"></div>
            </div>
          </div>
          <span class="flex-1 ml-4 answer-content text-gray-700" v-html="answer" :ref="el => answerRefs[index] = el"></span>
        </label>
      </li>
    </ul>

    <!-- Explanation (only in study mode when revealed) -->
    <div
      v-if="mode === 'study' && answerRevealed"
      class="mt-6 p-5 bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl border-l-4 border-primary-500 animate-slide-down"
    >
      <div class="flex items-center gap-2 mb-3">
        <svg class="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"/>
        </svg>
        <h3 class="font-bold text-primary-700 text-lg">Giải thích chi tiết:</h3>
      </div>
      <div class="explanation-content text-gray-700 leading-relaxed" v-html="question.prompt.explanation" ref="explanationEl"></div>
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

// Computed
const isMultiSelect = computed(() => {
  return props.question.assessment_type === 'multi-select'
})

const correctIndices = computed(() => {
  return props.question.correct_response.map(response => {
    return 'abcdefghijklmnopqrstuvwxyz'.indexOf(response)
  })
})

// Local state - initialize correctly for multi-select
const selectedAnswer = ref(
  isMultiSelect.value 
    ? (Array.isArray(props.userAnswer) ? props.userAnswer : [])
    : props.userAnswer
)

// Watch for changes in userAnswer prop
watch(() => props.userAnswer, (newVal) => {
  if (isMultiSelect.value) {
    selectedAnswer.value = Array.isArray(newVal) ? newVal : []
  } else {
    selectedAnswer.value = newVal
  }
})

// Watch for question changes to reset properly
watch(() => props.questionIndex, () => {
  if (isMultiSelect.value) {
    selectedAnswer.value = Array.isArray(props.userAnswer) ? props.userAnswer : []
  } else {
    selectedAnswer.value = props.userAnswer
  }
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
function handleAnswerClick(index) {
  if (isMultiSelect.value) {
    // Ensure we have an array
    if (!Array.isArray(selectedAnswer.value)) {
      selectedAnswer.value = []
    }
    
    const currentIndex = selectedAnswer.value.indexOf(index)
    if (currentIndex > -1) {
      // Remove if already selected
      selectedAnswer.value = selectedAnswer.value.filter(i => i !== index)
    } else {
      // Add if not selected
      selectedAnswer.value = [...selectedAnswer.value, index]
    }
  } else {
    selectedAnswer.value = index
  }
}

function isAnswerSelected(index) {
  if (isMultiSelect.value) {
    return Array.isArray(selectedAnswer.value) && selectedAnswer.value.includes(index)
  }
  return selectedAnswer.value === index
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
  @apply border-2 border-gray-200 rounded-xl cursor-pointer 
         transition-all duration-300 hover:border-primary-400 hover:bg-primary-50 
         hover:-translate-y-0.5 hover:shadow-soft bg-white;
}

.answer-item.selected {
  @apply border-primary-500 bg-gradient-to-br from-primary-50 to-white shadow-soft;
}

.answer-item.correct {
  @apply border-success-500 bg-gradient-to-br from-success-50 to-white shadow-soft;
}

.answer-item.incorrect {
  @apply border-danger-500 bg-gradient-to-br from-danger-50 to-white shadow-soft;
}

:deep(.question-content img),
:deep(.answer-content img),
:deep(.explanation-content img) {
  @apply max-w-full h-auto my-4 rounded-xl shadow-soft;
}

:deep(.question-content a),
:deep(.answer-content a),
:deep(.explanation-content a) {
  @apply text-primary-600 underline hover:text-primary-700 font-medium;
}

:deep(.question-content pre),
:deep(.explanation-content pre) {
  @apply bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto my-4 shadow-medium;
}

:deep(.question-content code),
:deep(.explanation-content code) {
  @apply bg-gray-100 px-2 py-1 rounded-lg text-sm font-mono text-gray-800;
}

:deep(.question-content pre code),
:deep(.explanation-content pre code) {
  @apply bg-transparent text-gray-100 p-0;
}
</style>

