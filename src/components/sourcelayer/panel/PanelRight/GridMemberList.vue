<template>
  <div class="grid-member-list">
    <header class="ph-right">网格员排行榜</header>
    <div class="grid-member-list-ul">
      <header>
        <span>序号</span>
        <span>网格员</span>
        <span>里程数(公里)</span>
      </header>
      <ul>
        <li
          v-for="(item, i) in gridMemberList"
          :key="i"
          @click="doForceGridMember(item)"
        >
          <span>{{ i + 1 }}</span>
          <span>{{ item.name }}</span>
          <span>{{ item.km }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "gridMemberList",
  data() {
    return {};
  },
  computed: {
    ...mapGetters("map", ["gridMemberList"]),
  },
  methods: {
    ...mapActions("map", ["setForceGridMember"]),
    doForceGridMember(item) {
      this.setForceGridMember(item);
    },
  },
};
</script>

<style lang="less" scoped>
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
      width: 6vh;
    }
    &:nth-child(2) {
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
</style>