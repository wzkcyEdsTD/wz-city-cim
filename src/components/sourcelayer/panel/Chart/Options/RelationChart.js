const categories = [];
for (var i = 0; i < 2; i++) {
    categories[i] = {
        name: '类目' + i
    };
}
export default {
    tooltip: {
        formatter: function (x) {
            return x.data.des;
        }
    },
    legend: { show: false },
    series: [{
        type: 'graph', // 类型:关系图
        layout: 'force', //图的布局，类型为力导图
        roam: true,
        zoom: 0.4,
        edgeSymbol: ['none'],
        force: { repulsion: 1500, },
        draggable: true,
        lineStyle: {
            normal: { width: 1, color: '#ffffff', curveness: 0.2 }
        },
        label: { normal: { show: true, } },
        data: [
            { name: '事件人员A', symbolSize: 40, category: 0, },
            { name: '事件人员B', symbolSize: 40, category: 0, },
            { name: '网格员', symbolSize: 70, category: 0, },
            { name: '伤员1', symbolSize: 1, category: 1, },
            { name: '伤员2', symbolSize: 1, category: 1, },
            { name: '伤员3', symbolSize: 1, category: 1, },
            { name: '党员', symbolSize: 1, category: 1, },
            { name: '站所', symbolSize: 1, category: 1, },
            { name: '医务人员', symbolSize: 1, category: 1, },
            { name: '警务', symbolSize: 1, category: 1, },
            { name: '网格长', symbolSize: 1, category: 1, }
        ],
        links: [
            { source: '事件人员A', target: '事件人员B' },
            { source: '事件人员A', target: '网格员', },
            { source: '事件人员B', target: '网格员', },
            { source: '事件人员A', target: '伤员1', },
            { source: '事件人员A', target: '伤员2', },
            { source: '事件人员B', target: '伤员3', },
            { source: '事件人员B', target: '党员', },
            { source: '网格员', target: '医务人员', },
            { source: '网格员', target: '站所', },
            { source: '网格员', target: '警务', },
            { source: '网格员', target: '网格长', }
        ],
        categories,
    }]
};