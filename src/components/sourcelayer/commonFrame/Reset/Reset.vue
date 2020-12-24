<template>
  <div class="reset">
    <img src="/static/images/mode-ico/reset-ico@2x.png" @click="cameraReset" />
  </div>
</template>

<script>
export default {
  methods: {
    // 复位
    cameraReset() {
      const camera = window.earth.scene.camera;
      console.log(camera);
      window.earth.camera.flyTo({
        destination: camera.position,
        orientation: {
          heading: 0,
          pitch: camera.pitch,
        },
      });
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