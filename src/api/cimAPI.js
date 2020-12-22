import axios from "axios";
const BASEURL = ~window.location.host.indexOf('localhost') ? "http://localhost:3000" : "http://10.36.198.161:3000";
// const BASEURL = "http://10.36.198.161:3000";
const serverInstanec = axios.create();
serverInstanec.defaults.baseURL = BASEURL;

/**
 * axios default
 * @param {*} url
 * @param {*} data
 */
const getAxios = (url = "", params = {}, method = "get") => {
    const option = { url, method };
    method == 'get' ? option.params = params : option.data = params;
    return serverInstanec.request(option).then(res => {
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
/**
 * 获取网格员列表
 */
const getGridMemberList = () => {
    return getAxios("/grid/getGridMemberList");
}
/**
 * 获取网格员行进路线地址
 */
const getGridMemberRouteLink = (name) => {
    return getAxios("/grid/getGridMemberRouteLink", { name });
}
/**
 * 获取网格员行进路线
 */
const getGridMemberRoutes = (url) => {
    return getAxios("/forward/getGridMemberRoutes", { url }, 'post');
}

/**
 * 获取额外视频
 */
const getExtraVideo = (data) => {
    return getAxios("/forward/getExtraVideo", data, 'post');
}

export default {
    getEventList,
    getAllKindsList,
    getEventLog,
    getGridMemberList,
    getGridMemberRouteLink,
    getGridMemberRoutes,
    getExtraVideo
}