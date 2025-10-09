<template>
  <div id="app" class="min-h-screen relative overflow-x-hidden">
    <!-- Tech Grid Background -->
    <div class="fixed inset-0 -z-10 bg-navy-50">
      <!-- Subtle grid pattern -->
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40"></div>
      <!-- Gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-navy-50/50 to-navy-100/30"></div>
    </div>
    
    <!-- Main Content -->
    <div class="relative z-0">
      <RouterView v-slot="{ Component }">
        <transition 
          name="fade" 
          mode="out-in"
          enter-active-class="animate-fade-in"
          leave-active-class="animate-fade-out"
        >
          <component :is="Component" />
        </transition>
      </RouterView>
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style>
/* Remove any default Vue styles */
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.animate-fade-out {
  animation: fadeOut 0.3s ease-out;
}

@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}
</style>
