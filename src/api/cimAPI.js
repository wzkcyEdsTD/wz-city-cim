import axios from "axios";
const BASEURL = "http://localhost:3000";
const serverInstanec = axios.create();
serverInstanec.defaults.baseURL = BASEURL;

/**
 * axios default
 * @param {*} url
 * @param {*} data
 */
const getAxios = (url = "", data = {}) => {
    return serverInstanec.request({ url, data, method: "get" }).then(res => {
        return res.data ? Promise.resolve(res.data.data) : Promise.reject(res);
    });
};

/**
 * 获取事件列表
 */
const getEventList = () => {
    return getAxios("/event/getEventList")
}
/**
 * 获取各类人员列表
 */
const getAllKindsList = () => {
    return getAxios("/staff/getAllKindsList");
}

export default {
    getEventList, getAllKindsList
}