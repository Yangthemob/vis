<script setup>
// 引入ImageCard组件
import ImageCard from '@/components/ImageCard.vue'
import { ref } from 'vue';

// 假设数据 - 在实际应用中，你可能会从API或其他数据源获取这些数据
const melSpectrograms = [
  {
    id: 1,
    title: '吹气声',
    description: 'fuuuuu的吹气声音，可以看出整体是平滑连续的，但随着人的气剩余量会有渐减、不稳定的趋势',
    imageUrl: './mel_images/吹气/露珀塔2_segment_6_mel_spectrogram.png'
  },
  {
    id: 2,
    title: '心跳声',
    description: '可以看出是十分规律的心跳，每次跳动会有快速到达顶峰的声音',
    imageUrl: './mel_images/心音/狸酱2_segment_1030_mel_spectrogram.png'
  },
  {
    id: 3,
    title: '梵天（鹅毛棒）',
    description: '刺啦刺啦~的密集的鹅毛棒刮擦耳壁的声音，由于鹅毛丝其实是一簇一簇并不是完全整体，加上人手动转动的不稳定，所以呈现这样的规律',
    imageUrl: './mel_images/梵天/chloe1_左梵天4_mel_spectrogram.png'
  },
  {
    id: 4,
    title: '水瓶摇晃',
    description: '有空气空腔的水瓶在翻转时的声音，气泡会在翻转后快速上浮，发出渐快的 嘟嘟嘟 的声音',
    imageUrl: './mel_images/水声/是Sumimi呀1_segment_15_mel_spectrogram.png'
  },
  {
    id: 5,
    title: '泡沫洗头',
    description: '在理发店有人给自己沾着泡沫按摩头皮的声音，规律的波动是手指抓头的节奏',
    imageUrl: './mel_images/泡沫洗头/狸酱1_segment_241_mel_spectrogram.png'
  },{
    id: 6,
    title: '精油揉耳',
    description: '手上带着精油，慢慢按摩揉搓耳廓的声音，由于一个行为单元相对长，而且耳朵的形状是非对称非循环的，所以频谱图也很有特色',
    imageUrl: './mel_images/精油按摩/第二颗纽扣给樱酱3_segment_239_mel_spectrogram.png'
  },
  {
    id: 7,
    title: '直升机（快速掏耳）',
    description: '正如名字，声音会像直升机螺旋桨一样急促密集且高低清晰',
    imageUrl: './mel_images/直升机/小英1_segment_38_mel_spectrogram.png'
  },
  {
    id: 8,
    title: '轻语',
    description: '人说话的声音，所以并不是非常规律，声音很轻，会尽量减少喉咙发音而多使用口腔发音',
    imageUrl: './mel_images/轻语/梵拉1_segment_234_mel_spectrogram.png'
  },
  
  // 更多 mel-spectrogram 数据
]
// 默认隐藏详情
const showDetails = ref(false);

// 切换显示详情
const toggleDetails = () => {
  showDetails.value = !showDetails.value;
};
</script>

<template>
  <main class="bg-white text-black p-6 container mx-auto mt-10">
    <h1 class="text-4xl font-bold mb-6">Mel-Spectrogram 展示</h1>

    <!-- 显示所有 Mel-Spectrogram 的标题 -->
    <div class="mb-4">
      <h2 class="text-2xl font-semibold">所有频谱图：</h2>
      <ul class="flex justify-between py-4">
        <p v-for="mel in melSpectrograms" :key="mel.id" class="list-disc px-4 py-2 rounded-md bg-gray-100">
          {{ mel.title }}
        </p>
      </ul>
    </div>

    <!-- 切换详细信息的按钮 -->
    <button 
      class="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      @click="toggleDetails"
    >
      {{ showDetails ? '隐藏详情' : '揭晓答案' }}
    </button>

    <!-- 循环遍历 melSpectrograms 数据 -->
    <div class="grid grid-cols-1 sm:grid-cols-2  gap-4">
      <ImageCard
        v-for="mel in melSpectrograms"
        :key="mel.id"
        :title="mel.title"
        :description="mel.description"
        :imageUrl="mel.imageUrl"
        :show="showDetails"
      />
    </div>
  </main>
</template>

<style>
/* 自定义样式（如果需要） */
</style>
