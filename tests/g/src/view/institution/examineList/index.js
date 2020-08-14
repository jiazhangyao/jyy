/**
 * Created by EX-GEQIANG001 on 2019/1/17.
 */
import React from "react";
import { ListPage } from "super/page";
import { inject, observer } from "mobx-react";
import { moduleName } from "./store";
import Table from "mt-table";
import { LinkButton, SearchInput, SelectFromDict } from "components";
import history from "utils/history";
import { organizationType, auditStatusDesc, examineStatuses } from "common/enum";
const { Column } = Table;

@inject(stores => ({
    store: stores[moduleName],
    userInfo: stores.frame.userInfo
}))
@observer
class ExamineList extends ListPage {
    orderNoRender = (value, item) => {
        const { socialCredit } = item;
        return <LinkButton to={`/institution/examine/detail?socialCredit=${socialCredit}`}>{value}</LinkButton>;
    };

    actionRender = (value, item) => {
        const { socialCredit } = item;
        return <LinkButton to={`/institution/examine/detail?socialCredit=${socialCredit}`}>审核</LinkButton>;
    };

    btnFn = () => {
        history.push("/order/statistic/list");
    };

    /** 筛选栏 */
    filterRender = () => {
        return (
            <>
                <SearchInput
                    id="keyword"
                    placeholder="请输入机构名称/法人姓名/统一社会信用代码"
                    onClick={this.doFormSubmit}
                    width={350}
                />
                <SelectFromDict
                    id="type"
                    placeholder="机构类型"
                    width={104}
                    dictKey="registerTypeForTax"
                    initialValue={undefined}
                    options={organizationType}
                />
                <SelectFromDict
                    activeType="done"
                    id="certificateStatus"
                    placeholder="审核状态"
                    width={104}
                    dictKey="registerTypeForTax"
                    initialValue={undefined}
                    options={examineStatuses}
                />
            </>
        );
    };
    commonRender = val => <span>{val || "--"}</span>

    tableRender = () => {
        const { store: { activedTabKey }, } = this.props;
        return (
            <Table scroll={{ x: 1500 }}>
                <Column dataIndex="socialCredit" render={this.orderNoRender} width={activedTabKey === "todo" ? 200 : 250} fixed="left">
                    统一社会信用代码
                </Column>
                <Column dataIndex="name" width={activedTabKey === "todo" ? 400 : 450}>机构名称</Column>
                <Column dataIndex="legalPerson" width={activedTabKey === "todo" ? 250 : 300} render={this.commonRender}>法人姓名</Column>
                <Column dataIndex="type" width={activedTabKey === "todo" ? 300 : 350} render={this.renderOrganizationType}>机构类型</Column>
                <Column dataIndex="auditStatus" width={activedTabKey === "todo" ? 200 : 250} render={this.renderAuditStatus}>审核状态</Column>
                <Column dataIndex="action" width={150} activeType="todo" render={this.actionRender} fixed="right">操作</Column>
            </Table>
        );
    };

    renderOrganizationType = (value) => {
        return <span>{organizationType[value]}</span>
    };
    renderAuditStatus = (value) => {
        return <span>{auditStatusDesc[value]}</span>
    };

}

export default ExamineList;