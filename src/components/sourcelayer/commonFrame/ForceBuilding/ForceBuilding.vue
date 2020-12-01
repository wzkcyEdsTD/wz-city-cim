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
        <div class="build-info">
          <header>楼栋信息</header>
          <p>
            金丰园位于鹿城学院中路与惠民路交叉口西北首，是由暂无资料规划、开发的小区，规划面积9800平方米，建筑面积29866平方米，4栋共约总户数137户当期户数137户，无电梯，车位情况290个，服务物业是新世纪物业，物业服务周到管理完善。
          </p>
        </div>
        <div class="floor-info">
          <header>楼层情况</header>
          <ul>
            <li v-for="(value, key, i) in forceBuildFloorRoom" :key="key + i">
              <div class="floor-num">
                <i>第{{ key }}层</i>
              </div>
              <ul>
                <li
                  v-for="(item, room, j) in value"
                  :key="room + j"
                  @click="doForceRoom(room, item)"
                >
                  <span
                    :class="{
                      activeRoom: item.length,
                      activeCompany: item.length && item[0].type == 'company',
                      activeKey:
                        item.length && item.filter((v) => v.isKey).length,
                    }"
                    >{{ room }}室
                    <div class="room-info" v-if="item.length">
                      <span
                        v-for="(people, k) in item"
                        :key="k"
                        :class="{ activeRoomKeyOne: people.isKey }"
                      >
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
