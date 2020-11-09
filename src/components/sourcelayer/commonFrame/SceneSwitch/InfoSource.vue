<!--
 * @Author: eds
 * @Date: 2020-07-07 10:57:45
 * @LastEditTime: 2020-08-22 16:03:43
 * @LastEditors: eds
 * @Description:
 * @FilePath: \wz-city-culture-tour\src\components\map-view\treeTool\infoSource.vue
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
          :default-checked-keys="forceNodeKeys"
          @check="checkChange"
        />
      </div>
      <el-button slot="reference">资源信息</el-button>
    </el-popover>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { CESIUM_TREE_SOURCE_OPTION } from "config/server/sourceTreeOption";
import {
  treeDrawTool,
  fixTreeWithExtra,
} from "components/sourcelayer/layerHub/TreeDrawTool";
import { getIserverFields } from "api/iServerAPI";

export default {
  name: "infoSource",
  data() {
    return {
      sourceURLs: CESIUM_TREE_SOURCE_OPTION,
      forceNodeKeys: ["医疗场所", "派出所"],
    };
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
      immediate: true,
    },
  },
  methods: {
    eventRegsiter() {},
    checkChange() {
      this.forceNodeKeys = [...this.$refs.tree.getCheckedKeys()];
    },
    doForceNodeChange() {
      this.sourceURLs.map((d) => {
        d.children.map((node) => {
          if (~this.forceNodeKeys.indexOf(node.id)) {
            if (node.id && window.billboardMap[node.id]) {
              window.billboardMap[node.id]._billboards.map(
                (v) => (v.show = true)
              );
              window.labelMap[node.id].setAllLabelsVisible(true);
            } else {
              this.getPOIPickedFeature(node);
            }
          } else {
            if (window.billboardMap[node.id]) {
              window.billboardMap[node.id]._billboards.map(
                (v) => (v.show = false)
              );
              window.labelMap[node.id].setAllLabelsVisible(false);
            }
          }
        });
      });
    },
    /**
     * POI fetch
     * @param {object} node
     * @param {function} fn callback hook
     */
    getPOIPickedFeature(node, fn) {
      const { newdataset, url } = node;
      var getFeatureParam, getFeatureBySQLService, getFeatureBySQLParams;
      getFeatureParam = new SuperMap.REST.FilterParameter({
        // attributeFilter: `SMID <= 1000`,
        attributeFilter: `SMID >= 0`,
      });
      getFeatureBySQLParams = new SuperMap.REST.GetFeaturesBySQLParameters({
        queryParameter: getFeatureParam,
        toIndex: -1,
        datasetNames: [newdataset],
      });
      getFeatureBySQLService = new SuperMap.REST.GetFeaturesBySQLService(url, {
        eventListeners: {
          processCompleted: async (res) => {
            const fields = await getIserverFields(url, newdataset);
            treeDrawTool(this, res, node, fields, fn);
          },
          processFailed: (msg) => console.log(msg),
        },
      });
      getFeatureBySQLService.processAsync(getFeatureBySQLParams);
    },
  },
};
</script>

<style lang="less">
</style>