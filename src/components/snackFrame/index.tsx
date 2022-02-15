import React, {FunctionComponent, useEffect, useContext, useState} from 'react';
import Global from "../../context/global";
import Loading from "../loading";

import './index.scss';


interface Props {
    typePage: 'snack' | 'snackPage' // 页面类型
    type?: string // 分类
    name?: string // snack
    id?: string // snackPage
}

const SnackFrame: FunctionComponent<Props> = (props: Props) => {
    const {
        sdk
    } = useContext(Global);
    const [snackModule, setSnackModule] = useState<any>();

    const {
        typePage,
        type = '_',
        name,
        id
    } = props;

    useEffect(() => {
        // 加载snack模块
        const loadModule = async () => {
            if (!name) return;
            setSnackModule(<Loading />);
            const SnackCom: any = await sdk.createModuleComponent({name: name, type: type});
            setSnackModule(<SnackCom />)
        }

        // 加载snackpage
        const loadPage = async () => {
            if (!id) return;
            setSnackModule(<Loading />);
            const Page: any = await sdk.createPageComponent([
                {id, type},
                // 可同时渲染多个页面
            ]);
            setSnackModule(<Page />)
        }

        if (typePage === 'snack') {
            loadModule();
        }
        if (typePage === 'snackPage') {
            loadPage();
        }
    }, [typePage, name, id, type, sdk]);

    return (
        <div className="snack-frame">
            {snackModule}
        </div>
    )
}

export default SnackFrame;
