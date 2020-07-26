/**
 * Created by EX-GEQIANG001 on 2019/1/17.
 */
import React from "react";
import { DetailPage } from "super/page";
import { inject, observer } from "mobx-react";
import { moduleName } from "./store";
import Card from "mt-card";
import TableDetail from "components/tableDetail";
import { Steps } from "components";
import { ratePayInfo, ratePayTit, obligorSellerTit, obligeeBuyerTit, nonTaxTit } from "./columns";

import "./index.less";
const { SubTitle, SingleRow } = Card;

@inject(stores => ({
    store: stores[moduleName],
    userInfo: stores.frame.userInfo
}))

@observer
class RatepayDetail extends DetailPage {

    // 通用表格信息展示方法
    getTableInfo = (ListInfo, columns, width = 1400) => {
        return (
            <TableDetail className='detail-table' dataSource={ListInfo} columns={columns} key={Math.random(100)} scroll={{ x: width }} />
        )
    };

    doRender() {
        const { data: { nonTaxDTO = {}, info = [], obligorDetail = [], obligeeDetail = [], registerType }, orderProcess } = this.props.store;
        const arr = [...info];
        const styleProps = { style: { color: '#666' } };
        if (registerType == 3 && info.length > 0) {
            arr.splice(1);
        }
        return (
            <>
                {/* <Steps processData={orderProcess} /> */}
                <div>
                    {
                        registerType
                        && <Card title='非税信息' extra={<span {...styleProps}>单位（元）</span>} className="forDetailTable">
                            {
                                this.getTableInfo([nonTaxDTO], nonTaxTit, 800)
                            }
                        </Card>
                    }
                    <Card title="税费信息" extra={<span {...styleProps}>单位（元）</span>} className="forDetailTable">
                        {
                            registerType == 1 ? this.getTableInfo(info, ratePayTit, 800) : this.getTableInfo(arr, ratePayInfo, 800)
                        }
                    </Card>
                    {
                        registerType == 1
                        && <Card title='义务人（卖方）税费明细' extra={<span {...styleProps}>单位（元）</span>} className="forDetailTable">
                            {
                                this.getTableInfo(obligorDetail, obligorSellerTit)
                            }
                        </Card>
                    }
                    <Card title="权利人（买方）税费明细" extra={<span {...styleProps}>单位（元）</span>} className="forDetailTable">
                        {
                            this.getTableInfo(obligeeDetail, obligeeBuyerTit)
                        }
                    </Card>
                </div>
            </>
        );
    }
}

export default RatepayDetail;
