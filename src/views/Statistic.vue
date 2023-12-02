<template>
    <div class="container mx-auto p-4">
        <h1 class="text-xl font-bold mb-4">可视化展示</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="chart-container">
                <v-chart v-if="wordCloudData.length" :option="chartOption" />
            </div>
            <!-- 其他可视化组件的容器可以在这里添加 -->
        </div>
    </div>
</template>

  
<script setup>
import VChart from 'vue-echarts';
import { ref, onMounted } from 'vue';
import { CanvasRenderer } from 'echarts/renderers';
// 导入词云图
import 'echarts-wordcloud';
import * as echarts from 'echarts/core';

// 注册必要的组件
echarts.use([CanvasRenderer]);

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
</script>
  

<style>
.chart-container {
    width: 100%;
    height: 700px;
    /* 增加高度 */
}
</style>
