import React from "react";
import { DetailPage } from "super/page";
import { inject, observer } from "mobx-react";
import { moduleName } from "./store";
import Card from "mt-card";
import {Modal, Card as OriginCard} from 'antd';
import BtmBtnModal from "./components/btmBtnModal";
import { getAsyncModalInst } from "components/asyncModal";
import history from "utils/history";
import Viewer from "react-viewer";
import 'react-viewer/dist/index.css';
import { 
  Steps,
  DetailField,
  TableDetail,
  Button,
  DetailImages,
  PropertyInfo
} from "components";
import { OrderStatus } from "./enum";
import dynamicConst from "common/dynamicConst";
import {prefix} from "common/const";
import "./style.less";
import lib from "mt-breadcrumb";
const { PrimaryButton, DangerButton } = Button;
const { SingleRow } = Card;
@inject(stores => ({
  store: stores[moduleName],
  userInfo: stores.frame.userInfo,
  frame: stores["frame"]
}))
@observer
class SeizeDetail extends DetailPage {

  componentWillUnmount() {
    document.getElementsByClassName('app-content-contaner')[0].style.marginRight = '0';
  }

  onBtmBtnClick = (id, isPass) => {
    getAsyncModalInst(this.addBtmBtnModalInst).open({orderId: id, isPass});
  };

  renderAction = id => {
    return (
      <div className="water-ele-btmntn">
        <PrimaryButton onClick={this.onBtmBtnClick.bind(this, id, 1)}>
          通过
        </PrimaryButton>
        <DangerButton onClick={this.onBtmBtnClick.bind(this, id, 0)}>
          驳回
        </DangerButton>
      </div>
    );
  };

  checkRender = (id) => {
    const {
      store: {showHistoryData}
    } = this.props;
    return (
      <div className="history-btn" onClick={showHistoryData}>历史查封信息</div>
    )
  };

  downLoadPic = (key, ext) => {
    const url = `${window.location.protocol}//${window.location.host}${prefix}/file/readToOriginalName/${key}.${ext}`;
      window.location.href = url;
  }

  // 查封历史信息
  renderHistory = (data) => {
    const {
      store: {showHistory, showHistoryData}
    } = this.props;
    return (
      <Modal
        visible={showHistory}
        centered
        footer={null}
        className="history-wrap"
        onCancel={showHistoryData}
      >
        {data.map((item, index) => (
          <div>
            <div className="content-wrap clearfix">
              <h3>{`查封信息${index+1}`}</h3>
              <Card className="content">
                <DetailField label="查封机关">
                  {item.sealAgency}
                </DetailField>
                <DetailField label="申请时间">
                  {item.applyTime}
                </DetailField>
                <DetailField label="查封类型">
                  {item.sealType}
                </DetailField>
                <DetailField label="查封起始时间">
                  {item.startTime}
                </DetailField>
                <DetailField label="协助执行书">
                  {item.assistBook}
                </DetailField>
                <DetailField label="查封范围">
                  {item.sealRange}
                </DetailField>
                <DetailField label="查封结束时间">
                  {item.endTime}
                </DetailField>
                <DetailField label="民事执行书">
                  {item.civilBook}
                </DetailField>
                <DetailField label="附记">
                  {item.remark}
                </DetailField>
              </Card>
              {item.applyInfo && item.applyInfo.length && (
                item.applyInfo.map((cur, index) => (
                  <div className="applicant">
                    <div className="tit-tag">申请人{index+1}</div>
                    <div className="app-content clearfix">
                      <DetailField label="姓名">
                        {cur.name}
                      </DetailField>
                      <DetailField label="证件类型">
                        {/* {dynamicConst.getTextFromValue("cardType", cur.cardType)} */}
                        {cur.cardTypeDesc}
                      </DetailField>
                      <DetailField label="证件号码">
                        {cur.cardNo}
                      </DetailField>
                      <DetailField label="联系方式">
                        {cur.mobile}
                      </DetailField>
                    </div>
                  </div>
                ))
              )}
              <div className="fj-wrap">
                <DetailField label="附件">
                  {item.zipAnnex ? <a onClick={this.downLoadPic.bind(this, item.zipAnnex.key, item.zipAnnex.ext)}>{item.zipAnnex.fileName}</a> : null}
                </DetailField>
              </div>
            </div>
            {item.estateImmovableUnblockDTO && (
              <div className="zx-wrap clearfix">
                <h3>{`注销信息${index+1}`}</h3>
                <Card className="content">
                  <DetailField label="查封机关">
                    {item.estateImmovableUnblockDTO.sealAgency}
                  </DetailField>
                  <DetailField label="申请时间">
                    {item.estateImmovableUnblockDTO.applyTime}
                  </DetailField>
                  <DetailField label="查封类型">
                    {item.estateImmovableUnblockDTO.sealType}
                  </DetailField>
                  <DetailField label="注销时间">
                    {item.estateImmovableUnblockDTO.unblockTime}
                  </DetailField>
                  <DetailField label="协助执行书">
                    {item.estateImmovableUnblockDTO.assistBook}
                  </DetailField>
                  <DetailField label="查封范围">
                    {item.sealRange}
                  </DetailField>
                  <DetailField label="民事执行书">
                    {item.estateImmovableUnblockDTO.civilBook}
                  </DetailField>
                  <DetailField label="附记">
                    {item.estateImmovableUnblockDTO.remark}
                  </DetailField>
                </Card>
                {item.estateImmovableUnblockDTO.applyInfo && item.estateImmovableUnblockDTO.applyInfo.length && (
                  item.estateImmovableUnblockDTO.applyInfo.map((current, i) => (
                    <div className="applicant">
                      <div className="tit-tag">申请人{i+1}</div>
                      <div className="app-content clearfix">
                        <DetailField label="姓名">
                          {current.name}
                        </DetailField>
                        <DetailField label="证件类型">
                          {/* {dynamicConst.getTextFromValue("cardType", current.cardType)} */}
                          {current.cardTypeDesc}
                        </DetailField>
                        <DetailField label="证件号码">
                          {current.cardNo}
                        </DetailField>
                        <DetailField label="联系方式">
                          {current.mobile}
                        </DetailField>
                      </div>
                    </div>
                  ))
                )}
                <div className="fj-wrap">
                  <DetailField label="附件">
                  {item.estateImmovableUnblockDTO.zipAnnex ? <a onClick={this.downLoadPic.bind(this, item.estateImmovableUnblockDTO.zipAnnex.key, item.estateImmovableUnblockDTO.zipAnnex.ext)}>{item.estateImmovableUnblockDTO.zipAnnex.fileName}</a> : null}
                </DetailField>
                </div>
              </div>
            )}
          </div>
        ))}
      </Modal>
    )
  }

