<template>
  <div class="emergency-chart">
    <header class="ph-left">11月突发事件整体趋势</header>
    <chart-core chartId="emergency-chart" :option="option" />
  </div>
</template>

<script>
import ChartCore from "../Chart/ChartCore";
import option from "../Chart/Options/EmergencyChart";
import { mapGetters } from "vuex";
export default {
  name: "emergencyChart",
  data() {
    return { option };
  },
  watch: {
    eventList: {
      handler(n) {
        this.updateChartOption();
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters("map", ["eventList"]),
  },
  components: { ChartCore },
  methods: {
    updateChartOption() {
      const dateHash = {};
      this.eventList.map((v) => {
        const d = new Date(v.OCCURDATE).toLocaleDateString();
        !dateHash[d] && (dateHash[d] = 0);
        dateHash[d] += 1;
      });
      const xAxisData = Object.keys(dateHash)
        .map((v) => parseInt(v.split("/")[2]))
        .sort((a, b) => a - b);
      const seriesData = xAxisData.map((v) => dateHash[`2020/11/${v}`]);
      const option = JSON.parse(JSON.stringify(this.option));
      option.xAxis.data = xAxisData.map((v) => v + "日");
      option.series[0].data = seriesData;
      this.option = option;
    },
  },
};
</script>

<style lang="less" scoped>
.emergency-chart {
  height: 24vh;
}
</style>