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
      <p class="mb-4">在抖音平台使用关键词ASMR进行爬虫</p>
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
      <p class="mb-4">维护一个标志性的ASMR视频播放列表</p>
      <div class="chart-container">
        <v-chart :option="lineChartOption" />
      </div>
      <div v-if="showLineChartInfo" class="mt-4 p-4 rounded bg-gray-100">
        <p>符合主要受众-年轻人 的作息规律，凌晨一点半达峰，上午最低谷（因为在补觉/上课）。</p>
        <p>在准点、半点时刻经常会有大的波动，主要因为主播的上播/下播行为会安排在准点、半点时刻。</p>
      </div>
    </section>
    <!-- 世界地图 -->
    <section class="my-8">
      <div class="flex justify-between items-center">
        <h2 class="text-2xl font-semibold mb-2">ASMR Google Trends：Interest by region
        </h2>
        <button class="py-2 px-4 bg-blue-500 text-white border border-blue-500 rounded"
          @click="toggleMapInfo">展示解读</button>
      </div>
      <p class="mb-4">从2016至今的ASMR Google搜索指数</p>
      <p class="mb-4">A higher value means a higher proportion of all queries, not a higher absolute query count.</p>
      <div class="chart-container">
        <v-chart :option="worldMapOption" style="height: 500px;" />
      </div>
      <div v-if="showMapInfo" class="mt-4 p-4 rounded bg-gray-100">
        <p>虽然这是Google提供的数据，但中国的interest指数确实最高的。难以置信。</p>
        <p>经过检查中国区具体的检索词汇后，我们确认了，这些搜索确实是含有中文内容/关键词/中文ASMR创作者的。</p>
        <p>有趣的是，搜索最高的词条之一是：“what is ASMR？”“什么是ASMR？”。</p>
      </div>
    </section>
    <!-- Timeline部分 -->
    <section class="my-8">
      <div class="flex justify-between items-center">
        <h2 class="text-2xl font-semibold mb-2">搜索指数变化</h2>
        <button class="py-2 px-4 bg-blue-500 text-white border border-blue-500 rounded"
          @click="toggleTimelineInfo">展示解读</button>
      </div>
      <p class="mb-4">从2016至今的ASMR Google Interest over time</p>
      <div class="chart-container">
        <v-chart :option="timeLineOption" style="height: 500px;" />
      </div>
      <div v-if="showTimeLineInfo" class="mt-4 p-4 rounded bg-gray-100">
        <p>很明显的上升趋势，全世界人们都在逐渐认知到ASMR这一内容类别的魅力。</p>
        <p>比较有意思的是，每年的一二月份，搜索指数似乎会格外高。</p>
        <!-- 添加其他解释性文本或分析 -->
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
  GridComponent,
  VisualMapComponent,
  //XAxisComponent, 
  //YAxisComponent, 
  DatasetComponent
} from 'echarts/components';
import Papa from 'papaparse';
import { LineChart } from 'echarts/charts';
import { MapChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import 'echarts-wordcloud';

// 注册组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LineChart,
  MapChart,
  CanvasRenderer,
  VisualMapComponent,
  //XAxisComponent,
  //YAxisComponent,
  DatasetComponent
]);

const showWordCloudInfo = ref(false);
const showLineChartInfo = ref(false);
const showMapInfo = ref(false);
const showTimeLineInfo = ref(false);

const toggleWordCloudInfo = () => {
  showWordCloudInfo.value = !showWordCloudInfo.value;
};

const toggleLineChartInfo = () => {
  showLineChartInfo.value = !showLineChartInfo.value;
};

const toggleMapInfo = () => {
  showMapInfo.value = !showMapInfo.value;
}

const toggleTimelineInfo = () => {
  showTimeLineInfo.value = !showTimeLineInfo.value;
};

// 地图开始 //
const worldMapOption = ref({});

onMounted(async () => {
  // 加载并解析 CSV 数据
  const response = await fetch('/geoMap.csv');
  const csvData = await response.text();
  const parsedData = Papa.parse(csvData, { header: true }).data;

  // 转换为 ECharts 需要的格式
  const mapData = parsedData.map(item => ({
    name: item.Country,
    value: item.ASMR ? parseFloat(item.ASMR) : 0
  }));

  // 加载世界地图 GeoJSON 数据
  const worldJsonResponse = await fetch('/world.json');
  const worldMapData = await worldJsonResponse.json();

  // 注册地图数据
  echarts.registerMap('world', worldMapData);

  // 设置 ECharts 世界地图的选项
  worldMapOption.value = {
    title: {
      text: '',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}<br/>{c} (ASMR)'
    },
    visualMap: {
      min: 0,
      max: Math.max(...mapData.map(item => item.value)),
      left: 'left',
      top: 'bottom',
      text: ['高', '低'], // 文字，默认为数值文本
      calculable: true,
      inRange: {
        color: ['#e0ffff', '#006edd'] // 颜色的范围，可以根据需要调整
      }
    },
    series: [{
      name: 'ASMR Index',
      type: 'map',
      mapType: 'world',
      roam: true,
      data: mapData
    }]
  };
});

// 地图结束 //

// timeline开始 //
const timeLineOption = ref({});

onMounted(async () => {
  // 加载并解析 CSV 数据
  const response = await fetch('/timeline.csv');
  const csvData = await response.text();
  const parsedData = Papa.parse(csvData, { header: true }).data;

  // 转换为 ECharts 需要的格式
  const xAxisData = parsedData.map(item => item.Month);
  const seriesData = parsedData.map(item => parseInt(item.ASMR));


  // 打印数据以供调试
  //console.log("X Axis Data:", xAxisData);
  //console.log("Series Data:", seriesData);

  // 设置 ECharts 折线图的选项
  timeLineOption.value = {
    title: {
      text: 'ASMR 搜索指数变化',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: xAxisData
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: seriesData,
      type: 'line'
    }]
  };
});

// timeline结束 //

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
