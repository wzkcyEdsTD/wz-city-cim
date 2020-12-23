import echarts from "echarts";
export default {
  title: {
    text: '630 人',
    top: '40%',
    left: "center",
    textStyle: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '400'
    }
  },
  grid: {
    top: "10%",
    right: "3%",
    left: "3%",
    bottom: "5%",
    containLabel: true,
  },
  tooltip: {
    trigger: 'item',
    borderColor: 'rgba(255, 255, 255, .3)',
    backgroundColor: 'rgba(13, 5, 30, .6)',
    borderWidth: 1,
    padding: 5,
    formatter: '{b}\n{c}人'
  },
  legend: {
    left: 'center',
    bottom: '3%',
    icon: 'square',
    textStyle: {
      color: '#FFF'
    },
    data: [],
  },
  color: ['#8CEA52', '#0ADBAC', '#05EFFD', '#0257F7', '#02B8F7', '#C3D300'],
  series: [{
    type: 'pie',
    radius: ['20%', '37%'],
    center: ['50%', '43%'],
    // 最小角度
    minAngle: 10,
    label: {
      show: true,
      position: 'outside',
      formatter: '{a|{b} {c}人}\n{hr|}',
      rich: {
        a: {
          color: '#fff',
          padding: [5, -90, 0, -90]
        }
      }
    },
    labelLine: {
      normal: {
        length: 10,
        length2: 90,
        lineStyle: {
          width: 1
        }
      }
    },
    data: []
  }]
};
