<template>
  <div class="walk-man" />
</template>

<script>
const MAN_MODEL =
  "http://support.supermap.com.cn:8090/webgl/examples/webgl/SampleData/gltf/man/walk.gltf";
export default {
  name: "walkMan",
  data() {
    return {};
  },
  mounted() {
    // this.initMan();
  },
  methods: {
    initMan() {
      window.walkMans.john = window.earth.entities.add({
        name: "walkManJohn",
        position: new Cesium.Cartesian3.fromDegrees(
          120.690710335282,
          28.021510614585225,
          0
        ),
        model: { uri: MAN_MODEL },
      });
      //   window.earth.flyTo(window.walkMans.john);
      window.earth.camera.lookAt(
        window.walkMans.john.position._value,
        new Cesium.HeadingPitchRange(1.6, 1.2, 30)
      );
      // window.earth.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
    },
  },
};
</script>

<style>
</style>