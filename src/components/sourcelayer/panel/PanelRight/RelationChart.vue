<template>
  <div class="relation-chart">
    <header class="ph-right">关系图谱</header>
    <chart-core chartId="relation-chart" :option="option" />
  </div>
</template>

<script>
import ChartCore from "../Chart/ChartCore";
import option from "../Chart/Options/RelationChart";
export default {
  name: "relationChart",
  data() {
    return { option };
  },
  components: { ChartCore },
};
</script>

<style lang="less" scoped>
.relation-chart {
  flex: 1;
}
</style>