import React from 'react'
import { Tabs, Select } from 'antd';
import Tables from '../../components/tables'
import { findAllByDisplayValue } from '@testing-library/react'

const { TabPane } = Tabs

export default function Manage() {
    const callTabs = key => {

    }
    return (
        <div>
            <section className="manage-panels" style={{ clear: 'both', padding: 20, marginTop: 20, background: '#fff' }}>
                <h2 style={{ paddingBottom: '10px', borderBottom: '1px solid #eee' }}>矿机列表</h2>
                <article>
                    <Tabs defaultActiveKey="1" onChange={callTabs} tabBarGutter='10px' size='large' type='card'>
                        <TabPane tab={
                            <div> 所有矿机 <span>0</span></div>} key="1">
                        </TabPane>
                        <TabPane tab={
                            <div> 活跃 <span>0</span></div>} key="2">
                        </TabPane>
                        <TabPane tab={
                            <div> 不活跃 <span>0</span></div>} key="3">
                        </TabPane>
                    </Tabs>
                </article>
                <p style={{ clear: 'both', height: '10px', background: '#fff' }}></p>
                <Tables />
            </section>
        </div>

    )
}