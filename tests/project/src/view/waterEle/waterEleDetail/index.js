import React from "react";
import { DetailPage } from "super/page";
import { inject, observer } from "mobx-react";
import { moduleName } from "./store";
import Card from "mt-card";
import GalleryModel from "./components/imgModal";
import BtmBtnModal from "./components/btmBtnModal";
import { getAsyncModalInst } from "components/asyncModal";
import history from "utils/history";
import { DetailField, TableDetail, Button } from "components";
import { OrderStatus } from "./enum";
import "./style.less";
const { PrimaryButton, DangerButton, BorderButton } = Button;
let imgType = {
  "3": require("./img/water.jpg"), //自来水
  "4": require("./img/gas.jpg"), //燃气
  "5": require("./img/electric.jpg") //居民用电
};
@inject(stores => ({
  store: stores[moduleName]
}))
@observer
class WaterEleDetail extends DetailPage {
  getContractImgFun = type => {
    getAsyncModalInst(this.addGalleryModalInst).open({
      src: imgType[type] || imgType["3"]
    });
  };

  onBtmBtnClick = (id, transferStatus) => {
    getAsyncModalInst(this.addBtmBtnModalInst).open({ id, transferStatus });
  };

  renderAction = id => {
    return (
      <div className="water-ele-btmntn">
        <PrimaryButton onClick={this.onBtmBtnClick.bind(this, id, 2)}>
          通过
        </PrimaryButton>
        <DangerButton onClick={this.onBtmBtnClick.bind(this, id, 3)}>
          驳回
        </DangerButton>
      </div>
    );
  };

  onOkBtmBtnModal = () => {
    history.push("/utilities/waterele/list");
  };

  getLogInfo = dataList => {
    const columns = [
      {
        title: "时间",
        dataIndex: "updateTime",
        key: "updateTime",
        width: 180
      },
      {
        title: "操作人",
        dataIndex: "operator",
        key: "operator",
        width: 180
      },
      {
        title: "操作",
        dataIndex: "transferStatus",
        key: "transferStatus",
        width: 180
      },
      {
        title: "备注",
        dataIndex: "rejectReason",
        key: "rejectReason",
        width: 180
      }
    ];
    return dataList && dataList.length ? (
      <TableDetail
        className="detail-table"
        dataSource={dataList}
        columns={columns}
        key={Math.random()}
        scroll={{ x: 1200 }}
      />
    ) : (
        ""
      );
  };

  doRender() {
    let {
      store: { data }
    } = this.props;
    let {
      transferAccountInfo = {},
      transferOrderInfo = {},
      transferOrderLog = [],
      transferProperty = {},
      id
    } = data;
    return (
      <>
        <Card title="工单信息">
          <DetailField label="工单编号">
            {transferOrderInfo["orderNo"]}
          </DetailField>
          <DetailField label="工单状态">
            {transferOrderInfo["transferStatusDesc"]}
          </DetailField>
          <DetailField label="经办人">{transferOrderInfo["agent"]}</DetailField>
          <DetailField label="提交时间">
            {transferOrderInfo["createTime"]}
          </DetailField>
        </Card>
        <Card title="账户信息">
          <DetailField label="过户类型">
            {transferAccountInfo["transferTypeDesc"]}
          </DetailField>
          <DetailField label="账户">
            {transferAccountInfo["account"]}
          </DetailField>
          <DetailField label="新户主姓名">
            {transferAccountInfo["newHouseholderName"]}
          </DetailField>
        </Card>
        <Card title="产权信息">
          <DetailField label="不动产权证号">
            {transferProperty["warrantNumber"]}
          </DetailField>
          <DetailField label="权利人">
            {transferProperty["obligeeName"]}
          </DetailField>
          <DetailField label="房屋坐落">
            {transferProperty["location"]}
          </DetailField>
        </Card>
        <Card title="个人签名" rowLen={1}>
          <BorderButton
            onClick={this.getContractImgFun.bind(
              this,
              transferAccountInfo["transferType"]
            )}
          >
            查看签名合同
          </BorderButton>
        </Card>
        <Card title="审核日志" rowLen={1} className="forDetailTable">
          {this.getLogInfo(transferOrderLog)}
        </Card>
        {/*1 待审核*/}
        {transferOrderInfo.transferStatus == OrderStatus.getValueFromAlias("TO_BE_AUDITED") &&
          this.renderAction(id)
        }
        <GalleryModel ref={inst => (this.addGalleryModalInst = inst)} />
        <BtmBtnModal
          width={400}
          onOk={this.onOkBtmBtnModal}
          wrappedComponentRef={inst => (this.addBtmBtnModalInst = inst)}
        />
      </>
    );
  }
}

export default WaterEleDetail;
