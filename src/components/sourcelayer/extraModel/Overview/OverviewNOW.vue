<template>
  <div class="overviewNow">
    <div
      v-for="(item, index) in fixIndexPoints"
      :key="index"
      :id="`cityIndex_${index}`"
      class="cityIndex-popup"
      :style="{
        transform: `translate3d(${item.x || 0}px,${item.y || 0 + 4}px, 0)`,
      }"
    >
      <div class="texts move">
        <header>{{ item.SZSQ }}</header>
      </div>
      <div class="imgs">
        <img src="/static/images/common/cloud-line.png" />
      </div>
    </div>
  </div>
</template>

<script>
import PXS_CS_POINTS from "mock/PXS_CS_POINTS.json";
export default {
  name: "overviewNOW",
  data() {
    return {
      fixIndexPoints: [],
      PXS_CS_POINTS,
    };
  },
  mounted() {
    this.eventRegsiter();
  },
  methods: {
    eventRegsiter() {},
    doIndexPoints() {
      const fixIndexPoints = [];
      this.PXS_CS_POINTS.features.map((item, index) => {
        const [x, y] = item.geometry.coordinates;
        const pointToWindow = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
          window.earth.scene,
          Cesium.Cartesian3.fromDegrees(x, y, 0)
        );
        pointToWindow &&
          fixIndexPoints.push({
            ...item.properties,
            x: pointToWindow.x - ($(`#cityIndex_${index}`).width() || 0) / 2,
            y: pointToWindow.y - ($(`#cityIndex_${index}`).height() || 0),
          });
      });
      this.fixIndexPoints = fixIndexPoints;
    },
    initOverview() {
      //  禁用鼠标事件
      this.screenSpaceCameraController(false);
    },
    screenSpaceCameraController(boolean) {
      window.earth.scene.screenSpaceCameraController.enableInputs = boolean;
      window.earth.scene.screenSpaceCameraController.enableLook = boolean;
      window.earth.scene.screenSpaceCameraController.enableRotate = boolean;
      window.earth.scene.screenSpaceCameraController.enableTilt = boolean;
      window.earth.scene.screenSpaceCameraController.enableTranslate = boolean;
      window.earth.scene.screenSpaceCameraController.enableZoom = boolean;
    },
  },
};
</script>

<style lang="less">
.overviewNow {
  .cityIndex-popup {
    position: absolute;
    text-align: center;
    top: -20px;
    left: 0;
    cursor: pointer;
    .texts {
      margin-bottom: 1vh;
      > header {
        color: #2acbfe;
        font-weight: bold;
        font-size: 1.8vh;
        text-shadow: 3px 4px 4px #000000;
      }
    }
    .imgs {
      text-align: center;
      > img:first-child {
        width: 2.2vh;
      }
      > img:last-child {
        height: 14vh;
      }
    }
    .move {
      animation: heart 1.3s ease-in-out 2.7s infinite alternate;
    }
    @keyframes heart {
      from {
        transform: translate(0, 0);
      }
      to {
        transform: translate(0, 4px);
      }
    }
  }
}
</style>