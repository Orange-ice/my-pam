import React from 'react';
import './index.scss';

interface Props {
    url: string | undefined
}

const Iframe = (props: Props) => {
    return (
        <div className='iframe-box'>
            <iframe className={'para-iframe'} src={props.url} title={props.url}
                    sandbox={'allow-forms allow-scripts allow-same-origin'}>
            </iframe>
        </div>
    )
}

export default Iframe;