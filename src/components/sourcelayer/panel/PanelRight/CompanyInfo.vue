<template>
  <div class="company-info">
    <header class="ph-right">
      {{ forceRoom.item[0].companyName }}
    </header>
    <div class="company-info-content">
      <div class="company-basic-info">
        <ul>
          <li
            v-for="(value, key, i) in forceRoom.item[0].companyBasic"
            :key="i"
          >
            <span>{{ key }} ： </span>
            <span>{{ value || "-" }}</span>
          </li>
        </ul>
      </div>
      <div class="company-enermic-info">
        <header>
          <span>年度年报</span>
          <span>净利润</span>
          <span>负债总额</span>
          <span>利润总额</span>
          <span>纳税总额</span>
          <span>营业状况</span>
          <span>销售收入</span>
          <span>主营收入</span>
          <span>资产总额</span>
        </header>
        <ul>
          <li v-for="(item, i) in forceRoom.item[0].companyEnermic" :key="i">
            <span v-for="(num, j) in item" :key="j">{{ num }}</span>
          </li>
        </ul>
      </div>
      <div class="company-enermic-range">
        <p>经营范围</p>
        <i>{{ forceRoom.item[0].companyRange }}</i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
const obj = {
  type: "company",
  companyName: "温州臻简国际贸易有限公司",
  companyBasic: {
    企业全称: "温州臻简国际贸易有限公司",
    信用代码: "91330302568155208Q",
    企业法人: "陈民区",
    创立时间: "2011-01-07",
    所属行业: "5100",
    企业地址: "温州市学院中路金丰园2幢1104室",
  },
  companyEnermic: [
    [2018, 17.37, 296.67, 19.3, 3.6, "正常开业", 1618.57, 1614.3, 395.95],
    [2017, 9.87, 99.28, 10.97, 3.78, "正常开业", 1474.27, 1464.87, 187.62],
    [2016, 19.62, 162.66, 21.8, 7.11, "正常开业", 1302.39, 1302.39, 241.13],
  ],
  companyRange:
    "销售办公用品、化妆品、陶瓷制品、电子产品（不含电子出版物）、纺织品、皮革制品、塑料制品、纸制品、服装、眼镜（涉及验光配镜的凭许可证经营）、鞋、帽、建筑材料、卫生洁具、玩具、家具、有色金属、五金、家用电器、通讯器材（不含无线广播电视发射设备及地面卫星接收设备）、电梯、电线、电缆、仪器仪表、阀门、汽车、摩托车零配件、计算机、化工原料（不含危险化学品），货物进出口、技术进出口（依法须经批准的项目，经相关部门批准后方可开展经营活动）",
};
export default {
  name: "roomInfo",
  data() {
    return {};
  },
  computed: {
    ...mapGetters("map", ["forceRoom"]),
  },
  mounted() {
    console.log(this.forceRoom);
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.company-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  > .ph-right {
    color: gold;
  }
  .company-info-content {
    overflow-x: hidden;
    overflow-y: auto;
    color: #fff;
    &::-webkit-scrollbar {
      width: 4px;
      background: rgba(1, 41, 38, 0.3);
    }

    &::-webkit-scrollbar-thumb {
      background-color: #2a51fe;
      box-shadow: 0px 3px 6px 0px #012623;
    }
    .company-enermic-range {
      margin-top: 1vh;
      > p {
        color: gold;
        font-size: 1.6vh;
        font-weight: bold;
        line-height: 2.6vh;
      }
      > i {
        font-style: normal;
        line-height: 2vh;
        font-size: 1.4vh;
        color: rgba(255, 255, 255, 0.9);
      }
    }
    .company-basic-info {
      > ul {
        > li {
          height: 2.8vh;
          line-height: 2.8vh;
          display: flex;
          box-sizing: border-box;
          padding-left: 1vh;
          &:nth-child(odd) {
            background-color: rgba(17, 46, 93, 0.4);
          }
          &:nth-child(even) {
            background-color: rgba(29, 77, 155, 0.4);
          }
          > span {
            font-size: 1.5vh;
            &:last-child {
              font-weight: bold;
            }
          }
        }
      }
    }
    .company-enermic-info {
      margin-top: 1vh;
      color: #fff;
      overflow-y: hidden;
      overflow-x: auto;
      &::-webkit-scrollbar {
        height: 8px;
        background: rgba(1, 41, 38, 0.3);
        cursor: pointer;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #2a51fe;
        box-shadow: 0px 3px 6px 0px #012623;
      }
      > header {
        white-space: nowrap;
        height: 3.4vh;
        line-height: 3.4vh;
        font-size: 0;
        letter-spacing: -0.3333em;
        > span {
          font-size: 1.6vh;
          background-color: rgba(40, 117, 221, 0.5);
        }
      }
      > ul {
        white-space: nowrap;
        > li {
          height: 2.8vh;
          line-height: 2.8vh;
          &:nth-child(odd) {
            > span {
              background-color: rgba(17, 46, 93, 0.4);
            }
          }
          &:nth-child(even) {
            > span {
              background-color: rgba(29, 77, 155, 0.4);
            }
          }
          > span {
            font-size: 1.5vh;
          }
        }
      }
      span {
        display: inline-block;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 8vh;
        text-align: center;
      }
    }
  }
}
</style>