import React from "react";
import { ListPage } from "super/page";
import { inject, observer } from "mobx-react";
import { moduleName } from "./store";
import { LinkButton, SelectFromDict, SearchInput, Button } from "components";
import ExpandedTable from "./components/expandedtable";
import createForm from "utils/createForm";
import "./style.less";
const { PrimaryButton } = Button;
const LedgerList = {
  gtj: "国土部门账本",
  zjj: "住建部门账本",
  public: "公共账本"
};
let QueryParams = {
  bdcdyh: "不动产单元号",
  fwcqh: "不动产权证号",
  ywjyh: "工单编号",
  tradeid: "区块链交易ID"
};

@inject(stores => ({
  store: stores[moduleName]
}))
@createForm({ clsPrefix: "block-search-page" })
@observer
class BlockSearchList extends ListPage {
  updateShowField = values => {
    let {
      store: { updateShowField }
    } = this.props;
    if (updateShowField) {
      updateShowField(values);
    }
  };

  //账本类型改变
  onLedgerListChange = () => {
    let {
      form: { setFieldsValue, getFieldValue },
    } = this.listSearchForm.props;
    const ledgerType = getFieldValue("ledgerType");
    QueryParams = ledgerType === "zjj" ?
      {
        bdcdyh: "不动产单元号",
        fwcqh: "不动产权证号",
        tradeid: "区块链交易ID"
      } : {
        bdcdyh: "不动产单元号",
        fwcqh: "不动产权证号",
        ywjyh: "工单编号",
        tradeid: "区块链交易ID"
      }
    setFieldsValue({
      paramType: undefined,
      paramValues: undefined
    });
    this.updateShowField({ showInputField: false, btnDisabled: true });
  };

  //查询参数改变
  onParamTypeChange = value => {
    const {
      form: { setFieldsValue, getFieldValue }
    } = this.listSearchForm.props;
    const ledgerType = getFieldValue("paramType");
    setFieldsValue({
      paramValues: undefined
    });
    this.updateShowField({
      ledgerType,
      showInputField: true,
      btnDisabled: true
    });
  };

  onParamValuesChange = () => {
    this.updateShowField({ btnDisabled: false });
  };

  filterRender = () => {
    let {
      store: { updateFieldStatus }
    } = this.props;
    const { showInputField, btnDisabled, showInputLabel } = updateFieldStatus;
    return (
      <div>
        <SelectFromDict
          label="账本类型"
          id="ledgerType"
          initialValue="gtj"
          width={240}
          options={LedgerList}
          withNoLimit={false}
          placeholder="请选择"
          onSelectChange={this.onLedgerListChange}
        />
        <SelectFromDict
          label="查询参数"
          id="paramType"
          width={240}
          withNoLimit={false}
          placeholder="请选择"
          options={QueryParams}
          onSelectChange={this.onParamTypeChange}
        />
        <SearchInput
          label={showInputField ? showInputLabel : ""}
          showInput={showInputField}
          buttonShow={false}
          id="paramValues"
          width={240}
          placeholder="请输入"
          onChange={this.onParamValuesChange}
        />
        <div unfield className="button">
          <PrimaryButton disabled={btnDisabled} onClick={this.doFormSubmit} size="large">
            查询
          </PrimaryButton>
        </div>
      </div>
    );
  };

  clearButton = isSerarch => {
    return (
      <Button unfield className={`button-reset-none`}>
        重置
      </Button>
    );
  };

  createExpandedRow = (records = []) => {
    let {
      store: { entity }
    } = this.props;
    const columns = [
      {
        title: "序号",
        dataIndex: "antOrderNumber",
        width: 50,
        key: "antOrderNumber",
        render: () => 1
      },
      { title: "交易哈希", dataIndex: "tradeId", key: "tradeId", width: 500 },
      {
        title: "记账类型",
        dataIndex: "accountType",
        key: "accountType",
        width: 100
      },
      {
        title: "交易时间",
        dataIndex: "blockInfo.blockTime",
        key: "blockInfo.blockTime",
        width: 150
      },
      {
        title: "操作",
        dataIndex: "setting",
        key: "setting",
        render: (text, item) => (
          <LinkButton
            to={`/blockchain/infosearch/detail?paramValues=${
              entity.paramValues
              }&ledgerType=${entity.ledgerType}&paramType=${
              entity.paramType
              }&tradeId=${item.tradeId}`}
          >
            查看详情
          </LinkButton>
        )
      }
    ];

    const listProps = {
      dataSource: [records],
      pagination: false,
      columns
    };
    return <ExpandedTable {...listProps} />;
  };

  getTableProps = tableProps => {
    const {
      store: { data }
    } = this.props;
    const columns = [
      {
        title: "序号",
        dataIndex: "antOrderNumber",
        key: "antOrderNumber",
        width: 50
      },
      {
        title: "区块哈希",
        dataIndex: "blockInfo.blockAddress",
        key: "blockInfo.blockAddress",
        width: 760
      },
      { title: "出块时间", dataIndex: "tradeTime", key: "tradeTime" }
    ];
    const result = {
      ...tableProps,
      className: "blockchain-table",
      dataSource: data,
      pagination: false,
      expandedRowRender: record => this.createExpandedRow(record),
      columns,
      rowKey: "tradeId",
      defaultExpandAllRows: true,
      bordered: false
    };
    return result;
  };

  tableRenderHook = () => {
    let tableProps = this.getTableProps();
    return tableProps.dataSource.length ? (
      <ExpandedTable {...tableProps} />
    ) : (
        <div />
      );
  };
}

export default BlockSearchList;
