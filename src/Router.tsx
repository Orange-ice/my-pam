import React, {FunctionComponent, Suspense, lazy, useEffect} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import routeConfig, {RouterConfig} from './config/router';

import Loading from "./components/loading";
import Iframe from './components/iframe';
import {useGlobalContext} from './context/global';
import ErrorPage from './components/errorPage';

const SnackFrame = lazy(() => import('./components/snackFrame'));

let RouterInit: boolean = false; // 路由初始化标记
const Root: FunctionComponent = () => {
    const {setMenu} = useGlobalContext();
    const [router, setRouter] = React.useState<Array<RouterConfig>>([]);

    useEffect(() => {
        const getRoute = async () => {
            const list: Array<RouterConfig> = await routeConfig();
            RouterInit = true;
            setRouter(list);
        }
        getRoute();
    }, []);

    // 设置菜单数据
    useEffect(() => {
        if (router.length === 0) return;
        setMenu(router);
    }, [router, setMenu]);

    const getRoute = (config: RouterConfig) => {
        switch (config.type) {
            case "router":
                return <Route key={config.path} path={config.path} component={config.component}/>
            case "iframe":
                return <Route key={config.path} path={config.path} render={() => {
                    return <Iframe url={config.url}/>
                }}/>
            case "snack":
                return <Route key={config.path} path={config.path} render={() => {
                    return <SnackFrame typePage="snack" name={config.url} type={config.snackType}/>
                }}/>
            case "snackPage":
                return <Route key={config.path} path={config.path} render={() => {
                    return <SnackFrame typePage="snackPage" id={config.url} type={config.snackType}/>
                }}/>
            case "redirect":
                return <Route key={config.path} path={config.path} component={config.component}/>
        }
    }

    const routes = React.useMemo(() => {
        return router.map(item => getRoute(item));
    }, [router])

    return (
        <HashRouter>
            <Suspense fallback={<Loading/>}>
                <Switch>
                    {routes}
                    {
                        RouterInit ?
                            <Route exact render={() => {
                                return <ErrorPage code={'notFound'}/>
                            }}/> :
                            <Route exact component={Loading}/>
                    }
                </Switch>
            </Suspense>
        </HashRouter>
    )
}
export default Root;
