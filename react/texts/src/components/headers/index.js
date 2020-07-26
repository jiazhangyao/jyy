import React from 'react'
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'

import './style.scss'

export default function Headers({ links }) {
    const menu = (
        <Menu>
            <Menu.Item>
                <a rel="noopener noreferrer" href="/account">
                    我的账号
            </a>
            </Menu.Item>
            <Menu.Item>
                <a rel="noopener noreferrer" href="/account">
                    安全退出
            </a>
            </Menu.Item>
        </Menu>
    );
    return (
        <header style={{ background: '#282936', color: '#fff', height: '60px', lineHeight: '60px' }} id="headers">

            <ul>
                {
                    ['用户面板', '矿机', '收益', '显卡挖矿收益'].map((ele, index) => {
                        return (
                            <li style={{ float: 'left'}}>
                                <Link to="/account" className="links">{ele}于</Link>
                            </li>
                        )
                    })
                }
            </ul>
            <article style={{ float: 'right', marginRight: 20 }}>
                <Dropdown overlay={menu}>
                    <a onClick={e => e.preventDefault()} style={{color: '#fff'}}>
                        账户<DownOutlined />
                    </a>
                </Dropdown>
            </article>
        </header>
    )
}