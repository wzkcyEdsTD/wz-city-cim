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
                <!-- <li v-for="(item, room, j) in value" :key="room + j">
                  <span>{{ room }}室 </span>
                </li> -->
                <li
                  v-for="(item, room, j) in value"
                  :key="room + j"
                  @click="doForceRoom(room, item)"
                >
                  <span
                    :class="{
                      activeRoom: item.length,
                      activeCompany: item.length && item[0].type == 'company',
                      activeKey: item.length && item.filter((v) => v.isKey).length,
                    }"
                    >{{ room }}室
                    <div class="room-info" v-if="item.length">
                      <span
                        v-for="(people, k) in item"
                        :key="k"
                        :class="{ activeRoomKeyOne: people.isKey }"
                      >
                        <p>{{ people.NAME }}</p>
                        <!-- <p>{{ people.IDCARD }}</p> -->
                      </span>
                    </div>
                  </span>
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
const { BUILDING2D, HOME2D, PEOPLE2D, NORMAL2D } = CESIUM_PEOPLE_BUILDING_SOURCE_OPTION;
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
    ...mapActions("map", ["setForceRoom"]),
    eventRegsiter() {
      this.$bus.$on("cesium-3d-pick-model", (geometry) => {
        this.doFetchBuild(geometry);
      });
    },
    async doFetchBuild(geometry) {
      //  fetch build
      const data = await this.fetchBuildByPoint(geometry, BUILDING2D);
      if (data.length) {
        const modelBuilding = {
          name: data[0].fieldValues[1],
          address: data[0].fieldValues[2],
          modelBuildFloorRoom: {},
        };
        const uuid = data[0].fieldValues[0];
        const address = data[0].fieldValues[2];
        //  fetch keys
        const keys = await this.fetchKeyByBuildUUID(address, PEOPLE2D);
        //  fetch normals
        const normals = await this.fetchKeyByBuildUUID(address, NORMAL2D);
        //  fetch rooms
        const rooms = await this.fetchRoomByBuildUUID(uuid, HOME2D);
        if (rooms.length) {
          const floor = {};
          rooms.map((v) => {
            const f = parseInt(v.fieldValues[5]);
            const r = parseInt(v.fieldValues[7]);
            !floor[f] && (floor[f] = {});
            !floor[f][r] && (floor[f][r] = []);
          });
          keys.map((v) => {
            const f = parseInt(v.fieldValues[5]);
            const r = parseInt(v.fieldValues[15]);
            floor[f] &&
              floor[f][r] &&
              floor[f][r].push({
                ...this.fixDataFormat(v.fieldNames, v.fieldValues),
                isKey: true,
              });
          });
          normals.map((v) => {
            const f = parseInt(this.ToCDB(v.fieldValues[6]));
            const r = parseInt(v.fieldValues[7]);
            floor[f] &&
              floor[f][r] &&
              floor[f][r].push(this.fixDataFormat(v.fieldNames, v.fieldValues));
          });
          modelBuilding.modelBuildFloorRoom = floor;
        }
        this.modelBuilding = modelBuilding;
      }
    },
    //  生成对象
    fixDataFormat(keys, values) {
      const obj = {};
      keys.map((v, i) => {
        obj[v] = values[i];
      });
      return obj;
    },
    //  全角转半角
    ToCDB(str) {
      var tmp = "";
      for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 65248 && str.charCodeAt(i) < 65375) {
          tmp += String.fromCharCode(str.charCodeAt(i) - 65248);
        } else {
          tmp += String.fromCharCode(str.charCodeAt(i));
        }
      }
      return tmp;
    },
    doForceRoom(room, item) {
      this.setForceRoom({
        room,
        item,
        bName: this.modelBuilding.name,
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
            datasetNames: [newdataset],
          })
        );
      });
    },
    /**
     * 获取重点人员
     */
    async fetchKeyByBuildUUID(address, { newdataset, url }) {
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
              attributeFilter: `BZDZ = '${address}'`,
            }),
            toIndex: -1,
            datasetNames: [newdataset],
          })
        );
      });
    },
    closeFrame() {
      this.modelBuilding = undefined;
      this.setForceRoom(undefined);
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./ModelBuilding.less");
</style>
