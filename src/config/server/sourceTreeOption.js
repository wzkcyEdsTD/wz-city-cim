/*
 * @Author: eds
 * @Date: 2020-07-29 16:10:06
 * @LastEditTime: 2020-09-15 10:45:53
 * @LastEditors: eds
 * @Description:
 * @FilePath: \wz-city-culture-tour\src\config\server\sourceTreeOption.js
 */
const SERVER_HOST = "https://ditu.wzcitybrain.com/iserver/services";
//  [DEFAULT]
const SW_DATA = "/data-SW_DATA/rest/data";
const SW_DATA_NAME = "swdata:";
const SERVER_DEFAULT_DATA = SERVER_HOST + SW_DATA;
//  [NEW]
const N_DATA = "/data-qyry/rest/data";
const N_DATA_NAME = "pyry:";
const SERVER_N_DATA = SERVER_HOST + N_DATA;
//  [BUILDING]
const BUILDFING_DATA = "/data-pxs1222-2/rest/data";
const BUILDFING_DATA_NAME = "pxs:";
const SERVER_BUILDFING_DATA = SERVER_HOST + BUILDFING_DATA;

// 医疗专题
const TOPIC = [
  { label: "医疗场所", dataset: "JZJZNL_YLJH_JHCS_LC", smart: true },
  { label: "派出所", dataset: "PoliceStation", smart: true },
  { label: "市场商场", dataset: "market_mall" },
  // { label: "小学", dataset: "PrimarySchool" },
  // { label: "初中", dataset: "JuniorHighSchool" },
  // { label: "高中", dataset: "HighSchool" },
  { label: "娱乐场所", dataset: "entertainment_place" },
  { label: "企业", dataset: "pxsqyd", isNew: true },
  { label: "重点人员", dataset: "zdry", isNew: true },
  { label: "消防站", dataset: "JZJZNL_XFJYNL_XFZ" },
  { label: "消防栓", dataset: "JZJZNL_XFJYNL_XFS" }
];

export const CESIUM_TREE_SOURCE_OPTION = [{
  label: "资源信息",
  children: TOPIC.map(v => {
    return {
      ...v,
      id: v.label,
      icon: v.label,
      url: v.isNew ? SERVER_N_DATA : SERVER_DEFAULT_DATA,
      type: "mvt",
      newdataset: `${v.isNew ? N_DATA_NAME : SW_DATA_NAME}${v.dataset}`
    };
  })
}]

export const CESIUM_PEOPLE_BUILDING_SOURCE_OPTION = {
  PEOPLE2D: {
    url: SERVER_BUILDFING_DATA,
    newdataset: `${BUILDFING_DATA_NAME}zdry1222`
  },
  BUILDING2D: {
    url: SERVER_BUILDFING_DATA,
    newdataset: `${BUILDFING_DATA_NAME}RES_PY_POINTLINK`
  },
  HOME2D: {
    url: SERVER_BUILDFING_DATA,
    newdataset: `${BUILDFING_DATA_NAME}hsb`
  },
  NORMAL2D: {
    url: SERVER_BUILDFING_DATA,
    newdataset: `${BUILDFING_DATA_NAME}hjb`
  }
}