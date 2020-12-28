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
    <!-- 弹出框 -->
    <div class="force-frames">
      <ForceBuilding ref="forceBuilding" />
      <ModelBuilding ref="modelBuilding" />
    </div>
    <!-- 功能组件 -->
    <div v-if="mapLoaded && validated">
      <SceneSwitch />
      <RoadLine ref="roadline" />
      <VideoCircle ref="videoCircle" />
      <RtmpVideo />
      <Population />
      <Overview ref="overview" />
      <WalkMan ref="walkMan" />
      <Reset ref="reset" />
    </div>
  </div>
</template>

<script>
import { ServiceUrl } from "config/server/mapConfig";
import DetailPopup from "components/sourcelayer/commonFrame/Popups/DetailPopup";
import RoadLine from "components/sourcelayer/extraModel/PolylineTrailLink/RoadLine";
import RtmpVideo from "components/sourcelayer/extraModel/RtmpVideo/RtmpVideo";
import Population from "components/sourcelayer/extraModel/Population/Population";
import SceneSwitch from "components/sourcelayer/commonFrame/SceneSwitch/SceneSwitch";
import VideoCircle from "components/sourcelayer/commonFrame/postMessage/videoCircle";
import ForceBuilding from "components/sourcelayer/commonFrame/ForceBuilding/ForceBuilding";
import ModelBuilding from "components/sourcelayer/commonFrame/ModelBuilding/ModelBuilding";
import WalkMan from "components/sourcelayer/extraModel/WalkMan/WalkMan";
import Reset from "components/sourcelayer/commonFrame/Reset/Reset";
import { CenterPoint } from "mock/overview.js";
import {
  mapConfigInit,
  mapImageLayerInit,
  mapMvtLayerInit,
  mapRiverLayerInit,
  mapBaimoLayerInit,
  mapWmtsLayerInit,
} from "components/sourcelayer/cesium_map_init";
import { doValidation } from "api/validation/validation";
import { mapGetters, mapActions } from "vuex";
import Overview from "./extraModel/Overview/Overview.vue";
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
      sourceURLs: ServiceUrl.GridSource,
      sourceURLPxs: ServiceUrl.GridPxs,
    };
  },
  computed: {
    ...mapGetters("map", ["initDataLoaded", "forceTreeLabel", "gridMode"]),
  },
  components: {
    DetailPopup,
    RoadLine,
    RtmpVideo,
    Population,
    SceneSwitch,
    VideoCircle,
    Overview,
    ForceBuilding,
    ModelBuilding,
    WalkMan,
    Reset,
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
    //  热力图信息
    window.heatMap = {};
  },
  async mounted() {
    await this.init3DMap(() => {
      this.mapLoaded = true;
      this.initPostRender();
      this.initClickHandler();
      this.initZoomHandler();
      this.initEntityHandler();
    });
    this.eventRegsiter();
  },
  methods: {
    ...mapActions("map", ["getEventList", "getEventLog", "setEventForce"]),

    initPostRender() {
      window.earth.scene.postRender.addEventListener(() => {
        if (!window.earth || !this.mapLoaded || !this.validated) return;
        //  *****[indexPoints]  城市总览指标*****
        if (this.$refs.overview.$refs.overviewNow) {
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
    initEntityHandler() {
      window.earth.selectedEntityChanged.addEventListener((entity) => {
        const layerID = "pxs25d@pxs25d";
        if (!entity || !entity.pickResult || entity.pickResult.layerID != layerID) return;
        const properties = entity.pickResult[layerID][0].feature.properties;
        console.log(properties.OBJECTID);
        properties && this.$refs.forceBuilding.doForce(properties);
      });
    },
    initClickHandler() {
      const handler = new Cesium.ScreenSpaceEventHandler(window.earth.scene.canvas);
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
          if (
            pick.id.id &&
            (~pick.id.id.indexOf("build_polygon") ||
              ~pick.id.id.indexOf("highLight_region"))
          ) {
            const { x, y } = this.fetchLngLat(e.position);
            this.$bus.$emit("cesium-3d-pick-model", { x, y });
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
          if (pick.primitive.name == "WZBaimo_POINT_AROUND") {
            const { x, y } = this.fetchLngLat(e.position);
            this.$bus.$emit("cesium-3d-pick-model", { x, y });
          }
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },

    // 监听缩放
    initZoomHandler() {
      this.changeGrid();
      window.earth.scene.camera.moveEnd.addEventListener(() => {
        this.changeGrid();
      });
    },

    // 根据高度获取网格Id
    getIdFromHeight(height) {
      return height > 2500 ? "lcjz" : height <= 2500 && height > 1000 ? "pxscs" : "";
    },

    // 网格
    changeGrid() {
      const height = Math.ceil(window.earth.scene.camera.positionCartographic.height);
      const curId = this.getIdFromHeight(height);
      this.sourceURLs.map((d) => {
        d.children.map(({ id, url }) => {
          if (id == curId) {
            window.gridMap[id]
              ? (window.gridMap[id].show = true)
              : (window.gridMap[id] = window.earth.imageryLayers.addImageryProvider(
                  new Cesium.SuperMapImageryProvider({ url, name: id })
                ));
          } else if (id != "pxswg") {
            window.gridMap[id] && (window.gridMap[id].show = false);
          }
        });
      });
      if (this.gridMode) {
        const id = "pxswg";
        window.gridMap[id]
          ? (window.gridMap[id].show = true)
          : (window.gridMap[id] = window.earth.imageryLayers.addImageryProvider(
              new Cesium.SuperMapImageryProvider({ url: this.sourceURLPxs, name: id })
            ));
      }
    },
    /**
     * @param {object} position 位置信息
     */
    fetchLngLat(position) {
      const { x, y, z } = window.earth.scene.globe.pick(
        window.earth.camera.getPickRay(new Cesium.Cartesian2(position.x, position.y)),
        window.earth.scene
      );
      const ellipsoid = window.earth.scene.globe.ellipsoid;
      const cartesian3 = new Cesium.Cartesian3(x, y, z);
      const cartographic = ellipsoid.cartesianToCartographic(cartesian3);
      const lat = Cesium.Math.toDegrees(cartographic.latitude);
      const lng = Cesium.Math.toDegrees(cartographic.longitude);
      return { x: lng, y: lat };
    },
    /**
     * 事件注册
     */
    eventRegsiter() {},
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
        shouldAnimate: true,
      });
      //  地图配置
      mapConfigInit();
      //  相机位置
      this.cameraMove();
      //  大数据地图
      window.datalayer = mapImageLayerInit(ServiceUrl.DataImage);
      //  2.5d
      window.wmts25d = mapWmtsLayerInit("wmts25d", ServiceUrl.WmtsImage);
      window.wmts25d.show = false;
      //  地图注记
      // const mapMvt = mapMvtLayerInit("mapMvt", ServiceUrl.YJMVT);
      const pxsMvt = mapMvtLayerInit("PXS25dMVT", ServiceUrl.PXS25dMVT, true);
      //  水面
      // await mapRiverLayerInit("RIVER", ServiceUrl.STATIC_RIVER);
      //  白模叠加
      await mapBaimoLayerInit(ServiceUrl.WZBaimo);
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
