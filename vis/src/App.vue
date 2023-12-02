<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="bg-black text-white">
    <nav class="container mx-auto p-4 flex justify-between items-center">
      <div class="flex-1">
        <!-- 左侧：Home链接 -->
        <RouterLink 
          to="/" 
          class="text-xl font-semibold hover:bg-white hover:text-black transition-colors duration-300 rounded-md p-2"
        >
          Home
        </RouterLink>
      </div>

      <div class="flex-1 text-right">
        <!-- 右侧：其他链接 -->
        <RouterLink 
          to="/mel" 
          class="text-xl font-semibold hover:bg-white hover:text-black transition-colors duration-300 mx-2 rounded-md p-2"
        >
          Mel-Spectrogram
        </RouterLink>
        <RouterLink 
          to="/statistics" 
          class="text-xl font-semibold hover:bg-white hover:text-black transition-colors duration-300 mx-2 rounded-md p-2"
        >
          Statistics
        </RouterLink>
      </div>
    </nav>
  </header>

  <RouterView />
</template>
