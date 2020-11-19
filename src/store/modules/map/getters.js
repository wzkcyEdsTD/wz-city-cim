/*
 * @Author: eds
 * @Date: 2020-07-01 15:22:07
 * @LastEditTime: 2020-09-03 15:40:51
 * @LastEditors: eds
 * @Description:
 * @FilePath: \wz-city-culture-tour\src\store\modules\map\getters.js
 */

import state from "./state";

// 获取state
export const forceMapTypeBase = state => state.forceMapTypeBase;
export const currentMapType = state => state.currentMapType;
export const mapLoaded = state => state.mapLoaded;
export const initDataLoaded = state => state.initDataLoaded;
export const isInfoFrame = state => state.isInfoFrame;
export const rtmpList = state => state.rtmpList;
export const rtmpListOther = state => state.rtmpListOther;
export const forceIndex = state => state.forceIndex;
export const forceTime = state => state.forceTime;
export const nightMode = state => state.nightMode;
export const cameraMode = state => state.cameraMode;
export const forceTreeLabel = state => state.forceTreeLabel
export const forceTrueTopicLabels = state => state.forceTrueTopicLabels;
export const forceTrueTopicLabelId = state => state.forceTrueTopicLabelId;
export const eventList = state => state.eventList;
export const eventLog = state => state.eventLog;
export const eventForce = state => state.eventForce;
export const forceBuilding = state => state.forceBuilding;
export const gridMemberList = state => state.gridMemberList;