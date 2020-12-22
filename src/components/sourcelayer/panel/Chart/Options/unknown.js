import echarts from "echarts";
export default {
  grid: {
    top: "10%",
    right: "5%",
    left: "5%",
    bottom: "5%",
    containLabel: true,
  },
  color: ['#2BBDE1', '#FF8352', '#E271DE', '#F8456B', '#00FFFF', '#4AEAB0'],
  series: [{
    type: 'pie',
    radius: ['20%', '40%'],
    center: ['50%', '50%'],
    // 最小角度
    minAngle: 15,
    labelLine: {
      lineStyle: {
        color: '#e6e6e6'
      }
    },
    label: {
      formatter: '{b}\n{c}人 {d}%'
    },
    data: []
  }]
};