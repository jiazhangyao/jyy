import React from 'react'
import { Tabs } from 'antd';

import './style.scss'

const { TabPane } = Tabs;

export default function Headers() {
    return (
        <footer style={{width: '100%', background: '#282936', color: '#fff', clear: 'both', height: 200}}>
            <ul>
                <li>
                    <h3>BFC矿池</h3>
                    <p>Copyright © 2019 BFCPool Technology Limited 版权所有 站长统计</p>
                </li>
                <li>
                    <h3>产品</h3>
                    <p>钱包</p>
                    <p>区块浏览器</p>
                </li>
                <li>
                    <h3>支持</h3>
                    <p>挖矿教程</p>
                    <p>交易所（抹茶）</p>
                </li>
            </ul>
        </footer>
    )
}