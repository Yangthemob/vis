<template>
    <div class="container mx-auto p-4">
        <h1 class="text-4xl font-bold mb-4 mt-10">可视化展示</h1>
        
        <!-- 第一个图表：词云 -->
        <section class="mb-8">
            <h2 class="text-2xl font-semibold mb-2">词云展示</h2>
            <p class="mb-4">在抖音平台使用关键词ASMR进行爬虫，将title与desc使用jieba分词库处理，使用echarts-wordcloud构造词云。</p>
            <div class="chart-container">
                <v-chart v-if="wordCloudData.length" :option="chartOption" />
            </div>
        </section>

        <!-- 第二个图表：折线图 -->
        <section>
            <h2 class="text-2xl font-semibold mb-2">观看人数变化</h2>
            <p class="mb-4">维护一个标志性的ASMR视频播放列表，每隔半小时对在线观看人数进行采样，绘制观看人数折线图。</p>
            <div class="chart-container">
                <v-chart :option="lineChartOption" />
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

// 折线图开始 //
const user_count = [947, 973, 965, 1037, 833, 836, 757, 612, 568, 554, 492, 395, 380, 377, 311, 278, 225, 157, 84, 85, 64, 55, 208, 276, 275, 345, 339, 323, 421, 404, 341, 214, 355, 311, 277, 256, 308, 434, 491, 487, 679, 648, 767, 757, 760, 845, 941,916]

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

// 生成随机颜色的函数
const generateRandomColor = () => {
    return `rgb(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)})`;
};

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
        textStyle: {
            normal: {
                color: generateRandomColor
            }
        },
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
