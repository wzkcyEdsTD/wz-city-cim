<template>
  <div class="emergency-list">
    <header class="ph-right">
      事件档案
      <span class="back-to-list" v-if="eventForce" @click="backToList">事件列表</span>
      <div class="searchHeader" v-if="!eventForce">
        <div class="button-item">
          <i class="icon-common icon-search"></i>
        </div>
        <el-input
          v-model="searchText"
          class="searchFilterInput"
          placeholder="输入事件关键字"
          size="small"
        />
        <div class="button-container">
          <div class="button-item">
            <i class="icon-common icon-clear" @click="searchClear"></i>
          </div>
        </div>
      </div>
      <div class="cgcompany" @click="excmode()"  v-if="!eventForce">消防秒响应</div>
    </header>
    <div class="emergency-list-ul" v-if="!eventForce">
      <header>
        <span>网格</span>
        <!-- <span>序号</span> -->
        <span>事件</span>
        <!-- 2020/12/24 暂时 -->
        <!-- <span>日期</span> -->
      </header>
      <ul>
        <li
          v-for="(item, i) in fixEventList"
          :key="i"
          @click="simulateEmergency(item, i)"
        >
          <span :title="item.ORGNAME">{{
            item.ORGNAME.split("（").pop().replace(/\）/g, "")
          }}</span>
          <!-- <span>{{ i + 1 }}</span> -->
          <span :title="item.SUBJECT">{{ item.SUBJECT }}</span>
          <!-- <span>{{ new Date(item.OCCURDATE).toLocaleDateString() }}</span> -->
        </li>
      </ul>
    </div>
    <div class="emergency-info" v-if="eventForce">
      <img v-if="eventLogID == 52175497" src="/static/images/event/example.png" />
      <img v-else-if="eventForce.PHOTOURL" :src="eventForce.PHOTOURL" />
      <p><i>事件名称:</i>{{ eventForce.SUBJECT }}</p>
      <p><i>事件简述:</i>{{ eventForce.ISSUECONTENT || "-" }}</p>
      <p><i>发生时间:</i>{{ new Date(eventForce.OCCURDATE).toLocaleDateString() }}</p>
      <p><i>最后操作用户:</i>{{ eventForce.LASTUSERNAME || "-" }}</p>
      <!-- <div class="row-address">
        <img src="http://59.202.41.43:20050/tqOssManager/getObjectByUri/szzb-gxcc/cooperation/jpg/2021/3/5/131720677582.jpg" />
      </div>
      <div class="row-address">
        <div>巡查发现 纬二路与经四路交叉口东侧交通护栏破损</div> 
      </div>
      <div class="row-address">
        <span class="field">地址：</span>
        <span>纬二路与经四路交叉口</span>
      </div>

      <div class="row">
        <section>
          <span class="field">事件状态：</span>
          <span>已办结</span>
        </section>

        <section>
          <span class="field">事件类型：</span>
          <span>城市管理</span>
        </section>
      </div>

      <div class="sketch">
        <span class="field">事件简述：</span>
        <div>纬二路与经四路交叉口东侧交通护栏破损 存在安全隐患 请有关部门及时处理</div>
      </div>

      <div class="row">
        <span class="field">事件等级：</span>
        <span>一般</span>
      </div>

      <div class="row">
        <span class="field">是否重点场所：</span>
        <span>否</span>
      </div>

      <div class="row">
        <span class="field">事件上报时间：</span>
        <span>2021-03-05 00:00:00</span>
      </div>

      <div class="row">
        <span class="field">来源方式：</span>
        <span>人工录入</span>
      </div>

      

      <span class="related-man">相关人员：</span>
      <table class="related-table" frame="void" rules="none">
        <tr>
          <td>职务</td>
          <td>姓名</td>
          <td>联系方式</td>
        </tr>
        <tr>
          <td>网格员</td>
          <td>qd8013</td>
          <td>15726890579</td>
        </tr>
      </table> -->
    </div>
    <div class="emergency-progress" v-if="eventForce">
      <header>事件流程</header>
      <ul>
        <li v-for="(item, i) in fixEventLog" :key="i">
          <div>{{ item.DEALDESCRIPTION }}</div>
          <div>
            <span><img src="/static/images/common/progress-step.png" /></span>
            <span
              ><p>{{ new Date(item.DEALTIME).toLocaleString() }}</p>
              <p>{{ item.DEALUSERNAME }}</p>
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "emergencyList",
  data() {
    return {
      searchText: "",
      fixEventList: [],
      fixEventLog: [],
      eventLogID: null,
    };
  },
  computed: {
    ...mapGetters("map", ["eventList", "eventLog", "eventForce","eventListMode"]),
  },
  watch: {
    searchText(n) {
      this.fixEventList = this.eventList.filter(
        (v) => ~v.SUBJECT.indexOf(n) || ~v.ORGNAME.indexOf(n)
      );
    },
    eventLog(n) {
      const that = this;
      const list = JSON.parse(JSON.stringify(n));
      this.fixEventLog = list.map((v) => {
        return { ...v, ID: that.eventLogID };
      });
    },
  },
  async created() {
    await this.getEventList();
    this.fixEventList = this.eventList;
  },
  methods: {
    ...mapActions("map", ["getEventList", "getEventLog", "setEventForce","setEventListMode"]),
    async simulateEmergency(n, i) {
      const event = { ...n, i };
      this.setEventForce(event);
      this.$bus.$emit("emergency-simulate", event);
      this.eventLogID = event.ID;
      await this.getEventLog(event.ID);
    },
    backToList() {
      this.setEventForce(undefined);
    },
    searchClear() {
      this.searchText = "";
    },
    excmode(){
      this.setEventListMode(1);
      console.log(this.eventListMode)
    }
  },
};
</script>

