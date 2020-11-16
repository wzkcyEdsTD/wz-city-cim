import echarts from "echarts";
export default {
    tooltip: {
        trigger: "axis",
        axisPointer: { type: "line", },
    },
    grid: {
        top: "10%",
        right: "5%",
        left: "5%",
        bottom: "5%",
        containLabel: true,
    },
    yAxis: {
        name: "单位：人",
        nameTextStyle: {
            color: "#fff",
            fontFamily: "DIN",
            fontSize: 11,
        },
        data: [],
        axisLabel: {
            textStyle: {
                color: '#fff'
            }
        },
        axisTick: { show: false },
        axisLine: { show: false },
    },
    xAxis: {
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: {
            lineStyle: {
                type: "dashed",
                width: 0.5,
                color: ['#fff']
            }
        },
        axisLabel: {
            textStyle: {

                color: '#fff'
            }
        }
    },
    series: [
        {
            type: 'bar',
            itemStyle: {
                color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                        { offset: 0, color: '#83bff6' },
                        { offset: 0.5, color: '#188df0' },
                        { offset: 1, color: '#188df0' }
                    ]
                )
            },
            emphasis: {
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            { offset: 0, color: '#2378f7' },
                            { offset: 0.7, color: '#2378f7' },
                            { offset: 1, color: '#83bff6' }
                        ]
                    )
                }
            },
            label: {
                show: true,
                position: 'right',
                textStyle: {
                    color: '#fff'
                }
            },
            data: []
        }
    ]
};