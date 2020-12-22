/*
 * @Author: eds
 * @Date: 2020-08-20 09:03:09
 * @LastEditTime: 2020-09-09 16:21:53
 * @LastEditors: eds
 * @Description: 地名地址接口对接
 * @FilePath: \wz-city-culture-tour\src\api\layerServerAPI.js
 */
import axios from "axios";
const BASEURL = "http://10.36.245.204:8765/api";
const serverInstanec = axios.create();
serverInstanec.defaults.baseURL = BASEURL;

/**
 * axios default
 * @param {*} url
 * @param {*} data
 */
const getAxios = (data = {}, url = "") => {
    return serverInstanec.request({ url, data, method: "post" }).then(({ data }) => {
        console.log(data);
        return !data.code ? data.data : [];
    });
};

export const fetchExtraVideo = async (MpID, FCode) => {
    const { token, uid } = await getAxios({
        MACAddr: "",
        pwd: "b27d42bfb930b9186aae8986a7f6db52",
        uaccount: "yjzx@wz"
    }, "/login")
    return getAxios({ FCode, MpID, token, uid }, "/VideoStart");
};