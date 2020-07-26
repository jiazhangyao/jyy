import React from 'react'

export default function Power() {
    return (
        <div>
            <section className="power-panels" style={{ clear: 'both', marginTop: 20 }}>
                <div className="power-panel">
                    <h2>账户信息</h2>
                    <ul>
                        {

                            [1, 2, 3].map((ele, index) => {
                                return (<li key={index}>
                                    <span>a</span>
                                    <span>aa</span>
                                </li>)
                            })
                        }
                    </ul>
                </div>
                <div className="power-panel power-panel-left">
                    <h2>账户信息</h2>
                    <ul>
                        {

                            [1, 2, 3].map((ele, index) => {
                                return (<li key={index}>
                                    <span>a</span>
                                    <span>aa</span>
                                </li>)
                            })
                        }
                    </ul>
                </div>
                <div className="power-panel power-panel-left">
                    <h2>账户信息</h2>
                    <ul>
                        {

                            [1, 2, 3].map((ele, index) => {
                                return (<li key={index}>
                                    <span>a</span>
                                    <span>aa</span>
                                </li>)
                            })
                        }
                    </ul>
                </div>
            </section>
            <section style={{ clear: 'both' }}>
                world
</section>
        </div>
    )

}