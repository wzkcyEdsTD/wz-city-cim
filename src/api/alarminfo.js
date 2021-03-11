import axios from 'axios';


var apiUrl = "http://10.36.198.161:8080";
const quickapi = {
    /**
     * @description 获取手机验证码
     * @param {String} UserTel 手机号码
     */
    GetAlarmInfo(params) {
        // UserTel:13587877547
        var query ="";
        if(!!params){
            query ="?companyId="+params;
        }
        return axios(apiUrl + '/getAlarmInfo'+query);
    },

    GetCompanyInfo(params) {
      // UserTel:13587877547
      return axios(apiUrl + '/getCompanyInfo', {
          params: params,
      });
  },
};

export default quickapi;
