<template>
  <div class="emergency-chart">
    <header class="ph-left">突发事件整体趋势</header>
    <chart-core chartId="emergency-chart" :option="option" />
  </div>
</template>

<script>
import ChartCore from "../Chart/ChartCore";
import option from "../Chart/Options/EmergencyChart";
export default {
  name: "emergencyChart",
  data() {
    return { option };
  },
  components: { ChartCore },
};
</script>

<style lang="less" scoped>
.emergency-chart {
  height: 24vh;
}
</style>