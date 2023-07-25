<script setup lang="ts">
import * as echarts from 'echarts';
import { ref, onMounted } from 'vue'
const chart = ref(null)
const user = ref(null)
onMounted(() => {
  const initChart = echarts.init(chart.value)
  const options: echarts.EChartsOption = {
    title: {
      text: '用户性别',
      // subtext: 'Fake Data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        //name: 'Access From',
        type: 'pie',
        radius: '50%',
        colorBy: 'data',
        data: [
          {
            value: 1048,
            name: '男',
            itemStyle: {
              color: '#1900ff'
            },
          },
          {
            value: 735,
            name: '女',
            itemStyle: {
              color: '#ff0000'
            },
          },
        ],

        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  initChart.setOption(options);

  const initUser = echarts.init(user.value)
  const Useroptions: echarts.EChartsOption = {
    title: {
      text: '用户购买商品类型'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01]
    },
    yAxis: {
      type: 'category',
      data: ['书籍类', '家电类', '服装类', '食品类', '化妆品类', '电子数码类']
    },
    series: [
      {
        type: 'bar',
        data: [18203, 73489, 89034, 304970, 531744, 630230],
        itemStyle: {
          color: '#00d4ff'
        }
      },
    ]
  }
  initUser.setOption(Useroptions);
})

</script>
<template>
  <div class="page">
    <div class="title">用户数据</div>
    <div class="box">
      <div ref="chart" style="width: 500px; height: 500px"></div>
      <div ref="user" style="width: 500px; height: 500px"></div>
    </div>

  </div>
</template>
<style scoped>
.box {
  margin-top: 80px;
  display: flex;
  justify-content: space-around;
}

.title {
  font-size: 26px;
  font-weight: bold;
  text-align: center;
}
</style>
