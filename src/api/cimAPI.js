import axios from "axios";
const BASEURL = ~window.location.host.indexOf('localhost') ? "http://localhost:3000" : "http://10.36.198.161:3000";
const serverInstanec = axios.create();
serverInstanec.defaults.baseURL = BASEURL;

/**
 * axios default
 * @param {*} url
 * @param {*} data
 */
const getAxios = (url = "", params = {}) => {
    return serverInstanec.request({ url, params, method: "get" }).then(res => {
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
 * 获取事件流程
 * @param {*} id 
 */
const getEventLog = (id) => {
    return getAxios("/event/getEventLog", { id })
}
/**
 * 获取各类人员列表
 */
const getAllKindsList = () => {
    return getAxios("/staff/getAllKindsList");
}

export default {
    getEventList, getAllKindsList, getEventLog
}