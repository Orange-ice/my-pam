/**
 * @author linhd
 * @date 2021/11/26 11:07
 * @description 头部导航
 */
import React, {FunctionComponent, useState} from 'react';
import PageHeader from '@para-ui/core/PageHeader';
import ParaBreadcrumbs from "@para-ui/core/Breadcrumbs";
import ArrowRightFull from '@para-ui/icons/RightCircleF';
import LanguageChinese from "@para-ui/icons/Chinese";
import LanguageEnglish from "@para-ui/icons/English";
import Voice from "@para-ui/icons/Remind";
import Quit from '@para-ui/icons/Off';
import {useGlobalContext} from '../../../context/global';
import './index.scss';

interface Props {

}

const Header: FunctionComponent<Props> = (props: Props) => {
    const [userSelect, setUserSelect] = useState<string>('');
    const {
        locale,
        setLocale
    } = useGlobalContext()


    /**
     * 切换语言
     * @param val 语音值
     */
    const onClickLang = (val: string) => {
        setLocale(val);
    }

    /**
     * 点击面包屑
     */
    const clickBreadcrumbs = () => {

    }

    const clickSelfcare = () => {
        console.log('点击自助服务');
    }

    /**
     * 点击按钮组
     * @param item
     */
    const clickBtn = async (item: any) => {

    }

    const clickUser = () => {
        console.log('点击用户')
    }

    /**
     * 点击用户下拉
     * @param val
     */
    const clickUserMenu = (val: any) => {
        setUserSelect(val);
    }

    return (
        <div className="para-header">
            <PageHeader
                leftRender={
                    <ParaBreadcrumbs
                        list={[]}
                        separator='>'
                        onClickItem={clickBreadcrumbs}/>
                }
                footerProps={
                    {
                        backSelfcareProps: {
                            icon: <ArrowRightFull/>,
                            label: '回到自助服务',
                            onClick: clickSelfcare
                        },
                        languageProps: {
                            selectLang: locale,
                            language: [
                                {
                                    label: '中文',
                                    icon: <LanguageChinese/>,
                                    value: 'zh'
                                },
                                {
                                    label: '英文',
                                    icon: <LanguageEnglish/>,
                                    value: 'en'
                                }
                            ],
                            onClick: onClickLang
                        },
                        btnListProps: {
                            list: [
                                {
                                    //label: '消息',
                                    icon: <Voice/>,
                                    sign: true
                                },
                                {
                                    label: '退出',
                                    icon: <Quit/>
                                }
                            ],
                            onClick: clickBtn
                        },
                        userProps: {
                            img: './logo.png',
                            label: '用户名',
                            list: [
                                {
                                    label: '个人信息',
                                    //icon: <LanguageChinese/>,
                                    value: 'user'
                                }
                            ],
                            selectValue: userSelect,
                            onClick: clickUser,
                            onClickMenu: clickUserMenu
                        }
                    }
                }
            />
        </div>
    )
}

export default Header;
