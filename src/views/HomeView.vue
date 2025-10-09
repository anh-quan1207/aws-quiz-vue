<template>
  <div class="min-h-screen py-12 px-4">
    <!-- Header - Tech Style -->
    <header class="max-w-6xl mx-auto mb-12 animate-slide-down">
      <div class="text-center mb-10">
        <!-- AWS Icon - Clean -->
        <div class="inline-flex items-center justify-center w-16 h-16 mb-6 bg-navy-800 rounded-lg shadow-tech border border-navy-700">
          <svg class="w-10 h-10 text-primary-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>
          </svg>
        </div>
        
        <!-- Title - Clean Tech -->
        <h1 class="text-4xl md:text-5xl font-bold mb-3 text-navy-900">
          AWS Cloud Practitioner
        </h1>
        <div class="inline-block px-4 py-1 bg-primary-100 text-primary-700 rounded text-sm font-semibold mb-4">
          CERTIFICATION QUIZ
        </div>
        <p class="text-lg text-navy-600 max-w-2xl mx-auto">
          Luyện thi chứng chỉ AWS với hàng trăm câu hỏi thực tế
        </p>
      </div>

      <!-- Stats Bar - Tech Style -->
      <div class="flex flex-wrap justify-center gap-6 mt-8">
        <div class="flex items-center gap-2 text-navy-700">
          <div class="w-2 h-2 bg-primary-500 rounded-full"></div>
          <span class="text-sm font-semibold">6 Practice Tests</span>
        </div>
        <div class="flex items-center gap-2 text-navy-700">
          <div class="w-2 h-2 bg-secondary-500 rounded-full"></div>
          <span class="text-sm font-semibold">Auto-Save Progress</span>
        </div>
        <div class="flex items-center gap-2 text-navy-700">
          <div class="w-2 h-2 bg-success-500 rounded-full"></div>
          <span class="text-sm font-semibold">2 Study Modes</span>
        </div>
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
