<script setup lang="ts">
import * as echarts from 'echarts';
import { ref, onMounted } from 'vue'
const chart = ref(null)
const weekEchart = ref(null)
onMounted(() => {
  const initChart = echarts.init(chart.value)
  const options: echarts.EChartsOption = {
    title: {
      text: '近半年销售金额',
      left: 'center'
    },
    xAxis: {
      type: 'category',
      data: ['一月', '二月', '三月', '四月', '五月', '六月'],

    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, 0.1]
    },
    series: [
      {
        data: [820, 1500, 901, 934, 1290, 1330],
        type: 'line',
        smooth: true
      }
    ]
  };
  initChart.setOption(options);
  //近一周
  const initWeekEChart = echarts.init(weekEchart.value)
  const weekOptions: echarts.EChartsOption = {
    title: {
      text: '近一周销售金额',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, 0.1]
    },
    series: [
      {
        name: '电子数码类',
        data: [120, 200, 150, 80, 100, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      },
      {
        name: '化妆品类',
        data: [100, 180, 130, 65, 70, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }, {
        name: '食品类',
        data: [90, 160, 120, 50, 60, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }, {
        name: '服装类',
        data: [60, 150, 100, 40, 50, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }, {
        name: '家电类',
        data: [40, 70, 80, 20, 40, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }, {
        name: '书籍类',
        data: [20, 20, 50, 10, 30, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  };
  initWeekEChart.setOption(weekOptions);
})

</script>
<template>
  <div class="page">
    <div class="title">销售数据</div>
    <div class="box">
      <div ref="chart" style="width: 500px; height: 500px"></div>
      <div ref="weekEchart" style="width: 500px; height: 500px"></div>
    </div>

  </div>
</template>
<style scoped>
.title {
  text-align: center;
  font-size: 25px;
  font-weight: bold;
}

.box {
  margin-top: 70px;
  display: flex;
  justify-content: space-around;
}
</style>
