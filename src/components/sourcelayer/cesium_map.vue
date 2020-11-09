<!--
 * @Author: eds
 * @Date: 2020-08-20 18:52:41
 * @LastEditTime: 2020-09-15 11:01:20
 * @LastEditors: eds
 * @Description:
 * @FilePath: \wz-city-culture-tour\src\components\sourcelayer\cesium_map.vue
-->
<template>
  <div class="cesiumContainer">
    <div id="cesiumContainer" />
    <!-- 气泡框 -->
    <div class="popup-groups">
      <DetailPopup ref="detailPopup" />
    </div>
    <!-- 模块切换 -->
    <!-- <LayerHub ref="layerHub" /> -->
    <!-- 功能组件 -->
    <div v-if="mapLoaded && validated">
      <SceneSwitch />
      <RoadLine ref="roadline" />
      <VideoCircle ref="videoCircle" />
      <RtmpVideo />
      <Population />
    </div>
  </div>
</template>

<script>
import { ServiceUrl } from "config/server/mapConfig";
import LayerHub from "components/sourcelayer/layerHub/layerHub";
import DetailPopup from "components/sourcelayer/commonFrame/Popups/DetailPopup";
import RoadLine from "components/sourcelayer/extraModel/PolylineTrailLink/RoadLine";
import RtmpVideo from "components/sourcelayer/extraModel/RtmpVideo/RtmpVideo";
import Population from "components/sourcelayer/extraModel/Population/Population";
import SceneSwitch from "components/sourcelayer/commonFrame/SceneSwitch/SceneSwitch";
import VideoCircle from "components/sourcelayer/commonFrame/postMessage/videoCircle";
import { CenterPoint } from "mock/overview.js";
import {
  mapConfigInit,
  mapImageLayerInit,
  mapMvtLayerInit,
  mapRiverLayerInit,
  mapBaimoLayerInit,
  mapRoadLampLayerInit,
  mapRoadLampLayerTurn,
} from "components/sourcelayer/cesium_map_init";
import { doValidation } from "api/validation/validation";
import { mapGetters } from "vuex";
const Cesium = window.Cesium;

