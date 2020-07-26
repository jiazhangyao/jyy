import React from 'react'
import Table from '../tables'

export default function AccountList({ changePages }) {
    return (
        <section className="create-account" style={{ background: '#fff', padding: 30 }}>
            <nav>
                <h2>子账户列表</h2>
                <p style={{ float: 'right', marginTop: '-40px'}} onClick={() => {changePages('create')}}>新建子账号</p>
            </nav>
            <section style={{ clear: 'both', marginTop: 50 }}>
                <Table />
            </section>
        </section>
    )
}