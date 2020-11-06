<template>
  <div class="video-single">
    <header>{{ name }}</header>
    <div class="blue-tip" />
    <div class="video-frame">
      <div id="player-con-1" class="frequency-pic type1" />
    </div>
  </div>
</template>
<script>
const Aliplayer = window.Aliplayer;
export default {
  data() {
    return {
      video: undefined,
    };
  },
  props: ["url", "name"],
  watch: {
    type: {
      handler(n) {
        this.$nextTick(() => {
          this.initRtmp();
        });
      },
    },
  },
  beforeDestroy() {
    this.video.dispose();
    this.video = undefined;
  },
  mounted() {
    this.initRtmp();
  },
  methods: {
    initRtmp() {
      this.video = undefined;
      this.video = new Aliplayer(
        {
          id: "player-con-1",
          width: "100%",
          height: "100%",
          source: this.url,
          autoplay: true,
          controlBarVisibility: "hover",
          useFlashPrism: false,
          useH5Prism: true,
        },
        (player) => {
          console.log("[h5]播放器创建");
          player.mute();
          player.play();
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
    color: white;
    text-shadow: black 2px 2px 3px;
    position: relative;
    margin-bottom: 0.8vh;
    box-sizing: border-box;
    padding-right: 1.6vh;
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
    background: linear-gradient(
      to bottom,
      rgba(86, 200, 229, 0.6),
      rgba(0, 0, 0, 0.4)
    );
    border: 1px rgb(120, 194, 243) solid;
  }
}
</style>
