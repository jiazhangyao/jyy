import React from "react";
import { Modal, Row, Col, Card as OriginCard, Alert, Form, Input, Popover } from "antd";
import { DetailPage } from "super/page";
import { inject, observer } from "mobx-react";
import { moduleName } from "./store";
import Card from "mt-card";
import history from "utils/history";
import Viewer from "react-viewer";
import 'react-viewer/dist/index.css';
import tools from "utils/tools";

import StopOrderModal from "../auditList/components/stopOrderModal";
import createForm from "utils/createForm";
import { getTitleTabs } from './components/getTitleName';
import { checkOrderStatus, endOrder, syncLandInfo } from "./service"
import BtmBtnModal from "./components/btmBtnModal";
import { getAsyncModalInst } from 'components/asyncModal';

import {
  Steps,
  DetailField,
  WindingStatus,
  TableDetail,
  ApplicantInfo,
  PropertyInfo,
  DetailPics,
  DetailImages,
  Button
} from "components";
import dynamicConst from "common/dynamicConst";
import { MortgageInfo, OrderRegisterType, houseType } from "common/enum";

import "./style.less";

const AtnArr = ['',''];
const { SingleRow } = Card;
const FormItem = Form.Item;
const clsPrefix = "scdj-page";
const { PrimaryButton, DangerButton, NoBorderButton,BorderButton } = Button;
const { TextArea } = Input;
// 权利人标题数据
const QLRXX_DATA = [
  {
    title: "姓名/名称",
    dataIndex: "name",
    key: "name",
    width: 200
  },
  {
    title: "权利人类型",
    dataIndex: "typeDesc",
    key: "typeDesc",
    width: 200
  },
  {
    title: "证件类型",
    dataIndex: "cardTypeDesc",
    key: "cardTypeDesc",
    width: 200
  },
  {
    title: "证件号码",
    dataIndex: "cardNo",
    key: "cardNo",
    width: 200
  },
  {
    title: "手机号码",
    dataIndex: "mobile",
    key: "mobile",
    width: 200
  },
  {
    title: "通讯地址",
    dataIndex: "address",
    key: "address",
    width: 200
  },
  {
    title: "邮编",
    dataIndex: "postcode",
    key: "postcode",
    width: 200
  },
]
// 操作日志标题数据
const CZRZ_DATA = [
  {
    title: "时间",
    dataIndex: "checkTime",
    key: "checkTime",
    width: 200
  },
  {
    title: "处理人",
    dataIndex: "checkUser",
    key: "checkUser",
    width: 200
  },
  {
    title: "操作",
    dataIndex: "checkDesc",
    key: "checkDesc",
    width: 200
  },
  {
    title: "备注",
    dataIndex: "remark",
    key: "remark",
    width: 200,
    render(value) {
      return <div>{value || "--"}</div>;
    }
  }
]
//法定代表人 标题 数据
const FDDBR_DATA = [

  {
    title: "姓名/名称",
    dataIndex: "name",
    key: "name",
    width: 200
  },
  {
    title: "角色",
    dataIndex: "typeDesc",
    key: "typeDesc",
    width: 200
  },
  {
    title: "证件类型",
    dataIndex: "cardTypeDesc",
    key: "cardTypeDesc",
    width: 200
  },
  {
    title: "证件号码",
    dataIndex: "cardNo",
    key: "cardNo",
    width: 200
  },
  {
    title: "手机号码",
    dataIndex: "mobile",
    key: "mobile",
    width: 200
  },
]

function arrTrans(num, arr) { // 一维数组转换为二维数组
  const iconsArr = []; // 声明数组
  arr.forEach((item, index) => {
    const page = Math.floor(index / num); // 计算该元素为第几个素组内
    if (!iconsArr[page]) { // 判断是否存在
      iconsArr[page] = [];
    }
    iconsArr[page].push(item);
  });
  return iconsArr;
}

@inject(stores => ({
  store: stores[moduleName],
  userInfo: stores.frame.userInfo,
  frame: stores["frame"]
}))
@createForm({ clsPrefix })
@observer
class AuditDetail extends DetailPage {
  state = {
    //拒绝原因 状态
    refuseReason: ""
  }
  componentDidMount() {
    console.log("子组件的props", this.props);

  }
  // 上链状态组件
  getWindingInfo = chainStatusInfo => {
    const { netSign, estate, apply } = chainStatusInfo;
    return (
      <div className="detail-windingInfo">
        {netSign && <WindingStatus img="img_02" hashInfo={netSign} />}
        {apply && <WindingStatus img="img_01" hashInfo={apply} />}
        {estate && estate.priHash && estate.pubHash && (
          <WindingStatus img="img_03" hashInfo={estate} />
        )}
      </div>
    );
  };

