<template>
  <div class="alarm-list">
    <header class="ph-right">消防信息</header>
      <div class="emergency-grid-table">
      <table>
        <thead>
          <tr>
            <th>地址</th>
            <th>设备类型</th>
            <th>发生时间</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in alarmList" :key="index">
            <td>{{item.address}}</td>
            <td>{{item.deviceType}}</td>
            <td>{{item.strhappentime}}</td>
            <td>{{item.status}}</td>
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
  name: "alarmlist",
  data() {
    return { gridMsg: {} };
  },
  computed: {
    ...mapGetters("map", ["alarmList"]),
  },
  async created() {

  },
  methods: {
    ...mapActions("map", ["setForceGridMember"]),
    // 网格信息
  },
};
</script>

<style lang="less">
.alarm-list {
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
      .force-grid {
        cursor: pointer;
        &:hover{
          text-decoration-line: underline;
        }
      }
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
