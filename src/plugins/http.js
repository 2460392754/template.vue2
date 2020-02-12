import axios from 'axios';
import qs from 'qs';
import router from '@/plugins/route';
import config from '@/config';
import * as Auth from '@/utils/auth';

// axios 实例对象
const http = axios.create({
    baseURL: config.SERVER_BASE_URL,
    timeout: config.HTTP_REQUEST_TIME_OUT,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});

// 请求拦截器
http.interceptors.request.use(
    (config) => {
        // 自动给请求头添加 token
        if (Auth.hasToken()) {
            config.headers.Authorization = 'Bearer ' + Auth.getToken();
        }

        // 使用qs模板序列化data数据
        if (config.method !== 'get') {
            config.data = qs.stringify(config.data);
        }

        return config;
    },
    (error) => {
        console.error('http request error:', error);

        return Promise.reject(error);
    }
);

// 响应拦截器
http.interceptors.response.use(
    async (res) => {
        const { data, status: code } = res;

        try {
            await handleCode(code);

            return data.data;
        } catch (err) {
            return Promise.reject(err);
        }
    },
    (error) => {
        console.error('http response error:', error);

        return Promise.reject(error);
    }
);

/**
 * 处理 http 状态码
 * @param {object} data 请求返回的数据
 * @param {string | number} code http状态码
 * @return {never}
 */
const handleCode = function(code) {
    switch (code) {
        case 200:
        case 201:
            return;

        case 400:
            return Promise.reject(new Error('请求错误'));

        case 401:
            Auth.removeToken();
            router.replace('/401');

            return Promise.reject(new Error('登录过期, 请重新登录'));

        case 403:
            return Promise.reject(new Error('拒绝请求, 当前操作没有被授权(权限)'));

        case 500:
            return Promise.reject(new Error('服务器错误'));

        default:
            return Promise.reject(new Error('出现未知错误...' + code));
    }
};

export default http;
