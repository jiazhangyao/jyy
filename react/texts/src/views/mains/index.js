import React, { useState } from 'react'
import { Tabs, Select } from 'antd';
import Power from './power'
import Manage from './manage'
import Record from './record'
import './style.scss'

const { Option } = Select;
const { TabPane } = Tabs

export default function Mains(props) {
    const [num, setNum] = useState('1')
    const callTabs = key => {
        setNum(key)
    }
    const renderBody = () => {
        if (num === '1') {
            return <Power />
        } else if (num === '2') {
            return <Manage />
        } else {
            return <Record />
        }
    }
    return (
        <section style={{ width: '80%', marginLeft: '10%', marginTop: '20px' }}>
            <nav style={{ height: '58px', borderBottom: '2px solid #eee', position: 'relative', padding: 20, background: '#fff' }}>
                <article style={{ position: 'absolute', left: 10, top: '12px' }}>
                    <Select defaultValue="lucy" style={{ width: 120 }}>
                        <Option value="lucy">Lucy</Option>
                    </Select>
                </article>
                <article style={{
                    position: 'absolute', width: '2px', height: '20px', top: '20px',
                    left: 180, background: '#eee'
                }}></article>
                <article>

                </article>
                <article style={{ position: 'absolute', left: 260, top: 0 }}>
                    <Tabs defaultActiveKey="1" onChange={callTabs} size='large'>
                        <TabPane tab="我的算力" key="1">
                        </TabPane>
                        <TabPane tab="矿机管理" key="2">
                        </TabPane>
                        <TabPane tab="收益记录" key="3">
                        </TabPane>
                    </Tabs>
                </article>
            </nav>
            {
                renderBody()
            }
        </section>
    )
}