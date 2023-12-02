<script setup>
// 引入Vue的defineProps方法
import { defineProps } from 'vue'

const props = defineProps({
  title: String,
  description: String,
  imageUrl: String
})
</script>

<template>
  <div class="bg-gray-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out p-4">
    <img :src="imageUrl" :alt="title" class="rounded-lg mb-4"/>
    <h2 class="text-2xl font-bold mb-2">
      {{ title }}
    </h2>
    <p>
      {{ description }}
    </p>
  </div>
</template>