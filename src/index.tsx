import 'core-js';
import 'react-app-polyfill/ie11';
import React from "react";
import ReactDOM from "react-dom";
import {SnackSDK} from '@para-snack/core';
import reportWebVitals from './reportWebVitals';
import {Context} from '@paraview/lib';
import App from "./App";

import './styles/index.scss';

/* @dynamic debug */

import Debugger from '@paraview/lib/debugger';



/* @dynamic end */

/* @dynamic version */
window.ParaWeb = {name:'para-react-cli',version: '2.0.1', env: 'dev', buildTime: '2022/2/15 下午3:40:37'}
/* @dynamic end */

const init = async (debug: Array<string> = []) => {
    /* @dynamic Debugger */
    await Debugger.init(debug);
    /* @dynamic end */

    const sdk = new SnackSDK({
        service: Context.get('snackbar'),
        importMaps: {
            'react': React,
            'react-dom': ReactDOM
        },
        runtime: true
    });

    ReactDOM.render(
        <App sdk={sdk} />,
        document.getElementById('root')
    );
    reportWebVitals();
};

/* @dynamic init */
init(["http://192.168.7.27","http://192.168.3.1:10000","http://192.168.2.83:10000","http://10.10.2.48:10000"])
/* @dynamic end */
