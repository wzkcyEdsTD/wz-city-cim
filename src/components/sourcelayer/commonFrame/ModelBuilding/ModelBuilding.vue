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
          <header>
            <span>楼层情况</span>
            <div>
              <span>空置</span>
              <span class="room">住宅</span>
              <span class="rent">出租</span>
              <span class="key">重点</span>
              <span class="company">企业</span>
            </div>
          </header>
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
                  <!-- 101室企业便利店 -->
                  <span
                    v-if="
                      modelBuilding.address ==
                        '浙江省温州市鹿城区蒲鞋市街道绿园社区上陡门住宅区十一组团7幢' &&
                      room == '101'
                    "
                    class="activeCompany"
                    >{{ room }}室
                    <div class="room-info">
                      <span>
                        <p>便利店</p>
                      </span>
                    </div>
                  </span>
 
                  <span
                    v-else
                    :class="{
                      activeRoom: item.length,
                      activeCompany: item.length && item[0].type == 'company',
                      activeRent:item.length&&item.filter((v)=>v.isczf).length,
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
const { BUILDING2D, HOME2D, PEOPLE2D, NORMAL2D, CZF2D } = CESIUM_PEOPLE_BUILDING_SOURCE_OPTION;
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
        console.log(geometry);
        this.doFetchBuild(geometry);
      });
    },
    async doFetchBuild(geometry) {
      //  fetch build
      const data = await this.fetchBuildByPoint(geometry, BUILDING2D);
      if (data.length) {
        this.highLightBuilding(data[0]);
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
        //  fetch czf
        const czfs = await this.fetchKeyByBuildUUID2(address, CZF2D);
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
            const f = parseInt(v.fieldValues[20]);
            const r = parseInt(v.fieldValues[15]);
            floor[f] &&
              floor[f][r] &&
              floor[f][r].push({
                ...this.fixDataFormat(v.fieldNames, v.fieldValues),
                isKey: true,
              });
          });
          normals.map((v) => {
            const f = parseInt(v.fieldValues[5]);
            const r = parseInt(v.fieldValues[6]);
            floor[f] &&
              floor[f][r] &&
              !floor[f][r].filter((d) => d.NAME == v.fieldValues[3]).length &&
              floor[f][r].push(this.fixDataFormat(v.fieldNames, v.fieldValues));
          });
          czfs.map((v) => {
            const r = parseInt(v.fieldValues[3]);
            const f = parseInt(r/100);
            floor[f] &&
              floor[f][r] &&
              floor[f][r].push({
                ...this.fixDataFormat(v.fieldNames, v.fieldValues),
                isczf:true,
              });
          });
          modelBuilding.modelBuildFloorRoom = floor;
          console.log(modelBuilding.modelBuildFloorRoom);
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
    //  高亮楼栋
    highLightBuilding({ geometry }) {
      const id = "highLight_region";
      const { points, center } = geometry;
      let alp = 0.2,
        num = 0;
      window.earth.entities.removeById(id);
      window.earth.entities.add({
        polygon: {
          hierarchy: Cesium.Cartesian3.fromDegreesArray(
            points.map((v) => [v.x, v.y]).flat()
          ),
          material: new Cesium.ImageMaterialProperty({
            color: new Cesium.CallbackProperty(() => {
              num % 2 === 0 ? (alp -= 0.002) : (alp += 0.002);
              alp <= 0.1 || alp >= 0.3 ? num++ : undefined;
              return Cesium.Color.GOLD.withAlpha(alp/2);
            }, false),
          }),
        },
        lon: center.x,
        lat: center.y,
        id,
        classificationType: Cesium.ClassificationType.BOTH,
      });
    },
    doForceRoom(room, item) {
      item.length &&
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
        console.log(newdataset,url,getFeaturesByGeometryService);
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

        /**
     * 获取重点人员
     */
    async fetchKeyByBuildUUID2(address, { newdataset, url }) {
      return new Promise((resolve, reject) => {
        const getFeatureBySQLService = new SuperMap.REST.GetFeaturesBySQLService(url, {
          eventListeners: {
            processCompleted: (data) => data && resolve(data.originResult.features),
            processFailed: (err) => reject(err),
          },
        });
        if(address=="浙江省温州市鹿城区蒲鞋市街道绿园社区上陡门住宅区十组团2幢")
        {
          address = "浙江省温州市鹿城区蒲鞋市街道绿园社区学院中路上陡门住宅区十组团2幢"
        }
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
      window.earth.entities.removeById("highLight_region");
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./ModelBuilding.less");
</style>
