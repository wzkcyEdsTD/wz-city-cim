<template>
  <div class="panel panel-left">
    <city-index-chart />
    <emergency-chart />
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
    rgba(0, 17, 34, 0.4) 100%
  );
}
</style>