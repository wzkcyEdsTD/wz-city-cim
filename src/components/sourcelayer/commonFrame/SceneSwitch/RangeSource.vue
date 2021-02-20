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
      if(node.label=="鹿城区")
      {
        window.earth.scene.camera.flyTo(CenterPoint);
        this.showhidemap(1);
      }else{
        window.earth.scene.camera.flyTo({
          ...this.camera[node.id],
          maximumHeight: 450,
        });
        if (node.id=="jd_pxs") {
          this.showhidemap(0);
        }
      }
    },

    showhidemap(active){
      const LAYERA = window.earth.scene.layers.find("WZBaimo_POINT_AROUND2");
      // const LAYERC = window.earth.scene.layers.find("WZBaimo_POINT_CENTER");
      console.log(active)
      if (active==1) {
        LAYERA.style3D.fillForeColor = new Cesium.Color.fromCssColorString("rgba(82,85,93,1)");
        // LAYERC.style3D.fillForeColor = new Cesium.Color.fromCssColorString("rgba(137,137,137, 1)");
      }else{
        LAYERA.style3D.fillForeColor = new Cesium.Color.fromCssColorString("rgba(137,137,137, 0)");
        // LAYERC.style3D.fillForeColor = new Cesium.Color.fromCssColorString("rgba(137,137,137, 0)");
      }
    }
  },
};
</script>

<style lang="less">
</style>