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
        <img src="/home_images/ASMR.png" alt="项目图片" class="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"/>
      </div>
    </section>

    <!-- 第二部分：图片卡片展示 -->
    <section class="container mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <!-- 这里可以通过循环来展示多个卡片，以下是一个示例卡片 -->
      <ImageCard
        title="梅尔频谱图（Mel-Spectogram）"
        description="利用librosa等声学处理库，对音频进行可视化，直观展示听觉在视觉上的特征。"
        imageUrl="./home_images/是Sumimi呀1_segment_15_mel_spectrogram.png"
      />
      <ImageCard
        title="词云（WordCloud）"
        description="对视频平台的ASMR与触发音内容爬取、分词，得到词频，并利用词云可视化展示。可以直观看出ASMR观众最喜欢哪些内容。"
        imageUrl="./home_images/wordcloud.PNG"
      />
      <ImageCard
        title="观众指数"
        description="基于对一部分ASMR直播间/视频持续监控，得到观众数据，并利用折线图可视化展示。"
        imageUrl="./home_images/viewer.png"
      />
    </section>
  </main>
</template>