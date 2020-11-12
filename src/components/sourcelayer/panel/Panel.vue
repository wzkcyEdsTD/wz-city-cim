<template>
  <div class="mask-wrapper">
    <panel-left />
    <panel-right />
    <panel-bottom />
  </div>
</template>

<script>
import PanelLeft from "./PanelLeft/PanelLeft";
import PanelRight from "./PanelRight/PanelRight";
import PanelBottom from "./PanelBottom/PanelBottom";
export default {
  name: "panel",
  components: { PanelLeft, PanelRight, PanelBottom },
};
</script>

<style lang="less">
.panel {
  position: fixed;
  z-index: 5;
  box-sizing: border-box;
  padding: 4vh 1vh 2vh 1vh;
  display: flex;
  width: 36vh;
  top: 5vh;
  bottom: 0vh;
  display: flex;
  flex-direction: column;
  > div {
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    padding-bottom: 1vh;
    display: flex;
    flex-direction: column;
    > header {
      font-family: YouSheBiaoTiHei;
      font-size: 2.4vh;
      color: white;
      height: 4vh;
      line-height: 4vh;
      &.ph-right {
        text-align: left;
      }
      &.ph-left {
        text-align: right;
      }
    }
  }
}
</style>