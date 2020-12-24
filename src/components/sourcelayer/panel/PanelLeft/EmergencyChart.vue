<template>
  <div class="emergency-chart">
    <header class="ph-left">事件情况</header>
    <div class="emergency-chart-num">
      <div>
        今日事件数：
        <span>
          {{ eventToday }}
        </span>
      </div>
      <div>
        近30天事件数：
        <span>
          {{ eventTotal }}
        </span>
      </div>
    </div>
    <chart-core chartId="emergency-chart" :option="option" />
  </div>
</template>

<script>
import ChartCore from "../Chart/ChartCore";
import option from "../Chart/Options/EmergencyChart";
import { mapGetters } from "vuex";
export default {
  name: "emergencyChart",
  data() {
    return { option, month: 12, eventToday: 0, eventTotal: 0 };
  },
  watch: {
    eventList: {
      handler(n) {
        this.updateChartOption();
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters("map", ["eventList"]),
  },
  components: { ChartCore },
  methods: {
    updateChartOption() {
      const dateHash = {};
      this.eventList.map((v) => {
        if (this.compare(v.OCCURDATE)) {
          const d = new Date(v.OCCURDATE).toLocaleDateString();
          !dateHash[d] && (dateHash[d] = 0);
          dateHash[d] += 1;
          this.eventTotal++;
        }
      });
      this.eventToday = dateHash["2020/12/25"];
      const xAxisData = Object.keys(dateHash)
        .map((v) => parseInt(v.split("/")[1]) * 100 + parseInt(v.split("/")[2]))
        .sort((a, b) => a - b);
      const seriesData = xAxisData.map(
        (v) =>
          dateHash[
            `2020/${v.toString().substr(0, 2)}/${parseInt(
              v.toString().substr(2, 2)
            )}`
          ]
      );
      const option = JSON.parse(JSON.stringify(this.option));
      option.xAxis.data = xAxisData.map(
        (v) => `${v.toString().substr(0, 2)}/${v.toString().substr(2, 2)}`
      );
      option.series[0].data = seriesData;
      this.option = option;
    },

    // 近30日时间比较
    compare(date) {
      if (!date) return false;
      const today = new Date().getTime();
      const time = new Date(date).getTime();
      return today - 30 * 24 * 60 * 60 * 1000 < time;
    },
  },
};
</script>

<style lang="less" scoped>
.emergency-chart {
  height: 30vh;

  .emergency-chart-num {
    display: flex;
    justify-content: space-around;
    padding: 8px 6px;
    font-size: 1.4vh;
    color: #fff;

    > div > span {
      font-size: 1.8vh;
      font-weight: bold;
      color: #17bce5;
    }
  }
}
</style>
