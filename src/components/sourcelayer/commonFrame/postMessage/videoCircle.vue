<template>
  <div
    class="videoCircle"
    v-if="(shallPop && eventForce) || (shallPop && firstEventForce)"
  >
    <div
      class="vc-popup"
      :style="{ transform: `translate3d(${item.x}px,${item.y + 4}px, 0)` }"
      v-if="eventForce"
    >
      <div class="popup-container">
        <div class="warn-point" />
        <div class="red-line" />
        <div class="warn-popup">
          <header>突发事件<span /></header>
          <p>{{ eventForce.SUBJECT }}</p>
        </div>
      </div>
    </div>
    <div
      class="vc-popup"
      :style="{ transform: `translate3d(${item.x}px,${item.y + 4}px, 0)` }"
      v-else
    >
      <div class="popup-container">
        <div class="warn-point" />
        <div class="red-line" />
        <div class="warn-popup">
          <header>突发事件<span /></header>
          <p>{{ firstEventForce.SUBJECT }}</p>
        </div>
      </div>
    </div>
    <div
      class="transform-video"
      v-if="forceVideo"
      :style="{
        transform: `translate3d(${forceVideo.x}px,${forceVideo.y}px, 0)`,
      }"
    >
      <video-single :forceVideo="forceVideo" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import VideoSingle from "./videoSingle";
import { getRtmpVideoList } from "api/cityBrainAPI";
import { angle3d, angle25d } from "mock/overview.js";
const Cesium = window.Cesium;

