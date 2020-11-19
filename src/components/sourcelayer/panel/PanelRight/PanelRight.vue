<template>
  <div class="panel panel-right">
    <video-grid />
    <emergency-list />
    <!-- <relation-chart /> -->
    <grid-member-list />
  </div>
</template>

<script>
import EmergencyList from "./EmergencyList";
import VideoGrid from "./VideoGrid";
import RelationChart from "./RelationChart";
import GridMemberList from "./GridMemberList";
export default {
  name: "panelRight",
  components: { EmergencyList, VideoGrid, RelationChart, GridMemberList },
};
</script>

<style lang="less" scoped>
.panel-right {
  width: 44vh;
  right: 0;
  background-image: linear-gradient(
    to left,
    rgba(0, 13, 26, 0.84) 0%,
    rgba(0, 17, 34, 0.4) 100%
  );
}
</style>