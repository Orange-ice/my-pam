// 全局统一拦截器
import {axios} from "@paraview/lib/http";
import {MessageObject} from '@para-ui/core/Message'
import {intl} from "../locale";

const axiosFunc = (Message: MessageObject) => {
    // 请求拦截器
    axios.interceptors.request.use(function (config) {
        //国际化请求头
        if (config && config.url && config.url.indexOf('web-debug/host/list') === -1) {
            if(config.headers){
                config.headers['Accept-Language'] = window.localStorage.getItem('language') || 'zh';
            }
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    // 响应拦截器
    axios.interceptors.response.use((response: any) => {
        const {data: resData, config}: any = response;
        // global为true直接返回
        if (config.global === true) return response;
        // 错误
        if (resData) {
            const {code, msg} = resData;
            if (String(code) === '200') { // 请求成功

            } else { // 请求错误
                // 未认证拦截，跳转登陆页
                if (String(code) === '401')
                    return toLogin();
                // 全局错误提示
                if (config.global !== 'msg')
                    Message.error(msg);
                return Promise.reject({code, msg})
            }
        }
        return response;
    }, function (error) {
        const {response, config} = error;
        if (!response && config.global !== true) return Message.error(error.message && intl('networkError'));
        const status = String(response.status);
        if (status === '401') {
            return toLogin();
        } else {
            let msg: string = '';
            switch (status) {
                case '403':
                    msg = intl('403');
                    window.location.hash = '/403';
                    break;
                case '404':
                    msg = intl('404');
                    break;
                case '500':
                    msg = intl('500');
                    break;
                default:
                    msg = intl('unknown');
            }
            Message.error(msg);
        }
    });

    // 跳转登陆页
    function toLogin() {
        // location.href = '';
    }
}

export default axiosFunc;
