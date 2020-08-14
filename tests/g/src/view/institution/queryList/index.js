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
import { organizationType } from "common/enum";
const { Column } = Table;

@inject(stores => ({
    store: stores[moduleName],
    userInfo: stores.frame.userInfo
}))
@observer
class QueryList extends ListPage {
    orderNoRender = (value, item) => {
        const { socialCredit } = item;
        return (
            <LinkButton to={`/institution/query/detail?socialCredit=${socialCredit}`}>{value}</LinkButton>
        );
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
                    dictKey="organizationType"
                    initialValue={undefined}
                    options={organizationType}
                />
            </>
        );
    };
    commonRender = val => <span>{val || "--"}</span>

    tableRender = () => {
        return (
            <Table scroll={{ x: 800 }}>
                <Column dataIndex="socialCredit" render={this.orderNoRender} width={70}>
                    统一社会信用代码
                </Column>
                <Column dataIndex="name" width={100}>机构名称</Column>
                <Column dataIndex="legalPerson" width={100} render={this.commonRender}>法人姓名</Column>
                <Column dataIndex="type" width={100} render={this.renderTypeStatus}>机构类型</Column>
            </Table>
        );
    };

    renderTypeStatus = (value) => {
        return <span>{organizationType[value]}</span>
    }
}

export default QueryList;