<style lang="less">
.emergency-list {
  height: 26vh;
  .ph-right {
    .back-to-list {
      float: right;
      color: white;
      cursor: pointer;
      font-size: 1.5vh;
      border-radius: 1vh;
      border: 1px solid;
      display: inline-block;
      height: 3vh;
      line-height: 3vh;
      padding: 0 1vh;
    }
    .searchHeader {
      display: inline-flex;
      align-items: center;
      box-sizing: border-box;
      border-radius: 2vh;
      background-color: rgba(0, 0, 255, 0.2);
      border: 1px solid rgba(0, 0, 255, 0.8);
      padding: 0 0.6vh;
      width: 20vh;

      > * {
        height: 2.6vh;
        vertical-align: middle;
        > * {
          display: block;
          height: 100%;
        }
      }

      .searchFilterInput {
        flex: 1;
        .el-input__inner {
          background: none;
          border: none;
          color: white;
          padding: 0 1vh;
          height: 2.4vh;
        }
      }

      .icon-common {
        display: block;
        width: 2.4vh;
        height: 2.4vh;
      }

      .icon-clear {
        .bg-image("/static/images/common/clear");
        cursor: pointer;
      }

      .icon-search {
        .bg-image("/static/images/common/search2");
      }
    }

    .cgcompany{
      position: absolute;
      top: 0;
      right:0;
      width:10vh;
      font-size: 1vh;
      height: 3vh;
      line-height: 3vh;
      background-color: rgba(0, 0, 255, 0.2);
      border: 1px solid rgba(0, 0, 255, 0.8);
      text-align: center;
      border-radius:2vh;
    }
  }
  .emergency-progress {
    position: absolute;
    top: 4vh;
    right: 45vh;
    width: 16vh;
    height: auto;
    padding: 0 1vh;
    border-radius: 1vh;
    background: rgba(0, 0, 0, 0.65);
    z-index: 10;

    > ul {
      margin-top: 1vh;
      > li {
        > div:first-child {
          width: 90%;
          box-sizing: border-box;
          padding-left: 1vh;
          border-radius: 1vh 0 0 1vh;
          height: 2.6vh;
          line-height: 2.6vh;
          color: rgba(255, 255, 255, 0.8);
          font-size: 1.4vh;
          background: linear-gradient(
            to right,
            rgba(0, 110, 255, 0.6),
            rgba(0, 0, 0, 0.2)
          );
        }
        > div:last-child {
          color: rgba(255, 255, 255, 0.9);
          display: flex;
          padding: 1vh 0;
          span {
            display: inline-block;
            vertical-align: top;
          }
          > span:first-child {
            width: 2vh;
            margin-right: 1vh;
            > img {
              width: 100%;
            }
          }
          > span:last-child {
            flex: 1;
            > p {
              font-size: 1.4vh;
              line-height: 2vh;
            }
          }
        }
        &:last-child {
          > div:first-child {
            width: 95%;
            background: linear-gradient(
              to right,
              rgba(0, 17, 255, 0.6),
              rgba(0, 0, 0, 0.2)
            );
            font-size: 1.6vh;
            font-weight: bold;
          }
          > div:last-child {
            > span:first-child {
              > img {
                display: none;
              }
            }
          }
        }
      }
    }
    > header {
      font-family: YouSheBiaoTiHei;
      font-size: 2.4vh;
      height: 3vh;
      line-height: 3vh;
      box-sizing: border-box;
      padding-left: 2vh;
      position: relative;
      color: white;
      &::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0.6vh;
        width: 10vh;
        height: 1.6vh;
        z-index: -1;
        background-image: linear-gradient(90deg, #2acbfe 0%, transparent 100%);
        transform: skewX(-30deg);
      }
    }
  }
  .emergency-info {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
    color:#fff;
    > img {
      width: 14vh;
      float: right;
      cursor: pointer;
      margin: 0.4vh;
    }
    > p {
      font-size: 1.6vh;
      line-height: 2.4vh;
      color: white;
      > i {
        font-style: normal;
        color: #429fff;
        font-weight: bold;
        margin-right: 1vh;
      }
    }
    &::-webkit-scrollbar {
      width: 4px;
      background: rgba(1, 41, 38, 0.3);
    }

    &::-webkit-scrollbar-thumb {
      background-color: #2a51fe;
      box-shadow: 0px 3px 6px 0px #012623;
    }

        .field {
      font-weight: bolder;
      color: #40b4d0;
    }

    .row {
      display: flex;
      justify-content: space-between;

      &:not(:last-child) {
        margin-bottom: 1.2vh;
      }
    }

    .row-address {
      margin-bottom: 1.2vh;
    }

    .sketch {
      text-align: left;

      > div {
        text-align: justify;
        width: 100%;
        height: 10.28vh;
        border: solid 0.09vh #707070;
        margin: 0.65vh 0 1.11vh;
        padding: 0.5vh;
        overflow-y: auto;
      }
    }

    .related-man {
      display: block;
      text-align: left;
      position: relative;
      font-weight: bolder;
      margin-bottom: 1.39vh;
      padding-left: 1.3vh;

      &::before {
        content: "";
        position: absolute;
        width: 0.74vh;
        height: 0.74vh;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        background-image: linear-gradient(90deg, #ffb936 0%, #f47e09 100%);
        border-radius: 50%;
      }
    }

    .related-table {
      width: 100%;
      border: solid 0.1vh #0f4465;
      color: #c3ecff;
      margin-bottom: 2.04vh;

      tr:first-child {
        td {
          font-weight: bolder;
          background-color: #0f4465;
          color: #00b1ff;
          padding: 0.5vh 0 0.7vh;
        }
      }

      tr:last-child {
        td {
          padding: 0.3vh 0 0.5vh;
        }
      }
    }

    .related-video {
      width: 28.7vh;
      height: 17.78vh;
      margin-bottom: 1.85vh;
    }

    .process-box {
      .box-header {
        text-align: left;
        font-weight: bolder;
        color: #81cfff;
        cursor: pointer;

        > span {
          margin-right: 0.3vh;
        }

        > i {
          transform: rotate(180deg);
          transition: transform 0.25s linear;

          &.active {
            transform: rotate(0deg);
          }
        }
      }

      .box-body {
        padding: 1vh;

        > img {
          width: 100%;
        }
      }
    }
  }
  .emergency-list-ul {
    flex: 1;
    color: #fff;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    > header {
      background-color: rgba(40, 117, 221, 0.5);
      height: 3.4vh;
      line-height: 3.4vh;
      font-size: 1.6vh;
      display: flex;
    }
    > ul {
      flex: 1;
      overflow-x: hidden;
      overflow-y: auto;
      &::-webkit-scrollbar {
        width: 4px;
        background: rgba(1, 41, 38, 0.3);
      }

      &::-webkit-scrollbar-thumb {
        background-color: #2a51fe;
        box-shadow: 0px 3px 6px 0px #012623;
      }
      > li {
        height: 2.8vh;
        line-height: 2.8vh;
        display: flex;
        cursor: pointer;
        &:nth-child(odd) {
          background-color: rgba(17, 46, 93, 0.4);
        }
        &:nth-child(even) {
          background-color: rgba(29, 77, 155, 0.4);
        }
        > span {
          font-size: 1.5vh;
          &:last-child {
            // 2020/12/24 暂时
            // color: #fc5453;
          }
        }
      }
    }
    span {
      display: inline-block;
      box-sizing: border-box;
      padding: 0 0.6vh;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      &:first-child {
        width: 8vh;
      }
      &:nth-child(2) {
        flex: 1;
      }
      &:last-child {
        width: 11vh;
      }
    }
  }
}
</style>
