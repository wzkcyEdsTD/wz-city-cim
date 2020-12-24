import echarts from "echarts";
export default {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "line",
    },
  },
  title: {
    text: '近30天事件变化趋势',
    textStyle: {
      align: 'center',
      color: '#fff',
      fontSize: 14,
    },
    top: '2%',
    left: '3%',
  },
  legend: {
    show: true,
    top: "15%",
    right: 0,
    icon: "path://M978.919,520.951a5,5,0,1,1,5-5A5.006,5.006,0,0,1,978.919,520.951Zm0-8a3,3,0,1,0,3,3A3,3,0,0,0,978.919,512.951Z",
    itemWidth: 11,
    itemHeight: 11,
    textStyle: {
      color: "#fff",
      fontSize: 11,
    },
  },
  grid: {
    top: "30%",
    right: "6%",
    left: "3%",
    bottom: "5%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    axisLine: {
      lineStyle: {
        color: "rgba(255, 255, 255, 0.5)",
      },
    },
    axisLabel: {
      interval: 5,
      color: "#fff",
      fontFamily: "DIN",
      fontSize: 10,
    },
    axisTick: {
      show: false,
    },
    data: []
  },
  yAxis: {
    name: "单位：件",
    nameTextStyle: {
      color: "#fff",
      fontFamily: "DIN",
      fontSize: 11,
    },
    axisLabel: {
      color: "#fff",
      fontFamily: "DIN",
      fontSize: 11,
    },
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    splitLine: {
      show: false,
    },
  },
  series: [{
    name: "突发事件",
    type: "line",
    smooth: true,
    data: [],
    itemStyle: {
      color: "#fc5453",
    },
    lineStyle: {
      color: "#fc5453",
    },
    areaStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: "#fc5453",
        },
        {
          offset: 1,
          color: "rgba(0, 128, 118, 0)",
        },
      ]),
    },
  }],
}
