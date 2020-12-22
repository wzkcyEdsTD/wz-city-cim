<!--
 * @Author: eds
 * @Date: 2020-07-28 14:09:16
 * @LastEditTime: 2020-09-15 10:32:15
 * @LastEditors: eds
 * @Description:
 * @FilePath: \wz-city-culture-tour\src\components\sourcelayer\commonFrame\ForceBuilding.vue
-->
<template>
  <div class="force-building">
    <div class="_force_building_" v-if="modelBuilding">
      <header>
        {{ modelBuilding.name }}
        <i class="close" @click="closeFrame"></i>
      </header>
      <div class="frame-content">
        <div class="build-info">
          <header>楼栋信息</header>
          <p>{{ modelBuilding.address }}</p>
        </div>
        <div class="floor-info">
          <header>楼层情况</header>
          <ul>
            <li
              v-for="(value, key, i) in modelBuilding.modelBuildFloorRoom"
              :key="key + i"
            >
              <div class="floor-num">
                <i>第{{ key }}层</i>
              </div>
              <ul>
                <li v-for="(item, room, j) in value" :key="room + j">
                  <span>{{ room }}室 </span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { CESIUM_PEOPLE_BUILDING_SOURCE_OPTION } from "config/server/sourceTreeOption";
const { BUILDING2D, HOME2D } = CESIUM_PEOPLE_BUILDING_SOURCE_OPTION;
export default {
  name: "ModelBuilding",
  data() {
    return {
      modelBuilding: undefined,
    };
  },
  beforeDestroy() {},
  mounted() {
    this.eventRegsiter();
  },
  methods: {
    eventRegsiter() {
      this.$bus.$on("cesium-3d-pick-model", async (geometry) => {
        console.log(geometry);
        const data = await this.fetchBuildByPoint(geometry, BUILDING2D);
        if (data.length) {
          const modelBuilding = {
            name: data[0].fieldValues[1],
            address: data[0].fieldValues[2],
            modelBuildFloorRoom: {},
          };
          const rooms = await this.fetchRoomByBuildUUID(data[0].fieldValues[0], HOME2D);
          if (rooms.length) {
            const floor = {};
            rooms.map((v) => {
              const f = parseInt(v.fieldValues[5]);
              const r = parseInt(v.fieldValues[7]);
              !floor[f] && (floor[f] = {});
              !floor[f][r] && (floor[f][r] = {});
            });
            modelBuilding.modelBuildFloorRoom = floor;
          }
          this.modelBuilding = modelBuilding;
        }
      });
    },
    /**
     * 获取楼栋信息
     */
    async fetchBuildByPoint({ x, y }, { newdataset, url }) {
      return new Promise((resolve, reject) => {
        const getFeaturesByGeometryService = new SuperMap.REST.GetFeaturesByGeometryService(
          url,
          {
            eventListeners: {
              processCompleted: (data) => data && resolve(data.originResult.features),
              processFailed: (err) => reject(err),
            },
          }
        );
        getFeaturesByGeometryService.processAsync(
          new SuperMap.REST.GetFeaturesByGeometryParameters({
            datasetNames: [newdataset],
            geometry: new SuperMap.Geometry.Point(x, y),
            spatialQueryMode: "INTERSECT",
            fields: ["BUILDING_ADDRESS_UUID", "COMMUNITY", "BUILDING_ADDRESS"],
            toIndex: -1,
          })
        );
      });
    },
    /**
     * 获取房间信息
     */
    async fetchRoomByBuildUUID(uuid, { newdataset, url }) {
      return new Promise((resolve, reject) => {
        const getFeatureBySQLService = new SuperMap.REST.GetFeaturesBySQLService(url, {
          eventListeners: {
            processCompleted: (data) => data && resolve(data.originResult.features),
            processFailed: (err) => reject(err),
          },
        });
        getFeatureBySQLService.processAsync(
          new SuperMap.REST.GetFeaturesBySQLParameters({
            queryParameter: new SuperMap.REST.FilterParameter({
              attributeFilter: `BUILDID = '${uuid}'`,
            }),
            toIndex: -1,
            fields: ["FLOOR_NUM", "HOME_NUM"],
            datasetNames: [newdataset],
          })
        );
      });
    },
    closeFrame() {
      this.modelBuilding = undefined;
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./ModelBuilding.less");
</style>
