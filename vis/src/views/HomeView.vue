<script setup>
// 引入ImageCard组件
import ImageCard from '@/components/ImageCard.vue'
</script>

<template>
  <main class="bg-white text-black">

    <!-- 第一部分：项目介绍 -->
    <section class="container mx-auto p-6 flex flex-wrap items-center mt-10">
      <div class="flex-1">
        <h1 class="text-4xl font-bold mb-2">
          Trigger Sound/ASMR  Visualization
        </h1>
        <p class="text-lg mb-4">
          触发音(Trigger Sound)与自发性知觉经络反应(Autonomous Sensory Meridian Response)类音声的可视化
        </p>
      </div>
      <div class="flex-1">
        <!-- 在这里插入图片，可以是本地或远程图片 -->
        <img src="path-to-your-image.jpg" alt="项目图片" class="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"/>
      </div>
    </section>

    <!-- 第二部分：图片卡片展示 -->
    <section class="container mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <!-- 这里可以通过循环来展示多个卡片，以下是一个示例卡片 -->
      <ImageCard
        title="卡片标题"
        description="这里是关于这个卡片的详细介绍。"
        imageUrl="path-to-your-image.jpg"
      />
    </section>
  </main>
</template>