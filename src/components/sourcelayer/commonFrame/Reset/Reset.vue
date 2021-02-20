<template>
  <div class="reset">
    <img src="/static/images/mode-ico/reset-ico@2x.png" @click="cameraReset" />
  </div>
</template>

<script>
import { angle3d,angle25d } from "mock/overview.js";
export default {
  methods: {
    // 复位
    cameraReset2() {
      const { x, y } = this.fetchLngLat();
      const height = window.earth.scene.camera.positionCartographic.height;
      window.earth.camera.flyTo({
        destination:new Cesium.Cartesian3.fromDegrees(
          x,
          y,
          window.earth.scene.camera.positionCartographic.height
        ),
        orientation: {
          heading:  window.earth.scene.camera.heading,
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
