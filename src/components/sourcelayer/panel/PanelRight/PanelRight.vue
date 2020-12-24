<template>
  <div class="panel panel-right">
    <video-grid v-show="!eventForce" />
    <emergency-list />
    <emergency-around v-if="eventForce" />
    <grid-member-list v-show="!forceRoom && !eventForce" />
    <room-info
      v-if="forceRoom && !~['company', 'key'].indexOf(forceRoom.item[0].type)"
    />
    <company-info v-if="forceRoom && forceRoom.item[0].type == 'company'" />
    <emergency-grid v-if="eventForce" />
  </div>
</template>

<script>
import EmergencyList from "./EmergencyList";
import EmergencyAround from "./EmergencyAround";
import EmergencyGrid from "./EmergencyGrid";
import VideoGrid from "./VideoGrid";
import RelationChart from "./RelationChart";
import GridMemberList from "./GridMemberList";
import RoomInfo from "./RoomInfo";
import CompanyInfo from "./CompanyInfo";
import { mapGetters } from "vuex";
export default {
  name: "panelRight",
  components: {
    EmergencyAround,
    EmergencyList,
    EmergencyGrid,
    VideoGrid,
    RelationChart,
    GridMemberList,
    RoomInfo,
    CompanyInfo,
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
    rgba(0, 17, 34, 0.6) 100%
  );
}
</style>