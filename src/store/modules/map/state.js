/*
 * @Author: eds
 * @Date: 2020-07-01 15:22:07
 * @LastEditTime: 2020-09-03 15:52:48
 * @LastEditors: eds
 * @Description:
 * @FilePath: \wz-city-culture-tour\src\store\modules\map\state.js
 */
const state = {
  forceMapTypeBase: true,
  currentMapType: "cesiumMap", // 地图类型  四色图 sandian cesiumMap
  initDataLoaded: false, // 地图底图是否加载完毕
  //  详情
  isInfoFrame: false,
  //  视频列表
  rtmpList: [],
  rtmpListOther: [],
  //  时间轮盘
  forceTime: 'now',
  //  白天黑夜
  nightMode: true,
  //  相机转动
  cameraMode: false,
  //  指标下表
  forceIndex: '医疗专题',
  //  tab下标
  forceTreeLabel: "医疗专题",
  forceTrueTopicLabels: [],
  forceTrueTopicLabelId: "",
  //  cim
  eventList: [],
  eventLog: [],
  eventForce: undefined,
  //  building
  forceBuilding: undefined,
  //  grid
  gridMemberList: [
    { name: '小王', km: "122" },
    { name: '老金', km: "102" },
    { name: '阿邦', km: "86" },
    { name: '阿振', km: "56" },
    { name: '小捷', km: "55" }
  ],
  forceGridMember: undefined
};
export default state;
