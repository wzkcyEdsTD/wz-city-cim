<template>
  <div class="unknown-chart">
    <header class="ph-left">重点人员</header>
    <chart-core chartId="unknown-chart" :option="option" />
  </div>
</template>

<script>
import ChartCore from "../Chart/ChartCore";
import option from "../Chart/Options/unknown";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "unknownChart",
  data() {
    return { option };
  },
  components: { ChartCore },
  async created() {
    const result = await this.getAllKindsList();
    this.updateChartOption(result);
  },
  methods: {
    ...mapActions("map", ["getAllKindsList"]),
    updateChartOption(result) {
      const yAxisData = Object.keys(result);
      const seriesData = yAxisData.map((v) => {
        return { name: v, value: result[v].rows.length };
      });
      const option = JSON.parse(JSON.stringify(this.option));
      option.legend.data = yAxisData;
      option.series[0].data = seriesData;
      this.option = option;
    },
  },
};
</script>

<style lang="less" scoped>
.unknown-chart {
  flex: 1;
}
</style>