<template>
  <div class="grid-member-list">
    <header class="ph-right">
      网格员信息
      <div class="searchHeader">
        <div class="button-item">
          <i class="icon-common icon-search"></i>
        </div>
        <el-input
          v-model="searchText"
          class="searchFilterInput"
          placeholder="输入网格员或网格名称"
          size="small"
        />
        <div class="button-container">
          <div class="button-item">
            <i class="icon-common icon-clear" @click="searchClear"></i>
          </div>
        </div>
      </div>
    </header>
    <div class="grid-member-list-ul">
      <header>
        <span>序号</span>
        <span>网格员</span>
        <span>负责网格</span>
        <span>联系方式</span>
      </header>
      <ul>
        <li
          v-for="(item, i) in fixGridMemberList"
          :key="i"
          @click="doForceGridMember(item)"
        >
          <span>{{ i + 1 }}</span>
          <span>{{ item.NAME }}</span>
          <span :title="item.ORGNAME">{{ item.ORGNAME }}</span>
          <span>{{ item.CONTACT }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CIM_API from "api/cimAPI";
export default {
  name: "gridMemberList",
  data() {
    return { searchText: "", fixGridMemberList: [] };
  },
  computed: {
    ...mapGetters("map", ["gridMemberList"]),
  },
  watch: {
    searchText(n) {
      this.fixGridMemberList = this.gridMemberList.filter(
        (v) => ~v.NAME.indexOf(n) || ~v.ORGNAME.indexOf(n)
      );
    },
  },
  async created() {
    await this.setGridMemberList();
    this.fixGridMemberList = this.gridMemberList;
  },
  methods: {
    ...mapActions("map", ["setForceGridMember", "setGridMemberList"]),
    async doForceGridMember(item) {
      const routeLinks = await CIM_API.getGridMemberRouteLink(item.NAME);
      routeLinks.rows.length
        ? this.setForceGridMember({ ...item, routeLinks: routeLinks.rows })
        : this.$message({
            type: "info",
            message: "无网格员巡逻信息",
          });
    },
    searchClear() {
      this.searchText = "";
    },
  },
};
</script>

<style lang="less">
.grid-member-list {
  flex: 1;
  .ph-right {
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
  .grid-member-list-ul {
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
</style>