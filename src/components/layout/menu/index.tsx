import React, {FunctionComponent} from "react";
import Global from "../../../context/global";
import ParaMenu from "@para-ui/core/Menu";
import {version} from '../../../../package.json';

import "./index.scss";

interface Props {

}

// 默认跳转地址
const defaultUrl: string = '/home';

const Menu: FunctionComponent<Props> = (props: Props) => {
    const {menu, router, setRouter} = React.useContext(Global);
    // 菜单渲染数据
    const [menuList, setMenuList] = React.useState<any[]>([]);
    // 菜单是否展开
    const [expansion, setExpansion] = React.useState<boolean>(true);

    React.useEffect(() => {
        const menuList = menu.filter((item: any) => item.type !== 'redirect');
        setMenuList(formatMapToTree(menuList));
    }, [menu]);

    /**
     * 处理路由,自动监听地址栏变化,设置选中菜单的值
     */
    React.useEffect(() => {
        console.log(router)
        if (router === '/') setRouter(defaultUrl);
        window.location.hash = router === '/' ? defaultUrl : router;
        window.onhashchange = function () {
            if (('#' + router) === window.location.hash) return;
            if (router === '/') setRouter(defaultUrl);
            const routerHand: string = window.location.hash.split('#')[1];
            setRouter(routerHand);
        }
    }, [router, setRouter]);

    // 路由跳转
    const clickMenu = (item: any) => {
        setRouter(item.path);
    }

    // 展开折叠
    const clickExpansion = (bol: boolean) => {
        setExpansion(bol);
    }

    return (
        <div className={expansion ? 'para-menu para-menu-expansion' : 'para-menu'}>
            <ParaMenu
                logoProps={{
                    render: <div className='logo-render'>
                        <img src="./logo.png" alt=""/>
                        <span>派拉软件</span>
                    </div>
                }}
                menuListProps={{
                    list: menuList
                }}
                footerExpansionProps={{version}}
                expansion={expansion}
                onClickExpansion={clickExpansion}
                selectMenu={router}
                onClickMenu={clickMenu}
            />
        </div>
    );
};

export default Menu;

const formatMapToTree = (data: any) => {
    let nMap: any = {}; // 新的循环关系mapping
    let nMapList: any = []; // data处理好之后的数组
    // 第一次循环得到当前的parent关系，为下一次循环建立依据
    for (let i = 0; i < data.length; i++) {
        let pathList = data[i].path.split("/");
        pathList.shift();
        if (pathList.length === 1) { // 父级根
            if (pathList[0] === "") pathList[0] = "/"; // 空字符设置成root路径
            data[i]["parent"] = null;
            nMap[data[i].path] = data[i];
        } else {
            pathList.pop(); // 弹出最后一个
            data[i]["parent"] = "/" + pathList.join("/");
            nMap[data[i].path] = data[i];
        }
    }
    // 循环这个对象，因为对象引用关系，所以嵌套层级在这里处理
    for (let nMapKey in nMap) {
        if (nMap.hasOwnProperty(nMapKey) && nMap[nMapKey].parent && nMap[nMap[nMapKey].parent]) { // 父级存在 object
            if (nMap[nMap[nMapKey].parent]["children"] && nMap[nMap[nMapKey].parent]["children"].length) {
                nMap[nMap[nMapKey].parent]["children"].push(nMap[nMapKey]);
            } else {
                nMap[nMap[nMapKey].parent]["children"] = [nMap[nMapKey]];
            }
        } else {
            nMapList.push(nMap[nMapKey]);
        }
    }
    return nMapList;
};