export default {
  data() {
    return {
      shallPop: false,
      geometry: { lng: 120.67743, lat: 28.011360000000002 },
      queryRadius: 200,
      item: {},
      entitiesID: [],
      rtmpOn: true,
      forceVideo: undefined,
      firstEventForce: undefined,
    };
  },
  computed: {
    ...mapGetters("map", ["rtmpListOther", "eventForce", "cameraMode"]),
  },
  watch: {
    eventForce: {
      handler(n) {
        !n && this.removeVideoCircle();
      },
      deep: true,
    },
  },
  components: { VideoSingle },
  mounted() {
    this.eventRegsiter();
  },
  methods: {
    ...mapActions("map", ["SetRtmpListOther"]),
    eventRegsiter() {
      const that = this;
      this.$bus.$off("emergency-simulate");
      this.$bus.$on("emergency-simulate", ({ LON, LAT }) => {
        this.geometry = { lng: LON, lat: LAT };
        this.removeVideoCircle();
        this.$nextTick(() => {
          this.doDraw();
        });
      });
      
      // 穿透事件监控视频点
      this.$bus.$off("cesium-3d-video-single");
      this.$bus.$on("cesium-3d-video-single", async (item) => {
        this.forceVideo = undefined;
        this.$nextTick(() => {
          this.forceVideo = item;
        });
      });

      // 初始展示今日事件
      this.$bus.$off("emergency-simulate-first");
      this.$bus.$on("emergency-simulate-first", (data) => {
        const { LON, LAT } = data;
        this.geometry = { lng: LON, lat: LAT };
        this.$nextTick(() => {
          this.firstEventForce = data;
          this.shallPop = true;
        });
      });
    },
    /**
     * 关视频
     */
    closeVideo() {
      this.forceVideo = undefined;
    },
    async doDraw() {
      this.removeVideoCircle();
      // this.doPopup();
      this.drawVideoCircle(this.geometry, this.queryRadius);
      this.cameraMove({ ...this.geometry, queryRadius: this.queryRadius });
      this.shallPop = true;
    },
    doPopup() {
      let position = Cesium.Cartesian3.fromDegrees(
        this.geometry.lng,
        this.geometry.lat,
        0
      );
      let pointToWindow = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
        window.earth.scene,
        position
      );
      if (pointToWindow) {
        this.item = {
          x: pointToWindow.x - $(".vc-popup").width() / 2,
          y: pointToWindow.y - $(".vc-popup").height() / 2,
        };
      }
      if (this.forceVideo) {
        const forceVideoToWindow = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
          window.earth.scene,
          Cesium.Cartesian3.fromDegrees(
            parseFloat(this.forceVideo.geometry.lng),
            parseFloat(this.forceVideo.geometry.lat),
            0
          )
        );
        this.forceVideo = {
          ...this.forceVideo,
          x: forceVideoToWindow.x,
          y: forceVideoToWindow.y - $(".transform-video").height() / 2,
        };
      }
    },
    /**
     * 画缓冲区
     * @param {string!|number!} 没id不画
     * @param {geometry!} 没geometry不画
     * @param {queryRadius!} 监控点查询半径
     */
    async drawVideoCircle({ lng, lat }, queryRadius = 200, period = 2.0) {
      // 画圈
      window.earth.scene.scanEffect.show = true;
      window.earth.scene.scanEffect.color = Cesium.Color.fromCssColorString(
        "rgba(255,255,255,0.3)"
      );
      window.earth.scene.scanEffect.mode = Cesium.ScanEffectMode.CIRCLE;
      window.earth.scene.scanEffect.centerPostion = new Cesium.Cartesian3.fromDegrees(
        lng,
        lat,
        1
      );
      window.earth.scene.scanEffect.speed = queryRadius / period;
      window.earth.scene.scanEffect.period = period;
      //  监控文字
      const circleLabelEntity = new Cesium.Entity({
        position: Cesium.Cartesian3.fromDegrees(lng, lat, 200),
        label: {
          text: `周边${queryRadius}米内监控`,
          fillColor: Cesium.Color.WHITE,
          outlineColor: Cesium.Color.BLACK,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          font: "10px",
          scale: 1,
          outlineWidth: 4,
          showBackground: true,
          backgroundColor: Cesium.Color(0.165, 0.165, 0.165, 0.1),
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
            0,
            10000
          ),
          eyeOffset: new Cesium.Cartesian3(0.0, -260.0, 0),
          scaleByDistance: new Cesium.NearFarScalar(5000, 1, 10000, 0.5),
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
        },
        name: "videoCircleLabel",
      });
      window.earth.entities.add(circleLabelEntity);
      this.entitiesID.push(circleLabelEntity.id);

      // 画监控点
      const { data } = await getRtmpVideoList({ lng, lat }, queryRadius);
      this.SetRtmpListOther(data);
      data.forEach((item) => {
        const videoPointEntity = new Cesium.Entity({
          id: `videopoint_${item.mp_id}`,
          position: Cesium.Cartesian3.fromDegrees(
            Number(item.lng),
            Number(item.lat),
            1
          ),
          geometry: { lng: item.lng, lat: item.lat },
          billboard: {
            image: "/static/images/map-ico/视频监控.png",
            width: 50,
            height: 50,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
          },
          name: item.mp_name,
        });
        window.earth.entities.add(videoPointEntity);
        this.entitiesID.push(videoPointEntity.id);
      });
    },
    /**
     * 相机跳转
     * @param {object} geometry
     */
    cameraMove({ lng, lat, queryRadius }) {
      console.log(this.cameraMode);
      window.earth.scene.camera.flyTo(
        this.cameraMode
          ? {
              destination: Cesium.Cartesian3.fromDegrees(lng, lat, 1000),
              orientation: angle25d,
            }
          : {
              destination: Cesium.Cartesian3.fromDegrees(
                lng + 0.001,
                lat -
                  (0.0013 +
                    (0.001 * queryRadius * (queryRadius / 200) * 1.1) / 100),
                200 + queryRadius * (queryRadius / 200) * 0.5
              ),
              orientation: angle3d,
            }
      );
    },
    /**
     * 删缓冲区
     * @param {string|number|undefined} 有id删id 没id删全部
     */
    removeVideoCircle() {
      this.closeVideo();
      window.earth.scene.scanEffect.show = false;
      this.entitiesID.forEach((item) => {
        window.earth.entities.removeById(item);
      });
      this.shallPop = false;
      this.entitiesID = [];
    },
    /**
     * 显隐视频点
     */
    showVideoCircle() {
      const now_rtmpOn = !this.rtmpOn;
      this.entitiesID.forEach((item, index) => {
        index != 0 && (window.earth.entities.getById(item).show = now_rtmpOn);
      });
      this.rtmpOn = now_rtmpOn;
    },
    resourceClick() {
      this.$bus.$emit("cesium-3d-videoPointClick", {
        mp_id: `videopoint_${this.rtmpListOther[0].mp_id}`,
        mp_name: this.rtmpListOther[0].mp_name,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.transform-video {
  width: 40vh;
  height: 27vh;
  position: fixed;
  top: 9vh;
  left: -44vh;
  z-index: 3;
}
.vc-popup {
  position: absolute;
  text-align: center;
  top: -20px;
  left: 0;
  z-index: 2;
  width: 13vh;
  height: 0;
  cursor: pointer;
  // background-image: url("/static/images/common/fire.gif");
  // background-size: 100% 100%;
  .popup-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    > .warn-point {
      background-image: url(/static/images/common/warn-point.png);
      width: 6vh;
      height: 6vh;
      background-size: 100% 100%;
      z-index: 12;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
    > .red-line {
      background-image: url(/static/images/common/redline.png);
      background-size: 100% 100%;
      height: 10vh;
      width: 6vh;
      bottom: 0;
      position: absolute;
      left: 50%;
    }
    > .warn-popup {
      position: absolute;
      top: -10vh;
      right: -19vh;
      width: 20vh;
      color: white;
      border: 1px solid red;
      background: linear-gradient(
        to bottom,
        rgba(255, 0, 0, 0.6),
        rgba(0, 0, 0, 0.6)
      );
      padding: 1vh 2vh 2vh;
      text-align: left;
      > header {
        font-size: 2.2vh;
        line-height: 1.8vh;
        font-family: YouSheBiaoTiHei;
        * {
          vertical-align: middle;
        }
        > span {
          display: inline-block;
          background-image: url(/static/images/common/warn.png);
          background-size: 100% 100%;
          height: 3.2vh;
          width: 3.2vh;
        }
      }
      > p {
        font-size: 1.4vh;
        line-height: 1.8vh;
      }
    }
    > .blue-line {
      background-image: url(/static/images/common/blueline.png);
      background-size: 100% 100%;
      height: 10vh;
      width: 6vh;
      bottom: 0;
      position: absolute;
      left: 50%;
      transform: scaleX(-1) translateX(6vh);
    }
    > .around-people {
      position: absolute;
      top: -10vh;
      width: 23vh;
      left: -22vh;
      color: white;
      border: 1px solid blue;
      background: linear-gradient(
        to bottom,
        rgba(0, 81, 255, 0.6),
        rgba(0, 0, 0, 0.6)
      );
      padding: 1vh 2vh 2vh;
      text-align: left;
      > header {
        font-size: 2.2vh;
        line-height: 2.2vh;
        font-family: YouSheBiaoTiHei;
      }
      > p {
        margin-top: 0.6vh;
        font-size: 1.4vh;
        line-height: 1.4vh;
      }
    }
    .remove,
    .resource {
      width: 50px;
      height: 101px;
      // font-family: YouSheBiaoTiHei;
      // font-size: 14px;
      // color: #fff;
      // writing-mode: vertical-lr;
    }
    .remove {
      .bg-image("/static/images/common/VC-remove-bg");
    }
    .position {
      width: 30px;
      height: 30px;
      &.on {
        .bg-image("/static/images/common/my-position-on");
      }
      &.off {
        .bg-image("/static/images/common/my-position-off");
      }
    }
    .resource {
      .bg-image("/static/images/common/VC-show-bg");
    }
  }
}
</style>
