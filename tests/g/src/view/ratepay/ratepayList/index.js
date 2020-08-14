/**
 * Created by EX-GEQIANG001 on 2019/1/17.
 */
import React from "react";
import { Button } from "antd";
import { ListPage } from "super/page";
import { inject, observer } from "mobx-react";
import { moduleName } from "./store";
import Table from "mt-table";
import { Modal } from "antd";
import { LinkButton, SearchInput, SelectFromDict, SubDate } from "components";
import IncomeModel from "./components/incomeModel";
import history from "utils/history";
const { Column } = Table;
const { confirm } = Modal;

@inject(stores => ({
  store: stores[moduleName],
  userInfo: stores.frame.userInfo
}))
@observer
class RatepayList extends ListPage {
  orderNoRender = (value, item) => {
    const { id } = item;
    return (
      <LinkButton to={`/ratepay/view/detail?id=${id}`}>{value}</LinkButton>
    );
  };
  onPassOk = () => {
    const { store } = this.props;
    store.getData();
  };
  onPassClick = id => {
    const { store: { sureRatepay } } = this.props;
    confirm({
      iconType: 'none',
      content: '确认该工单已支付税费？',
      width: 400,
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        sureRatepay(id)
      }
    });
  };
  actionRender = (value, item) => {
    const { id, registerType, isTaxed } = item;
    const {
      userInfo: { isRoot }
    } = this.props;
    let action = <Button style={{ paddingLeft: "0px" }} type="primary" onClick={this.onPassClick.bind(this, id)}>确认支付</Button>;
    if (isRoot) {
      action = <span>--</span>
    }

    if (isTaxed !== 0) {
      action = <IncomeModel id={id} key={id} registerType={registerType} />;
    }
    return <div>{action}</div>;
  };

  btnFn = () => {
    history.push("/order/statistic/list");
  };

  /** 筛选栏 */
  filterRender = () => {
    return (
      <>
        <SearchInput
          id="queryString"
          placeholder="请输入工单编号/申请人/申请人所属机构/不动产坐落/权证/证明号"
          onClick={this.doFormSubmit}
          width={250}
        />
        <SelectFromDict
          id="registerType"
          placeholder="登记类别"
          width={104}
          dictKey="registerTypeForTax"
          initialValue={undefined}
        />
        <SelectFromDict
          id="isTaxed"
          placeholder="工单状态"
          width={104}
          dictKey="workorderStatus"
          initialValue={undefined}
        />
        <SubDate label="提交时间" id="dateInfo" colon={false} />
      </>
    );
  };

  tableRender = () => {
    return (
      <Table scroll={{ x: 1500 }}>
        <Column dataIndex="orderNo" render={this.orderNoRender} width={130} fixed="left">
          工单编号
        </Column>
        <Column dataIndex="registerTypeDesc" width={200}>
          登记类别
        </Column>
        <Column dataIndex="address" width={200}>
          不动产坐落
        </Column>
        <Column dataIndex="warrantNumbers" width={130}>
          权证/证明号
        </Column>
        <Column dataIndex="obligors" width={100}>
          义务人
        </Column>
        <Column dataIndex="obligees" width={100}>
          权利人
        </Column>
        <Column dataIndex="followerName" width={90}>
          申请人
        </Column>
        <Column dataIndex="companyName" width={150}>
          申请人所属机构
        </Column>
        <Column dataIndex="submitTime" width={200}>
          提交时间
        </Column>
        <Column dataIndex="taxDesc" width={80}>
          状态
        </Column>
        <Column dataIndex="action" width={90} render={this.actionRender} fixed="right">
          操作
        </Column>
      </Table>
    );
  };
}

export default RatepayList;
