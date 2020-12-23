<template>
  <div class="emergency-around">
    <header class="ph-right">事件周边分析</header>
    <div class="content">
      <div>
        <header>周边500米实时人口</header>
        <div class="around-people">
          <p>人数：{{ aroundPopulation.data || "-" }}人</p>
          <p>时间：{{ aroundPopulation.task_time || "-" }}</p>
        </div>
      </div>
      <div class="around-source">
        <header>周边500米设施</header>
        <ul>
          <li>
            <img src="/static/images/map-ico/视频监控.png" />
            <i>视频监控</i> <i>{{ rtmpListOther.length }}</i>
          </li>
          <li v-for="(value, key, i) in sourceAround" :key="key + i">
            <img :src="`/static/images/map-ico/${key}.png`" />
            <i>{{ key }}</i> <i>{{ value }}</i>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getPopulation } from "api/cityBrainAPI";
import { destoryBuild, drawBuild } from "./DrawAround/DrawAround";
import {
  CESIUM_TREE_SOURCE_OPTION,
  CESIUM_PEOPLE_BUILDING_SOURCE_OPTION,
} from "config/server/sourceTreeOption";

export default {
  name: "emergencyAround",
  data() {
    return {
      aroundPopulation: {},
      sourceAround: {},
      buildAround: [],
    };
  },
  computed: {
    ...mapGetters("map", ["rtmpListOther", "eventForce"]),
  },
  async mounted() {
    this.fetchPopulationAround();
    this.fetchSourceAround();
    this.$bus.$emit("cesium-3d-panel-bottom");
  },
  beforeDestroy() {
    //  摧毁房屋面
    //  destoryBuild(this.buildAround);
  },
  methods: {
    async fetchPopulationAround() {
      const { LON, LAT } = this.eventForce;
      this.aroundPopulation = await getPopulation({ lng: LON, lat: LAT });
    },
    async fetchSourceAround() {
      const { LON, LAT } = this.eventForce;
      const geometry = SuperMap.Geometry.Polygon.createRegularPolygon(
        new SuperMap.Geometry.Point(LON, LAT),
        (250 / (2 * Math.PI * 6371000)) * 360,
        30,
        0
      );
      //  周边分析
      CESIUM_TREE_SOURCE_OPTION[0].children.map(async ({ newdataset, label, url }) => {
        this.sourceAround[label] = await this.fetchFromDataSets(
          geometry,
          newdataset,
          url
        );
      });
      //  重点人员分析,反画楼面
      const { PEOPLE2D, BUILDING2D } = CESIUM_PEOPLE_BUILDING_SOURCE_OPTION;
      const data = await this.fetchFromZDRYDSets(geometry, PEOPLE2D);
      const b_data = await this.fetchBlock2DByName(
        [...new Set(data.map((v) => v.fieldValues[0]))],
        BUILDING2D
      );
      const fix_b_data = b_data.map((v) => {
        return { points: v.geometry.points, id: "build_polygon_" + v.ID };
      });
      this.buildAround = fix_b_data;
      drawBuild(fix_b_data);
    },
    /**
     * 获取数据集点位
     */
    fetchFromDataSets(geometry, newdataset, url) {
      return new Promise((resolve, reject) => {
        const getFeaturesByGeometryService = new SuperMap.REST.GetFeaturesByGeometryService(
          url,
          {
            eventListeners: {
              processCompleted: (data) => data && resolve(data.originResult.totalCount),
              processFailed: (err) => reject(err),
            },
          }
        );
        getFeaturesByGeometryService.processAsync(
          new SuperMap.REST.GetFeaturesByGeometryParameters({
            datasetNames: [newdataset],
            geometry,
            returnCountOnly: true,
            toIndex: 0,
          })
        );
      });
    },
    /**
     * 获取重点人员点位
     */
    fetchFromZDRYDSets(geometry, { newdataset, url }) {
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
            geometry,
            fields: ["BZDZ"],
            toIndex: -1,
          })
        );
      });
    },
    /**
     * sql查楼面
     */
    fetchBlock2DByName(names, { newdataset, url }) {
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
              attributeFilter: `BUILDING_ADDRESS in (${names
                .map((v) => `'${v}'`)
                .join(",")})`,
            }),
            toIndex: -1,
            fields: ["SMID"],
            datasetNames: [newdataset],
          })
        );
      });
    },
  },
};
</script>

<style lang="less" scoped>
.emergency-around {
  height: 34vh;
  .content {
    color: white;
    flex: 1;
    overflow: hidden;
    height: 30vh;
    > div {
      height: 8vh;
      > header {
        font-size: 1.8vh;
        font-weight: bold;
        height: 3vh;
        line-height: 2.4vh;
      }
      > .around-people {
        p {
          line-height: 2vh;
        }
      }
      &.around-source {
        height: 22vh;
        ul {
          height: 19vh;
          flex: 1;
          overflow-y: auto;
          li {
            height: 3.5vh;
            line-height: 3.5vh;
            display: inline-block;
            width: 49.9%;
            > * {
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }
            > i {
              font-style: normal;
              &:last-child {
                font-weight: bold;
              }
            }
          }
          &::-webkit-scrollbar {
            width: 4px;
            background: rgba(1, 41, 38, 0.3);
          }

          &::-webkit-scrollbar-thumb {
            background-color: #2a51fe;
            box-shadow: 0px 3px 6px 0px #012623;
          }
        }
      }
    }
  }
}
</style>