  // 申请人信息card
  getApplicantInfo = data => {
    const {
      obligeeInfoList,
      obligorInfoList,
      mortgageeInfo,
      mortgagorInfo,
      debtorInfo,
      registerType
    } = data;
    return (
      <ApplicantInfo
        obligeeInfoList={obligeeInfoList}
        obligorInfoList={obligorInfoList}
        mortgageeInfo={mortgageeInfo}
        mortgagorInfo={mortgagorInfo}
        debtorInfo={debtorInfo}
        showFamilyInfo={this.showFamilyInfo}
        registerType={registerType}
      />
    );
  };
  showFamilyInfo = obj => {
    let { store: { setFamilyInfo } } = this.props;
    setFamilyInfo(obj);
  }

  // 产权信息card
  getPropertyInfo = (data, isBtnShow) => {
    const {
      userInfo: { department },
      location
    } = this.props;
    const { orderHouseList = [], registerType, id } = data;
    const { search } = location;
    return (
      <PropertyInfo
        orderHouseList={orderHouseList}
        getCardInfo={this.getCardInfo}
        department={department}
        orderId={id}
        search={search}
        isBtnShow={isBtnShow}
        registerType={registerType}
      />
    );
  };
  getCardInfo = (cardInfo, data) => {
    console.log('get card info...', cardInfo, data)
    return Object.keys(cardInfo).map(key => {
      let value;
      if (cardInfo[key].endsWith("面积")) {
        value = data[key] ? `${data[key]} ㎡` : "--";
      } else if (
        cardInfo[key].endsWith("估价") ||
        cardInfo[key].endsWith("总价") ||
        cardInfo[key].endsWith("数额")
      ) {
        value = data[key] ? `${data[key]} 元` : "--";
      } else if (cardInfo[key] === "楼层") {
        value =
          ((data.inFloor || data.totalFloor) &&
            `${data.inFloor}层/${data.totalFloor}层`) ||
          "--";
      } else if (cardInfo[key] === "土地使用期限") {
        if (data.landUseStart && data.landUseEnd) {
          value = `${data.landUseStart} 至 ${data.landUseEnd}`;
        } else {
          value = "--";
        }
      } else if (cardInfo[key] === "建筑年代") {
        value = data.buildYear ? `${data.buildYear}年` : "--";
      }
      // 工单信息 登记类别
      else if (cardInfo[key] === "登记类别") {
        const registerType = dynamicConst.getItem("registerType");
        value = registerType[data[key]];
      }
      // 工单信息 处理人
      else if (cardInfo[key] === "处理人") {
        let status = data.statusDesc;
        if (
          status === "已登簿" ||
          status === "已出证" ||
          status === "复审通过" ||
          status === "复审失败"
        ) {
          value = "--";
        } else {
          value = data[key];
        }
      }
      // 邮寄信息 是否邮寄
      else if (cardInfo[key] === "不动产单元是否灭失") {
        data[key] !== 0
          ? data[key] === 1
            ? (value = "是")
            : (value = "否")
          : (value = "--");
      } else if (cardInfo[key] === "收件地址") {
        value = data.addressInfo
          ? data.addressInfo.mosaicAddress
            ? data.addressInfo.mosaicAddress
            : "--"
          : "--";
      } else if (cardInfo[key] === "产证/证明邮寄") {
        value = "是";
      } else {
        value = data[key];
      }
      return <DetailField label={cardInfo[key]}>{value}</DetailField>;
    });
  };

  // 材料信息card-图片list
  renderPics = (MaterialJson = [], resPicsList = []) => {
    const files = {};
    resPicsList.forEach(item => {
      files[item.materialType] = item.fileList;
    });
    // arrTrans(4, MaterialJson)
    return arrTrans(4, MaterialJson).map(item => {
      return <div className="pics-list-item">
        {
          item.map(cur => {
            const fileArr = files[cur.id] || [];
            return (
              <>
                {
                  fileArr.length ? <DetailField type="specialPics" label={cur.name}>
                    <DetailImages title={cur.name} fileArr={fileArr} />
                  </DetailField>
                    : <div className="no-file" >
                      <div className="img-wrap"></div>
                      <div className="title">
                        {cur.name}
                      </div>
                    </div>
                }
              </>
            );
          })
        }
      </div>
    })

  };

  // 操作日志table
  createOptInfoColumns = data => [
    ...data
  ];

