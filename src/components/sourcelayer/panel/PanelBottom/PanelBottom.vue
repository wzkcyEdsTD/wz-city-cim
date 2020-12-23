<template>
  <div class="panel-bottom">
    <header>高热区分析</header>
    <ul class="panel-bottom-ul">
      <li
        :class="{ active: item.k == forceKey }"
        v-for="(item, i) in blocks"
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
import { switchHeatMap, doHeatMap } from "./HeatMap";
import keyPersonList from "mock/PXS_KEY_PERSONS";
import normalPersonList from "mock/PXS_NORMAL_PERSONS";

export default {
  name: "panelBottom",
  data() {
    return {
      forceKey: undefined,
      blocks: [
        { label: "管辖重点", k: "k1" },
        { label: "人口集聚", k: "k2" },
        { label: "重点人员密集区", k: "k3", ava: true },
        { label: "事件高发区", k: "k4" },
      ],
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
  methods: {
    doBlockAnalyse({ k }) {
      this.forceKey = this.forceKey == k ? undefined : k;
    },
    doForceHeatMap() {
      console.log(this.eventHeatList);
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
