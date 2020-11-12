<template>
  <div class="panel-bottom">
    <header>高热区分析</header>
    <ul class="panel-bottom-ul">
      <li
        :class="{ active: item.k == forceKey }"
        v-for="(item, i) in blocks"
        :key="i + item.k"
        @click="doBlockAnalyse(item)"
      >
        <img :src="`/static/images/block/${item.label}@2x.png`" />
        <p>{{ item.label }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "panelBottom",
  data() {
    return {
      forceKey: "k1",
      blocks: [
        { label: "管辖重点区", k: "k1" },
        { label: "人流集聚区", k: "k2" },
        { label: "重点人员密集区", k: "k3" },
        { label: "矛盾纠纷高热区", k: "k4" },
        { label: "宗教活动高热区", k: "k5" },
      ],
    };
  },
  methods: {
    doBlockAnalyse({ k }) {
      this.forceKey = k;
    },
  },
};
</script>

<style lang="less" scoped>
.panel-bottom {
  position: fixed;
  z-index: 5;
  bottom: 2vh;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  > header {
    font-family: YouSheBiaoTiHei;
    font-size: 3vh;
    height: 4vh;
    line-height: 4vh;
    margin-bottom: 2vh;
    box-sizing: border-box;
    padding-left: 2vh;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0.6vh;
      width: 14vh;
      height: 1.6vh;
      z-index: -1;
      background-image: linear-gradient(90deg, #2acbfe 0%, transparent 100%);
      transform: skewX(-30deg);
    }
  }
  > .panel-bottom-ul {
    > li {
      display: inline-block;
      width: 15vh;
      text-align: center;
      cursor: pointer;
      > img {
        width: 6vh;
        filter: grayscale(100%);
      }
      > p {
        font-size: 1.6vh;
        margin-top: 1vh;
      }
      &.active {
        > img {
          filter: grayscale(0%);
        }
        > p {
          color: #6ff4ff;
        }
      }
    }
  }
}
</style>