  // 底部审批按钮
  // renderAction = (orderId, status) => {
  //   return (
  //     status < 15 ?
  //       <div className="detail-actions-container">
  //         <PrimaryButton onClick={this.onBtmBtnClick.bind(this, orderId, 1, "/order/operate/check", "post", true)}>通过</PrimaryButton>
  //         <DangerButton onClick={this.onBtmBtnClick.bind(this, orderId, 0)}>驳回</DangerButton>
  //         <NoBorderButton className="zzBtn" onClick={this.onBtmBtnClick.bind(this, orderId, 2)}>中止</NoBorderButton>
  //       </div> : null
  //   );
  // };

  onBtmBtnClick = (orderId, isPass) => {
    getAsyncModalInst(this.addBtmBtnModalInst).open({ orderId, isPass });
    // window.open(`/gm/order/audit/list`,'_self');
  };

  /** 终止工单弹窗 */
  onStopOrderClick = orderId => {
    getAsyncModalInst(this.endOrderModalInst).open({ orderId });
  };

  // 判断是否显示当前card
  getTitleShow = (index, registerType) => {
    if (!registerType) {
      return false
    }
    let titleList = getTitleTabs(registerType);
    let titleListNum = titleList.filter(item => item.id === index)
    return titleListNum.length > 0 && titleListNum[0].id;
  }

  // 审批对比按钮
  spBtnRender = (data) => {
    const {
      store: { showViewer }
    } = this.props;
    return (
      <div className="sp-btn-container">
        <div className="sp-btn-pro" onClick={this.setViewerContainer}>{showViewer ? '关闭对比' : '审批对比'}</div>
      </div>
    )
  }

  // 渲染驳回 & 终止原因
  renderNotice = (status, message) => {
    return (status === 20 || status === 25) && (
      <div className="notice-container">
        <Alert message={message} type="error" showIcon />
      </div>
    )
  }

  // 分屏操作
  setViewerContainer = () => {
    const {
      store: { showViewerData, showViewer }
    } = this.props;
    if (!showViewer) {
      const viewContainer = document.createElement('div');
      viewContainer.className = 'viewer-wrap';
      viewContainer.setAttribute('id', 'viewer-wrap');
      document.body.appendChild(viewContainer);
      document.getElementsByClassName('app-content-contaner')[0].style.marginRight = '400px';
      document.getElementsByClassName('sp-btn-pro')[0].style.right = "424px";
    }
    else {
      document.body.removeChild(document.getElementById('viewer-wrap'));
      document.getElementsByClassName('app-content-contaner')[0].style.marginRight = '0';
      document.getElementsByClassName('sp-btn-pro')[0].style.right = "24px";
    }
    showViewerData();
  }

  
  //同步数据 事件处理程序
   syncData = () => {
    let { store } = this.props;
    
      store.getData();
      console.log(1239299537)
      
  }

  
  // //附着物信息
  getElementsByClassNames = () => {
    const { store: { ewgaSsgaeg } } = this.props;
    ewgaSsgaeg();
  }


