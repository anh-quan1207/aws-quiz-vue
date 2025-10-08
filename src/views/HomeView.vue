<template>
  <div class="min-h-screen py-12 px-4">
    <!-- Header with AWS Logo Style -->
    <header class="max-w-6xl mx-auto mb-12 animate-slide-down">
      <div class="text-center mb-8">
        <!-- AWS Cloud Icon -->
        <div class="inline-flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl shadow-hard transform hover:rotate-6 transition-transform duration-300">
          <svg class="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 2.18l8 3.6v8.55c0 4.35-3.06 8.44-7.5 9.67-4.44-1.23-7.5-5.32-7.5-9.67V7.78l7-3.6z"/>
            <path d="M7 10.5l3 3 6-6"/>
          </svg>
        </div>
        
        <!-- Title with Gradient -->
        <h1 class="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-primary-600 via-secondary-500 to-pink-500 bg-clip-text text-transparent">
          AWS Cloud Practitioner
        </h1>
        <p class="text-xl md:text-2xl text-gray-600 font-medium">
          Luyện thi chứng chỉ AWS với hàng trăm câu hỏi thực tế
        </p>
      </div>

      <!-- Feature Badges -->
      <div class="flex flex-wrap justify-center gap-3 mt-8">
        <span class="badge bg-primary-100 text-primary-700 border border-primary-200">
          <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
            <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"/>
          </svg>
          6 bộ đề thi
        </span>
        <span class="badge bg-success-100 text-success-700 border border-success-200">
          <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"/>
          </svg>
          Auto-save
        </span>
        <span class="badge bg-secondary-100 text-secondary-700 border border-secondary-200">
          <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
          </svg>
          2 chế độ học
        </span>
      </div>
    </header>

    <!-- Quiz Selection Component -->
    <div class="animate-slide-up">
      <QuizSelection />
    </div>
  </div>
</template>

<script setup>
import QuizSelection from '@/components/QuizSelection.vue'
</script>
