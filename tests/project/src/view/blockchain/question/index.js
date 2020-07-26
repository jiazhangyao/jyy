import React from 'react';
import { DetailPage } from "super/page";
import { inject, observer } from "mobx-react";
import { moduleName } from "./store";
import { Card } from 'antd';
import Intro from './components/intro';
import Rowlist from './components/rowlist';
import Question from './components/question';
import sceneImg1 from './img/scene_img_01@2x.png';
import sceneImg2 from './img/scene_img_02@2x.png';
import advImg1 from './img/advantage_img_01@2x.png';
import advImg2 from './img/advantage_img_02@2x.png';
import advImg3 from './img/advantage_img_03@2x.png';
import './style.less';
const quesPrefix = "block-chain-question";
const sceneData = [{
  key: '0',
  title: '数据存证与共享',
  content: '区块链技术应用于房产交易、登记、缴税等环节，其分布式账本与加密技术为数据存证提供稳定、防篡改、易于共享的基础，提升数据安全性、信息透明度与业务运转效率。',
  imgSrc: sceneImg1
},
{
  key: '1',
  title: '不动产单元全生命周期管理',
  content: '基于区块链的电子数据可更好地被利用在不动产资源全流程管理中，确保产权交易变更历史的可追溯性及数据安全性，一键查看不动产单元的前世今生。',
  imgSrc: sceneImg2
}];

const advData = [
  {
    key: '0',
    title: '数据安全',
    content: '区块链上的数据更为安全，不容易受恶意攻击和篡改。',
    imgSrc: advImg1
  },
  {
    key: '1',
    title: '信息一致',
    content: '多个节点同步进行数据记录并达成共识，保证数据的一致性。',
    imgSrc: advImg2
  },
  {
    key: '2',
    title: '稳定易扩展',
    content: '分布式架构降低单点数据存储损坏的风险，且更易于扩展。',
    imgSrc: advImg3
  }
];

const questionData = [{
  key: '0',
  Q: '区块链是什么？',
  A: '区块链是一种由多方共同维护，以块链结构存储数据，使用密码学保证传输和访问安全，能够实现数据一致存储、无法篡改、无法抵赖的技术体系。'
},
{
  key: '1',
  Q: '区块链技术有哪些优势？',
  A: [
    '区块链不是一个单项的技术，而是一个集成了多方面研究成果基础之上的综合性技术系统。其中有三项必不可缺的核心技术，分别是：共识机制、密码学原理和分布式数据存储。',
    '（1）共识机制：所谓共识，是指多方参与的节点在预设规则下，通过多个节点交互对某些数据、行为或流程达成一致的过程。共识机制指定义的共识过程的规则。数据的记录或更改需要多方参与共识，并记录共识过程，记录只可新增不可修改，保证所有的数据记录合规有效。',
    '（2）密码学原理：在区块链中，信息的传播按照公钥、私钥这种非对称数字加密技术实现交易双方的互相信任。因此，只有拥有秘钥的合法用户才可以访问数据，确保了数据的安全性。',
    '（3）分布式存储：是指区块链中参与的节点各自都有独立的、完整的数据存储。不仅可保证共识机制的有效执行，还可提高系统的整体容灾能力。'
  ]
},
{
  key: '2',
  Q: '区块链技术主要可以用在哪些行业?',
  A: '区块链的主要优势是无中介参与、过程高效透明安全、大大减少人工运营成本与出错率、提升业务效率。因此有这方面需求的行业，包括房屋交易等传统强中介的业务都可以使用区块链技术。'
},
{
  key: '3',
  Q: '区块链平台如何保证系统稳定性?',
  A: '平安在超级账本（Hyperledger）基础上提供金融级区块链应用搭建服务的基础设施平台。其中平台的所有节点部署在金融级机房环境中，并提供不同的等级（本地/异地）的灾备配置，保证区块链网络的稳定运行。'
},
{
  key: '4',
  Q: '区块链对用户的影响有哪些？',
  A: '区块链的方案优势体现在其底层架构的能力上，对实际用户的使用感知透明，不会增加用户使用学习的成本。而商户可在可视化界面中实时监控区块链网络状态、节点状态、区块数据、交易数据等，全面了解区块链的运行情况。'
}];
@inject(stores => ({
  store: stores[moduleName],
}))
@observer
class BlockQuestion extends DetailPage {

  doRender() {
    return (
      <div className={quesPrefix}>
        <Card bordered={false}>
          <Card className="ant-card-detail" title="应用场景" bordered={false}>
            {sceneData.length > 0 && <Intro data={sceneData} />}
          </Card>
          <Card className="ant-card-detail ant-card-padding" title="优势" bordered={false}>
            {advData.length > 0 && <Rowlist data={advData} />}
          </Card>
          <Card className="ant-card-detail" title="常见问题" bordered={false}>
            {questionData.length > 0 && <Question data={questionData} />}
          </Card>
        </Card>
      </div>
    );
  }
}
export default BlockQuestion
