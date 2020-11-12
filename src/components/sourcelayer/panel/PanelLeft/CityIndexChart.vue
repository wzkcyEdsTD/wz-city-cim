<template>
  <div class="city-index-chart">
    <header class="ph-left">城市运行信息监控</header>
    <ul class="city-index-ul">
      <li v-for="(item, i) in dataInfo" :key="i + item.k">
        <img :src="`/static/images/panel/left/${item.k}@2x.png`" />
        <div>
          <p>{{ item.k }}</p>
          <p>
            {{ item.v }}<i>{{ item.u }}</i>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "cityIndexChart",
  data() {
    return {
      dataInfo: [
        { k: "事件数", v: "14", u: "" },
        { k: "人口数", v: "13", u: "万" },
        { k: "特殊人员", v: "632", u: "" },
        { k: "房屋数", v: "5320", u: "" },
        { k: "网格数", v: "132", u: "" },
        { k: "楼栋数", v: "3.2", u: "万" },
      ],
    };
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