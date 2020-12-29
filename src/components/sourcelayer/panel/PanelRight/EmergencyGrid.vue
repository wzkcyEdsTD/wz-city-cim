<template>
  <div class="emergency-grid">
    <header class="ph-right">网格信息</header>
    <div class="emergency-grid-table">
      <table>
        <thead>
          <tr>
            <th>职务</th>
            <th>姓名</th>
            <th>联系方式</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="3" class="type">网格</td>
          </tr>
          <tr>
            <td>网格片长</td>
            <td>{{ gridMsg.GRID_PZ || "" }}</td>
            <td>{{ gridMsg.GRID_PZ_C || "" }}</td>
          </tr>
          <tr>
            <td>网格指导员</td>
            <td>{{ gridMsg.GRID_ZDY || "" }}</td>
            <td>{{ gridMsg.GRID_ZDY_C || "" }}</td>
          </tr>
          <tr>
            <td>网格协助员</td>
            <td>{{ gridMsg.GRID_XZY || "" }}</td>
            <td>{{ gridMsg.GRID_XZY_C || "" }}</td>
          </tr>
          <tr>
            <td>网格长</td>
            <td>{{ gridMsg.GRID_WGZ || "" }}</td>
            <td>{{ gridMsg.GRID_WGZ_C || "" }}</td>
          </tr>
          <tr>
            <td>专职网格员</td>
            <td>{{ gridMsg.GRID_ZZWGY || "" }}</td>
            <td>{{ gridMsg.GRID_ZZWGY_C || "" }}</td>
          </tr>
          <tr>
            <td colspan="3" class="type">入格</td>
          </tr>
          <tr>
            <td>公安部门入格员</td>
            <td>{{ gridMsg.GRID_RG_GA || "" }}</td>
            <td>{{ gridMsg.GRID_RG_GA_C || "" }}</td>
          </tr>
          <tr>
            <td>行政执法部门入格员</td>
            <td>{{ gridMsg.GRID_RG_XZ || "" }}</td>
            <td>{{ gridMsg.GRID_RG_XZ_C || "" }}</td>
          </tr>
          <tr>
            <td>市场监管部门入格员</td>
            <td>{{ gridMsg.GRID_RG_SC || "" }}</td>
            <td>{{ gridMsg.GRID_RG_SC_C || "" }}</td>
          </tr>
          <tr>
            <td colspan="3" class="type">街道</td>
          </tr>
          <tr>
            <td>街道综治办</td>
            <td>陶敏君</td>
            <td>18357780618</td>
          </tr>
          <tr>
            <td>街道综治办</td>
            <td>李伟碧</td>
            <td>15868753856</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CIM_API from "api/cimAPI";
export default {
  name: "gridMemberList",
  data() {
    return { gridMsg: {} };
  },
  computed: {
    ...mapGetters("map", ["eventForce"]),
  },
  async created() {
    const grid = this.fixGridMsg();
    console.log(grid);
    const { rows } = await CIM_API.getGridManagerByGrid(grid);
    this.gridMsg = rows[0];
    console.log(this.gridMsg);
  },
  methods: {
    // 网格信息
    fixGridMsg() {
      return this.eventForce.ORGNAME.substring(
        this.eventForce.ORGNAME.indexOf("（") + 1,
        this.eventForce.ORGNAME.indexOf("网")
      );
    },
  },
};
</script>

<style lang="less">
.emergency-grid {
  flex: 1;

  .emergency-grid-table {
    flex: 1;
    color: #fff;
    display: flex;
    flex-direction: column;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 4px;
      background: rgba(1, 41, 38, 0.3);
    }

    &::-webkit-scrollbar-thumb {
      background-color: #2a51fe;
      box-shadow: 0px 3px 6px 0px #012623;
    }

    table {
      th,
      td {
        text-align: center;
        font-size: 1.4vh;
      }

      th {
        padding: 6px;
        background-color: rgba(40, 117, 221, 0.5);
      }

      td {
        padding: 6px 4px;
      }

      .type {
        background-color: rgba(33, 115, 70, 0.5);
      }
    }
  }
}
</style>
