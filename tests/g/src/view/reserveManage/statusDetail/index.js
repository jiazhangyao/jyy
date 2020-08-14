import React from "react";
import {DetailPage} from "super/page";
import {inject, observer} from "mobx-react";
import {moduleName} from "./store";
import Card from "mt-card";
import {DetailField, TableDetail,} from "components";
import './index.less';
import {EstatePropertyInfo, LandInfo, HouseInfo, MortgageInfo, CloseDownInfo, DissentInfo} from './const';

@inject(stores => ({
  store: stores[moduleName],
  userInfo: stores.frame.userInfo
}))
@observer
class StatusDetail extends DetailPage {
  // 当前新开页面，隐藏左侧菜单
  componentDidMount() {
    document.getElementById("sider-menu").style.display = "none";
  }

  // 通用card信息展示方法
  renderCardInfo = (colNames, data) => {
    if (data.length) {
      return data.map(cur => {
        return Object.keys(colNames).map(item => {
          return <DetailField label={colNames[item]}>{cur[item]}</DetailField>
        })
      })
    } else {
      return Object.keys(colNames).map(item => {
        return <DetailField label={colNames[item]}>{data[item]}</DetailField>
      })
    }
  }

  // 买方/卖方套次table
  getUserInfo = userInfo => {
    const columns = [{
      title: '不动产权证号',
      dataIndex: 'warrantNo',
      key: 'warrantNo'
    }, {
      title: '共有权证号',
      dataIndex: 'shareWarrantNo',
      key: 'shareWarrantNo',
      render: this.textFieldRender,
    }, {
      title: '房屋坐落',
      dataIndex: 'location',
      key: 'location',
      render: this.textFieldRender,
    }, {
      title: '建筑面积',
      dataIndex: 'buildingArea',
      key: 'buildingArea',
      render: (value) => {
        return (value ? <span>{value}㎡</span> : '--')
      }
    }, {
      title: '规划用途',
      dataIndex: 'using',
      key: 'using',
      render: this.textFieldRender,
    }, {
      title: '产权人',
      dataIndex: 'droitUser',
      key: 'droitUser',
      render: this.textFieldRender,
    }];

    return <TableDetail className='detail-table' dataSource={userInfo} columns={columns}/>;
  }

  // 权利人信息table
  getOwenrInfo = (owenrInfo) => {
    const columns = [{
      title: '权利人姓名',
      dataIndex: 'droiterName',
      key: 'droiterName',
      width: 150,
      fixed: 'left',
      render: this.textFieldRender,
    }, {
      title: '户籍所在地',
      dataIndex: 'householdRegister',
      key: 'householdRegister',
      render: this.textFieldRender,
    }, {
      title: '地址/邮编',
      key: 'address',
      render: (value) => {
        return (<span>{value.address}/{value.code}</span>)
      }
    }, {
      title: '权利比例 ',
      dataIndex: 'droitRatio',
      key: 'droitRatio',
      render: this.textFieldRender,
    }, {
      title: '共有情况',
      dataIndex: 'share',
      key: 'share',
      render: this.textFieldRender,
    }, {
      title: '证件类型',
      dataIndex: 'cardType',
      key: 'cardType',
      render: this.textFieldRender,
    }, {
      title: '证件号码',
      dataIndex: 'cardNo',
      key: 'cardNo',
      render: this.textFieldRender,
    }, {
      title: '附记',
      dataIndex: 'memo',
      key: 'memo',
      render: this.textFieldRender,
    }];

    return <TableDetail className='detail-table' dataSource={owenrInfo} columns={columns} scroll={{ x: 1000 }} />;
  }

  // table空值处理
  textFieldRender = (value) => <span>{value || '--'}</span>;
  doRender(){
    const {store: {data}} = this.props;
    const {
      estateProperty = {}, // 产权信息
      ancestralLandInfo = {}, // 土地信息
      natureInfo = {}, // 房屋状况信息
      buyerSetList = [], // 买方套次信息
      sellerSetList = [], // 卖方套次信息
      droitInfo = [], // 权利人信息
      mortgageInfo = {}, // 抵押信息
      closeDownInfo = {}, // 查封信息
      dissentInfo = {} // 异议信息
    } = data;

    return (
      <div className="new-detail-page-wrap">
        <div className="new-detail-page">
          <h1 id="statusInfoTitle">现状信息</h1>
          <Card title="产权信息">
            {this.renderCardInfo(EstatePropertyInfo, estateProperty)}
          </Card>

          <Card title="土地信息">
            {this.renderCardInfo(LandInfo, ancestralLandInfo)}
          </Card>

          <Card title="房屋状况信息">
            {this.renderCardInfo(HouseInfo, natureInfo)}
          </Card>

          <Card title='买方套次信息' rowLen={1} className="forDetailTable">
            {this.getUserInfo(buyerSetList)}
          </Card>

          <Card title='卖方套次信息' rowLen={1} className="forDetailTable">
            {this.getUserInfo(sellerSetList)}
          </Card>

          <Card title='权利人信息' rowLen={1} className="forDetailTable">
            {this.getOwenrInfo(droitInfo)}
          </Card>

          <Card title="抵押信息">
            {this.renderCardInfo(MortgageInfo, mortgageInfo)}
          </Card>

          <Card title="查封信息">
            {this.renderCardInfo(CloseDownInfo, closeDownInfo)}
          </Card>

          <Card title="异议信息">
            {this.renderCardInfo(DissentInfo, dissentInfo)}
          </Card>
        </div>
      </div>
    );
  }
}

export default StatusDetail;
