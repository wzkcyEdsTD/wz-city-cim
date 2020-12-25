<template>
  <div class="traffic-header">
    <!-- <span>城市交通实况</span>
    <span>CITY TRAFFIC CONDITION</span> -->

    <div class="logo">
      <img src="/static/images/common/logo.png" />
      <span>温州设计集团</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "trafficheader",
  data() {
    return {
      trafficeHeaderTimer: undefined,
    };
  },
  mounted() {
    this.trafficeHeaderTimer = setInterval(() => {}, 1000);
  },
  beforeDestroy() {
    clearInterval(this.trafficeHeaderTimer);
  },
};
</script>

<style lang="less" scoped>
.traffic-header {
  background-image: url("/static/images/common/layer-top@2x.png");
  background-size: 100% 100%;
  width: 100%;
  height: 14vh;
  position: fixed;
  top: 0;
  z-index: 4;

  .logo {
    display: flex;
    align-items: center;
    position: absolute;
    right: 2vh;
    top: 2.3vh;
    color: #cfd0d1;
    img {
      height: 2.6vh;
    }
    span {
      font-size: 1.8vh;
      letter-spacing: 0.1vh;
      padding-left: 0.8vh;
    }
  }

  > span {
    position: fixed;
    left: 50%;

    color: white;
    font-family: YouSheBiaoTiHei;
    &:first-child {
      font-size: 6.2vh;
      top: 1.4vh;
      transform: translateX(-60%);
    }
    &:last-child {
      font-size: 1.4vh;
      top: 7.2vh;
      transform: translateX(-72%);
      opacity: 0.8;
    }
  }
}
</style>