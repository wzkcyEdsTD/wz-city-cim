<template>
  <div class="panel-bottom">
    <header>高热区分析</header>
    <ul class="panel-bottom-ul">
      <li
        :class="{ active: item.k == forceKey }"
        v-for="(item, i) in block_extra.concat(blocks)"
        :key="i + item.k"
        @click="doBlockAnalyse(item)"
      >
        <img :src="`/static/images/block/${item.label}@2x.png`" />
        <p>{{ item.label }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { switchHeatMap, doHeatMap, doBlockKey } from "./HeatMap";
import keyPersonList from "mock/PXS_KEY_PERSONS";
import normalPersonList from "mock/PXS_NORMAL_PERSONS";
import { CESIUM_PEOPLE_BUILDING_SOURCE_OPTION } from "config/server/sourceTreeOption";
import {
  destoryBuild,
  drawBuild,
} from "components/sourcelayer/panel/PanelRight/DrawAround/DrawAround";
export default {
  name: "panelBottom",
  data() {
    return {
      forceKey: undefined,
      block_extra: [{ label: "管辖重点", k: "k1" }],
      blocks: [
        { label: "人口集聚", k: "k2" },
        { label: "重点人员密集区", k: "k3", ava: true },
        { label: "事件高发区", k: "k4" },
      ],
      buildAround: [],
      //  重点人员
      keyPersonList,
      //  户籍人口
      normalPersonList,
    };
  },
  computed: {
    ...mapGetters("map", ["eventList"]),
    eventHeatList() {
      return this.eventList.map((v) => [v.LON, v.LAT, 8]);
    },
    keyPersonHeatList() {
      return this.keyPersonList.features.map((v) => [...v.geometry.coordinates, 8]);
    },
    normalPersonHeatList() {
      return this.normalPersonList.features.map((v) => [
        ...v.geometry.coordinates,
        parseInt(v.properties.num / 12),
      ]);
    },
  },
  watch: {
    forceKey(n) {
      this.doForceHeatMap();
    },
  },
  mounted() {
    this.eventRegsiter();
  },
  methods: {
    eventRegsiter() {
      this.$bus.$on("cesium-3d-panel-bottom", () => {
        this.forceKey = "k1";
      });
    },
    doBlockAnalyse({ k }) {
      this.forceKey = this.forceKey == k ? undefined : k;
    },
    async doForceHeatMap() {
      if (this.forceKey == "k1") {
        const data = await doBlockKey(CESIUM_PEOPLE_BUILDING_SOURCE_OPTION.BUILDING2D);
        const fix_b_data = data.map((v) => {
          return { points: v.geometry.points, id: "build_polygon_" + v.ID };
        });
        this.buildAround = fix_b_data;
        drawBuild(fix_b_data);
      } else {
        this.buildAround && destoryBuild(this.buildAround);
      }
      const heatArr =
        this.forceKey == "k3"
          ? this.keyPersonHeatList
          : this.forceKey == "k2"
          ? this.normalPersonHeatList
          : this.eventHeatList;
      switchHeatMap(this.blocks, this.forceKey, heatArr);
    },
  },
};
</script>

<style lang="less" scoped>
.panel-bottom {
  position: fixed;
  z-index: 5;
  bottom: 2vh;
  left: 45%;
  transform: translateX(-50%);
  color: white;
  > header {
    font-family: YouSheBiaoTiHei;
    font-size: 3vh;
    height: 4vh;
    line-height: 4vh;
    margin-bottom: 2vh;
    box-sizing: border-box;
    padding-left: 2vh;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0.6vh;
      width: 14vh;
      height: 1.6vh;
      z-index: -1;
      background-image: linear-gradient(90deg, #2acbfe 0%, transparent 100%);
      transform: skewX(-30deg);
    }
  }
  > .panel-bottom-ul {
    > li {
      display: inline-block;
      width: 15vh;
      text-align: center;
      cursor: pointer;
      > img {
        width: 6vh;
        filter: grayscale(100%);
      }
      > p {
        font-size: 1.6vh;
        margin-top: 1vh;
      }
      &.active {
        > img {
          filter: grayscale(0%);
        }
        > p {
          color: #6ff4ff;
        }
      }
    }
  }
}
</style>
