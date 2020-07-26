import React from 'react'
import Tables from '../../components/tables'

export default function Record() {
    return (
        <div>
            <section className="record-panels" style={{ clear: 'both', padding: 20, marginTop: 20, background: '#fff' }}>
                <div style={{ paddingBottom: '10px', borderBottom: '1px solid #eee' }}>
                    <span style={{ fontWeight: 400, fontSize: '20px' }}>收益记录 </span>
                    <span style={{ marginLeft: 40 }}>结算时间按照北京时间08:00至第二天07:59作为一天的挖矿结算时间周期
                         <span style={{ color: 'rgb(255, 0, 0)' }}>当日收益仅为预估参考，实际收益以24小时后核算为准</span>
                    </span>
                </div>
                <p style={{height: '10px', background: '#fff'}}></p>
                <Tables />
            </section>
        </div>
    )
}