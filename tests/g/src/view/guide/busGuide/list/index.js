import React from "react";
import { ListPage } from "super/page";
import { inject, observer } from "mobx-react";
import { moduleName } from "./store";
import Table from "mt-table";
import SearchInput from "components/searchInput";
import SelectFromDict from "components/selectFromDict";
import { LinkButton, SubDate, Button } from "components";
import history from "utils/history";
import CommonButton from "../commonButton";
const { PrimaryButton } = Button;
const { Column } = Table;

@inject(stores => ({
  store: stores[moduleName]
}))
@observer
class BusGuideList extends ListPage {
  orderNoRender = (value, item) => {
    const { id } = item;
    return (
      <LinkButton to={`/guide/busguide/detail?id=${id}`}>{value}</LinkButton>
    );
  };

  topActionRender = () => {
    return (
      <>
        <PrimaryButton onClick={this.btnFn}>添加办事指南</PrimaryButton>
      </>
    );
  };

  btnFn = () => {
    history.push("/guide/busguide/add");
  };

  /** 筛选栏 */
  filterRender = () => {
    return (
      <>
        <SearchInput
          id="queryString"
          placeholder="请输入序号/标题/发布人"
          onClick={this.doFormSubmit}
          width={240}
        />
        <SelectFromDict
          id="releaseStatus"
          placeholder="发布状态"
          width={104}
          dictKey="releaseStatus"
        />
        <SubDate label="发布时间" id="dateInfo" colon={false} />
      </>
    );
  };
  actionRender = (value, item) => {
    const { id, releaseStatus } = item;
    return <CommonButton id={id} releaseStatus={releaseStatus} />;
  };
  tableRender = () => {
    return (
      <Table scroll={{ x: 1500 }}>
        <Column dataIndex="id" render={this.orderNoRender} width={250} fixed="left">
          序号
        </Column>
        <Column dataIndex="title" width={300}>
          标题
        </Column>
        <Column dataIndex="releaseStatusName" width={200}>
          发布状态
        </Column>
        <Column dataIndex="createByName" width={250}>
          发布人
        </Column>
        <Column dataIndex="createTime" width={250}>
          发布时间
        </Column>
        <Column dataIndex="action" width={250} render={this.actionRender}>
          操作
        </Column>
      </Table>
    );
  };
}

export default BusGuideList;
