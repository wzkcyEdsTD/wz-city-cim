<!--
 * @Author: eds
 * @Date: 2020-07-28 14:09:16
 * @LastEditTime: 2020-09-15 10:32:15
 * @LastEditors: eds
 * @Description:
 * @FilePath: \wz-city-culture-tour\src\components\sourcelayer\commonFrame\ForceBuilding.vue
-->
<template>
  <div class="force-building">
    <div class="_force-building_" v-if="forceBuilding">
      <header>
        {{ forceBuilding.NAME }}
        <i class="close" @click="closeFrame"></i>
      </header>
      <div class="frame-content">
        <ul>
          <li v-for="(value, key, i) in forceBuilding" :key="key + i">
            <p>
              <i>{{ key }}:</i
              >{{ value }}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ForceBuilding",
  data() {
    return {};
  },
  computed: {
    ...mapGetters("map", ["forceBuilding"]),
  },
  beforeDestroy() {
    this.closeFrame();
  },
  methods: {
    ...mapActions("map", ["setForceBuilding"]),
    doForce(obj) {
      this.setForceBuilding(obj);
    },
    closeFrame() {
      this.setForceBuilding(undefined);
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./ForceBuilding.less");
</style>
