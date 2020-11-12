<template>
  <div class="page-map">
    <layer-header />
    <div class="cesium-map">
      <cesium-map ref="cesiumMap" />
    </div>
    <panel />
  </div>
</template>
<script>
import CesiumMap from "components/sourcelayer/cesium_map";
import Panel from "components/sourcelayer/panel/Panel";
import LayerHeader from "./layerHeader";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "sourcelayer",
  mounted() {
    this.eventRegsiter();
  },
  methods: {
    eventRegsiter() {},
  },
  components: {
    CesiumMap,
    LayerHeader,
    Panel,
  },
};
</script>
<style scoped lang="less">
.page-map {
  .map {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    .cover-map {
      width: 100%;
      height: 100%;
    }
  }
  .cesium-map {
    height: 100%;
    width: 100%;
  }
  .box {
    z-index: 2;
  }
  .tree {
    overflow: auto;
  }
}
</style>
