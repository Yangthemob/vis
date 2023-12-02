<script setup>
// 引入ImageCard组件
import ImageCard from '@/components/ImageCard.vue'

// 假设数据 - 在实际应用中，你可能会从API或其他数据源获取这些数据
const melSpectrograms = [
  {
    id: 1,
    title: 'Mel-Spectrogram 1',
    description: '描述 1',
    imageUrl: 'path-to-mel-spectrogram-1.jpg'
  },
  {
    id: 2,
    title: 'Mel-Spectrogram 2',
    description: '描述 2',
    imageUrl: 'path-to-mel-spectrogram-2.jpg'
  },
  // 更多 mel-spectrogram 数据
]
</script>

<template>
  <main class="bg-white text-black p-6">
    <h1 class="text-4xl font-bold mb-6">Mel-Spectrogram 展示</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <!-- 循环遍历 melSpectrograms 数据 -->
      <ImageCard
        v-for="mel in melSpectrograms"
        :key="mel.id"
        :title="mel.title"
        :description="mel.description"
        :imageUrl="mel.imageUrl"
      />
    </div>
  </main>
</template>

<style>
/* 自定义样式（如果需要） */
</style>
