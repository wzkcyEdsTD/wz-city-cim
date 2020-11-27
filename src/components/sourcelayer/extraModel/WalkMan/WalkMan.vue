<template>
  <div class="walk-man">
    <ul
      class="routeLinks"
      v-if="
        forceGridMember &&
        forceGridMember.routeLinks &&
        forceGridMember.routeLinks.length
      "
    >
      <li
        v-for="(item, i) in forceGridMember.routeLinks"
        :key="i"
        :class="{ active: i == forceIndex.i }"
        @click="forceIndex.i = i"
      >
        [{{ new Date(item.STARTTIME).toLocaleDateString() }}] 距离:
        {{ item.DISTANCE }}米
      </li>
    </ul>
    <div v-if="forceGridMember" class="walk-man-operation">
      <span @click="doFollow = !doFollow">镜头跟踪</span>
      <span @click="shutDownGridMember">取消巡逻</span>
    </div>
  </div>
</template>

<script>
import { getCzmlDataSource } from "./config";
import CIM_API from "api/cimAPI";
import { mapGetters, mapActions } from "vuex";
import { angle3d } from "mock/overview.js";
const { heading, pitch } = angle3d;
export default {
  name: "walkMan",
  data() {
    return {
      doFollow: false,
      forceIndex: undefined,
    };
  },
  computed: {
    ...mapGetters("map", ["forceGridMember"]),
  },
  watch: {
    forceGridMember: {
      handler(n) {
        n
          ? (this.forceIndex = { i: 0, name: this.forceGridMember.NAME })
          : this.shutDownRoute();
      },
      deep: true,
    },
    forceIndex: {
      handler(n) {
        this.fetchRoute();
      },
      deep: true,
    },
    doFollow(n) {
      this.doFollowCamera(n);
    },
  },
  created() {
    window.billboardMap[
      "walkMan_route_points"
    ] = window.earth.scene.primitives.add(
      new Cesium.PointPrimitiveCollection()
    );
    window.labelMap["walkMan_route_labels"] = window.earth.scene.primitives.add(
      new Cesium.LabelCollection()
    );
  },
  methods: {
    ...mapActions("map", ["setForceGridMember"]),
    async fetchRoute() {
      const data = await CIM_API.getGridMemberRoutes(
        this.forceGridMember.routeLinks[this.forceIndex.i].TRACKRESOURCE
      );
      this.initWalk(data);
    },
    initWalk(data) {
      this.shutDownRoute();
      const czml = getCzmlDataSource(data);
      const viewer = window.earth;
      var dataSourcePromise = Cesium.CzmlDataSource.load(czml);
      viewer.dataSources.add(dataSourcePromise);
      dataSourcePromise.then(() => {
        this.doRoutePoints(data);
        window.earth.flyTo(window.billboardMap["walkMan_route_lines"], {
          offset: {
            heading: Cesium.Math.toRadians(0), //左右方向
            pitch: Cesium.Math.toRadians(-90), //上下方向
          },
        });
      });
    },
    doRoutePoints(data) {
      window.billboardMap["walkMan_route_lines"] = window.earth.entities.add({
        name: "walkMan_line",
        id: "walkMan_line",
        polyline: new Cesium.PolylineGraphics({
          positions: Cesium.Cartesian3.fromDegreesArrayHeights(
            data.map((v) => [parseFloat(v.lon), parseFloat(v.lat), 4]).flat(2)
          ),
          width: 8,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
          material: Cesium.Color.RED,
          material: new Cesium.PolylineArrowMaterialProperty(Cesium.Color.RED), //体会编码，下面的覆盖上面,material对应了一个实例
        }),
      });
      data.map(({ lon, lat }, i) => {
        const isStart = i == 0;
        const isEnd = i == data.length - 1;
        const isSpecial = isStart || isEnd;
        const position = Cesium.Cartesian3.fromDegrees(
          parseFloat(lon),
          parseFloat(lat),
          4
        );
        window.billboardMap["walkMan_route_points"].add({
          id: "walkMan_points_" + i,
          pixelSize: isSpecial ? 12 : 4,
          color: Cesium.Color.RED,
          outlineColor: Cesium.Color.GREEN,
          outlineWidth: isSpecial ? 4 : 2,
          // disableDepthTestDistance: Number.POSITIVE_INFINITY,
          position,
        });
        isSpecial &&
          window.labelMap["walkMan_route_labels"].add({
            id: "walkMan_labels_" + i,
            text: isStart ? "起点" : "终点",
            fillColor: Cesium.Color.WHITE,
            outlineColor: Cesium.Color.BLACK,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            font: "10px",
            scale: 1.5,
            outlineWidth: 6,
            showBackground: true,
            backgroundColor: Cesium.Color.fromCssColorString("rgba(0,0,0,0.8)"),
            pixelOffset: new Cesium.Cartesian2(0, -30),
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
            position,
          });
      });
    },
    doFollowCamera(n) {
      if (n) {
        const ds = window.earth.dataSources.getByName("gridmember")[0];
        if (ds) {
          const entity = ds.entities.getById("walkman");
          entity.viewFrom = new Cesium.Cartesian3(10, -50, 1000);
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
      window.billboardMap["walkMan_route_points"].removeAll();
      window.labelMap["walkMan_route_labels"].removeAll();
      window.earth.entities.remove(window.billboardMap["walkMan_route_lines"]);
      window.earth.trackedEntity = undefined;
      window.earth.dataSources.remove(
        window.earth.dataSources.getByName("gridmember")[0]
      );
    },
  },
};
</script>

<style lang="less" scoped>
.walk-man {
  position: fixed;
  top: 16vh;
  left: 50%;
  transform: translateX(-50%);
  .routeLinks {
    border-radius: 1vh;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.8);
    margin-bottom: 1vh;
    > li {
      color: rgba(255, 255, 255, 0.7);
      padding: 0 1vh;
      height: 2.8vh;
      line-height: 2.8vh;
      cursor: pointer;
      &:nth-child(odd) {
        background-color: rgba(17, 46, 93, 0.8);
      }
      &:nth-child(even) {
        background-color: rgba(29, 77, 155, 0.8);
      }
      &.active {
        font-weight: bold;
        color: white;
      }
    }
  }
  .walk-man-operation {
    text-align: center;
    > span {
      display: inline-block;
      padding: 0.4vh 1vh;
      border-radius: 1vh;
      box-sizing: border-box;
      background-color: rgba(29, 77, 155, 0.8);
      color: white;
      border: 1px solid #597beb;
      font-size: 1.6vh;
      vertical-align: middle;
      cursor: pointer;
      &:hover {
        background-color: rgba(17, 46, 93, 0.8);
      }
    }
  }
}
</style>