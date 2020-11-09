<template>
  <div class="videoCircle" v-if="shallPop">
    <div
      class="vc-popup"
      :style="{ transform: `translate3d(${item.x}px,${item.y + 4}px, 0)` }"
    >
      <div class="popup-container">
        <!-- <div class="remove" @click="removeVideoCircle"></div>
        <div
          :class="['position', rtmpOn ? 'on' : 'off']"
          @click="showVideoCircle"
        ></div>
        <div class="resource" @click="resourceClick"></div> -->
        <div class="warn-point" />
        <div class="red-line" />
        <div class="warn-popup">
          <header>突发事件<span /></header>
          <p>车站大道，发生火灾事件</p>
        </div>
        <div class="blue-line"></div>
        <div class="around-people">
          <header>周边实时人口</header>
          <p>范围：500米</p>
          <p>人数：{{ aroundPopulation.data || "-" }}人</p>
          <p>时间：{{ aroundPopulation.task_time || "-" }}</p>
        </div>
      </div>
    </div>
    <div
      class="transform-video"
      v-if="forceVideo && forceVideo.flv"
      :style="{
        transform: `translate3d(${forceVideo.x}px,${forceVideo.y}px, 0)`,
      }"
    >
      <video-single :url="forceVideo.flv" :name="forceVideo.mp_name" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import VideoSingle from "./videoSingle";
import {
  getRtmpVideoList,
  getRtmpVideoURL,
  getPopulation,
} from "api/cityBrainAPI";
const Cesium = window.Cesium;

export default {
  data() {
    return {
      shallPop: false,
      geometry: { lng: 120.66743, lat: 28.011360000000002 },
      queryRadius: 200,
      aroundPopulation: {},
      item: {},
      entitiesID: [],
      rtmpOn: true,
      forceVideo: undefined,
    };
  },
  computed: {
    ...mapGetters("map", ["rtmpListOther"]),
  },
  components: { VideoSingle },
  mounted() {
    this.eventRegsiter();
    setTimeout(() => {
      this.doDraw();
    }, 2500);
  },
  methods: {
    ...mapActions("map", ["SetRtmpListOther"]),
    eventRegsiter() {
      const that = this;
      this.$bus.$off("cesium-3d-video-circle");
      this.$bus.$on("cesium-3d-video-circle", (layer) => {
        window._POST_MESSAGE_ && this.doDraw();
      });
      // 穿透事件监控视频点
      this.$bus.$off("cesium-3d-video-single");
      this.$bus.$on("cesium-3d-video-single", async (item) => {
        this.forceVideo = undefined;
        await this.openRtmpVideoFrame(item);
      });
    },
    /**
     * 赋值 开视频
     * @param {object} item
     */
    async openRtmpVideoFrame(item) {
      const { mp_name, mp_id } = item;
      const { data } = await getRtmpVideoURL(mp_id.split("videopoint_")[1]);
      this.forceVideo = {
        ...item,
        ...data,
      };
    },
    async doDraw() {
      this.removeVideoCircle();
      this.shallPop = true;
      this.doPopup();
      this.drawVideoCircle(this.geometry, this.queryRadius);
      this.aroundPopulation = await getPopulation(this.geometry);
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
      if (this.forceVideo && this.forceVideo.flv) {
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
    async drawVideoCircle({ lng, lat }, queryRadius = 200) {
      // setTimeout(() => {
      //   this.cameraMove({ lng, lat, queryRadius });
      // }, 800);
      // 画圈
      console.log("[drawVideoCircle]", lng, lat, queryRadius);
      const circleEntity = new Cesium.Entity({
        position: Cesium.Cartesian3.fromDegrees(lng, lat, 4),
        ellipse: {
          semiMinorAxis: queryRadius,
          semiMajorAxis: queryRadius,
          height: 4,
          material: new Cesium.ImageMaterialProperty({
            image: "/static/images/common/circle.png",
            transparent: true,
          }),
        },
      });
      window.earth.entities.add(circleEntity);
      this.entitiesID.push(circleEntity.id);
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
            4
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
      window.earth.scene.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(
          lng,
          lat -
            (0.008 + (0.002 * queryRadius * (queryRadius / 200) * 1.1) / 100),
          700 + queryRadius * (queryRadius / 200) * 1.2
        ),
        orientation: {
          heading: 0.003336768850279448,
          pitch: -0.5808830390057418,
          roll: 0.0,
        },
      });
    },
    /**
     * 删缓冲区
     * @param {string|number|undefined} 有id删id 没id删全部
     */
    removeVideoCircle() {
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
  width: 35vh;
  height: 23vh;
  position: fixed;
  top: 7vh;
  left: -39vh;
}
.vc-popup {
  position: absolute;
  text-align: center;
  top: -20px;
  left: 0;
  z-index: 2;
  width: 13vh;
  height: 10vh;
  cursor: pointer;
  background-image: url("/static/images/common/fire.gif");
  background-size: 100% 100%;
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
      bottom: 4vh;
      left: 50%;
      transform: translateX(-50%);
    }
    > .red-line {
      background-image: url(/static/images/common/redline.png);
      background-size: 100% 100%;
      height: 10vh;
      width: 6vh;
      bottom: 8vh;
      position: absolute;
      left: 50%;
    }
    > .warn-popup {
      position: absolute;
      top: -8vh;
      right: -19vh;
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
        margin-top: 0.6vh;
        font-size: 1.4vh;
        line-height: 1.4vh;
      }
    }
    > .blue-line {
      background-image: url(/static/images/common/blueline.png);
      background-size: 100% 100%;
      height: 10vh;
      width: 6vh;
      bottom: 8vh;
      position: absolute;
      left: 50%;
      transform: scaleX(-1) translateX(6vh);
    }
    > .around-people {
      position: absolute;
      top: -8vh;
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
