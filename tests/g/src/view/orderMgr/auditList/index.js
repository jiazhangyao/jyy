import React from "react";
import { Modal } from "antd";
import { ListPage } from "super/page";
import { inject, observer } from "mobx-react";
import Table from "mt-table";
import { LinkButton, SearchInput, SelectFromDict, SubDate } from "components";

/** 弹窗表单 */
import LicenseModal from "./components/licenseModal";
import LicenseUser from "./components/licenseUser";
import { getAsyncModalInst } from 'components/asyncModal';

import { moduleName } from "./store";
import "./style.less";

const { Column } = Table;

@inject(stores => ({
  store: stores[moduleName],
  userInfo: stores.frame.userInfo
}))
@observer
class AuditList extends ListPage {
  constructor(props) {
    super(props);
    this.transferRegisterType = [5010, 5020, 5030];// 转移登记的类型
  }
  /** 筛选栏 */
  filterRender = () => {
    const { orderStatusDict } = this.props.store;
    return (
      <>
        <SearchInput
          id="queryString"
          width={250}
          placeholder="请输入工单编号/申请人/不动产坐落/权证/证明号"
          onClick={this.doFormSubmit}
        />
        <SelectFromDict
          id="registerPrimaryType"
          width={104}
          placeholder="登记类型"
          dictKey="registerPrimaryTypeList"
          onChange={this.onRigisterTypeChange}
        />
        <SelectFromDict
          id="status"
          width={104}
          placeholder="工单状态"
          options={orderStatusDict}
        />
        <SubDate label="提交时间" id="dateInfo" colon={false} />
      </>
    );
  };
  onRigisterTypeChange = (value) => {
    const { changeRegisterPrimaryType } = this.props.store;
    this.listSearchForm.props.form.setFieldsValue({ 'status': undefined });
    changeRegisterPrimaryType(value)
  }
  addColor = (value) => {
    return value === "非税预审驳回" ? (<div style={{ color: "red" }}>{value}</div>) : value
  }
  /** 列表 */
  tableRender = () => {
    return (
      <Table scroll={{ x: 1500 }}>
        <Column dataIndex="orderNo" render={this.renderOrderNo} width={150} fixed="left">
          工单编号
        </Column>
        <Column dataIndex="registerTypeDesc" width={150}>登记类别</Column>
        <Column dataIndex="address" width={200}>不动产坐落</Column>
        <Column dataIndex="warrantNumbers" width={200}>权证/证明号</Column>
        <Column dataIndex="obligors" width={100}>义务人</Column>
        <Column dataIndex="obligees" width={100}>权利人</Column>
        <Column dataIndex="followerName" width={100}>申请人</Column>
        <Column dataIndex="submitTime" width={150}>提交时间</Column>
        <Column render={this.renderstatusDesc} dataIndex="statusDesc" width={100}>状态</Column>
        <Column
          // activeType="todo"
          render={this.renderOpt}
          width={100}
          fixed="right"
        >
          操作
        </Column>
      </Table>
    );
  };
  renderOrderNo = (value, item) => {
    const { activedTabKey } = this.props.store;
    if (this.transferRegisterType.indexOf(item.registerType) >= 0) {
      return <LinkButton to={`/order/transfer/detail?id=${item.id}&fn=audit&activedTabKey=${activedTabKey}`}>{value}</LinkButton>;
    } else if (item.registerPrimaryType == 30) {
      return <LinkButton to={`/order/mortgage/detail?id=${item.id}&fn=audit&activedTabKey=${activedTabKey}`}>{value}</LinkButton>;
    } else {
      return <LinkButton to={`/order/audit/detail?id=${item.id}&fn=audit`}>{value}</LinkButton>;
    }
  };

  renderstatusDesc = (value, item) => {
    return value === '复审失败' ? '已终止' : (value === "非税预审驳回" ? (<div style={{ color: "red" }}>{value}</div>) : value);
  }

  renderOpt = (value, item) => {
    const {
      userInfo: { isRoot },
      store: { activedTabKey }
    } = this.props;

    /** 1-管理员 2-非管理员 */
    if (isRoot === 1) {
      // admin 不可操作
      return (
        item.status < 35 ?
          <span>--</span> :
          (item.status == 35 || item.status == 40) && item.certificateNumber !== "-" ?
            <>
              {/* 抵押业务工单，工单列表无需“查看电子证照”按钮 */}
              {item.registerPrimaryType != 30 && <span className="list-opt-btn" onClick={this.onLicenseClick.bind(this, item)}>查看电子证照</span>}
              <LicenseModal wrappedComponentRef={inst => (this.licenseModalInst = inst)} />
              <LicenseUser wrappedComponentRef={inst => (this.licenseUserModalInst = inst)} />
            </> :
            <span>--</span>
      );
    } else {
      if (activedTabKey === "todo") {
        if ((item.status == 35 || item.status == 40) && item.certificateNumber !== "-") {
          return <>
            <LinkButton to={`/order/audit/detail?id=${item.id}&fn=audit`}>审核</LinkButton>
            {item.registerPrimaryType != 30 && <span className="list-opt-btn" onClick={this.onLicenseClick.bind(this, item)}>查看电子证照</span>}
            <LicenseModal wrappedComponentRef={inst => (this.licenseModalInst = inst)} />
            <LicenseUser wrappedComponentRef={inst => (this.licenseUserModalInst = inst)} />
          </>;
        }
        if (item.registerType && this.transferRegisterType.indexOf(item.registerType) >= 0) {
          return <>
            <LinkButton to={`/order/transfer/detail?id=${item.id}&fn=audit&activedTabKey=${activedTabKey}`}>审核</LinkButton>
          </>;
        }
        if (item.registerPrimaryType == 30) {
          return <>
            <LinkButton to={`/order/mortgage/detail?id=${item.id}&fn=audit&activedTabKey=${activedTabKey}`}>审核</LinkButton>
          </>;
        }
        return <>
          <LinkButton to={`/order/audit/detail?id=${item.id}&fn=audit`}>审核</LinkButton>
        </>;
      } else {
        if ((item.status == 35 || item.status == 40) && item.certificateNumber !== "-") {
          return <>
            {item.registerPrimaryType != 30 && <span className="list-opt-btn" onClick={this.onLicenseClick.bind(this, item)}>查看电子证照</span>}
            <LicenseModal wrappedComponentRef={inst => (this.licenseModalInst = inst)} />
            <LicenseUser wrappedComponentRef={inst => (this.licenseUserModalInst = inst)} />
          </>;
        }
        return <span>--</span>
      }
    }
  };

  /** 终止工单弹窗 */
  onStopOrderClick = orderId => {
    Modal.confirm({
      iconType: "none",
      content: "确认终止该工单？",
      width: 400,
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        getAsyncModalInst(this.endOrderModalInst).open({ orderId })
      }
    })
  };

  /** 查看电子证照弹窗 */
  onLicenseClick = item => {
    const {
      store: {
        queryLicenseUser
      }
    } = this.props;

    queryLicenseUser(item, getAsyncModalInst(this.licenseModalInst), getAsyncModalInst(this.licenseUserModalInst));
  };

  /** 刷新列表 */
  refreshList = () => {
    const { store: { getData } } = this.props;
    getData();
  }
}

export default AuditList;
