<template>
  <div class="grid lg:grid-cols-[1fr_200px] gap-6">
    <!-- Main Content -->
    <div class="space-y-6">
      <h1 class="text-3xl font-bold text-primary text-center mb-6">
        Kết quả chi tiết
      </h1>

      <!-- Questions List -->
      <div
        v-for="(question, index) in quizData.questions"
        :key="index"
        :id="`question-${index}`"
        class="card scroll-mt-4"
        :class="{ 'ring-2 ring-primary animate-pulse': highlightedQuestion === index }"
      >
        <!-- Question Number -->
        <div class="text-lg font-bold text-primary mb-3">
          Câu hỏi {{ index + 1 }}:
        </div>

        <!-- Question Text -->
        <div class="mb-4" v-html="question.prompt.question"></div>

        <!-- Question Type -->
        <div class="text-sm italic text-gray-600 mb-3">
          {{ question.assessment_type === 'multi-select' ? 'Chọn nhiều đáp án đúng' : 'Chọn một đáp án đúng' }}
        </div>

        <!-- Answers -->
        <ul class="space-y-2 mb-4">
          <li
            v-for="(answer, answerIndex) in question.prompt.answers"
            :key="answerIndex"
            class="p-3 rounded border-2"
            :class="getAnswerClass(question, index, answerIndex)"
          >
            <div v-html="answer"></div>
          </li>
        </ul>

        <!-- Unanswered Notice -->
        <div v-if="answers[index] === null" class="p-3 bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 mb-4">
          Bạn chưa trả lời câu hỏi này
        </div>

        <!-- Explanation -->
        <div class="p-4 bg-gray-50 rounded-lg border-l-4 border-primary">
          <h3 class="font-bold text-primary mb-2">Giải thích:</h3>
          <div v-html="question.prompt.explanation"></div>
        </div>
      </div>
    </div>

    <!-- Sidebar Overview -->
    <div class="lg:sticky lg:top-4 lg:h-fit">
      <div class="card">
        <div class="font-bold text-primary text-center pb-3 mb-3 border-b border-gray-200">
          Câu hỏi:
        </div>

        <div class="grid grid-cols-5 gap-2 mb-4">
          <div
            v-for="(question, index) in quizData.questions"
            :key="index"
            class="overview-item"
            :class="getOverviewClass(index)"
            @click="scrollToQuestion(index)"
          >
            {{ index + 1 }}
          </div>
        </div>

        <button @click="$emit('back')" class="btn btn-primary w-full">
          Quay lại
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

const props = defineProps({
  quizData: {
    type: Object,
    required: true
  },
  answers: {
    type: Array,
    required: true
  }
})

defineEmits(['back'])

const highlightedQuestion = ref(null)

function getCorrectIndices(question) {
  return question.correct_response.map(response => {
    return 'abcdefghijklmnopqrstuvwxyz'.indexOf(response)
  })
}

function getAnswerClass(question, questionIndex, answerIndex) {
  const correctIndices = getCorrectIndices(question)
  const userAnswer = props.answers[questionIndex]
  const isMultiSelect = question.assessment_type === 'multi-select'

  if (userAnswer === null) {
    // Show correct answers for unanswered questions
    if (correctIndices.includes(answerIndex)) {
      return 'border-success bg-green-50'
    }
    return 'border-gray-300'
  }

  if (isMultiSelect) {
    const isUserSelection = Array.isArray(userAnswer) && userAnswer.includes(answerIndex)
    const isCorrect = correctIndices.includes(answerIndex)

    if (isUserSelection && isCorrect) {
      return 'border-success bg-green-50'
    } else if (isUserSelection && !isCorrect) {
      return 'border-danger bg-red-50'
    } else if (!isUserSelection && isCorrect) {
      return 'border-success bg-green-50'
    }
  } else {
    const isUserSelection = userAnswer === answerIndex
    const isCorrect = correctIndices.includes(answerIndex)

    if (isUserSelection && isCorrect) {
      return 'border-success bg-green-50'
    } else if (isUserSelection && !isCorrect) {
      return 'border-danger bg-red-50'
    } else if (!isUserSelection && isCorrect) {
      return 'border-success bg-green-50'
    }
  }

  return 'border-gray-300'
}

function getOverviewClass(index) {
  const question = props.quizData.questions[index]
  const userAnswer = props.answers[index]

  if (userAnswer === null) {
    return 'unanswered'
  }

  const isMultiSelect = question.assessment_type === 'multi-select'
  const correctIndices = getCorrectIndices(question)

  let isCorrect = false

  if (isMultiSelect) {
    const sortedUser = Array.isArray(userAnswer) ? [...userAnswer].sort() : []
    const sortedCorrect = [...correctIndices].sort()
    isCorrect = JSON.stringify(sortedUser) === JSON.stringify(sortedCorrect)
  } else {
    isCorrect = userAnswer === correctIndices[0]
  }

  return isCorrect ? 'correct' : 'incorrect'
}

function scrollToQuestion(index) {
  const element = document.getElementById(`question-${index}`)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    
    // Highlight effect
    highlightedQuestion.value = index
    setTimeout(() => {
      highlightedQuestion.value = null
    }, 1500)
  }
}

// Make links external on mount
onMounted(() => {
  nextTick(() => {
    const links = document.querySelectorAll('.card a')
    links.forEach(link => {
      link.setAttribute('target', '_blank')
      link.setAttribute('rel', 'noopener noreferrer')
    })
  })
})
</script>

<style scoped>
.overview-item {
  @apply aspect-square flex items-center justify-center rounded font-bold text-xs cursor-pointer transition-all hover:scale-110;
}

.overview-item.correct {
  @apply bg-green-100 border border-success text-success;
}

.overview-item.incorrect {
  @apply bg-red-100 border border-danger text-danger;
}

.overview-item.unanswered {
  @apply bg-yellow-100 border border-yellow-500 text-yellow-700;
}

:deep(img) {
  @apply max-w-full h-auto my-4 rounded shadow;
}

:deep(a) {
  @apply text-blue-600 underline hover:text-blue-800;
}

:deep(pre) {
  @apply bg-gray-800 text-white p-4 rounded overflow-x-auto my-4;
}

:deep(code) {
  @apply bg-gray-100 px-2 py-1 rounded text-sm;
}
</style>