  doRender() {
    let {
      store: {
        entity: { fn = undefined },
        data,
        tudi,
        orderProcess,
        chainStatusInfo,
        MaterialJson,
        showFamilyInfoFlag,
        familyInfoTitle,
        familyMemberList,
        hideFamilyInfo,
        showViewer,
        showViewerData,
        versible, //驳回/中止 模态框 显示隐藏状态
        passVersible,//通过模态框 显示隐藏状态        
      },
      userInfo: { department, isRoot ,userName},
      frame: { isEstateCenter }
    } = this.props;
    // console.log("材料信息数据MaterialJson", MaterialJson);
    let {
      id: orderId,
      registerType,
      status,
      signInfo = {},
      orderHouseList = [], // 产权信息
      mortgageInfo = {}, // 抵押信息
      obligorInfoList = [], // 申请人信息-义务人信息
      obligeeInfoList = [], // 申请人信息-权利人信息
      mortgagorInfo = [], // 申请人信息-抵押人信息
      mortgageeInfo = [], // 申请人信息-抵押权人信息
      debtorInfo = [], // 债务人信息
      legalInfoList = [],//法定代表人
      legalProxyInfoList = [],//法定代表人的代理人
      materialList: resPicsList, // 材料信息/图片
      isPost,
      orderReason, // 抵押注销原因
      remark, // 驳回原因
      terminationReason, // 被终止原因
      orderMail = {}, // 邮寄信息
      checkLogList = [], // 操作日志
      orderLandInfo = {} //土地信息
    } = data;

    let { userInfo } = this.props;
    console.log("registertype",registerType);
    console.log("props",this.props);
    console.log("status",status);
    console.log('isPost',isPost);
    //附作物解构
    let { fzwqkObj={}, zdjbxxObj={} } = tudi;

    const files = {};
    if (resPicsList && resPicsList.length) {
      resPicsList.forEach(item => {
        files[item.materialType] = item.fileList;
      });
    }
    const fileArr = [];
    if (MaterialJson && MaterialJson.length) {
      MaterialJson.forEach(cur => {
        if (files[cur.id]) fileArr.push(...files[cur.id]);
      });
    }
    const prefix = dynamicConst.getItem("filehost");
    const fullSrc = fileArr.map(item => ({
      src: `${prefix}/${item.key}.${item.ext}`,
      alt: item.originalName,
    }));
    // console.log("fullSrc", fullSrc);
  
    

    const viewContainer = document.getElementById('viewer-wrap') || null;

    let isBtnShow = false; // 现状信息
    if ((registerType === 2 || registerType === 4 || registerType === 6 || registerType === 11) && orderHouseList.length > 1) {
      isBtnShow = false;
    } else if (isEstateCenter === 1) {
      isBtnShow = true;
    }
    let isLandBtnShow = false; // 税费信息，地税部门的4种登记类型显示税费信息按钮
    if (department === 2 && (registerType === 1 || registerType === 3 || registerType === 8 || registerType === 9)) {
      isLandBtnShow = true;
    }

    const TRADING_BLOCKCHAIN = dynamicConst.getItem("TRADING_BLOCKCHAIN"); // 是否显示区块链，true显示，false隐藏
    //处理 权利人数据的格式
    let QLRXX_INFO_DATA = []

    { 
      if (obligeeInfoList&&obligeeInfoList.length>0&&obligeeInfoList[0]) {
        for(let i=0;i<obligeeInfoList.length;i++){
      let { applicantList } = obligeeInfoList[i]
      applicantList.forEach(item => {
        if (item) {
          QLRXX_INFO_DATA.push({ ...item })
          // QLRXX_INFO_DATA = [...QLRXX_INFO_DATA,item.applicantList[0]]
        }
      })
    }
    
  }
    // console.log("权利人数据QLRXX_INFO_DATA", QLRXX_INFO_DATA);

    QLRXX_INFO_DATA.forEach(item => {
      const address = item.address
      const postCode = item.postcode
      const mobile = item.mobile
      item.address = <Popover
        title="通讯地址"
        trigger="click"
        content={address ? address : "--"}
      >
        <Button type="primary" style={{ textAlign: "left" }}>查看详情</Button>
      </Popover>
      item.postcode = postCode ? postCode : "--"
      item.mobile = mobile ? item.mobile : "--"
    })
  }
    //处理 法定代表人数据
    let FDDBR_INFO_DATA = []

    if (legalInfoList&&legalInfoList.length>0&&legalInfoList[0]) {
      for(let i=0;i<legalInfoList.length;i++){
      let { applicantList } = legalInfoList[i]
      applicantList.forEach(item => {
        if (item) {
          FDDBR_INFO_DATA.push({ ...item })
        }
      })

    }
    FDDBR_INFO_DATA.forEach(item => {
      const mobile = item.mobile
      item.mobile = mobile ? item.mobile : "--"
    })
  }
  //法定代表人的代理人数据处理
  let DLR_INFO_DATA = []

  if (legalProxyInfoList&&legalProxyInfoList.length>0&&legalProxyInfoList[0]) {
    let { applicantList } = legalProxyInfoList[0];
    applicantList.forEach(item => {
      if (item) {
        DLR_INFO_DATA.push({ ...item })
      }
    })
  DLR_INFO_DATA.forEach(item => {
    const mobile = item.mobile
    item.mobile = mobile ? item.mobile : "--"
  })
}
  //法定代表人和代理人数据
  let DLR_FDDBR_INFO_DATA = FDDBR_INFO_DATA.concat(DLR_INFO_DATA);
  
    const { form } = this.props;
    const { getFieldDecorator, setFieldsValue } = form;

    // 20: 驳回, 25: 终止
    const noticeMessage = {
      20: `很抱歉，您提交的申请已被驳回，驳回理由：${remark}`,
      25: `很抱歉，您提交的申请已终止，终止理由：${terminationReason}`
    }[status]

     //缴费判断
     const awerThfdh  = () => {
      let arrs = ["072","071","07","063"];
      if((registerType===112&& arrs.indexOf(orderLandInfo.tdyt) !=-1)||(registerType===113&& arrs.indexOf(orderHouseList[0].landUsage) !=-1)){
        return true
      }else {
        return false
      }
    };
    
    return (
      <div className="audit-detail-wrap">
        <Steps processData={orderProcess} orderStatus={status} />

        {this.spBtnRender()}

        {/* 审批对比图 */}
        <Viewer
          activeIndex={0}
          visible={showViewer}
          onClose={showViewerData}
          images={fullSrc}
          noClose={true}
          noImgDetails={true}
          container={viewContainer}
        />

         {/* {registerType===2 &&
          <Card title="上链状态" className="card-chain-row">
            {chainStatusInfo && this.getWindingInfo(chainStatusInfo)}
          </Card>
        } */}

        <Card title="工单信息">
          <DetailField label="工单编号">{data.orderNo}</DetailField>
          <DetailField label="登记类别">
            {dynamicConst.getTextFromValue("registerType", registerType)}
          </DetailField>
          <DetailField label="工单状态">{data.statusDesc}</DetailField>

          <DetailField label="处理人">{data.followerUser}</DetailField>
          <DetailField label="申请人">{data.createUser}</DetailField>
          <DetailField label="提交时间">{data.submitTime}</DetailField>
        </Card>

        {(registerType===112||registerType===113)&&((registerType!==2&&registerType!==4))&&<Card title="▼权利人信息" rowLen={1} className="forDetailTable">
          {[] &&
            <TableDetail
              className="detail-table"
              scroll={{ x: 800 }}
              dataSource={QLRXX_INFO_DATA}
              columns={this.createOptInfoColumns(QLRXX_DATA)}
              key={Math.random()}
            />
          }
        </Card>}

        {
          (registerType===112||registerType===113)&&(registerType!==2&&registerType!==4)&&<Card title="▼法定代表人信息" rowLen={1} className="forDetailTable">
          {[] &&
            <TableDetail
              className="detail-table"
              scroll={{ x: 800 }}
              // dataSource={FDDBR_INFO_DATA}
              dataSource={DLR_FDDBR_INFO_DATA}
              columns={this.createOptInfoColumns(FDDBR_DATA)}
              key={Math.random()}
            />
          }
        </Card>
      }

      {/* 本次交易信息 */}
        {(registerType===2||registerType===4)&&<div id="thisTradeInfo">
          <span>本次交易信息</span>
          {isBtnShow &&
            <NoBorderButton
              className="statusInfoBtn"
              onClick={() =>
                window.open(`/gm/order/audit/statusInfoDetail?id=${orderId}&registerType=${registerType}`)
              }
            >
              现状信息
          </NoBorderButton>
          }

          {/* {isLandBtnShow &&
            <NoBorderButton
              className="statusInfoBtn"
              onClick={() =>
                window.open(`/gm/order/audit/taxInfoDetail?id=${orderId}&registerType=${registerType}`)
              }
            >
              税费信息
          </NoBorderButton>
          } */}
        </div>}
        {/* 土地信息 */}
        {
          (registerType===112||registerType===113)&&(registerType!==2&&registerType!==4)&&<div id="syncInfo" style={{textAlign:"center"}}>
          {registerType===112&&<span className="syncInfo_tdxx">土地信息</span>}
          <span className="text">提示：产权数据缺失，请前往核心系统完善数据后，点击“同步数据”</span>
          <NoBorderButton
            className="tbBtn"
            onClick={this.syncData}
          >
            同步数据
          </NoBorderButton>
        </div>
      }

        {/* {((registerType===12)||this.getTitleShow("baxx", registerType)) &&
          <Card title="备案信息">
            <DetailField label="网签备案合同编号">
              {signInfo.contractNo}
            </DetailField>
            <DetailField label="备案日期">{signInfo.signDate}</DetailField>
            <DetailField label="中介公司名称">
              {signInfo.signCompanyName}
            </DetailField>

            <DetailField label="合同总价">{signInfo.totalPrice}</DetailField>
          </Card>
        } */}
 
         {(registerType===2||registerType===4)&&<Card title="申请人信息" rowLen={1} className="forDetailTable">
          {(obligeeInfoList ||
            obligorInfoList ||
             mortgageeInfo ||
             mortgagorInfo ||
             debtorInfo) &&
             this.getApplicantInfo(data)}
         </Card>}
        {/** 申请人信息-家庭成员弹窗*/}
        {(registerType===2)||<Modal
          className="modal-family"
          width={520}
          title={`${familyInfoTitle}的家庭成员`}
          footer={null}
          visible={showFamilyInfoFlag}
          onCancel={hideFamilyInfo}
        >
          {
            <div className="modal-family-info">
              {
                familyMemberList.map(item => (
                  <Row className="family-info-list">
                    <span className='user-name'>姓名： {item.name}</span>
                    <span className="user-card">{item.cardTypeDesc}号： {item.cardNo}</span>
                  </Row>
                )
                )
              }
            </div>
          }
        </Modal>}

        {(registerType===2||registerType===4)&&<Card title={registerType !== 10 ? "产权信息" : "土地信息"} className="property-right-info forDetailTable">
          {this.getPropertyInfo(data, isBtnShow)}
        </Card>}

        {
          (registerType===2||registerType===4) ?
            <Card title="抵押信息">
              
              <DetailField label="抵押不动产类型">{houseType[mortgageInfo.houseType]}</DetailField>
              <DetailField label="抵押方式">{mortgageInfo.typeDesc}</DetailField>
              <DetailField label="债务履行起始时间">
                {mortgageInfo.beginDate}
              </DetailField>
              <DetailField label="债务履行截止时间">
                {mortgageInfo.endDate}
              </DetailField>

              {MortgageInfo.getAliasFromValue(mortgageInfo.type) === "HEIGHTEST" ? (
                <DetailField label="最高债权数额">
                  {mortgageInfo.highestClaimAmount &&
                    `${mortgageInfo.highestClaimAmount}元`}
                </DetailField>
              ) : (
                  <DetailField label="被担保债权数额">
                    {mortgageInfo.mainClaimAmount &&
                      `${mortgageInfo.mainClaimAmount}元`}
                  </DetailField>
                )}
              <DetailField label="产权评估总额">
                {mortgageInfo.evaluationPrice}
              </DetailField>
            </Card> : ""
        }
        {/* 土地情况 */}
        {(registerType===112)&&<Card title="土地情况">
            <DetailField  label="权利人姓名">{orderLandInfo.rightHolder}</DetailField>
            <DetailField label="共有方式">{dynamicConst.getItem('ownerShipType')[orderLandInfo.ownershipType] }</DetailField>
            <DetailField label="宗地代码">{orderLandInfo.zddm}</DetailField>
            <DetailField label="土地坐落">{orderLandInfo.tdzl}</DetailField>
            <DetailField label="面积单位">{orderLandInfo.mjdw}</DetailField>
            <DetailField label="上手不动产权证号">{orderLandInfo.ssbdcqzh }</DetailField>
            <DetailField label="所在街道">{orderLandInfo.jd}</DetailField>
            <DetailField label="所在街坊">{orderLandInfo.jf}</DetailField>
            <DetailField label="所在组">{orderLandInfo.szz}</DetailField>
            <DetailField label="不动产单元号">{orderLandInfo.bdcdyh}</DetailField>
            <DetailField label="宗地面积">{orderLandInfo.zdmj}</DetailField>
            <DetailField label="权利类型">{dynamicConst.getItem('rightType')[orderLandInfo.qllx]}</DetailField>
            <DetailField label="权利性质">{orderLandInfo.qlxz}</DetailField>
            <DetailField label="权利设定情况">{dynamicConst.getItem('rightSettingMethod')[orderLandInfo.qlsdfs]}</DetailField>
            <DetailField label="取得单价">{orderLandInfo.jg}</DetailField>
            <DetailField label="宗地四至">&nbsp;</DetailField>
            <DetailField label="北至">{orderLandInfo.zdszb}</DetailField>
            <DetailField label="东至">{orderLandInfo.zdszd}</DetailField>
            <br/>
            <DetailField label="南至">{orderLandInfo.zdszn}</DetailField>
            <DetailField label="西至">{orderLandInfo.zdszx}</DetailField> 
            <br/>                   
            <DetailField label="土地用途">{dynamicConst.getItem('landUsage')[orderLandInfo.tdyt]}</DetailField>
            <DetailField label="土地使用起始时间">{orderLandInfo.syqxq}</DetailField>
            <DetailField label="土地使用结束时间">{orderLandInfo.syqxz}</DetailField>
            <DetailField label="使用权面积">{orderLandInfo.syqmj}</DetailField>
            <DetailField label="分摊土地面积">{orderLandInfo.ftmj}</DetailField>
            <DetailField label="独用土地面积">{orderLandInfo.dymj}</DetailField>
            <DetailField label="土地等级">{dynamicConst.getItem('landLevel')[orderLandInfo.dj]}</DetailField>
        </Card>}
        {(registerType===113)&&<Card title="房屋信息">
            <DetailField label="房屋坐落">{orderHouseList[0].location }</DetailField>
            <DetailField label="不动产单元号">{orderHouseList[0].unitNumber }</DetailField>
            <DetailField label="总层数">{orderHouseList[0].totalFloor }</DetailField>
            <DetailField label="地下层数">{orderHouseList[0].underLandFloor }</DetailField>
            <DetailField label="产籍号">{orderHouseList[0].estateOriginNo }</DetailField>
            <DetailField label="地上层数">{orderHouseList[0].overLandFloor }</DetailField>
            <DetailField label="房屋结构">{dynamicConst.getItem('houseStructure')[orderHouseList[0].houseStructure] }</DetailField>
            <DetailField label="规划用途">{orderHouseList[0].planUseDesc }</DetailField>
            <DetailField label="房屋性质">{dynamicConst.getItem('natureHouse')[orderHouseList[0].natureHouse] }</DetailField> 
            <DetailField label="房屋类型">{orderHouseList[0].houseType }</DetailField>
            <DetailField label="建筑面积">{orderHouseList[0].space }</DetailField>
            <DetailField label="所在层数">{orderHouseList[0].inFloor }</DetailField>
            <DetailField label="套内建筑面积">{orderHouseList[0].innerBuildingArea }</DetailField>
            <DetailField label="分摊建筑面积">{orderHouseList[0].divideBuildingArea }</DetailField>
            <DetailField label="竣工时间">{orderHouseList[0].completedDate }</DetailField>
            <DetailField label="东墙">{orderHouseList[0].eastWall }</DetailField>
            <DetailField label="南墙">{orderHouseList[0].southWall }</DetailField>
            <DetailField label="北墙">{orderHouseList[0].northWall }</DetailField>
            <DetailField label="西墙">{orderHouseList[0].westernWall }</DetailField>
        </Card>}
        {(registerType===113)&&<Card title="产权信息">
            <DetailField  label="不动产权利类型">{dynamicConst.getItem('rightType')[orderHouseList[0].estateRightType] }</DetailField>
            <DetailField label="产权人">{orderHouseList[0].propertyPerson  }</DetailField>
            <DetailField  label="购房价格">{orderHouseList[0].tradePrice }</DetailField>
            <DetailField label="共有方式">{dynamicConst.getItem('ownerShipType')[orderHouseList[0].ownershipType] }</DetailField>
            <DetailField  label="占有份额">{orderHouseList[0].holdShare }</DetailField>
            <DetailField label="上手不动产权证号">{orderHouseList[0].frontWarrantNo }</DetailField>
            <DetailField  label="共有不动产权证号">{orderHouseList[0].commonWarrantNo }</DetailField>
            <DetailField label="产权来源">{dynamicConst.getItem('propertySource')[orderHouseList[0].propertySource] }</DetailField>
            <DetailField  label="产权类别">{dynamicConst.getItem('propertyCategory')[orderHouseList[0].propertyCategory] }</DetailField>
        </Card>}
        {(registerType===113)&&<Card title="土地信息">
            <DetailField  label="土地用途">{dynamicConst.getItem('landUsage')[orderHouseList[0].landUsage]  }</DetailField>
            <DetailField label="土地面积">{orderHouseList[0].landArea}</DetailField>
            <DetailField label="独用土地面积">{orderHouseList[0].engrossLandArea}</DetailField>
            <DetailField  label="分摊土地面积">{orderHouseList[0].divideLandArea}</DetailField>
            <DetailField label="土地使用起始时间">{orderHouseList[0].landUseStart}</DetailField>
            <DetailField label="土地使用结束时间">{orderHouseList[0].landUseEnd}</DetailField>
            <DetailField  label="土地权利性质">{dynamicConst.getItem('landUsage')[orderHouseList[0].landDroitNature]}</DetailField>
        </Card>}
        {/* 附着物情况 */}
        {(registerType===112)&&<Card title="附着物情况">
          <DetailField label="建筑容积率">{fzwqkObj.jzrjl}</DetailField>
          <DetailField label="建筑密度">{fzwqkObj.jzmd}</DetailField>
          <DetailField label="建筑限高">{fzwqkObj.jzxg}</DetailField>
          <DetailField label="建筑物占地面积">{fzwqkObj.jzwzdmj}</DetailField>
          <DetailField label="建筑物类型">{fzwqkObj.jzwlx}</DetailField>
          <DetailField label="申报建筑物权属">{fzwqkObj.sbjzwqs}</DetailField>
          <DetailField label="总建筑面积">{fzwqkObj.zjzmj}</DetailField>
          <DetailField label="分摊系数">{fzwqkObj.ftxs}</DetailField>
        </Card>}
        {/* 共有情况 */}
        {(registerType===112)&&<Card title="共有情况">
          <DetailField label="共有情况为">{orderLandInfo.commonInfo}</DetailField>
        </Card>}
        {/* 材料信息 */}
        {!showViewer && (
          <OriginCard title="材料信息" className="pics-list-wrap">
            {this.renderPics(MaterialJson, resPicsList)}
          </OriginCard>
        )}

        {registerType === 4 &&
          <Card title="抵押注销原因" className="reason">
            <p>{orderReason}</p>
          </Card>
        }

     

        {(registerType===113||registerType===112)&& registerType!==2&&registerType!==4&&this.getTitleShow("yjfw", registerType) &&
          <Card title="邮寄信息"  rowLen={1}>
            <DetailField label="产证/证明邮寄">
              {isPost === 1 ? "是" : "否"}
            </DetailField>
            {isPost === 1 && (
              <DetailField label="收件人">{orderMail.consignee}</DetailField>
            )}
            {isPost === 1 && (
              <DetailField label="收件人手机号">{orderMail.mobile}</DetailField>
            )}
            {isPost === 1 && (
              <DetailField label="收件地址">
                {orderMail.addressInfo && orderMail.addressInfo.mosaicAddress}
              </DetailField>
            )}
          </Card>
        }


        <Card title="操作日志" rowLen={1} className="forDetailTable">
          {checkLogList &&
            <TableDetail
              className="detail-table"
              scroll={{ x: 800 }}
              dataSource={checkLogList}
              columns={this.createOptInfoColumns(CZRZ_DATA)}
              key={Math.random()}
            />
          }
        </Card>

         {( userInfo.userName=='admin'||( userInfo&& userInfo.roleList.length>0 && (userInfo.roleList[0].id!=2421||userInfo.roleList[0].id!=2422) ) ) &&(registerType===112||registerType===113)&&registerType!==2&&registerType!==4&&
            <Card title="缴费信息" className='money'>
              <div className="pxu">
                <div className="clr">*</div><div>登记费</div>
                <input type="text" value={awerThfdh() ? 80 :550 } className='ipt'></input>
                <div>元</div>
              </div>
            </Card>
         }

        {data.statusDesc == "非税预审受理中" &&userInfo&& userInfo.roleList.length>0&& userInfo.roleList[0].id &&(userInfo.roleList[0].id==2421||userInfo.roleList[0].id==2422)&&(registerType === 112 || registerType === 113) && registerType !== 2 && registerType !== 4 &&
          <Card title="缴费信息" className='money'>
            <div className="pxu">
              <div className="clr">*</div><div>登记费</div>
              <Input placeholder={awerThfdh() ? 80 :550 } className='jf'/>
              <div>元</div>
            </div>
          </Card>
        }

        {/* 底部审核按钮 */}
        { userInfo&&userInfo.userName!="admin"&& userInfo.roleList.length>0 && (  ( (userInfo.roleList[0].id==2424||userInfo.roleList[0].id==2423) && status==101&&isPost ==1 ) || ( (userInfo.roleList[0].id==2424||userInfo.roleList[0].id==2423) && (status==10&&(isPost ==1||isPost ==2)) )   || ( (userInfo.roleList[0].id==2421||userInfo.roleList[0].id==2422)&&(status==100&&(isPost ==1||isPost ==2))) )&&
        <Card  className="btns">
          <PrimaryButton onClick={this.onBtmBtnClick.bind(this, orderId, 1, "/order/operate/check", "post", true)} className="bt1" >通过</PrimaryButton>
          <DangerButton onClick={this.onBtmBtnClick.bind(this, orderId, 0)} className="bt2">驳回</DangerButton>
          <BorderButton onClick={this.onStopOrderClick.bind(this, orderId)} className="bt3">终止</BorderButton>
            
          {/* {fn === "audit" && isRoot !== 1 && department && this.renderAction(orderId, status)} */}
          <BtmBtnModal onOk={this.backToList} wrappedComponentRef={inst => (this.addBtmBtnModalInst = inst)} />
          <StopOrderModal onOk={this.backToList} wrappedComponentRef={inst => (this.endOrderModalInst = inst)}/>
        </Card>
        }
      
      </div>
    );
  }
//审核按钮确定回调函数
  backToList = () => {
    history.push("/order/audit/list");
    console.log("按钮被点击了");
    tools.resetToTop();
  }
}

export default AuditDetail;
