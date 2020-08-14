import React from "react";
import { DetailPage } from "super/page";
import { inject, observer } from "mobx-react";
import { moduleName } from "./store";
import Card from "mt-card";
import { TableDetail } from "components";
import {
  ModuleMap,
  defaultModules
} from "./const";
import "./style.less";

@inject(stores => ({
  store: stores[moduleName],
  userInfo: stores.frame.userInfo
}))
@observer
class SetInfoDetail extends DetailPage {
  constructor(props) {
    super(props)
    this.showSynchronize = false;
  }
  // 当前新开页面，隐藏左侧菜单
  componentDidMount() {
    document.getElementById("sider-menu").style.display = "none";
  }

  // 买方/卖方套次table
  getUserInfo = userInfo => {
    const columns = [
      {
        title: "不动产权证号",
        dataIndex: "warrantNo",
        key: "warrantNo"
      },
      {
        title: "共有权证号",
        dataIndex: "shareWarrantNo",
        key: "shareWarrantNo",
        render: this.textFieldRender
      },
      {
        title: "房屋坐落",
        dataIndex: "location",
        key: "location",
        render: this.textFieldRender
      },
      {
        title: "建筑面积",
        dataIndex: "buildingArea",
        key: "buildingArea",
        render: value => {
          return value ? <span>{ value }㎡</span> : "--";
        }
      },
      {
        title: "规划用途",
        dataIndex: "using",
        key: "using",
        render: this.textFieldRender
      },
      {
        title: "产权人",
        dataIndex: "droitUser",
        key: "droitUser",
        render: this.textFieldRender
      }
    ];

    return (
      <Card title={ userInfo.title } rowLen={ 1 } className="forDetailTable">
        <TableDetail
          className="detail-table"
          dataSource={ userInfo.dataSource }
          columns={ columns }
        />
      </Card>
    );
  };

  // table空值处理
  textFieldRender = value => <span>{ value || "--" }</span>;

  doRender() {
    const {
      store: { data, entity }
    } = this.props;
    let modules = [];
    // 遍历const数据ModuleMap，根据ModuleMap的key作为判断module是否需要的依据。
    const moduleMap = ModuleMap.entries();
    for (var [judgeFun, cardFunction] of moduleMap) {
      judgeFun(entity) && modules.push(cardFunction);
    }
    // 当没有模块的时候，即 使用ModuleFactory的默认卡片modules
    if (modules.length === 0) {
      modules = defaultModules;
    }
    return (
      <div className="new-detail-page-wrap">
        <div className="new-detail-page">
          <h1 id="statusInfoTitle">套次信息</h1>
          {
            modules.map((item, index) => {
              return <div key={ index }>{ item.apply(this, [data]) }</div>
            })
          }
        </div>
      </div>
    );
  }
}

export default SetInfoDetail;
