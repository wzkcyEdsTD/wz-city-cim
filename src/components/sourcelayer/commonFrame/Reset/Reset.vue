<template>
  <div class="reset">
    <img src="/static/images/mode-ico/reset-ico@2x.png" @click="cameraReset" />
    <div class="tool-btn dimension" @click="doDimension()">
      <img
        :src="`/static/images/mode-ico/${mapModel ? '3D' : '2D'}.png`"
      />
    </div>
  </div>
</template>

<script>
import { angle25d,CenterPoint } from "mock/overview.js";
export default {
   data() {
    return {
      degrees: 0,
      mapModel:false,
    };
  },
  methods: {
    // 复位
    cameraReset2() {
      const { x, y } = this.fetchLngLat();
      const height = window.earth.scene.camera.positionCartographic.height;
      // window.earth.camera.flyTo({
      //   destination: new Cesium.Cartesian3.fromDegrees(x, y, height),
      //   orientation: angle25d,
      // })
      console.log(x,y);
      window.earth.camera.flyTo({
        destination:new Cesium.Cartesian3.fromDegrees(
          x,
          y,
          window.earth.scene.camera.positionCartographic.height
        ),
        orientation: {
          heading: 0.6753518662109697,
          pitch: window.earth.scene.camera.pitch-0.1,
          roll: window.earth.scene.camera.roll,
        },
      });
    },

    // cameraReset2() {
    //   const { x, y } = this.fetchLngLat();
    //   const height = window.earth.scene.camera.positionCartographic.height;
    //   window.earth.camera.flyTo({
    //     destination: new Cesium.Cartesian3.fromDegrees(x, y, height),
    //     orientation: angle25d,
    //   });
       
    // },

    cameraReset() {
      const { x, y } = this.fetchLngLat();
      const height = window.earth.scene.camera.positionCartographic.height;
      window.earth.camera.flyTo({
        destination: new Cesium.Cartesian3.fromDegrees(
          x,
          y - height / 98000,
          window.earth.scene.camera.positionCartographic.height
        ),
        orientation: { ...angle25d, pitch: window.earth.scene.camera.pitch },
      });
    },

    // 维度
    doDimension() {
      const model = this.mapModel ? false : true;
      this.mapModel = model;
      if (!model) {
        window.earth.camera.flyTo({ ...CenterPoint });
        return;
      }

      const { x, y } = this.fetchLngLat();
      window.earth.camera.flyTo({
        destination: new Cesium.Cartesian3.fromDegrees(x, y, 2000),
        orientation: {
          heading: 0,
          pitch: -1.569945592292223,
          roll: 0,
        },
      });
    },

    fetchLngLat() {
      const viewer = window.earth;
      const { x, y, z } = viewer.scene.globe.pick(
        viewer.camera.getPickRay(
          new Cesium.Cartesian2(
            document.body.clientWidth / 2,
            document.body.clientHeight / 2
          )
        ),
        viewer.scene
      );
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

<style lang="less" scoped>
.reset {
  position: absolute;
  height: auto;
  top: 15vh;
  left: 37vh;
  // transform: translateX(-50%);
  z-index: 5;
  cursor: pointer;

  img {
    width: 4.5vh;
  }
}
</style>
