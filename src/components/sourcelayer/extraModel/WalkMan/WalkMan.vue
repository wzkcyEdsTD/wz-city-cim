<template>
  <div class="walk-man">
    <div v-if="forceGridMember" class="walk-man-operation">
      <span @click="doFollow = !doFollow">镜头跟踪</span>
      <span @click="shutDownGridMember">取消路径</span>
    </div>
  </div>
</template>

<script>
import { getCzmlDataSource } from "./config";
import { mapGetters, mapActions } from "vuex";
import { angle3d } from "mock/overview.js";
const { heading, pitch } = angle3d;
export default {
  name: "walkMan",
  data() {
    return {
      doFollow: false,
      timestamp: undefined,
    };
  },
  computed: {
    ...mapGetters("map", ["forceGridMember"]),
  },
  watch: {
    forceGridMember(n) {
      n ? this.initWalk() : this.shutDownRoute();
    },
    doFollow(n) {
      this.doFollowCamera(n);
    },
  },
  methods: {
    ...mapActions("map", ["setForceGridMember"]),

    initWalk() {
      const timestamp = +new Date();
      this.timestamp = timestamp;
      const czml = getCzmlDataSource(timestamp);
      const viewer = window.earth;
      var dataSourcePromise = Cesium.CzmlDataSource.load(czml);
      viewer.dataSources.add(dataSourcePromise);
      dataSourcePromise.then(() => {
        const entity = window.earth.dataSources
          .getByName("gridmember_" + this.timestamp)[0]
          .entities.getById("walkman_" + this.timestamp);
        entity.viewFrom = new Cesium.Cartesian3(100, 0, 100);
        viewer.trackedEntity = entity;
        this.doFollow = true;
      });
    },
    doFollowCamera(n) {
      if (n) {
        const ds = window.earth.dataSources.getByName(
          "gridmember_" + this.timestamp
        )[0];
        if (ds) {
          const entity = ds.entities.getById("walkman_" + this.timestamp);
          entity.viewFrom = new Cesium.Cartesian3(100, 0, 100);
          window.earth.trackedEntity = entity;
        }
      } else {
        window.earth.trackedEntity = undefined;
      }
    },
    shutDownGridMember() {
      this.setForceGridMember(undefined);
    },
    shutDownRoute() {
      window.earth.trackedEntity = undefined;
      window.earth.dataSources.remove(
        window.earth.dataSources.getByName("gridmember_" + this.timestamp)[0]
      );
    },
  },
};
</script>

<style lang="less" scoped>
.walk-man-operation {
  position: fixed;
  top: 16vh;
  left: 50%;
  transform: translateX(-50%);
  > span {
    display: inline-block;
    padding: 0.6vh 1vh;
    border-radius: 1vh;
    border: 2px solid #597beb;
    box-sizing: border-box;
    color: #597beb;
    font-size: 1.8vh;
    font-weight: bold;
    vertical-align: middle;
    cursor: pointer;
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
}
</style>