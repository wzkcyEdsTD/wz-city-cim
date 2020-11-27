/*
 * @Author: eds
 * @Date: 2020-07-29 16:10:06
 * @LastEditTime: 2020-09-15 10:45:53
 * @LastEditors: eds
 * @Description:
 * @FilePath: \wz-city-culture-tour\src\config\server\sourceTreeOption.js
 */
const SERVER_HOST = "https://ditu.wzcitybrain.com/iserver/services";
const SW_DATA = "/data-SW_DATA/rest/data";
const SW_DATA_NAME = "172.20.83.196_swdata:";
const SERVER_DEFAULT_DATA = SERVER_HOST + SW_DATA;
// 医疗专题
const MEDICAL_TOPIC = [
  { label: "医疗场所", dataset: "JZJZNL_YLJH_JHCS_LC", smart: true },
  { label: "派出所", dataset: "PoliceStation", smart: true },
  { label: "市场商场", dataset: "market_mall" },
  { label: "小学", dataset: "PrimarySchool" },
  { label: "初中", dataset: "JuniorHighSchool" },
  { label: "高中", dataset: "HighSchool" },
  { label: "娱乐场所", dataset: "entertainment_place" },
];
//  旅游专题
const TOUR_TOPIC = [
  {
    label: "重点景区", dataset: "JingQu",
    withExtraData: "tourPointList",
    withExtraDataGeometry: "tourPointListWithGeometry",
    saveExtraDataByGeometry: "setTourPointListWithGeometry",
    withExtraKey: "NAME",
  },
  { label: "星级酒店", dataset: "XingJiJiuDian" },
  { label: "精品农家乐", dataset: "温州农家乐" },
  { label: "旅游景点", dataset: "永嘉旅游景点地图" },
  { label: "温州民宿", dataset: "温州民宿" },
  { label: "森林康养基地", dataset: "温州市森林康养基地" },
  { label: "夜光经济", dataset: "夜景" },
  {
    label: "AAA级景区村庄",
    dataset: "AAAJiFengJingQuCunZhuang"
  },
  { label: "A级风景区", dataset: "AJiFengJingQu" },
  { label: "其他景点", dataset: "QiTaJingDIan" },
  { label: "星级旅行社", dataset: "XingJiLvXingShe" },
  { label: "民宿客栈", dataset: "MinSuKeZhan" },
  { label: "公厕", dataset: "PublicToilet" }
];

//  教育专题
const EDUCATION_TOPIC = [
  { label: "幼儿园", dataset: "NurserySchool" },
  { label: "小学", dataset: "PrimarySchool" },
  { label: "初中", dataset: "JuniorHighSchool" },
  { label: "高中", dataset: "HighSchool" },
  { label: "中职", dataset: "VocationalSchool" },
  { label: "高校", dataset: "UniversitySchool" },
]

// 控规专题
const BASIC_TOPIC = [
  {
    label: "控规信息",
    url: `${SERVER_HOST}/map-KongGui_LuCheng/rest/maps/%E6%8E%A7%E8%A7%84%E4%B8%89%E5%8C%BA20200304%40172.20.83.196_swdata`,
    type: "image"
  }
];
// 文化专题
const CULTURE_TOPIC = [
  { label: "爱国义务教育基地", dataset: "爱国主义教育基地" },
  { label: "市区阅读", dataset: "温州市阅读" },
  { label: "文化礼堂", dataset: "文化礼堂" },
  { label: "文化生活", dataset: "温州文化生活" },
  { label: "百姓健身房", dataset: "百姓健身房" },
];
//  应急专题
const EMERGENCY_TOPIC = [
  {
    label: "加油站",
    dataset: "D_HAZARDS_GasStation"
  },
  {
    label: "非煤矿山",
    dataset: "D_HARAZDS_NONCOALMINE"
  },
  {
    label: "烟花爆竹经营单位",
    dataset: "D_HARAZDS_FIREWORKS"
  },
  {
    label: "应急避灾场所",
    dataset: "JZJZNL_BZAZCS"
  },
  {
    label: "应急队伍",
    dataset: "JZJZNL_YJDW"
  }
];
//  农贸专题
const SOURCE_TOPIC = [
  {
    label: "农贸市场点",
    dataset: "FarmersMarket_SiQu_P"
  },
  {
    label: "派出所",
    dataset: "PoliceStation"
  },
  {
    label: "市场商场",
    dataset: "market_mall"
  },
  {
    label: "学校",
    dataset: "school"
  },
  {
    label: "社会福利机构",
    dataset: "D_HAZARDS_BEADHOUSESHP"
  },
  {
    label: "高层建筑",
    dataset: "high_buildings_P"
  },
  {
    label: "娱乐场所",
    dataset: "entertainment_place"
  },
  {
    label: "文化场所",
    dataset: "D_HAZARDS_CULTURALPLACE"
  },
  {
    label: "体育运动场馆",
    dataset: "sports_gymnasium"
  },
  {
    label: "客运单位",
    dataset: "passenger_trans_unit"
  }
];
//  交通专题
const TRAFFIC_TOPIC = [
  {
    label: "交通卡口",
    dataset: "KaKouDianWei",
    withExtraData: "bayonetList",
    withExtraDataGeometry: "bayonetListWithGeometry",
    saveExtraDataByGeometry: "setBayonetListWithGeometry",
    withExtraKey: "MC",
  },
  {
    label: "S1线路",
    componentEvent: "cesium-3d-hub-event",
    componentKey: "3d4",
    type: 'model'
  },
  {
    label: "S1站点",
    dataset: "T2_WZ_S1_Station_2019",
    withExtraData: "stationList",
    withExtraDataGeometry: "stationListWithGeometry",
    saveExtraDataByGeometry: "setStationListWithGeometry",
    withExtraKey: "NAME",
  },
  { label: "港口码头", dataset: "GangKouMaTou" },
  // { label: "市域轨道站点", dataset: "ShiYuGuiDaoZhanDian" },
  { label: "汽车站", dataset: "QiCheZhan" },
  { label: "火车站", dataset: "HuoCheZhan" },
  { label: "车管所", dataset: "CheGuanSuo" },
  { label: "公交站", dataset: "GongJiaoZhan" },
  { label: "服务区", dataset: "FuWuQu" },
  { label: "停车场", dataset: "TingCheChang" },
  { label: "加油站", dataset: "JiaYouZhan" },
  { label: "收费站", dataset: "ShouFeiZhan" },
];

const CITY_TOPIC = [
  {
    label: "城市总览",
    componentEvent: "cesium-3d-hub-event",
    componentKey: "3d1",
    type: 'model'
  },
]

export const CESIUM_TREE_SOURCE_OPTION = [{
  label: "资源信息",
  children: MEDICAL_TOPIC.map(v => {
    return {
      ...v,
      id: v.label,
      icon: v.label,
      url: SERVER_DEFAULT_DATA,
      type: "mvt",
      newdataset: `${SW_DATA_NAME}${v.dataset}`
    };
  })
}]