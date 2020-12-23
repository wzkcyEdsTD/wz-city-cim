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
            <td>{{ gridMsg.WGPZ_NAME || "" }}</td>
            <td>{{ gridMsg.WGPZ_PHONE || "" }}</td>
          </tr>
          <tr>
            <td>网格指导员</td>
            <td>{{ gridMsg.WGZDY_NAME || "" }}</td>
            <td>{{ gridMsg.WGZDY_PHONE || "" }}</td>
          </tr>
          <tr>
            <td>网格协助员</td>
            <td>{{ gridMsg.WGXZY_NAME || "" }}</td>
            <td>{{ gridMsg.WGXZY_PHONE || "" }}</td>
          </tr>
          <tr>
            <td>网格长</td>
            <td>{{ gridMsg.WGZ_NAME || "" }}</td>
            <td>{{ gridMsg.WGZ_PHONE || "" }}</td>
          </tr>
          <tr>
            <td>专职网格员</td>
            <td>{{ gridMsg.ZZWGY_NAME || "" }}</td>
            <td>{{ gridMsg.ZZWGY_PHONE || "" }}</td>
          </tr>
          <tr>
            <td colspan="3" class="type">入格</td>
          </tr>
          <tr>
            <td>公安部门入格员</td>
            <td>{{ gridMsg.BMRGY_GA_NAME || "" }}</td>
            <td>{{ gridMsg.BMRGY_GA_PHONE || "" }}</td>
          </tr>
          <tr>
            <td>行政执法部门入格员</td>
            <td>{{ gridMsg.BMRGY_XZZF_NAME || "" }}</td>
            <td>{{ gridMsg.BMRGY_XZZF_PHONE || "" }}</td>
          </tr>
          <tr>
            <td>市场监管部门入格员</td>
            <td>{{ gridMsg.BMRGY_SCJG_NAME || "" }}</td>
            <td>{{ gridMsg.BMRGY_SCJG_PHONE || "" }}</td>
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
import { MultGridMember } from "./GridMember/mock";
export default {
  name: "gridMemberList",
  data() {
    return { gridMsg: {}, MultGridMember };
  },
  computed: {
    ...mapGetters("map", ["eventForce"]),
  },
  async created() {
    await this.fixGridMsg();
  },
  methods: {
    // 网格信息
    async fixGridMsg() {
      const gridId = this.eventForce.ORGNAME.substring(
        this.eventForce.ORGNAME.indexOf("（") + 1,
        this.eventForce.ORGNAME.indexOf("网")
      );
      this.gridMsg = this.MultGridMember[gridId] || this.MultGridMember["3505"];
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