// 路由与组件关系配置 import() 无法动态设置参数，因此需要开发阶段预设关联关系

import {FunctionComponent, lazy} from "react";

interface ComponentMapping {
    [path: string]: FunctionComponent
}

export const Components: ComponentMapping = {
    '/home': lazy(() => import('../view/home'))
}

export default Components;
