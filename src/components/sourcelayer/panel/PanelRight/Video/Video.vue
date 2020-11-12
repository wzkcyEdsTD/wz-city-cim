<template>
  <div class="videoDemoPlayer">
    <div :id="`video_grid_${index}`" class="frequency-pic type1" />
    <div class="refresh-video">
      <img
        src="/static/images/mode-ico/switch-ico@2x.png"
        @click="refreshVideo"
      />
    </div>
  </div>
</template>
<script>
import { getRtmpVideoURL } from "api/cityBrainAPI";
const Aliplayer = window.Aliplayer;
export default {
  name: "Rtsp",
  data() {
    return {
      video: undefined,
      videoTimer: undefined,
    };
  },
  props: ["mp_id", "index"],
  beforeDestroy() {
    this.destroyVideo();
  },
  mounted() {
    this.getVideoURL();
  },
  methods: {
    async refreshVideo() {
      const { data } = await getRtmpVideoURL(this.mp_id);
      this.destroyVideo(() => {
        data && this.initRtmp(data);
      });
    },
    destroyVideo(fn) {
      this.video && this.video.dispose();
      this.video && (this.video = undefined);
      clearInterval(this.videoTimer);
      fn &&
        this.$nextTick(() => {
          fn();
        });
    },
    async getVideoURL() {
      const { data } = await getRtmpVideoURL(this.mp_id);
      data && this.initRtmp(data);
    },
    initRtmp({ flv }) {
      this.video = undefined;
      this.video = new Aliplayer(
        {
          id: `video_grid_${this.index}`,
          source: flv,
          width: "100%",
          height: "100%",
          autoplay: true,
          controlBarVisibility: "hover",
          useFlashPrism: false,
          useH5Prism: true,
        },
        (player) => {
          console.log(this.mp_id, "播放器创建");
          player.mute();
          player.play();
          this.videoTimer = setInterval(() => {
            if (this.video) {
              player && player.play();
            } else {
              clearInterval(this.videoTimer);
            }
          }, 10 * 1000);
        }
      );
    },
  },
};
</script>
<style lang="less" scoped>
.videoDemoPlayer {
  flex: 1;
  overflow: hidden;
  border-radius: 1vh;
  position: relative;
  .refresh-video {
    position: absolute;
    top: 0;
    right: 0;
    width: 4vh;
    padding: 0.4vh;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 0 1vh;
    cursor: pointer;
    z-index: 99;
    > img {
      height: 100%;
      width: 100%;
    }
  }
}
</style>