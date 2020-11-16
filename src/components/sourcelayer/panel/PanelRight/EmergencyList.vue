<template>
  <div class="emergency-list">
    <header class="ph-right">事件档案</header>
    <div class="emergency-list-ul">
      <header>
        <span>网格</span>
        <span>事件</span>
        <span>日期</span>
      </header>
      <ul>
        <li v-for="(item, i) in eventList" :key="i" :title="item.SUBJECT">
          <span>{{ item.OCCURORG }}</span>
          <span>{{ item.SUBJECT }}</span>
          <span>{{ new Date(item.OCCURDATE).toLocaleDateString() }}</span>
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
    return {};
  },
  computed: {
    ...mapGetters("map", ["eventList"]),
  },
  created() {
    this.getEventList();
  },
  methods: {
    ...mapActions("map", ["getEventList"]),
  },
};
</script>

<style lang="less" scoped>
.emergency-list {
  height: 26vh;
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