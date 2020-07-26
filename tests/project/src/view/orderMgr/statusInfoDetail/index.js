import React from "react";
import { DetailPage } from "super/page";
import { inject, observer } from "mobx-react";
import { moduleName } from "./store";
import Card from "mt-card";
import { DetailField, TableDetail, Button } from "components";
import {
  ModuleMap,
  defaultModules
} from "./const";
import "./style.less";
const { NoBorderButton } = Button;
const { SingleRow } = Card;

function setInterTransfer(opts) {
  const bc = new BroadcastChannel('transferStatus');
    bc.postMessage(opts);
}

@inject(stores => ({
  store: stores[moduleName],
  userInfo: stores.frame.userInfo
}))
@observer
class StatusInfoDetail extends DetailPage {
  constructor(props) {
    super(props)
    this.showSynchronize = false;
  }
  // 当前新开页面，隐藏左侧菜单
  componentDidMount() {
    // const {
    //   store: { postData }
    // } = this.props;
    // console.log('cc', postData)
    // setInterTransfer(postData)
    document.getElementById("sider-menu").style.display = "none";
  }

  // 通用card信息展示，title处展示同步数据的按钮，用于信息同步
  renderTransterEstateInfo = (colNames, originData={}, title) => {
    let data = originData ? originData : {};
    const {syqrxxList=[],
       isInfoMissing // 1:没有缺失，0：有缺失
       } = data;
    const columns = [
      {
        title: "权利人姓名",
        dataIndex: "syqrxm",
        key: "syqrxm",
        render: this.textFieldRender
      },
      {
        title: "占有份额",
        dataIndex: "zyfe",
        key: "zyfe",
        render: this.textFieldRender
      },
      {
        title: "权利人类型",
        dataIndex: "qlrlx",
        key: "qlrlx",
        render: this.textFieldRender
      },
      {
        title: "权利人证件类型",
        dataIndex: "zjlx",
        key: "zjlx",
        render: this.textFieldRender
      },
      {
        title: "权利人证件号码",
        dataIndex: "zjhm",
        key: "zjhm",
        render: this.textFieldRender
      }
    ];
    
    return <div className="sync-box">
      {
        isInfoMissing == 0 ?
        <div className="extra-part">
          <p className="tips error">提示：产权数据缺失，请前往核心系统完善数据后，点击“同步数据”</p>
          <NoBorderButton
            className="tbBtn"
            onClick={ this.syncData }
          >
            同步数据
          </NoBorderButton>
        </div>
        : ''
      }
      {
        <Card title={ title } rowLen={ 2 }>{
            Object.keys(colNames).map(item => {
              return  item === 'warrantNumber' ? 
              <SingleRow>
                <DetailField key={ colNames[item] } label={ colNames[item] }>{ data[item] }</DetailField>
              </SingleRow> :
              <DetailField key={ colNames[item] } label={ colNames[item] }>{ data[item] }</DetailField>;
            })
          }
          {syqrxxList.length ?<SingleRow className="forDetailTableInsert">
            <TableDetail
              className="detail-table"
              dataSource={ syqrxxList }
              columns={ columns }
            />
          </SingleRow>:''}
        </Card>
      }
    </div>
  };

  //同步数据
  syncData = () => {
    const { store } = this.props
    const { store: { data } } = this.props;
    store.getSynchronousData();
    console.log("同步按钮被点击，打印请求回来的数据data", data);
  }

  // 通用card信息展示方法
  renderCardInfo = (colNames, originData={}, title) => {
    let data = originData ? originData : {};
    if (data.length) {
      return <Card title={ title } rowLen={ 2 }>{
        data.map(cur => {
          return Object.keys(colNames).map(item => {
            return <DetailField key={ colNames[item] } label={ colNames[item] }>{ cur[item] }</DetailField>;
          });
        })
      }</Card>;
    } else {
      return <Card title={ title } rowLen={ 2 }>{
        Object.keys(colNames).map(item => {
          return <DetailField key={ colNames[item] } label={ colNames[item] }>{ data[item] }</DetailField>;
        })
      }</Card>;
    }
  };

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

  // 权利人信息table
  getOwenrInfo = owenrInfo => {
    const columns = [
      {
        title: "权利人姓名",
        dataIndex: "droiterName",
        key: "droiterName",
        width: 80,
        fixed: "left",
        render: this.textFieldRender
      },
      {
        title: "户籍所在地",
        dataIndex: "householdRegister",
        key: "householdRegister",
        render: this.textFieldRender
      },
      {
        title: "地址/邮编",
        key: "address",
        render: value => {
          return (
            <span>
              { value.address }/{ value.code }
            </span>
          );
        }
      },
      {
        title: "权利比例 ",
        dataIndex: "droitRatio",
        key: "droitRatio",
        render: this.textFieldRender
      },
      {
        title: "共有情况",
        dataIndex: "share",
        key: "share",
        render: this.textFieldRender
      },
      {
        title: "证件类型",
        dataIndex: "cardType",
        key: "cardType",
        render: this.textFieldRender
      },
      {
        title: "证件号码",
        dataIndex: "cardNo",
        key: "cardNo",
        render: this.textFieldRender
      },
      {
        title: "附记",
        dataIndex: "memo",
        key: "memo",
        render: this.textFieldRender
      }
    ];

    return (
      <Card title={ owenrInfo.title } rowLen={ 1 } className="forDetailTable">
        <TableDetail
          className="detail-table"
          dataSource={ owenrInfo.dataSource }
          columns={ columns }
          scroll={ { x: 1000 } }
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
    if (data && data.flag) {
      setInterTransfer(data)
    }
    
    return (
      <div className="new-detail-page-wrap">
        <div className="new-detail-page">
          <h1 id="statusInfoTitle">现状信息</h1>
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

export default StatusInfoDetail;
