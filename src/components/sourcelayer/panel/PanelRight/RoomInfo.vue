<template>
  <div class="room-info">
    <header class="ph-right">
      {{ forceRoom.bName }} - {{ forceRoom.room }}室
    </header>
    <div class="room-info-content">
      <div class="room-member-info">
        <header>
          <!-- <span>称谓</span> -->
          <span>序号</span>
          <span>成员</span>
          <!-- <span>性别</span> -->
          <span>身份证号</span>
        </header>
        <ul>
          <li v-for="(item, i) in forceRoom.item" :key="i">
            <!-- <span>{{ item.RELA || "-" }}</span> -->
            <span>{{ i + 1 }}</span>
            <span>{{ item.NAME }}</span>
            <!-- <span>{{ item.SEX || "-" }}</span> -->
            <span>{{ item.IDCARD || "-" }}</span>
          </li>
        </ul>
      </div>
      <div v-if="keyMember" class="key-member-info">
        <header>重点人员信息</header>
        <ul>
          <li v-for="(value, key, i) in keyMember" :key="i">
            <span>{{ key }} ： </span>
            <span>{{ value || "-" }}</span>
          </li>
        </ul>
      </div>
      <!-- <div class="relate-grid-member">
        <header>
          <span>序号</span>
          <span>网格员</span>
          <span>负责网格</span>
          <span>联系方式</span>
        </header>
        <ul>
          <li @click="doForceGridMember">
            <span>1</span>
            <span>{{ forceGridMember.NAME }}</span>
            <span>{{ forceGridMember.ORGNAME }}</span>
            <span>{{ forceGridMember.CONTACT }}</span>
          </li>
        </ul>
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BUILD_PEOPLE_GRIDMEMBER from "mock/building/BUILD_PEOPLE_GRIDMEMBER.js";
import CIM_API from "api/cimAPI";
const HASH = {
  IDCARD: "身份证",
  NAME: "名称",
  SEX: "性别",
  REAL: "关系",
  EDU: "教育程度",
  PHONE: "联系方式",
  STATUS: "政治面貌",
  TYPE: "重点类别",
};
export default {
  name: "roomInfo",
  data() {
    return { forceGridMember: {}, HASH, BUILD_PEOPLE_GRIDMEMBER };
  },
  computed: {
    ...mapGetters("map", ["forceRoom"]),
    keyMember() {
      const arr = this.forceRoom.item.filter((v) => v.isKey);
      if (arr.length) {
        const obj = {};
        for (let key in arr[0]) {
          HASH[key] && (obj[this.HASH[key]] = arr[0][key]);
        }
        return obj;
      } else {
        return undefined;
      }
    },
  },
  mounted() {
    this.forceGridMember =
      BUILD_PEOPLE_GRIDMEMBER[this.forceRoom.buildid] || {};
  },
  methods: {
    ...mapActions("map", ["setForceGridMember", "setGridMemberList"]),
    // async doForceGridMember() {
    //   const routeLinks = await CIM_API.getGridMemberRouteLink(
    //     this.forceGridMember.NAME
    //   );
    //   routeLinks.rows.length
    //     ? this.setForceGridMember({
    //         ...this.forceGridMember,
    //         routeLinks: routeLinks.rows,
    //       })
    //     : this.$message({
    //         type: "info",
    //         message: "无网格员巡逻信息",
    //       });
    // },
  },
};
</script>

<style lang="less" scoped>
.room-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  .room-info-content {
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
    .room-member-info {
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
      span {
        display: inline-block;
        box-sizing: border-box;
        padding: 0 0.6vh;
        &:first-child {
          width: 6vh;
        }
        &:nth-child(2) {
          flex: 1;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        &:last-child {
          width: 20vh;
        }
      }
    }
    .key-member-info {
      margin: 1vh 0;
      > header {
        color: rgb(255, 60, 0);
        font-size: 1.7vh;
        font-weight: bold;
        line-height: 2.6vh;
      }
      > ul {
        > li {
          height: 2.8vh;
          line-height: 2.8vh;
          display: flex;
          color: rgba(255, 255, 255, 0.9);
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
    .relate-grid-member {
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
        > li {
          cursor: pointer;
          height: 2.8vh;
          line-height: 2.8vh;
          display: flex;
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
              // color: #fc5453;
            }
          }
        }
      }
      span {
        display: inline-block;
        box-sizing: border-box;
        padding: 0 0.6vh;
        &:first-child {
          width: 6vh;
        }
        &:nth-child(2) {
          width: 7vh;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        &:nth-child(3) {
          flex: 1;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        &:last-child {
          width: 12vh;
        }
      }
    }
  }
}
</style>