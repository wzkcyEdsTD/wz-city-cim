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
      <div>
        <header>周边500米设施</header>
        <ul class="around-source">
          <li v-for="(value, key, i) in sourceAround" :key="key + i">
            <img :src="`/static/images/map-ico/${key}.png`" />
            <i>{{ key }}</i> : <i>{{ value }}</i>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getPopulation } from "api/cityBrainAPI";
import { CESIUM_TREE_SOURCE_OPTION } from "config/server/sourceTreeOption";

export default {
  name: "emergencyAround",
  data() {
    return {
      aroundPopulation: {},
      sourceAround: {},
    };
  },
  computed: {
    ...mapGetters("map", ["eventForce"]),
  },
  async mounted() {
    this.fetchPopulationAround();
    this.fetchSourceAround();
  },
  methods: {
    async fetchPopulationAround() {
      const { LON, LAT } = this.eventForce;
      this.aroundPopulation = await getPopulation({ lng: LON, lat: LAT });
    },
    fetchSourceAround() {
      const { LON, LAT } = this.eventForce;
      const geometry = SuperMap.Geometry.Polygon.createRegularPolygon(
        new SuperMap.Geometry.Point(LON, LAT),
        (500 / (2 * Math.PI * 6371004)) * 360,
        30,
        360
      );
      CESIUM_TREE_SOURCE_OPTION[0].children.map(
        async ({ newdataset, label, url }) => {
          this.sourceAround[label] = await this.fetchFromDataSets(
            geometry,
            newdataset,
            url
          );
        }
      );
    },
    fetchFromDataSets(geometry, newdataset, url) {
      return new Promise((resolve, reject) => {
        const getFeaturesByGeometryParameters = new SuperMap.REST.GetFeaturesByGeometryParameters(
          {
            datasetNames: [newdataset],
            geometry,
            fields: ["SMID"],
          }
        );
        const getFeaturesByGeometryService = new SuperMap.REST.GetFeaturesByGeometryService(
          url,
          {
            eventListeners: {
              processCompleted: (data) => {
                data && resolve(data.originResult.featureCount);
              },
              processFailed: (err) => {
                reject(err);
              },
            },
          }
        );
        getFeaturesByGeometryService.processAsync(
          getFeaturesByGeometryParameters
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
    > div {
      margin-bottom: 1vh;
      > header {
        font-size: 1.8vh;
        font-weight: bold;
        height: 2.6vh;
        line-height: 2vh;
      }
      > .around-people {
        p {
          line-height: 2vh;
        }
      }
      > .around-source {
        > li {
          height: 4vh;
          line-height: 4vh;
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
      }
    }
  }
}
</style>