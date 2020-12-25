<template>
  <div class="panel panel-left">
    <header class="panel-header">蒲鞋市街道</header>
    <emergency-chart />
    <city-index-chart />
    <unknown-chart />
  </div>
</template>

<script>
import CityIndexChart from "./CityIndexChart";
import EmergencyChart from "./EmergencyChart";
import UnknownChart from "./UnknownChart";
export default {
  name: "panelLeft",
  components: { CityIndexChart, EmergencyChart, UnknownChart },
};
</script>

<style lang="less" scoped>
.panel-left {
  left: 0;
  background-image: linear-gradient(
    to right,
    rgba(0, 13, 26, 0.84) 0%,
    rgba(0, 17, 34, 0.55) 100%
  );
  padding-top: 2vh;

  .panel-header {
    font-family: YouSheBiaoTiHei;
    font-size: 3.6vh;
    color: white;
    height: 4vh;
    line-height: 4vh;
    padding-left: 2vh;
  }
}
</style>