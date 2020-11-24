<template>
  <div class="panel panel-right">
    <video-grid v-show="!eventForce" />
    <emergency-around v-if="eventForce" />
    <emergency-list />
    <grid-member-list v-if="!forceRoom" />
    <room-info v-if="forceRoom" />
  </div>
</template>

<script>
import EmergencyList from "./EmergencyList";
import EmergencyAround from "./EmergencyAround";
import VideoGrid from "./VideoGrid";
import RelationChart from "./RelationChart";
import GridMemberList from "./GridMemberList";
import RoomInfo from "./RoomInfo";
import { mapGetters } from "vuex";
export default {
  name: "panelRight",
  components: {
    EmergencyAround,
    EmergencyList,
    VideoGrid,
    RelationChart,
    GridMemberList,
    RoomInfo,
  },
  computed: {
    ...mapGetters("map", ["eventForce", "forceRoom"]),
  },
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