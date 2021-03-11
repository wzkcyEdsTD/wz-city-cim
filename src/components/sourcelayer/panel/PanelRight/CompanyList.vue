<template>
  <div class="company-list">
    <header class="ph-right">
      企业信息
      <span class="back-to-list" v-if="alarmList.length" @click="backToList">企业列表</span>
      <div class="searchHeader" v-if="!(alarmList.length)">
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
      <div class="cgcompany" @click="excmode()" v-if="!alarmList.length">事件档案</div>
    </header>
    <div class="emergency-list-ul" v-if="!alarmList.length">
      <header>      
        <!-- <span>序号</span> -->
        <span>负责人</span>
        <span>联系方式</span>
        <span>地点</span>
        <!-- 2020/12/24 暂时 -->
        <!-- <span>日期</span> -->
      </header>
      <ul>
        <li
          v-for="(item, i) in filtercompanylist"
          :key="i"
          @click="simulateEmergency(item, i)"
        >     
          <span>{{item.contact == ''?"无":item.contact}}</span>
          <span>{{item.contactTel == ''?"无":item.contactTel}}</span>
          <span>{{item.companyName}}</span>
        </li>
      </ul>
    </div>
    <div class="emergency-info" v-if="alarmList.length">
      <p><i>名称：</i>{{companyinfo.companyName}}</p>
      <p><i>地址地名:</i>{{companyinfo.address}}</p>
      <p><i>联系人:</i>{{companyinfo.contact}}</p>
      <p><i>联系方式:</i>{{companyinfo.contactTel}}</p>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import quickapi from "api/alarminfo";
export default {
  name: "companyList",
  data() {
    return {
      searchText: "",
      fixEventList: [],
      fixEventLog: [],
      eventLogID: null,
      companylist:[],
      filtercompanylist:[],
      companyinfo:{}
    };
  },
  computed: {
    ...mapGetters("map", ["eventList", "eventLog","eventForce","companyList" ,"eventListMode", "alarmList"]),
  },
  watch: {
    searchText(n) {
      this.filtercompanylist = this.companylist.filter(
        (v) => ~v.contact.indexOf(n) || ~v.companyName.indexOf(n)
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
    // await this.getEventList();
    // this.fixEventList = this.eventList;
    quickapi.GetCompanyInfo().then(res=>{
      this.companylist = res.data.data;
      this.filtercompanylist = res.data.data;
    })
  },
  methods: {
    ...mapActions("map", ["getEventList", "getEventLog","setEventForce", "setCompanyList","setEventListMode","setAlarmList"]),
    async simulateEmergency(n, i) {
      this.companyinfo = n;
      quickapi.GetAlarmInfo(n.companyId).then(res=>{
        this.setAlarmList(res.data.data);
      })    
      const event={
        LON:Number(n.lng),
        LAT:Number(n.lat)
      }
      console.log(n,event);
      this.$bus.$emit("emergency-simulatexf", event);
      // this.eventLogID = event.ID;
      // await this.getEventLog(event.ID);
    },
    backToList() {
      this.setAlarmList([]);
    },
    searchClear() {
      this.searchText = "";
    },
    excmode(){
      this.setEventListMode(0);
    }
  },
};
</script>

<style lang="less">
.company-list {
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
        width: 10vh;
      }
      &:nth-child(2) {
        width: 12vh;
      }
      &:last-child {
        width: 20vh;
      }
    }
  }
}
</style>
