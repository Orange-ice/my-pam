// 异步路由数据

import {FunctionComponent} from "react";
import Components from "./components";

export interface RouterConfig {
    label: string,
    type: 'router' | 'iframe' | 'snack' | 'snackPage' | 'redirect'
    path: string // 通用 路由Hash
    url?: string // iframe | iframe | snackPage 模式
    component?: FunctionComponent // router | redirect 模式 两种模式实现方式相同，为了渲染菜单过滤重定向
    snackType?: string // snack分类
}

export const router = async (): Promise<Array<RouterConfig>> => {
    let list: Array<RouterConfig> = [];
    // local router demo 由于 import() 无法动态设置参数，因此需要开发阶段预设关联关系，从Components配置关系内导出组件
    list.push({label: '主页', type: 'router', path: '/home', component: Components['/home']});
    // local iframe demo
    list.push({label: '官网', type: 'iframe', path: '/para', url: 'https://www.paraview.cn'});
    // snack组件
    list.push({label: 'snack组件', type: 'snack', path: '/snack', url: 'modulemanage', snackType: 'console'});
    // snack页面
    list.push({
        label: 'snack页面',
        type: 'snackPage',
        path: '/snackPage',
        url: 'd617b2f2-7c01-d0ff-0368-3d6c17523e05',
        snackType: 'console'
    });
    // 默认地址
    list.push({label: '默认跳转', type: 'redirect', path: '/', component: Components['/home']});

    return list;
}

export default router;
