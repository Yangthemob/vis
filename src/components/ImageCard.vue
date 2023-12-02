<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  title: String,
  description: String,
  imageUrl: String,
  show: {
    type: Boolean,
    default: true  // 默认为 true
  }
})
</script>

<template>
  <div class="bg-gray-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out p-4">
    <img :src="imageUrl" :alt="title" class="rounded-lg mb-4"/>
    <transition name="fade" mode="out-in">
      <div v-if="show" key="content">
        <h2 class="text-2xl font-bold mb-2">
          {{ title }}
        </h2>
        <p>
          {{ description }}
        </p>
      </div>
    </transition>
  </div>
</template>

<style>
/* 添加过渡效果的样式 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active 在 <2.1.8 版本中 */ {
  opacity: 0;
}
</style>
