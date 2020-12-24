<!--
 * @Author: eds
 * @Date: 2020-09-15 11:04:57
 * @LastEditTime: 2020-09-15 11:05:13
 * @LastEditors: eds
 * @Description:
 * @FilePath: \wz-city-culture-tour\src\components\sourcelayer\commonFrame\SceneSwitch\SceneSwitch.vue
-->
<template>
  <div class="scene-switch">
    <div class="btn">
      <RangeSource />
    </div>
    <div class="btn">
      <InfoSource />
    </div>
    <!-- <div class="btn">
      <GridSource />
    </div> -->
    <div class="btn" @click="changeCameraMode">
      <img src="/static/images/mode-ico/camera-ico@2x.png" />
      <span>{{ cameraLabel }}</span>
    </div>
    <SearchBox ref="searchBox" />
  </div>
</template>

<script>
import SearchBox from "components/sourcelayer/layerHub/searchBox";
import RangeSource from "./RangeSource";
import GridSource from "./GridSource";
import InfoSource from "./InfoSource";
import { ServiceUrl } from "config/server/mapConfig";
import { mapGetters, mapActions } from "vuex";
import {
  CenterPoint,
  CenterPoint2D,
  angle3d,
  angle25d,
} from "mock/overview.js";

export default {
  name: "sceneSwitch",
  data() {
    return {
      CenterPoint,
      CenterPoint2D,
      gridImage: undefined,
      gridImageShow: false,
      height: 2000,
    };
  },
  components: {
    SearchBox,
    RangeSource,
    GridSource,
    InfoSource,
  },
  computed: {
    ...mapGetters("map", ["cameraMode"]),
    cameraLabel() {
      return this.cameraMode ? "立体地图" : "仿真地图";
    },
  },
  watch: {
    cameraMode(n) {
      this.cameraMove();
    },
  },
  methods: {
    ...mapActions("map", ["SetNightMode", "SetCameraMode"]),
    changeCameraMode() {
      this.SetCameraMode(!this.cameraMode);
    },
    doGridImage() {
      if (this.gridImageShow) {
        this.gridImage
          ? (this.gridImage.show = true)
          : (this.gridImage = window.earth.imageryLayers.addImageryProvider(
              new Cesium.SuperMapImageryProvider({
                url: ServiceUrl.GridImage,
                name: "grid",
              })
            ));
      } else {
        this.gridImage.show = false;
      }
    },
    /**
     * @param {boolean} cameraMode
     *  true 2.5d
     *  false 3d
     */
    cameraMove() {
      const viewer = window.earth;
      //  视角计算
      if (this.cameraMode) {
        const { x, y } = this.fetchLngLat(
          viewer.scene.globe.pick(
            viewer.camera.getPickRay(
              new Cesium.Cartesian2(
                document.body.clientWidth / 2,
                document.body.clientHeight / 2
              )
            ),
            viewer.scene
          )
        );
        window.earth.camera.flyTo({
          destination: new Cesium.Cartesian3.fromDegrees(x, y, this.height),
          orientation: angle25d,
        });
        /**
         * 2.5维，关闭额外图层
         */
        this.$bus.$emit("cesium-grid-source-off");
      }

      // //  地图要素开关
      // window.datalayer.show = !this.cameraMode;
      window.wmts25d.show = this.cameraMode;
      window.earth.scene.getVectorTilesLayer("PXS25dMVT").show = true;
      window.earth.scene.bloomEffect.show = !this.cameraMode;
      // window.earth.scene.layers.find("RIVER").visible = !this.cameraMode;
      ServiceUrl.WZBaimo.map(({ KEY }) => {
        window.earth.scene.layers.find(KEY).visible = !this.cameraMode;
      });
    },
    fetchLngLat({ x, y, z }) {
      const viewer = window.earth;
      const ellipsoid = viewer.scene.globe.ellipsoid;
      const cartesian3 = new Cesium.Cartesian3(x, y, z);
      const cartographic = ellipsoid.cartesianToCartographic(cartesian3);
      const lat = Cesium.Math.toDegrees(cartographic.latitude);
      const lng = Cesium.Math.toDegrees(cartographic.longitude);
      return { x: lng, y: lat };
    },
  },
};
</script>

<style lang="less">
@import url("./SceneSwitch.less");
</style>
