import React from 'react';
import {IntlProvider} from "react-intl-hooks"; // 国际化
import {GlobalContext} from './context/global'
import Router from './Router';
import Menu from './components/layout/menu';
import Header from './components/layout/header';
import locales, {languages, defaultLocale, saveDefaultLocale} from './locale/index'
import ParaUIProvider from "@para-ui/core/ParauiProvider";
import Container from "@para-ui/core/Container";
import {Message} from '@para-ui/core/Message';
import {Confirm} from '@para-ui/core/Modal';
import {SnackSDK} from "@para-snack/core";
import Interceptors from './config/interceptors';

// 全局拦截器
Interceptors(Message);

interface IProps {
    /** sdk */
    sdk: SnackSDK;
}

function App(props: IProps) {
    const {
        sdk
    } = props;
    // 国际化数据
    const [locale, setLocale] = React.useState<languages>((defaultLocale as languages));
    // 菜单数据
    const [menu, setMenu] = React.useState<Array<any>>([]);
    // 路由路径
    const [router, setRouter] = React.useState<string>(window.location.hash.split('#')[1] || '');
    // 存储所选语言
    React.useEffect(() => {
        saveDefaultLocale(locale);
    }, [locale]);
    return (
        <GlobalContext.Provider
            value={{
                sdk,
                setLocale,
                locales,
                locale,
                menu,
                setMenu,
                router,
                setRouter,
                Message,
                Confirm
            }}>
            <IntlProvider locale={locale} defaultLocale={(defaultLocale as languages)} messages={locales[locale].pack}>
                <ParaUIProvider>
                    <Container
                        className="para-react"
                        leftStyle={{width: '64px'}}
                        topStyle={{height: '60px'}}
                        type={"ltrb"}
                        left={<Menu/>}
                        right={<Router/>}
                        top={<Header/>}
                    />
                </ParaUIProvider>
            </IntlProvider>
        </GlobalContext.Provider>
    );
}

export default App;
