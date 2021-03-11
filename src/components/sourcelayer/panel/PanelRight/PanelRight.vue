<template>
  <div class="panel panel-right">
    <video-grid v-show="!eventForce&&!alarmList.length" />
    <emergency-list v-if="eventListMode==0" />
    <company-list v-if="eventListMode==1" />
    <emergency-around v-if="eventForce" />
    <grid-member-list v-show="!forceRoom && !eventForce&&!alarmList.length" />
    <room-info
      v-if="forceRoom && !~['company', 'key'].indexOf(forceRoom.item[0].type)"
    />
    <company-info v-if="forceRoom && forceRoom.item[0].type == 'company'" />
    <emergency-grid v-if="eventForce" />
    <alarm-list v-if="alarmList.length" />
  </div>
</template>

<script>
import EmergencyList from "./EmergencyList";
import CompanyList from "./CompanyList"
import EmergencyAround from "./EmergencyAround";
import EmergencyGrid from "./EmergencyGrid";
import AlarmList from "./AlarmList";
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
    CompanyList,
    AlarmList
  },
  computed: {
    ...mapGetters("map", ["eventForce", "forceRoom","eventListMode","alarmList"]),
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