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
      const confirmed = confirm(
        'Bạn đang làm bài thi. Bạn có chắc chắn muốn rời khỏi trang này?\n\n' +
        'Tiến trình của bạn đã được lưu tự động.'
      )
      if (confirmed) {
        next()
      } else {
        next(false)
      }
      return
    }
  }
  
  next()
})

export default router
