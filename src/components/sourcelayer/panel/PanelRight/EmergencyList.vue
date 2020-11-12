<template>
  <div class="emergency-list">
    <header class="ph-right">事件档案</header>
    <div class="emergency-list-ul">
      <header>
        <span>网格</span>
        <span>地址</span>
        <span>事件</span>
      </header>
      <ul>
        <li v-for="(item, i) in emergencyList" :key="i + item.g">
          <span>{{ item.g }}</span>
          <span>{{ item.a }}</span>
          <span>{{ item.t }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "emergencyList",
  data() {
    return {
      emergencyList: [
        { g: "xxx", a: "蒲鞋市街道学院中路288号", t: "纠纷" },
        { g: "xxx", a: "蒲鞋市街道学院中路288号", t: "纠纷" },
        { g: "xxx", a: "蒲鞋市街道学院中路288号", t: "纠纷" },
        { g: "xxx", a: "蒲鞋市街道学院中路288号", t: "纠纷" },
        { g: "xxx", a: "蒲鞋市街道学院中路288号", t: "纠纷" },
        { g: "xxx", a: "蒲鞋市街道学院中路288号", t: "纠纷" },
        { g: "xxx", a: "蒲鞋市街道学院中路288号", t: "纠纷" },
        { g: "xxx", a: "蒲鞋市街道学院中路288号", t: "纠纷" },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.emergency-list {
  height: 26vh;
  .emergency-list-ul {
    flex: 1;
    color: #c9c9c9;
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
        width: 5px;
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
          &:last-child {
            color: #fc5453;
          }
        }
      }
    }
    span {
      display: inline-block;
      box-sizing: border-box;
      padding: 0 0.8vh;
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
        width: 6vh;
      }
    }
  }
}
</style>