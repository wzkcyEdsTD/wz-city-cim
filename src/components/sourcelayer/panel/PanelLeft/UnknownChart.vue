<template>
  <div class="unknown-chart">
    <header class="ph-left">unknown</header>
    <chart-core chartId="unknown-chart" :option="option" />
  </div>
</template>

<script>
import ChartCore from "../Chart/ChartCore";
import option from "../Chart/Options/test";
export default {
  name: "unknownChart",
  data() {
    return { option };
  },
  components: { ChartCore },
};
</script>

<style lang="less" scoped>
.unknown-chart {
  flex: 1;
}
</style>