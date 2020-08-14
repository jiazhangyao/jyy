import React from "react";
import { DetailPage } from "super/page";
import { inject, observer } from "mobx-react";
import { moduleName } from "./store";
import { Row, Col } from "antd";
import Card from "mt-card";
import {
  Steps,
  DetailField,
  TableDetail,
  WindingStatus,
  ApplicantInfo,
  PropertyInfo,
  Button,
  DetailPics
} from "components";

import dynamicConst from "common/dynamicConst";
import { MortgageInfo, OrderRegisterType } from "common/enum";
import "./index.less";

const { SingleRow } = Card;
const PRE_FIX = "/gm/reserve";
const { BorderButton,NoBorderButton } = Button;

@inject(stores => ({
  store: stores[moduleName],
  userInfo: stores.frame.userInfo
}))
@observer
class OrderDetail extends DetailPage {
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

  // 操作日志
  buildLogColumns = () => {
    return [
      {
        title: "时间",
        dataIndex: "checkTime",
        width: "200",
        key: "checkTime"
      },
      {
        title: "处理人",
        dataIndex: "checkUser",
        width: "150",
        key: "checkUser"
      },
      {
        title: "操作",
        dataIndex: "checkDesc",
        width: "150",
        key: "checkDesc"
      },
      {
        title: "备注",
        dataIndex: "remark",
        key: "remark",
        width: "100"
      }
    ];
  };

