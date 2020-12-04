<template>
  <div class="video-grid">
    <header class="ph-right">重点道路监控</header>
    <ul class="video-grid-ul">
      <li v-for="(item, i) in videoList" :key="i + item.mp_id">
        <Video :index="i" :mp_id="item.mp_id" :mp_name="item.mp_name" />
      </li>
    </ul>
  </div>
</template>

<script>
import Video from "./Video/Video";
import { getRtmpVideoList } from "api/cityBrainAPI";

export default {
  name: "videoGrid",
  data() {
    return {
      geometry: { lng: 120.67743, lat: 28.011360000000002 },
      queryRadius: 200,
      videoList: [],
    };
  },
  components: { Video },
  mounted() {
    this.fetchVideoList();
  },
  methods: {
    async fetchVideoList() {
      const { data } = await getRtmpVideoList(this.geometry, this.queryRadius);
      this.videoList = data.splice(2, 4);
    },
  },
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