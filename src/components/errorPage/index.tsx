import React from 'react';
import './index.scss';
import {useFormatMessage} from "react-intl-hooks";

interface Props {
    msg?: string, // 错误内容
    sub?: string, // 次级错误提示
    code?: string // 错误码，对应国际化
}

const ErrorPage: ({msg, sub, code}: Props) => JSX.Element = ({msg, sub, code = 'notFound'}: Props) => {
    const intl = useFormatMessage();

    const [style, setStyle] = React.useState({opacity: 0});
    React.useEffect(() => {
        setStyle({opacity: 1});
    }, []);

    return (
        <div className={'para-error-page'} style={style}>
            <div>
                <div className="img">
                    <div className="line-box">
                        <span className="line" style={{marginRight: '5px'}}></span>
                        <span className="line-icon">
                    <svg viewBox="0 0 1098 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="5661" width="40" height="40">
                        <path
                            d="M610.892409 345.817428C611.128433 343.63044 611.249529 341.409006 611.249529 339.159289 611.249529 305.277109 583.782594 277.810176 549.900416 277.810176 516.018238 277.810176 488.551303 305.277109 488.551303 339.159289 488.551303 339.229063 488.55142 339.298811 488.551654 339.368531L488.36115 339.368531 502.186723 631.80002C502.185201 631.957072 502.184441 632.114304 502.184441 632.271715 502.184441 658.624519 523.547611 679.98769 549.900416 679.98769 576.253221 679.98769 597.616391 658.624519 597.616391 632.271715 597.616391 631.837323 597.610587 631.404284 597.599053 630.972676L610.892409 345.817428ZM399.853166 140.941497C481.4487 1.632048 613.916208 1.930844 695.336733 140.941497L1060.013239 763.559921C1141.608773 902.869372 1076.938039 1015.801995 915.142835 1015.801995L180.047065 1015.801995C18.441814 1015.801995-46.243866 902.570576 35.176659 763.559921L399.853166 140.941497ZM549.900416 877.668165C583.782594 877.668165 611.249529 850.201231 611.249529 816.319053 611.249529 782.436871 583.782594 754.96994 549.900416 754.96994 516.018238 754.96994 488.551303 782.436871 488.551303 816.319053 488.551303 850.201231 516.018238 877.668165 549.900416 877.668165Z"
                            p-id="5662" fill="#0676df"></path>
                    </svg>
                </span>
                        <span className="line" style={{marginLeft: '5px'}}></span>
                    </div>
                    <div className="line-box">
                        <span className="line" style={{'width': '100px'}}></span>
                        <span className="line" style={{'width': '177px'}}></span>
                        <span className="line" style={{'width': '40px'}}></span>
                    </div>
                    <div className="line-box">
                        <span className="line" style={{'width': '140px'}}></span>
                        <span className="line" style={{'width': '50px'}}></span>
                    </div>
                </div>
                <div className="tips1">{intl({id: code})}</div>
                {msg ? <div className="tips2">{msg}</div> : null}
                {sub ? <div className="tips3">{sub}</div> : null}
            </div>
        </div>
    )
}

export default ErrorPage;