  //产权信息组件
  getPropertyInfo = entity => {
    const {
      userInfo: { department },
      location
    } = this.props;
    const { orderHouseList, registerType, id } = entity;
    const { search } = location;
    return (
      <PropertyInfo
        orderHouseList={orderHouseList}
        getCardInfo={this.getCardInfo}
        department={department}
        orderId={id}
        search={search}
        registerType={registerType}
      />
    );
  };
  getCardInfo = (cardInfo, data) => {
    const info = Object.keys(cardInfo).map(key => {
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
          ? data[key] == 1
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
    return info;
  };

  renderPics = (MaterialJson = [], resPicsList = []) => {
    const files = {};
    resPicsList.forEach(item => {
      files[item.materialType] = item.fileList;
    });

    return MaterialJson.map(cur => {
      const fileArr = files[cur.id] || [];

      return (
        <SingleRow>
          <DetailField type="pics" label={cur.name}>
            {fileArr.map(item => <DetailPics name={item.key} suffix={item.ext} alt={cur.name}/>)}
          </DetailField>
        </SingleRow>
      );
    });
  };

  // 申请人信息card
  getApplicantInfo = entity => {
    const {
      obligeeInfoList,
      obligorInfoList,
      mortgageeInfo,
      mortgagorInfo,
      registerType
    } = entity;
    return (
      <ApplicantInfo
        obligeeInfoList={obligeeInfoList}
        obligorInfoList={obligorInfoList}
        mortgageeInfo={mortgageeInfo}
        mortgagorInfo={mortgagorInfo}
        // getFimilyInfo={this.getFimilyInfo}
        registerType={registerType}
      />
    );
  };

  doRender() {
    const {
      store: { data, orderProcess, chainStatusInfo, MaterialJson },
      userInfo: { department }
    } = this.props;
    const {
      id,
      registerType,
      status,
      signInfo,
      obligeeInfoList,
      obligorInfoList,
      mortgageeInfo,
      mortgagorInfo,
      orderHouseList = [],
      totalPrice,
      checkLogList = [],
      orderMail,
      isPost,
      materialList: resPicsList,
      mortgageInfo = {}
    } = data;
    console.log(checkLogList)
    const isEstateCenter = dynamicConst.getItem("isEstateCenter");
    let isBtnShow = false;
    let isLandBtnShow = false;
    if (
      (registerType === 2 ||
        registerType === 4 ||
        registerType === 6 ||
        registerType === 11) &&
      orderHouseList.length > 1
    ) {
      isBtnShow = false;
    } else if (isEstateCenter === 1) {
      isBtnShow = true;
    }
    if (
      department === 0 &&
      (registerType === 1 ||
        registerType === 3 ||
        registerType === 8 ||
        registerType === 9)
    ) {
      isLandBtnShow = true;
    }
    return (
      <>
        <div className="order-detail">
          {status !== 25 && <Steps processData={orderProcess} />}
          <Card title="上链状态" className="card-all-row">
            {chainStatusInfo && this.getWindingInfo(chainStatusInfo)}
          </Card>

          <Card title="工单信息">
            <DetailField label="工单号">{data.orderNo}</DetailField>
            <DetailField label="登记类别">
              {dynamicConst.getTextFromValue("registerType", registerType)}
            </DetailField>
            <DetailField label="工单状态">{data.statusDesc}</DetailField>
            <DetailField label="处理人">{data.followerUser}</DetailField>
            <DetailField label="申请人">{data.createUser}</DetailField>
            <DetailField label="提交时间">{data.submitTime}</DetailField>
          </Card>

          <div className="">
            <Row style={{ padding: "28px 0" }}>
              <Col span={8}>
                <h2>本次交易信息</h2>
              </Col>
              <Col span={8} offset={8} className="order-button-group">
                {isBtnShow && (
                  <span className="" style={{ "margin-right": "16px" }}>
                    <NoBorderButton
                      size="middile"
                      onClick={() =>
                        window.open(
                          `${PRE_FIX}/order/statusdetail?id=${id}&registerType=${registerType}`
                        )
                      }
                    >
                      现状信息
                    </NoBorderButton>
                  </span>
                )}
                {isLandBtnShow && (
                  <span className="">
                    <NoBorderButton
                      size="middile"
                      onClick={() =>
                        window.open(
                          `${PRE_FIX}/order/taxdetail?id=${id}&registerType=${registerType}`
                        )
                      }
                    >
                      税费信息
                    </NoBorderButton>
                  </span>
                )}
              </Col>
            </Row>
          </div>

          {signInfo && (
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
          )}

          <Card title="申请人信息" rowLen={1} className="forDetailTable">
            {(obligeeInfoList ||
              obligorInfoList ||
              mortgageeInfo ||
              mortgagorInfo) &&
              this.getApplicantInfo(data)}
          </Card>

          <Card title="产权信息" className="property-right-info">
            {orderHouseList &&
              orderHouseList.length > 0 &&
              this.getPropertyInfo(data)}
          </Card>

          <Card title="抵押信息">
            {OrderRegisterType.getAliasFromValue(registerType) ===
              "MORTGAGE_CANCLE" && (
              <DetailField label="不动产登记证明号">
                {mortgageInfo.hisWarrantNumber}
              </DetailField>
            )}
            {(OrderRegisterType.getAliasFromValue(registerType) ===
              "MORTGAGE_CANCLE" ||
              OrderRegisterType.getAliasFromValue(registerType) ===
                "COMMODITY_HOUSE_PRE_MORTGAGE" ||
              OrderRegisterType.getAliasFromValue(registerType) ===
                "MORTGAGE_CREATE") && (
              <DetailField label="抵押受理号">
                {mortgageInfo.acceptNo}
              </DetailField>
            )}
            <DetailField label="抵押类型">{mortgageInfo.typeDesc}</DetailField>
            <DetailField label="债务履行起始日期">
              {mortgageInfo.beginDate}
            </DetailField>
            <DetailField label="债务履行截止日期">
              {mortgageInfo.endDate}
            </DetailField>

            {MortgageInfo.getAliasFromValue(mortgageInfo.type) ===
            "HEIGHTEST" ? (
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
            <DetailField label="房屋评估价">
              {mortgageInfo.evaluationPrice}
            </DetailField>
          </Card>

          <Card title="材料信息" className="pics-list">
            {this.renderPics(MaterialJson, resPicsList)}
          </Card>

          <Card title="邮寄信息">
            <DetailField label="产证/证明邮寄">
              {isPost === 2 ? "否" : "是"}
            </DetailField>
            {isPost === 1 && (
              <DetailField label="收件人">{orderMail.consignee}</DetailField>
            )}
            {isPost === 1 && (
              <DetailField label="收件人手机号">{orderMail.mobile}</DetailField>
            )}
            {isPost === 1 && (
              <DetailField label="收件地址">
                {orderMail.addressInfo.mosaicAddress || '--'}
              </DetailField>
            )}
          </Card>
          <Card title="操作日志" rowLen={1} className="forDetailTable">
            {checkLogList.length ? (
              <TableDetail
                className="detail-table"
                scroll={{ x: 1300 }}
                dataSource={checkLogList}
                columns={this.buildLogColumns()}
                key={Math.random(100)}
              />
            ):(
            <p>该工单还没有审批记录！</p>
            )
            }
          </Card>
        </div>
      </>
    );
  }
}

export default OrderDetail;
