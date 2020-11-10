<!--
 * @Author: eds
 * @Date: 2020-07-07 10:57:45
 * @LastEditTime: 2020-09-15 11:07:30
 * @LastEditors: eds
 * @Description:
 * @FilePath: \wz-city-culture-tour\src\components\sourcelayer\treeTool\TreeTool.vue
-->
<template>
  <div class="search-box">
    <div class="searchHeader">
      <div class="button-item">
        <i class="icon-common icon-search" @click="searchFilter"></i>
      </div>
      <el-input
        v-model="searchText"
        class="searchFilterInput"
        placeholder="门牌地址搜索"
        size="small"
        @keyup.enter.native="searchFilter"
      />
      <div class="button-container">
        <div class="button-item">
          <i class="icon-common icon-clear" @click="searchClear"></i>
        </div>
      </div>
    </div>
    <div class="btn" @click="searchFilter">
      <span>搜索</span>
    </div>
    <div class="result-wrapper" v-if="searchBoxResult">
      <ul class="result-list" v-show="searchResult.length">
        <li
          class="result-item"
          v-for="(item, i) in searchResult"
          :key="i"
          @click="resultCheck(item)"
        >
          {{ item.result }}
        </li>
      </ul>
      <div class="result-no-result" v-show="!searchResult.length">
        无查询结果
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getAddressList } from "api/addressAPI";
const Cesium = window.Cesium;
const iconId = "address-location";
export default {
  name: "searchBox",
  data() {
    return {
      iconId,
      searchBoxResult: false,
      searchText: "",
      searchResult: [],
    };
  },
  computed: {
    ...mapGetters("map", []),
  },
  async mounted() {
    this.eventRegsiter();
  },
  methods: {
    eventRegsiter() {},
    toogleVisible(b) {
      this.searchBoxResult = b;
    },
    searchClear() {
      this.searchText = "";
      this.searchResult = [];
      this.toogleVisible(false);
      window.earth.entities.removeById(this.iconId);
    },
    async searchFilter() {
      if (!this.searchText) return;
      const { records } = await getAddressList(this.searchText);
      this.searchResult = records;
      this.toogleVisible(true);
    },
    resultCheck({ lng, lat, result }) {
      window.earth.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(lng, lat - 0.005, 450),
        orientation: {
          heading: 0.003336768850279448,
          pitch: -0.5808830390057418,
          roll: 0.0,
        },
        maximumHeight: 450,
        duration : 1
      });
      window.earth.entities.removeById(this.iconId);
      const addressLocationEntity = new Cesium.Entity({
        id: this.iconId,
        position: Cesium.Cartesian3.fromDegrees(Number(lng), Number(lat), 4),
        geometry: { lng, lat },
        billboard: {
          image: "/static/images/common/address-location.png",
          width: 36,
          height: 45,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
        },
        label: {
          text: result,
          fillColor: Cesium.Color.WHITE,
          outlineColor: Cesium.Color.BLUE,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          font: "11px",
          scale: 1,
          outlineWidth: 2,
          pixelOffset: new Cesium.Cartesian2(0, -40),
          scaleByDistance: new Cesium.NearFarScalar(5000, 1, 10000, 0.5),
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
        },
      });
      window.earth.entities.add(addressLocationEntity);
    },
  },
};
</script>

<style lang="less">
@import url("./searchBox.less");
</style>
