<!--
 * @Author: eds
 * @Date: 2020-07-07 10:57:45
 * @LastEditTime: 2020-08-22 16:03:43
 * @LastEditors: eds
 * @Description:
 * @FilePath: \wz-city-culture-tour\src\components\map-view\treeTool\gridSource.vue
-->
<template>
  <div class="map-popup-frame">
    <el-popover placement="bottom-left" trigger="hover">
      <div class="source-tree">
        <el-tree
          ref="tree"
          :data="sourceURLs"
          show-checkbox
          node-key="id"
          default-expand-all
          @check="checkChange"
        />
      </div>
      <el-button slot="reference">网格叠加</el-button>
    </el-popover>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { ServiceUrl } from "config/server/mapConfig";

export default {
  name: "gridSource",
  data() {
    return { sourceURLs: ServiceUrl.GridSource, forceNodeKeys: [] };
  },
  mounted() {
    this.eventRegsiter();
  },
  watch: {
    forceNodeKeys: {
      handler() {
        this.doForceNodeChange();
      },
      deep: true,
    },
  },
  methods: {
    eventRegsiter() {},
    checkChange() {
      this.forceNodeKeys = [...this.$refs.tree.getCheckedKeys()];
    },
    doForceNodeChange() {
      this.sourceURLs.map((d) => {
        d.children.map(({ id, url }) => {
          if (~this.forceNodeKeys.indexOf(id)) {
            window.gridMap[id]
              ? (window.gridMap[id].show = true)
              : (window.gridMap[
                  id
                ] = window.earth.imageryLayers.addImageryProvider(
                  new Cesium.SuperMapImageryProvider({ url, name: id })
                ));
          } else {
            window.gridMap[id] && (window.gridMap[id].show = false);
          }
        });
      });
    },
  },
};
</script>

<style lang="less">
</style>