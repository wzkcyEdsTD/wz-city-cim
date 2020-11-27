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
    <div class="_force_building_" v-if="forceBuilding">
      <header>
        {{ forceBuilding.NAME }}
        <i class="close" @click="closeFrame"></i>
      </header>
      <div class="frame-content">
        <header>楼栋信息</header>
        <div>-</div>
        <header>楼层情况</header>
        <ul>
          <li v-for="(value, key, i) in forceBuildFloorRoom" :key="key + i">
            <p>第{{ key }}层</p>
            <ul>
              <li
                v-for="(item, room, j) in value"
                :key="room + j"
                @click="doForceRoom(room, item)"
              >
                <span :class="{ active: item.length }"
                  >{{ room }}室
                  <div class="room-info" v-if="item.length">
                    <span v-for="(people, k) in item" :key="k">
                      <p>{{ people.NAME }}</p>
                      <!-- <p>{{ people.IDCARD }}</p> -->
                    </span>
                  </div>
                </span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BUILD_FLOOR_ROOM_PEOPLE from "mock/building/BUILD_FLOOR_ROOM_PEOPLE";
export default {
  name: "ForceBuilding",
  data() {
    return {};
  },
  computed: {
    ...mapGetters("map", ["forceBuilding"]),
    forceBuildFloorRoom() {
      return BUILD_FLOOR_ROOM_PEOPLE[this.forceBuilding.OBJECTID] || {};
    },
  },
  beforeDestroy() {
    this.closeFrame();
  },
  methods: {
    ...mapActions("map", ["setForceBuilding", "setForceRoom"]),
    doForce(obj) {
      this.setForceBuilding(obj);
      this.setForceRoom(undefined);
    },
    closeFrame() {
      this.setForceBuilding(undefined);
      this.setForceRoom(undefined);
    },
    doForceRoom(room, item) {
      this.setForceRoom({
        buildid: this.forceBuilding.OBJECTID,
        room,
        item,
        bName: this.forceBuilding.NAME,
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./ForceBuilding.less");
</style>
