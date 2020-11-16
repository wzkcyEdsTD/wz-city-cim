/*
 * @Author: eds
 * @Date: 2020-08-20 09:03:09
 * @LastEditTime: 2020-09-07 16:32:04
 * @LastEditors: eds
 * @Description:
 * @FilePath: \wz-city-culture-tour\src\api\cityBrainAPI.js
 */
import axios from "axios";
const BASEURL = "https://sourceserver.wzcitybrain.com/statistics/ProxyGetCityBraainData";
const instance = axios.create();
instance.defaults.baseURL = BASEURL;
instance.defaults.method = "get";
/**
 * axios default
 * @param {*} url
 * @param {*} data
 */
const getAxios = (code = "", data = {}) => {
  return instance.request({
    url: "",
    params: { params: JSON.stringify(data), code, systype: 1 }
  }).then(res => {
    return res.data ? Promise.resolve(JSON.parse(res.data.result)) : Promise.reject(res);
  });
};

/**
 * 获取雪亮所有视频点
 */
export const getRtmpVideoAll = () => {
  return getAxios("100007018");
};
/**
 * 获取视频列表 100006019
 * @param {*} param0
 * @param {*} token
 */
export const getRtmpVideoList = (geometry, dist) => {
  return getAxios("100006019", { ...geometry, dist });
};
/**
 * 获取视频真实地址 100006020
 * @param {*} mp_id
 */
export const getRtmpVideoURL = mp_id => {
  return getAxios("100006020", { mp_id });
};
/**
 * 获取实施人口 100007059
 * @param {*} param0
 * @param {*} token
 */
export const getPopulation = geometry => {
  return getAxios("100007059", { ...geometry, type: 2,radius:100 });
};