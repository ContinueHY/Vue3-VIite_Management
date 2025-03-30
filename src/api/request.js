import axios from 'axios';
import { ElMessage } from 'element-plus';
import config from '@/config/index';

const service = axios.create({
    baseURL: config.baseApi,
});
const NETWORK_ERROR = "网络错误...";

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
// 添加响应拦截器
service.interceptors.response.use((res) => {
    const { code, data, msg } = res.data;
    if (code === 200) {
        //1.被本地拦截了，main.js中的mock的假数据就可以生成了
        //2.被线上拦截了，就可以生成线上的假数据
        return data;
    } else {
        ElMessage.error(msg || NETWORK_ERROR);
        return Promise.reject(msg || NETWORK_ERROR);
    }
});

function request(options) {//传了一个对象，使用这个对象的method进行判断
    options.method = options.method || "get";
    //如果是get请求，使用params传参
    if (options.method.toLowerCase() === "get") {
        options.params = options.data;
    }

    //判断是否是用mock环境
    let isMock = config.mock;//先用config中的mock总开关控制
    if (typeof options.mock !== "undefined") {
        isMock = options.mock; //如果传了mock就用传的mock
    }

    //针对环境做一个处理,配置baseURL
    if (config.env === "prod") {//线上环境直接用线上，不是线上再考虑是用mock还是线上mock
        //若是线上则不能用mockApi,要用线上的api
        service.defaults.baseURL = config.baseApi;//修改跟路径，但是传入的url路径可以拼接到根路径上
    } else {
        service.defaults.baseURL = isMock ? config.mockApi : config.baseApi;
    }
    return service(options);
};
export default request;
