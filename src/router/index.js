import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import QuizView from '../views/QuizView.vue'
import { useQuizStore } from '@/stores/quiz'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: QuizView,
      beforeEnter: (to, from, next) => {
        const quizStore = useQuizStore()
        // Allow access if quiz has started
        if (quizStore.quizStarted) {
          next()
        } else {
          // Redirect to home if no quiz in progress
          next('/')
        }
      }
    }
  ]
})

// Global navigation guard
router.beforeEach((to, from, next) => {
  const quizStore = useQuizStore()
  
  // Warn when leaving quiz page if quiz is in progress
  if (from.name === 'quiz' && to.name !== 'quiz') {
    if (quizStore.quizStarted && !quizStore.quizCompleted) {
      const modeText = quizStore.mode === 'exam' ? 'thi' : 'học'
      const confirmed = confirm(
        `Bạn đang làm bài ${modeText} dở. Bạn có chắc chắn muốn thoát ra không?\n\n` +
        'Tiến trình của bạn sẽ bị mất.'
      )
      if (confirmed) {
        // Clear saved state when confirmed to leave
        quizStore.resetQuiz()
        next()
      } else {
        // Stay on quiz page
        next(false)
      }
      return
    }
  }
  
  next()
})

export default router
