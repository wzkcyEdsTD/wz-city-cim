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
    <div class="btn" @click="changeCameraMode">
      <img src="/static/images/mode-ico/camera-ico@2x.png" />
      <span>{{ cameraLabel }}</span>
    </div>
    <div class="btn">
      <InfoSource />
    </div>
    <div class="btn">
      <GridSource />
    </div>
    <SearchBox ref="searchBox" />
  </div>
</template>

<script>
import SearchBox from "components/sourcelayer/layerHub/searchBox";
import GridSource from "./GridSource";
import InfoSource from "./InfoSource";
import { ServiceUrl } from "config/server/mapConfig";
import { mapGetters, mapActions } from "vuex";
import { CenterPoint, CenterPoint2D } from "mock/overview.js";

export default {
  name: "sceneSwitch",
  data() {
    return {
      CenterPoint,
      CenterPoint2D,
      gridImage: undefined,
      gridImageShow: false,
    };
  },
  components: {
    SearchBox,
    GridSource,
    InfoSource,
  },
  computed: {
    ...mapGetters("map", ["cameraMode"]),
    cameraLabel() {
      return this.cameraMode ? "三维" : "2.5维";
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
    cameraMove() {
      window.earth.camera.flyTo({
        ...(this.cameraMode ? this.CenterPoint2D : this.CenterPoint),
        duration: 1,
      });
      window.datalayer.show = !this.cameraMode;
      window.wmts25d.show = this.cameraMode;
      window.earth.scene.bloomEffect.show = !this.cameraMode;
      window.earth.scene.layers.find("RIVER").visible = !this.cameraMode;
      ServiceUrl.WZBaimo.map(({ KEY }) => {
        window.earth.scene.layers.find(KEY).visible = !this.cameraMode;
      });
    },
  },
};
</script>

<style lang="less">
@import url("./SceneSwitch.less");
</style>
