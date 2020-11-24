<template>
  <div class="emergency-list">
    <header class="ph-right">
      事件档案
      <span class="back-to-list" v-if="eventForce" @click="backToList"
        >事件列表</span
      >
      <div class="searchHeader">
        <div class="button-item">
          <i class="icon-common icon-search"></i>
        </div>
        <el-input
          v-model="searchText"
          class="searchFilterInput"
          placeholder="门牌地址搜索"
          size="small"
        />
        <div class="button-container">
          <div class="button-item">
            <i class="icon-common icon-clear" @click="searchClear"></i>
          </div>
        </div>
      </div>
    </header>
    <div class="emergency-list-ul" v-if="!eventForce">
      <header>
        <span>网格</span>
        <span>事件</span>
        <span>日期</span>
      </header>
      <ul>
        <li
          v-for="(item, i) in fixEventList"
          :key="i"
          :title="item.SUBJECT"
          @click="simulateEmergency(item, i)"
        >
          <span>{{ item.OCCURORG }}</span>
          <span>{{ item.SUBJECT }}</span>
          <span>{{ new Date(item.OCCURDATE).toLocaleDateString() }}</span>
        </li>
      </ul>
    </div>
    <div class="emergency-info" v-if="eventForce">
      <img :src="eventForce.PHOTOURL" />
      <p><i>事件名称:</i>{{ eventForce.SUBJECT }}</p>
      <p><i>事件简述:</i>{{ eventForce.ISSUECONTENT || "-" }}</p>
      <p>
        <i>发生时间:</i
        >{{ new Date(eventForce.OCCURDATE).toLocaleDateString() }}
      </p>
      <p><i>最后操作用户:</i>{{ eventForce.LASTUSERNAME || "-" }}</p>
    </div>
    <div class="emergency-progress" v-if="eventForce">
      <header>事件流程</header>
      <ul>
        <li v-for="(item, i) in eventLog" :key="i">
          <div>{{ item.DEALDESCRIPTION }}</div>
          <div>
            <span><img src="/static/images/common/progress-step.png" /></span>
            <span
              ><p>{{ new Date(item.DEALTIME).toLocaleDateString() }}</p>
              <p>{{ item.DEALUSERNAME }}</p></span
            >
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
    return { searchText: "", fixEventList: [] };
  },
  computed: {
    ...mapGetters("map", ["eventList", "eventLog", "eventForce"]),
  },
  watch: {
    searchText(n) {
      this.fixEventList = this.eventList.filter((v) => ~v.SUBJECT.indexOf(n));
    },
  },
  async created() {
    await this.getEventList();
    this.fixEventList = this.eventList;
  },
  methods: {
    ...mapActions("map", ["getEventList", "getEventLog", "setEventForce"]),
    async simulateEmergency(n, i) {
      const event = { ...n, i };
      this.setEventForce(event);
      this.$bus.$emit("emergency-simulate", event);
      await this.getEventLog(event.ID);
    },
    backToList() {
      this.setEventForce(undefined);
    },
    searchClear() {
      this.searchText = "";
    },
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
      width: 28vh;

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
  }
  .emergency-progress {
    position: absolute;
    top: 4vh;
    right: 45vh;
    width: 16vh;
    height: auto;
    padding: 0 1vh;
    border-radius: 1vh;
    background: rgba(0, 0, 0, 0.5);
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
              font-size: 1.6vh;
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
            color: #fc5453;
          }
        }
      }
    }
    span {
      display: inline-block;
      box-sizing: border-box;
      padding: 0 0.6vh;
      &:first-child {
        width: 8vh;
      }
      &:nth-child(2) {
        flex: 1;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      &:last-child {
        width: 11vh;
      }
    }
  }
}
</style>