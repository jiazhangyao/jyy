import React from "react";
import { DetailPage } from "super/page";
import { inject, observer } from "mobx-react";
import { moduleName } from "./store";
import { Row, Col } from "antd";
import Card from "mt-card";
const { SubTitle, SingleRow } = Card;

@inject(stores => ({
  store: stores[moduleName],
  userInfo: stores.frame.userInfo
}))
@observer
class UserDetail extends DetailPage {
  doRender() {
    return (
      <>
        <Card title="工单信息">
          <div>工单号：12321342</div>
          <div>发布人：张小三</div>
          <div>处理人：-</div>
          <div>提交时间：2018-05-01 15:30:28</div>
          <div>楼盘编号：xxxxxxx</div>
        </Card>
        <Card title="楼盘信息">
          <SubTitle>基本信息</SubTitle>
          <div>楼盘类型：住宅</div>
          <div>楼盘名称：中海锦城</div>
          <div>区域：上海-浦东新区-张江</div>
          <div>项目地址：简上路和腾龙路交叉口</div>
          <div>开发商：万科房产</div>
          <div>售楼处电话：021-666811</div>
          <div>产权年限：70年</div>
          <div>物业公司：万科物业</div>
          <div>物业公司电话：021-666811</div>
          <SingleRow>
            <div>物业公司电话：021-666811</div>
          </SingleRow>
          <SubTitle>销售信息</SubTitle>
          <div>物业费：17元/m²/年</div>
          <div>绿化率：33%</div>
          <div>房屋结构：板式结构</div>
          <div>装修：精装修</div>
          <SubTitle>销售信息</SubTitle>
          <div>售价：280~320万元</div>
          <div>最近开盘时间：2018-10-18</div>
          <div>交房时间：2019-06-10</div>
          <SubTitle>其他信息</SubTitle>
          <div>工程进度：建设中</div>
          <div>占地面积：4800m²</div>
          <div>规划户数：320户</div>
          <div>车位规划：120个(地上)，200个(地下)</div>
          <div>预售证号：昆山YU-58445号</div>
          <div>绑定楼栋：1栋，2栋</div>
          <div>水电供给方式：民用</div>
        </Card>
      </>
    );
  }
}

export default UserDetail;
