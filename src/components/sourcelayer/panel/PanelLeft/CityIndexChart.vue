<template>
  <div class="city-index-chart">
    <header class="ph-left">基本信息</header>
    <ul class="city-index-ul">
      <li v-for="(value, key, i) in dataInfo" :key="i + key">
        <img :src="`/static/images/panel/left/${value.ico}@2x.png`" />
        <div>
          <p>{{ key }}</p>
          <p>
            {{ value.v }}<i>{{ value.u }}</i>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "cityIndexChart",
  data() {
    return {
      dataInfo: {
        常住人口数: { v: "9.8", u: "万", ico: "人口数" },
        重点人员: { v: "630", u: "", ico: "重点人员" },
        社区数: { v: "8", u: "", ico: "事件数" },
        网格数: { v: "96", u: "", ico: "网格数" },
        楼栋数: { v: "1059", u: "", ico: "楼栋数" },
        出租房: { v: "4997", u: "", ico: "出租房" },
      },
    };
  },
  computed: {
    // ...mapGetters("map", ["eventList"]),
  },
  watch: {
    // eventList: {
    //   handler(n) {
    //     this.dataInfo = { ...this.dataInfo, 事件数: { v: n.length, u: "" } };
    //   },
    //   deep: true,
    // },
  },
};
</script>

<style lang="less" scoped>
.city-index-chart {
  height: 28vh;
  padding-left: 2vh;
  > .city-index-ul {
    flex: 1;
    > li {
      display: inline-flex;
      float: left;
      width: 49.9%;
      height: 33.3%;
      align-items: center;
      > * {
        display: inline-block;
      }
      > img {
        height: 4.6vh;
      }
      > div {
        flex: 1;
        margin-left: 1.4vh;
        > p {
          &:first-child {
            color: white;
            font-size: 1.6vh;
            font-weight: 300;
          }
          &:last-child {
            margin-top: 0.8vh;
            font-size: 3vh;
            font-weight: bold;
            color: #17bce5;
            > i {
              font-style: normal;
              font-size: 2vh;
            }
          }
        }
      }
    }
  }
}
</style>