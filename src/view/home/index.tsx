import React, {FunctionComponent} from 'react';
import {useHistory} from 'react-router-dom'
import Icon from '../../assets/icon.png';
import {useFormatMessage} from 'react-intl-hooks';
import {languages} from '../../locale/index'
import Global from '../../context/global'

import './index.scss';

interface Props {

}

const Home: FunctionComponent = (props: Props) => {
    const history = useHistory();
    // 引用全局共享数据context
    const {setLocale, locales, locale, Message, Confirm} = React.useContext(Global);
    const intl = useFormatMessage();

    const changeLang = async (locale: languages) => {
        const ok = await Confirm.info({content: '是否切换语言?'});
        if (!ok) return;
        // 通过context切换语言
        setLocale(locale);
        Message.info(locale);
    }

    const toPara = () => {
        history.push('/para');
    }

    return (
        <div className={'home'}>
            <div className={'title'}>
                <img src={Icon} alt={'para-icon'}/>
                <span className={'label'}>
                    {intl({id: 'name'})}
                </span>
            </div>
            <div className={'info'}>{intl({id: 'powered'})}</div>
            <br/>
            <br/>
            {
                Object.keys(locales).map(key => {
                    return (
                        <span className={'locales-text'} key={key} onClick={() => changeLang(key as languages)}
                              style={key === locale ? {color: '#839dff'} : {}}>
                            {locales[key].name}
                        </span>
                    )
                })
            }
            <br/>
            <br/>
            <div style={{cursor: 'pointer'}} onClick={toPara}>paraview</div>
        </div>
    )
}

export default Home;
