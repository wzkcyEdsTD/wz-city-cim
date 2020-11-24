/*
 * @Author: eds
 * @Date: 2020-08-21 18:30:30
 * @LastEditTime: 2020-09-04 15:08:51
 * @LastEditors: eds
 * @Description:
 * @FilePath: \wz-city-culture-tour\src\store\modules\map\actions.js
 */
import * as types from "./mutation-types";
import CIM_API from "api/cimAPI";
//  设置网格员
export const setForceGridMember = ({ commit }, data) => {
  commit(types.SET_FORCE_GRID_MEMBER, data);
}
//  获取网格员列表
export const setGridMemberList = async ({ commit }, data) => {
  const { rows } = await CIM_API.getGridMemberList();
  commit(types.SET_GRID_MEMBER_LIST, rows);
}
//  设置mvt楼栋房间数据
export const setForceRoom = ({ commit }, data) => {
  commit(types.SET_FORCE_ROOM, data);
}
//  设置mvt楼栋数据
export const setForceBuilding = ({ commit }, data) => {
  commit(types.SET_FORCE_BUILDING, data);
}
//  设置事件列表
export const getEventList = async ({ commit }, data) => {
  const { rows } = await CIM_API.getEventList();
  commit(types.SET_EVENT_LIST, rows);
}
//  设置事件流程
export const getEventLog = async ({ commit }, data) => {
  const { rows } = await CIM_API.getEventLog(data);
  commit(types.SET_EVENT_LOG, rows);
}
//  设置事件点
export const setEventForce = ({ commit }, data) => {
  commit(types.SET_EVENT_FORCE, data);
}
//  设置各类人员信息
export const getAllKindsList = async ({ commit }, data) => {
  const result = await CIM_API.getAllKindsList();
  return result;
}
//  设置监控视频
export const SetRtmpList = ({ commit }, data) => {
  commit(types.SET_RTMP_LIST, data);
};
//  设置事件跳转监控视频
export const SetRtmpListOther = ({ commit }, data) => {
  commit(types.SET_RTMP_LIST_OTHER, data);
};
//  设置弹窗显隐
export const SetIsInfoFrame = ({ commit }, data) => {
  commit(types.SET_IS_INFO_FRAME, data);
};
//  设置展示指标
export const SetForceIndex = ({ commit }, data) => {
  commit(types.SET_FORCE_INDEX, data);
};
//  设置时间线
export const SetForceTime = ({ commit }, data) => {
  commit(types.SET_FORCE_TIME, data);
};
//  设置白天黑夜
export const SetNightMode = ({ commit }, data) => {
  commit(types.SET_NIGHT_MODE, data);
};
//  设置相机转动
export const SetCameraMode = ({ commit }, data) => {
  commit(types.SET_CAMERA_MODE, data);
};
//  设置tab下标
export const SetForceTreeLabel = ({ commit }, data) => {
  commit(types.SET_FORCE_TREE_LABEL, data);
};
//  设置tab子菜单下标数组
export const SetForceTrueTopicLabels = ({ commit }, data) => {
  commit(types.SET_FORCE_TRUE_TOPIC_LABEL, data);
};
//  设置tab子菜单下标
export const SetForceTrueTopicLabelId = ({ commit }, data) => {
  commit(types.SET_FORCE_TRUE_TOPIC_LABEL_ID, data);
};