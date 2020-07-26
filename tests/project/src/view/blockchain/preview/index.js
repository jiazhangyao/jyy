import React from "react";
import { DetailPage } from "super/page";
import { inject, observer } from "mobx-react";
import { moduleName } from "./store";
import { Col, Row, Select } from "antd";
import InfoChart from "./components/infochart";
import TradingChart from "./components/tradechart";
import TreesChart from "./components/treeschart";
import CpuChart from "./components/cpuchart";
import PieChart from "./components/piechart";
import TradeTable from "./components/tradetable";
import "./index.less";
const { Option } = Select;

@inject(stores => ({
  store: stores[moduleName]
}))
@observer
class Preview extends DetailPage {
  doRender() {
    const { store } = this.props;
    const { data, changeSelect } = store;
    const {
      overviewData = [],
      tradeDataList = [],
      nodeStatusList = [],
      cpuUseList = [],
      responseTimeList = [],
      blockList = []
    } = data;
    return (
      <div className="dashBoardChart">
        <div
          style={{
            position: "absolute",
            right: "0",
            top: "-40px",
            color: "#666"
          }}
        >
          账本类型：&nbsp;&nbsp;
          <Select
            defaultValue="gtj"
            style={{ width: 110 }}
            className="dashboard-sel"
            onChange={changeSelect}
          >
            <Option value="gtj">国土部门账本</Option>
            <Option value="zjj">住建部门账本</Option>
            <Option value="public">公共账本</Option>
          </Select>
        </div>

        {overviewData && (
          <div className="chartBox">
            <InfoChart tradeGenData={overviewData} />
          </div>
        )}
        {tradeDataList && (
          <div className="chartBox">
            <TradingChart tradeDataByDate={tradeDataList} />
          </div>
        )}
        {(nodeStatusList || cpuUseList || responseTimeList) && (
          <div className="chartBox">
            <div id="infoCard">
              <Row gutter={24}>
                {nodeStatusList && (
                  <Col span="8" style={{ padding: "0 6px 0 10px" }}>
                    <TreesChart data={nodeStatusList} />
                  </Col>
                )}
                {cpuUseList && (
                  <Col span="8" style={{ padding: "0 6px" }}>
                    <CpuChart data={cpuUseList} />
                  </Col>
                )}
                {responseTimeList && (
                  <Col span="8" style={{ padding: "0 10px 0 6px" }}>
                    <PieChart data={responseTimeList} />
                  </Col>
                )}
              </Row>
            </div>
          </div>
        )}
        {blockList && (
          <div className="chartBox">
            <TradeTable data={blockList} />
          </div>
        )}
      </div>
    );
  }
}
export default Preview;
