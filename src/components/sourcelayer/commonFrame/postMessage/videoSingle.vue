<template>
  <div class="video-single">
    <header>{{ forceVideo.mp_name }}<i class="close" @click="closeVideo"></i></header>
    <div class="blue-tip" />
    <div class="video-frame">
      <div id="player-con-1" class="frequency-pic type1" />
    </div>
  </div>
</template>
<script>
const Aliplayer = window.Aliplayer;
import { getRtmpVideoURL } from "api/cityBrainAPI";
import CIM_API from "api/cimAPI";
export default {
  data() {
    return {
      video: undefined,
    };
  },
  props: ["forceVideo"],
  beforeDestroy() {
    this.video.dispose();
    this.video = undefined;
  },
  async mounted() {
    const data =
      this.forceVideo.mp_name == "DA8上陡门12组团-9幢"
        ? await CIM_API.getExtraVideo({ MpID: "122213000100000561003896", FCode: "9" })
        : await this.openRtmpVideoFrame();
    console.log(data);
    this.initRtmp(data);
  },
  methods: {
    /**
     * 赋值 开视频
     * @param {object} item
     */
    async openRtmpVideoFrame() {
      const { mp_name, mp_id } = this.forceVideo;
      const { data } = await getRtmpVideoURL(mp_id.split("videopoint_")[1]);
      return {
        ...this.forceVideo,
        ...data,
      };
    },
    closeVideo() {
      this.$parent.closeVideo();
    },
    initRtmp({ flv, mp_name }) {
      this.video = new Aliplayer(
        {
          id: "player-con-1",
          width: "100%",
          height: "100%",
          autoplay: true,
          source: flv,
          muted: true,
        },
        function (player) {
          //先静音然后播放
          player.mute();
          player.play();
          // player.requestFullScreen();
          console.log("播放器创建好了！");
        }
      );
    },
  },
};
</script>
<style lang="less">
.video-single {
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  > header {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    text-align: right;
    line-height: 2vh;
    height: 2.4vh;
    position: relative;
    color: white;
    text-shadow: black 2px 2px 3px;
    position: relative;
    margin-bottom: 0.8vh;
    box-sizing: border-box;
    padding-right: 3.4vh;
    &::before {
      content: "";
      position: absolute;
      bottom: 0;
      right: 0.6vh;
      width: 14vh;
      height: 1.6vh;
      z-index: -1;
      background-image: -webkit-gradient(
        linear,
        left top,
        right top,
        from(#2acbfe),
        to(transparent)
      );
      background-image: linear-gradient(to left, #2acbfe, transparent);
      -webkit-transform: skewX(-30deg);
      transform: skewX(30deg);
    }
    .close {
      width: 2vh;
      height: 2vh;
      margin-left: 0.4vh;
      display: inline-block;
      position: absolute;
      right: 1vh;
      .bg-image("/static/images/icons/zoom-in");
      transform: rotate(-45deg);
      transition: all 0.1s linear;
      cursor: pointer;
      z-index: 10;

      &:hover {
        transform: rotate(45deg);
      }
    }
    * {
      vertical-align: middle;
    }
  }
  > .blue-tip {
    background-image: url(/static/images/common/blue-tip.png);
    background-size: 100% 100%;
    position: absolute;
    width: 3vh;
    height: 1.6vh;
    right: -3vh;
    top: 0.6vh;
  }
  > .video-frame {
    flex: 1;
    box-sizing: border-box;
    padding: 1vh;
    background: linear-gradient(to bottom, rgba(86, 200, 229, 0.6), rgba(0, 0, 0, 0.4));
    border: 1px rgb(120, 194, 243) solid;
  }
}
</style>
