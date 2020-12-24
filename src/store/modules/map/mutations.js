import { type } from "jquery";
/*
 * @Author: eds
 * @Date: 2020-07-01 15:22:07
 * @LastEditTime: 2020-09-03 15:41:28
 * @LastEditors: eds
 * @Description:
 * @FilePath: \wz-city-culture-tour\src\store\modules\map\mutations.js
 */
// 定义修改操作
import * as types from "./mutation-types";

const mutations = {
  [types.SET_FORCE_GRID_MEMBER](state, data) {
    state.forceGridMember = data;
  },
  [types.SET_GRID_MEMBER_LIST](state, data) {
    state.gridMemberList = data;
  },
  [types.SET_FORCE_ROOM](state, data) {
    state.forceRoom = data;
  },
  [types.SET_FORCE_BUILDING](state, data) {
    state.forceBuilding = data;
  },
  [types.SET_EVENT_LIST](state, data) {
    state.eventList = data;
  },
  [types.SET_EVENT_LOG](state, data) {
    state.eventLog = data;
  },
  [types.SET_EVENT_FORCE](state, data) {
    state.eventForce = data;
  },
  [types.SET_RTMP_LIST](state, data) {
    state.rtmpList = data;
  },
  [types.SET_RTMP_LIST_OTHER](state, data) {
    state.rtmpListOther = data;
  },
  [types.SET_IS_INFO_FRAME](state, bool) {
    state.isInfoFrame = bool;
  },
  [types.SET_CURRENT_MAP_TYPE](state, data) {
    state.currentMapType = data;
  },
  [types.SET_MAP_LOADED](state, data) {
    state.mapLoaded = data;
  },
  [types.SET_INIT_DATA_LOADED](state, data) {
    state.initDataLoaded = data;
  },
  [types.SET_FORCE_MAP_TYPE](state, data) {
    state.forceMapTypeBase = data;
  },
  [types.SET_FORCE_INDEX](state, data) {
    state.forceIndex = data
  },
  [types.SET_FORCE_TIME](state, data) {
    state.forceTime = data
  },
  [types.SET_NIGHT_MODE](state, data) {
    state.nightMode = data
  },
  [types.SET_CAMERA_MODE](state, data) {
    state.cameraMode = data
  },
  [types.SET_FORCE_TREE_LABEL](state, data) {
    state.forceTreeLabel = data
  },
  [types.SET_FORCE_TRUE_TOPIC_LABEL](state, data) {
    state.forceTrueTopicLabels = [...data];
  },
  [types.SET_FORCE_TRUE_TOPIC_LABEL_ID](state, data) {
    state.forceTrueTopicLabelId = data;
  },
  [types.SET_GRID_MODE](state, data) {
    state.gridMode = data;
  }
};

export default mutations;
