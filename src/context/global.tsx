// 全局公用数据Context

import React from 'react';
import {LocaleConfig} from '../locale/index'
import {MessageObject} from '@para-ui/core/Message';
import {ConfirmObject} from '@para-ui/core/Modal';
import {SnackSDK} from "@para-snack/core";

interface GlbalProps {
    sdk: SnackSDK,
    // 国际化
    setLocale: Function, // 设置语言
    locales: LocaleConfig // 语言列表
    locale: string // 当前语言

    // 菜单
    setMenu: Function // 设置菜单
    menu: Array<any> // 菜单数据
    // 全局消息提示方法
    Message: MessageObject
    // 全局确认框
    Confirm: ConfirmObject
    // 路由设置
    router: string
    setRouter: Function
}

export const Global = React.createContext<GlbalProps>({
    sdk: {} as SnackSDK,
    // 国际化
    setLocale: () => {
    },
    locales: {},
    locale: '',

    // 菜单
    setMenu: () => {
    },
    menu: [],
    // 全局消息提示
    Message: {
        info: () => {
        },
        error: () => {
        },
        success: () => {
        },
        warn: () => {
        }
    },
    Confirm: {
        info: () => {
        },
        error: () => {
        },
        success: () => {
        },
        warn: () => {
        }
    },
    router: '',
    setRouter: () => {
    },
});
export default Global;
