import React from "react";
import { DetailPage } from "super/page";
import { inject, observer } from "mobx-react";
import { moduleName } from "./store";
import Card from "mt-card";
import { Button } from "antd";
import { DetailField } from "components";
const { SubTitle, SingleRow, SubCard } = Card;

@inject(stores => ({
  store: stores[moduleName],
  userInfo: stores.frame.userInfo
}))
@observer
class Detail extends DetailPage {
  topActionRender = () => {
    return (
      <>
        <Button type="primary" onClick={this.btnFn}>
          创建
        </Button>
        <Button activeType="done" type="danger" onClick={this.btnFn}>
          删除
        </Button>
        <Button activeType="todo" type="primary" onClick={this.btnFn}>
          编辑
        </Button>
      </>
    );
  };
  doRender() {
    return (
      <>
        <Card title="较为复杂的布局">
          <SingleRow rowLen={2} spans={[16, 8]}>
            <SubCard rowLen={2}>
              <SubTitle>基本信息</SubTitle>
              <DetailField label="楼盘类型">住宅</DetailField>
              <DetailField label="建筑类型">xx</DetailField>
              <DetailField label="楼盘名称">中海锦城</DetailField>
              <DetailField label="区域">上海-浦东新区-张江</DetailField>
              <DetailField label="建筑项目地址">
                简上路和腾龙路交叉口类型
              </DetailField>
              <DetailField label="售楼处地址">建业路221号</DetailField>
              <DetailField label="开发商">万科房产</DetailField>
              <DetailField label="售楼处电话">021-666811</DetailField>
              <DetailField label="产权年限">70年</DetailField>
              <DetailField label="物业公司">万科物业</DetailField>
              <DetailField label="物业费">17元/m²/年</DetailField>
              <DetailField label="绿化率">33%</DetailField>
              <DetailField label="房屋结构">板式结构</DetailField>
              <DetailField label="装修">精装修</DetailField>
            </SubCard>
            <div>
              <img
                height="264px"
                width="100%"
                src={require("./right.jpg")}
                alt="right"
              />
            </div>
          </SingleRow>
        </Card>
        <Card title="三列布局">
          <DetailField label="工单号">
            <span style={{ color: "red" }}>12321342</span>
          </DetailField>
          <DetailField label="发布人">张小三</DetailField>
          <DetailField label="处理人">张小三</DetailField>
          <DetailField label="提交时间" semicolon={false}>
            2018-05-01 15:30:28
          </DetailField>
        </Card>
        <Card title="三列布局，其中第三列弃用" disables={[2]}>
          <DetailField label="工单号">
            <span style={{ color: "red" }}>12321342</span>
          </DetailField>
          <DetailField label="发布人">张小三</DetailField>
          <DetailField label="处理人">张小三</DetailField>
          <DetailField label="提交时间" semicolon={false}>
            2018-05-01 15:30:28
          </DetailField>
        </Card>
        <Card title="楼盘信息" disables={[1]}>
          <SubTitle>基本信息</SubTitle>
          <DetailField label="工单号">12321342</DetailField>
          <SubTitle>基本信息</SubTitle>
          <DetailField label="发布人">张小三</DetailField>
          <DetailField label="处理人">张小三</DetailField>
          <SubTitle>基本信息</SubTitle>
          <DetailField label="提交时间">2018-05-01 15:30:28</DetailField>
          <DetailField label="楼盘编号">xxxxxxx</DetailField>
          <DetailField label="楼盘编号">xxxxxxx</DetailField>
          <SubTitle>基本信息</SubTitle>
          <DetailField label="提交时间">2018-05-01 15:30:28</DetailField>
          <SingleRow>
            <DetailField label="物业公司电话">021-666811</DetailField>
          </SingleRow>
          <SubTitle>销售信息</SubTitle>
          <DetailField label="工单号">12321342</DetailField>
          <DetailField label="发布人">张小三</DetailField>
          <DetailField label="处理人">张小三</DetailField>
          <DetailField label="提交时间">2018-05-01 15:30:28</DetailField>
          <DetailField label="楼盘编号">xxxxxxx</DetailField>
        </Card>
        <p>ps: disables={[0]}有bug</p>
      </>
    );
  }
}

export default Detail;
