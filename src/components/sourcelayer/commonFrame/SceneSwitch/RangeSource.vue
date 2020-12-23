<!--
 * @Author: eds
 * @Date: 2020-07-07 10:57:45
 * @LastEditTime: 2020-08-22 16:03:43
 * @LastEditors: eds
 * @Description:
 * @FilePath: \wz-city-culture-tour\src\components\map-view\treeTool\rangeSource.vue
-->
<template>
  <div class="map-popup-frame">
    <el-popover placement="bottom-left" trigger="hover">
      <div class="source-tree">
        <el-tree
          ref="tree"
          :data="sourceURLs"
          node-key="id"
          default-expand-all
          @node-click="doRange"
        />
      </div>
      <el-button slot="reference">蒲鞋市街道</el-button>
    </el-popover>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { CenterPoint, CenterPoint_JKQ_XH } from "mock/overview.js";

export default {
  name: "rangeSource",
  data() {
    return {
      sourceURLs: [
        {
          label: "温州市",
          children: [
            {
              label: "鹿城区",
              children: [{ label: "蒲鞋市街道", id: "jd_pxs" }],
            },
            {
              label: "经济技术开发区",
              children: [{ label: "星海街道", id: "jkq_xh" }],
            },
          ],
        },
      ],
      camera: {
        jd_pxs: CenterPoint,
        jkq_xh: CenterPoint_JKQ_XH,
      },
    };
  },
  mounted() {
    this.eventRegsiter();
  },
  methods: {
    eventRegsiter() {},
    doRange(node) {
      window.earth.scene.camera.flyTo({
        ...this.camera[node.id],
        maximumHeight: 450,
      });
    },
  },
};
</script>

<style lang="less">
</style>