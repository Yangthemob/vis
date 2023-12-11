<template>
  <div class="container mx-auto p-4">
    <h1 class="text-4xl font-bold mb-4 mt-10">可视化展示</h1>

    <!-- 第一个图表：词云 -->
    <section class="mb-8">
      <div class="flex justify-between items-center">
        <h2 class="text-2xl font-semibold mb-2">词云展示</h2>
        <button class="py-2 px-4 bg-blue-500 text-white border border-blue-500 rounded"
          @click="toggleWordCloudInfo">展示解读</button>
      </div>
      <p class="mb-4">在抖音平台使用关键词ASMR进行爬虫...</p>
      <div class="chart-container">
        <v-chart v-if="wordCloudData.length" :option="chartOption" />
      </div>
      <div v-if="showWordCloudInfo" class="mt-4 p-4 rounded bg-gray-100">
        <p>利用chatgpt对名词分类得到结果</p>
        <p>睡眠和放松:
          助眠
          解压
          沉浸
          舒适
          极度
          哄睡
          放松
          按摩
          治愈
          催眠
          入睡
          减压
          失眠
          睡眠
          快速
          睡觉
          舒服
          好听
          舒缓</p>
          <p>音频和听觉体验:

视频
声控
耳机
咀嚼
助手
触发
模拟
声音
体验
敲击
掏耳朵
听觉
音助眠
采耳</p>
<p>食物和美食:
美食
零食
小姐姐
口腔
吃货
蜂蜜</p>
<p>娱乐和活动:
推荐
宝宝
场景
带上
引导
今天
进行
轻松
戴上
效果
剧情
总裁
夫人
外国
系列
直播</p>
<p>
  时间和数量:
极度
一个
分钟
超级
一定
大家
</p>
      </div>
    </section>

    <!-- 第二个图表：折线图 -->
    <section>
      <div class="flex justify-between items-center">
        <h2 class="text-2xl font-semibold mb-2">观看人数变化</h2>
        <button class="py-2 px-4 bg-blue-500 text-white border border-blue-500 rounded"
          @click="toggleLineChartInfo">展示解读</button>
      </div>
      <p class="mb-4">维护一个标志性的ASMR视频播放列表...</p>
      <div class="chart-container">
        <v-chart :option="lineChartOption" />
      </div>
      <div v-if="showLineChartInfo" class="mt-4 p-4 rounded bg-gray-100">
        <p>符合主要受众-年轻人 的作息规律，凌晨一点半达峰，上午最低谷（因为在补觉/上课）。</p>
        <p>在准点、半点时刻经常会有大的波动，主要因为主播的上播/下播行为会安排在准点、半点时刻。</p>
      </div>
    </section>
  </div>
</template>



<script setup>
import { ref, onMounted } from 'vue';
import VChart from 'vue-echarts';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import 'echarts-wordcloud';

// 注册组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LineChart,
  CanvasRenderer
]);

const showWordCloudInfo = ref(false);
const showLineChartInfo = ref(false);

const toggleWordCloudInfo = () => {
  showWordCloudInfo.value = !showWordCloudInfo.value;
};

const toggleLineChartInfo = () => {
  showLineChartInfo.value = !showLineChartInfo.value;
};

// 折线图开始 //
const user_count = [947, 973, 965, 1037, 833, 836, 757, 612, 568, 554, 492, 395, 380, 377, 311, 278, 225, 157, 84, 85, 64, 55, 208, 246, 275, 345, 339, 323, 421, 388, 341, 214, 355, 311, 277, 256, 308, 434, 491, 487, 679, 648, 767, 757, 760, 845, 941, 916]

const lineChartOption = ref({
  title: {
    text: '一天内观众人数变化'
  },
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: Array.from({ length: 48 }, (_, i) => `${Math.floor(i / 2)}:${i % 2 === 0 ? '00' : '30'}`) // 生成一天内每半小时的时间标签
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: user_count,
      type: 'line',
      areaStyle: {}
    }
  ]
});
// 折线图结束 //


// 词云开始 //

// 词云图数据
const wordCloudData = ref([]);

// 读取文本文件并处理数据
const loadData = async () => {
  const response = await fetch('./jieba.txt');
  const text = await response.text();
  wordCloudData.value = text.split('\n').map(line => {
    const [word, count] = line.split(': ');
    return {
      name: word,
      value: parseInt(count, 10)
    };
  });

  // 更新图表配置
  chartOption.value.series[0].data = wordCloudData.value;
};

onMounted(loadData);

// 词云图配置
const chartOption = ref({
  series: [{
    type: 'wordCloud',
    gridSize: 2,
    sizeRange: [20, 100],
    rotationRange: [-60, 60],
    shape: 'pentagon',
    width: '100%',
    height: '100%',
    drawOutOfBound: true,
    data: wordCloudData.value
  }]
});
// 词云结束 //
</script>
  

<style>
.chart-container {
  width: 100%;
  height: 500px;
  /* 增加高度 */
}
</style>
