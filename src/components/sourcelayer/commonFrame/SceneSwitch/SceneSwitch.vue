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
    <div class="btn" @click="gridImageShow = !gridImageShow">
      <img src="/static/images/icons/station-in.png" />
      <span>{{ gridImageShow ? "取消" : "叠加" }}网格</span>
    </div>
    <SearchBox ref="searchBox" />
  </div>
</template>

<script>
import SearchBox from "components/sourcelayer/layerHub/searchBox";
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
  },
  computed: {
    ...mapGetters("map", ["cameraMode"]),
    cameraLabel() {
      return this.cameraMode ? "2D" : "3D";
    },
  },
  watch: {
    cameraMode(n) {
      this.cameraMove();
    },
    gridImageShow(n) {
      this.doGridImage();
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
    },
  },
};
</script>

<style lang="less">
.scene-switch {
  position: absolute;
  height: auto;
  top: 9vh;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  cursor: pointer;
  * {
    vertical-align: middle;
  }
  .btn {
    display: inline-block;
    padding: 0.4vh 1vh;
    background: rgba(89, 123, 235, 1);
    color: #ffffff;
    border-radius: 2vh;
    margin: 0vh 0.4vh;
    > * {
      vertical-align: middle;
    }
    > img {
      height: 2.2vh;
    }
    > span {
      font-size: 1.6vh;
    }
  }
}
</style>