export default {
  data() {
    return {
      showSubFrame: null,
      showSubHubFrame: "",
      mapLoaded: false,
      validated: true,
      isInfoFrame: false,
      authFailshallPop: false,
    };
  },
  computed: {
    ...mapGetters("map", ["initDataLoaded", "forceTreeLabel"]),
    isOverview() {
      return this.showSubHubFrame == "3d1";
    },
  },
  components: {
    LayerHub,
    DetailPopup,
    RoadLine,
    RtmpVideo,
    Population,
    SceneSwitch,
    VideoCircle,
  },
  created() {
    //  点位信息 hash
    window.featureMap = {};
    //  点位icon hash
    window.billboardMap = {};
    //  点位label hash
    window.labelMap = {};
    //  网格信息
    window.gridMap = {};
  },
  async mounted() {
    await this.init3DMap(() => {
      this.mapLoaded = true;
      this.initPostRender();
      this.initHandler();
    });
    this.eventRegsiter();
  },
  methods: {
    initPostRender() {
      window.earth.scene.postRender.addEventListener(() => {
        if (!window.earth || !this.mapLoaded || !this.validated) return;
        //  *****[indexPoints]  城市总览指标*****
        if (this.isOverview && this.$refs.overview.$refs.overviewNow) {
          this.$refs.overview.$refs.overviewNow.doIndexPoints();
        }
        //  *****[videoCircle]  事件传递点位*****
        if (this.$refs.videoCircle && this.$refs.videoCircle.shallPop) {
          this.$refs.videoCircle.doPopup();
        }
        //  *****[detailPopup]  详情查看点位*****
        if (this.$refs.detailPopup) {
          this.$refs.detailPopup.renderForceEntity();
        }
      });
    },
    initHandler() {
      const handler = new Cesium.ScreenSpaceEventHandler(
        window.earth.scene.canvas
      );
      // 监听左键点击事件
      handler.setInputAction((e) => {
        const pick = window.earth.scene.pick(e.position);
        if (!pick || !pick.id) return;
        if (typeof pick.id == "object") {
          if (pick.id.id && ~pick.id.id.indexOf("videopoint_")) {
            console.log(pick.id.geometry);
            this.$bus.$emit("cesium-3d-video-single", {
              mp_id: pick.id.id,
              mp_name: pick.id.name,
              geometry: pick.id.geometry,
            });
          }
          if (pick.id.id && ~pick.id.id.indexOf("normalpoint_")) {
            this.$bus.$emit("cesium-3d-normalPointClick", {
              mp_id: pick.id.id,
              mp_name: pick.id.name,
            });
          }
        } else if (typeof pick.id == "string") {
          const [_TYPE_, _SMID_, _NODEID_] = pick.id.split("@");
          //  *****[detailPopup]  资源详情点*****
          if (~["label", "billboard"].indexOf(_TYPE_)) {
            this.$refs.detailPopup.getForceEntity({
              ...window.featureMap[_NODEID_][_SMID_],
              position: pick.primitive.position,
            });
          }
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },
    /**
     * 事件注册
     */
    eventRegsiter() {
      this.$bus.$off("cesium-3d-event");
      this.$bus.$on("cesium-3d-event", ({ value }) => {
        this.showSubFrame = value;
      });
      this.$bus.$on("cesium-3d-switch", ({ value }) => {
        this.$bus.$emit("cesium-3d-event", { value: !value ? "3d1" : null });
        ServiceUrl.WZBaimo_OBJ.map(({ KEY }) => {
          const _LAYER_ = window.earth.scene.layers.find(KEY);
          _LAYER_.visible = !value ? false : true;
        });
        //  鼠标缩放限制
        window.earth.scene.screenSpaceCameraController.maximumZoomDistance = !value
          ? 800
          : Infinity;
        //  底图切换
        window.datalayer.show = !value ? false : true;
        window.imagelayer
          ? (window.imagelayer.show = !value ? true : false)
          : !value
          ? (window.imagelayer = mapImageLayerInit(ServiceUrl.SWImage))
          : undefined;
        //  光源显示
        mapRoadLampLayerTurn(!value ? false : true);
        //  河流显示
        window.earth.scene.layers.find("RIVER").visible = !value ? true : false;
        //  历史页面做回调
        this.$bus.$emit("cesium-3d-switch-pass");
      });
      this.$bus.$on("cesium-3d-hub-event", ({ value }) => {
        this.showSubHubFrame = value;
      });
    },
    /**
     * 地图初始化
     * @param {function} fn 回调函数
     */
    async init3DMap(fn) {
      const that = this;
      window.earth = new Cesium.Viewer("cesiumContainer", {
        infoBox: false,
        selectionIndicator: false,
        shadows: false,
        // contextOptions: {
        //   maxDrawingBufferWidth: 15360,
        //   maxDrawingBufferHeight: 4320,
        // },
        // terrainShadows: Cesium.ShadowMode.ENABLED,
        // shouldAnimate: true,
        // terrainProvider: Cesium.createWorldTerrain(),
      });
      //  地图配置
      mapConfigInit();
      //  相机位置
      this.cameraMove();
      //  大数据地图
      window.datalayer = mapImageLayerInit(ServiceUrl.DataImage);
      //  地图注记
      // const mapMvt = mapMvtLayerInit("mapMvt", ServiceUrl.YJMVT);
      //  水面
      await mapRiverLayerInit("RIVER", ServiceUrl.STATIC_RIVER);
      //  白模叠加
      await mapBaimoLayerInit(ServiceUrl.WZBaimo);
      //  路灯、光源叠加
      // mapRoadLampLayerInit();
      //  回调钩子
      fn && fn();
    },
    /**
     * move your fat ass bro
     */
    cameraMove() {
      window.earth.scene.camera.setView(CenterPoint);
    },
  },
};
</script>

<style lang="less">
.cesiumContainer {
  height: 100%;
  width: 100%;
  #cesiumContainer {
    height: 100%;
    width: 100%;
    // color: rgb(42, 104, 163);
  }
}
.mapCover {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 8;
}
.cesium-viewer-navigationContainer {
  display: none;
}
</style>
