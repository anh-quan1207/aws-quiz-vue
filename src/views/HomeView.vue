<template>
  <div class="min-h-screen py-8">
    <header class="card bg-primary text-white text-center mb-8 max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold">AWS Certified Cloud Practitioner</h1>
      <p class="mt-2 text-lg opacity-90">Ứng dụng luyện thi chứng chỉ AWS</p>
    </header>

    <QuizSelection />
  </div>
</template>

<script setup>
import QuizSelection from '@/components/QuizSelection.vue'
</script>
