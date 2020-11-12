<template>
  <div class="video-grid">
    <header class="ph-right">重点道路监控</header>
    <ul class="video-grid-ul">
      <li v-for="(item, i) in videoList" :key="i + item">
        <Video :index="i" :mp_id="item" />
      </li>
    </ul>
  </div>
</template>

<script>
import Video from "./Video/Video";
export default {
  name: "videoGrid",
  data() {
    return {
      videoList: [
        "122213000100000131003310", //  物华天宝
        "122213000100000166002823", //
        "122225000100000001000760", //  特警桥公交站头西
        "122225000100001509000349", //  民航路体育场东侧
      ],
    };
  },
  components: { Video },
};
</script>

<style lang="less" scoped>
.video-grid {
  height: 34vh;
  > .video-grid-ul {
    flex: 1;
    > li {
      display: inline-block;
      box-sizing: border-box;
      padding: 0.2vh;
      height: 50%;
      width: 49.9%;
      > div {
        height: 100%;
        width: 100%;
        background: rgba(255, 255, 255, 0.2);
      }
    }
  }
}
</style>