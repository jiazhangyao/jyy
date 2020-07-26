import React from "react";
import {DetailPage} from "super/page";
import {inject, observer} from "mobx-react";
import {moduleName} from "./store";
import Card from "mt-card";
import {DetailField, TableDetail} from "components";
import {ratePayTit,ratePayInfo,obligorSellerTit,obligeeBuyerTit} from "./const"

import './index.less';

@inject(stores => ({
  store: stores[moduleName],
  userInfo: stores.frame.userInfo
}))
@observer
class TaxDetail extends DetailPage {
  componentDidMount(){
    //隐藏侧边栏====
    document.getElementById('sider-menu').style.display='none';
  }
  // 通用表格信息展示方法
  getTableInfo = (ListInfo, columns) => {
    return ListInfo.length > 0 && (
      <TableDetail className='detail-table'
                   scroll={{x: 1200}}
                   dataSource={ListInfo}
                   columns={columns}
                   key={Math.random(100)} />
    )
  }
  // 税费信息
  getTaxInfo = (entity, registerType) => {
    const { info = [], obligorDetail= [], obligeeDetail = [] } = entity;
    const styleProps = {style: { color:'#666' }};
    //只展示一个权利人
    let arr =[...info];
    if(registerType ==3 && info.length>0){
      arr.splice(1);
    }
    return (
      <div>
        <Card title='税费信息'className="forDetailTable" extra={<span {...styleProps}>单位（元）</span>}>
          {
            registerType == 1 ? this.getTableInfo(info, ratePayTit) : this.getTableInfo(arr, ratePayInfo)
          }
        </Card>
        {
          registerType == 1
          && <Card title='义务人（卖方）税费明细' className="forDetailTable" extra={<span {...styleProps}>单位（元）</span>}>
            {
              this.getTableInfo(obligorDetail, obligorSellerTit)
            }
          </Card>
        }
        <Card title='权利人（买方）税费明细' className="forDetailTable" extra={<span {...styleProps}>单位（元）</span>}>
          {
            this.getTableInfo(obligeeDetail, obligeeBuyerTit)
          }
        </Card>
      </div>
    );
  }
  doRender() {
    const {store: {data,entity:{registerType,id}}} = this.props;
    return (
      <div className="single-detail-wrapper">
        <div className="order-detail">
          <h2 id="taxInfoTitle">税费信息</h2>
          {
            this.getTaxInfo(data, registerType)
          }
        </div>
      </div>
    );
  }
}

export default TaxDetail;