  onOkBtmBtnModal = () => {
    history.push("/seize/register/list");
  };

   // 不动产信息
  getPropertyInfo = (data, isBtnShow) => {
    const {
      userInfo: { department },
      location
    } = this.props;
    
    const { orderHouseList = [], registerType, id } = data;
    const { search } = location;
    if (orderHouseList && orderHouseList.length) {
      const { warrantNumber, space, fullAddress, unitNumber, floorDesc, buildYear, holder, houseStatus, planUseDesc } = orderHouseList[0]
      return (
        // <PropertyInfo
        //   orderHouseList={orderHouseList}
        //   getCardInfo={this.getCardInfo}
        //   department={department}
        //   orderId={id}
        //   search={search}
        //   isBtnShow={isBtnShow}
        //   registerType={registerType}
        // />
  
        <Card title="不动产信息" className="seal-wrap">
          <DetailField label="不动产权证号">
            {warrantNumber}
          </DetailField>
          <DetailField label="建筑面积">
            {space} ㎡
          </DetailField>
          <DetailField label="房屋坐落">
            {fullAddress}
          </DetailField>
          <DetailField label="不动产单元号">
            {unitNumber}
          </DetailField>
          <DetailField label="楼层">
            {floorDesc}
          </DetailField>
          <DetailField label="建筑年代">
            {buildYear}
          </DetailField>
          <DetailField label="不动产权人">
            {holder}
          </DetailField>
          <DetailField label="房屋状态">
            {houseStatus}
          </DetailField>
          <DetailField label="用途">
            {planUseDesc}
          </DetailField>
          {/* )} */}
        </Card>
  
      );
    }

  };

  getCardInfo = (cardInfo, data) => {
    console.log('cardInfo', cardInfo)

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

  // 操作日志table
  createOptInfoColumns = () => [
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
  ];

  // 材料信息card-图片list
  renderPics = (MaterialJson = [], resPicsList = []) => {
    const files = {};
    resPicsList.forEach(item => {
      files[item.materialType] = item.fileList;
    });
    return MaterialJson.map(cur => {
      const fileArr = files[cur.id] || [];
      return (
        <DetailField type="specialPics" label={cur.name}>
          <DetailImages title={cur.name} fileArr={fileArr} />
        </DetailField>
      );
    });
  };

  // 查封信息
  sealRender = (data, type) => {
    const {
      startTime,
      endTime,
      assistBook,
      civilBook,
      sealRange,
      attachment,
      sealAgency,
      applyTime,
      applyInfo,
      sealType
    } = data;
    const tit = (type === 4050 || type === 4060) ? '查封信息' : '查封申请信息';
    return (
      <Card title={tit} className="seal-wrap">
        {/* <DetailField label="查封机关">
          {sealAgency}
        </DetailField>
        <DetailField label="申请时间">
          {applyTime}
        </DetailField>
        <DetailField label="查封类型">
          {sealType}
        </DetailField> */}
        <DetailField label="查封起始时间">
          {startTime}
        </DetailField>
        <DetailField label="协助执行书">
          {assistBook}
        </DetailField>
        <DetailField label="查封范围">
          {sealRange}
        </DetailField>
        <DetailField label="查封结束时间">
          {endTime}
        </DetailField>
        <DetailField label="民事执行书">
          {civilBook}
        </DetailField>
        <DetailField label="附记">
          {attachment}
        </DetailField>
        {applyInfo && applyInfo.length && (
          applyInfo.map((item, index) => (
            <SingleRow>
              <div className="applicant">
                <div className="tit-tag">申请人{index+1}</div>
                <DetailField label="姓名">
                  {item.name}
                </DetailField>
                <DetailField label="证件类型">
                  {dynamicConst.getTextFromValue("cardType", item.cardType)}
                </DetailField>
                <DetailField label="证件号码">
                  {item.cardNo}
                </DetailField>
                <DetailField label="联系方式">
                  {item.mobile}
                </DetailField>
              </div>
            </SingleRow>
          ))
        )}
      </Card>
    )
  }

  // 注销信息
  logoutRender = (data) => {
    const {
      unblockTime,
      assistBook,
      civilBook,
      applyInfo
    } = data;
    return (
      <Card title="注销申请信息" className="seal-wrap">
        <DetailField label="注销时间">
          {unblockTime}
        </DetailField>
        <DetailField label="协助执行书">
          {assistBook}
        </DetailField>
        <DetailField label="民事执行书">
          {civilBook}
        </DetailField>
        {applyInfo && applyInfo.length > 0 && (
          applyInfo.map((item, index) => (
            <SingleRow>
              <div className="applicant">
                <div className="tit-tag">申请人{index+1}</div>
                <DetailField label="姓名">
                  {item.name}
                </DetailField>
                <DetailField label="证件类型">
                  {dynamicConst.getTextFromValue("cardType", item.cardType)}
                </DetailField>
                <DetailField label="证件号码">
                  {item.cardNo}
                </DetailField>
                <DetailField label="联系方式">
                  {item.mobile}
                </DetailField>
              </div>
            </SingleRow>
          ))
        )}
      </Card>
    )
  }

  // 续封信息
  reSealRender = (data) => {
    const {
      startTime,
      endTime,
      assistBook,
      civilBook,
      sealRange,
      attachment,
      sealAgency,
      applyTime,
      applyInfo
    } = data;
    return (
      <Card title="续封申请信息" className="seal-wrap">
        <DetailField label="查封起始时间">
          {startTime}
        </DetailField>
        <DetailField label="协助执行书">
          {assistBook}
        </DetailField>
        <DetailField label="查封范围">
          {sealRange}
        </DetailField>
        <DetailField label="查封结束时间">
          {endTime}
        </DetailField>
        <DetailField label="民事执行书">
          {civilBook}
        </DetailField>
        <DetailField label="附记">
          {attachment}
        </DetailField>
        {applyInfo && applyInfo.length > 0 && (
          applyInfo.map((item, index) => (
            <SingleRow>
              <div className="applicant">
                <div className="tit-tag">申请人{index+1}</div>
                <DetailField label="姓名">
                  {item.name}
                </DetailField>
                <DetailField label="证件类型">
                  {dynamicConst.getTextFromValue("cardType", item.cardType)}
                </DetailField>
                <DetailField label="证件号码">
                  {item.cardNo}
                </DetailField>
                <DetailField label="联系方式">
                  {item.mobile}
                </DetailField>
              </div>
            </SingleRow>
          ))
        )}
      </Card>
    )
  }

  // 审批对比按钮
  spBtnRender = (data) => {
    const {
      store: {showViewer}
    } = this.props;
    return (
      <div className="sp-btn" onClick={this.setViewerContainer}>{showViewer ? '关闭对比' : '审批对比'}</div>
    )
  }

  // 分屏操作
  setViewerContainer = () => {
    const {
      store: {showViewerData, showViewer}
    } = this.props;
    if (!showViewer) {
      const viewContainer = document.createElement('div');
      viewContainer.className = 'viewer-wrap';
      viewContainer.setAttribute('id', 'viewer-wrap');
      document.body.appendChild(viewContainer);
      document.getElementsByClassName('app-content-contaner')[0].style.marginRight = '400px';
      document.getElementsByClassName('sp-btn')[0].style.right = "424px";
    }
    else {
      document.body.removeChild(document.getElementById('viewer-wrap'));
      document.getElementsByClassName('app-content-contaner')[0].style.marginRight = '0';
      document.getElementsByClassName('sp-btn')[0].style.right = "24px";
    }
    showViewerData();
  }

  doRender() {
    const {
      store: {
        entity: {fn = undefined},
        data,
        MaterialJson,
        orderProcess,
        showHistory,
        showViewer,
        showViewerData,
        sealLogData
      },
      userInfo: { isRoot }
    } = this.props;
    const {
      sealApplicationInfo = {},
      checkLogList = [],
      id,
      registerType,
      materialList: resPicsList, // 材料信息/图片
      status,
      renewalApplicationInfo = {},
      unblockApplicationInfoDTO = {},
    } = data;
    const files = {};
    if (resPicsList && resPicsList.length) {
      resPicsList.forEach(item => {
        files[item.materialType] = item.fileList;
      });
    }
    const fileArr = [];
    if (MaterialJson && MaterialJson.length) {
      MaterialJson.map(cur => {
        fileArr.push(...files[cur.id]);
      });
    }
    const prefix = dynamicConst.getItem("filehost");
    const fullSrc = fileArr.map(item => ({
      src: `${prefix}/${item.key}.${item.ext}`,
      alt: item.originalName,
    }));
    const viewContainer = document.getElementById('viewer-wrap') || null;
    return (
      <>
        {/* 流程图 */}
        <Steps processData={orderProcess} />
        {fullSrc && fullSrc.length > 0 && this.spBtnRender()}
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
        <Card title="工单信息">
          <DetailField label="工单编号">
            {data.orderNo}
          </DetailField>
          <DetailField label="登记类型">
            {dynamicConst.getTextFromValue("sealResgisterOrderStatus", registerType)}
          </DetailField>
          <DetailField label="工单状态">{data.statusDesc}</DetailField>

          <DetailField label="申请机构">{data.applyCompanyName}</DetailField>
          <DetailField label="审核人">{data.createUser}</DetailField>
          <DetailField label="提交时间">{data.submitTime}</DetailField>
        </Card>
        {/* <Card title="不动产信息" className="property-right-info forDetailTable">
          {this.getPropertyInfo(orderHouseList, true)}
        </Card> */}

        {this.getPropertyInfo(data, true)}

        {/* 查封信息 */}
        <div className="seize-wrap">
          {this.sealRender(sealApplicationInfo, registerType)}
          {sealLogData && sealLogData.length > 0 && this.checkRender(sealLogData)}
          {unblockApplicationInfoDTO && this.logoutRender(unblockApplicationInfoDTO)}
        </div>
        {renewalApplicationInfo && this.reSealRender(renewalApplicationInfo)}
        {/* 材料信息 */}
        {!showViewer && (
          <OriginCard title="材料信息" className="pics-list-wrap">
            {this.renderPics(MaterialJson, resPicsList)}
          </OriginCard>
        )}
        {/* 操作日志 */}
        <Card title="操作日志" rowLen={1} className="forDetailTable">
          {checkLogList &&
            <TableDetail
              className="detail-table"
              scroll={{ x: 800 }}
              dataSource={checkLogList}
              columns={this.createOptInfoColumns()}
              key={Math.random()}
            />
          }
        </Card>
        {/*1 待审核*/}
        {status === 10 && fn === 'sp' && isRoot !== 1 &&
          this.renderAction(id)
        }
        <BtmBtnModal
          width={400}
          onOk={this.onOkBtmBtnModal}
          wrappedComponentRef={inst => (this.addBtmBtnModalInst = inst)}
        />
        {showHistory && this.renderHistory(sealLogData)}
      </>
    );
  }
}

export default SeizeDetail;
