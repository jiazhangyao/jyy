import React, { Component } from "react";
import { Tooltip, Icon } from "antd";
import "./style.less";

/** {
        "title":"提交审核",
        "time":"2018-11-03",
        "status":"0-未审核 1-处理中 2审核通过 3审核未通过",
        "type":" 1 并行 | 2 串行",
        "lineNodes":{
          "0":[
            {},{}
          ],
          "1":[
            {},{}
          ]
        }
      }
 *
 */
export default class Steps extends Component {
  constructor(props) {
    super(props);
    this.stepWidth = undefined;
    this.minStepWidth = 50;
    this.minStepsWidth = 960;
    // 宽度超过110，则描述不换行
    this.nowrapStepWidth = 110;
    this.state = {
      dom: [],
      width: 0
    };

    // 模拟数据demo
    this.data = [
      {
        title: "第一步提交审核",
        time: "2018-11-03",
        status: 2,
        type: 2
      },
      {
        title: "初审",
        time: "2018-11-03",
        status: 1,
        type: 1,
        lineNodes: {
          0: [
            {
              title: "第二部上线流程01",
              time: "2018-11-04",
              status: 2,
              type: 1
            },
            {
              title: "上线流程02",
              time: "2018-11-04",
              status: 2,
              type: 1
            },
            {
              title: "上线流程03",
              time: "2018-11-04",
              status: 2,
              type: 1
            }
          ],
          1: [
            {
              title: "下线流程01",
              time: "2018-11-04",
              status: 2,
              type: 1
            },
            {
              title: "第三步下线流程02",
              time: "2018-11-05",
              status: 2,
              type: 1
            },
            {
              title: "下线流程03",
              time: "2018-11-05",
              status: 2,
              type: 1
            }
          ]
        }
      },
      {
        title: "插入流程1",
        time: "2018-11-06",
        status: 2,
        type: 2
      },
      {
        title: "插入流程2",
        time: "2018-11-07",
        status: 2,
        type: 2
      },
      {
        title: "登记",
        time: "2018-11-07",
        status: 0,
        type: 1,
        lineNodes: {
          0: [
            {
              title: "第四步上线流程01",
              time: "2018-11-04",
              status: 3,
              type: 1
            },
            {
              title: "上线流程02",
              time: "2018-11-04",
              status: 0,
              type: 1
            },
            {
              title: "上线流程03",
              time: "2018-11-04",
              status: 0,
              type: 1
            }
          ],
          1: [
            {
              title: "下线流程01",
              time: "2018-11-04",
              status: 2,
              type: 1
            },
            {
              title: "第六步下线流程02",
              time: "2018-11-05",
              status: 1,
              type: 1
            },
            {
              title: "下线流程03",
              time: "2018-11-05",
              status: 0,
              type: 1
            }
          ]
        }
      },
      {
        title: "插入流程3",
        time: "2018-11-07",
        status: 0,
        type: 2
      },
      {
        title: "复审",
        time: "2018-11-06",
        status: 0,
        type: 2
      },
      {
        title: "登记",
        time: "2018-11-07",
        status: 0,
        type: 2
      },
      {
        title: "出证",
        time: "2018-11-08",
        status: 0,
        type: 2
      }
    ];
  }

  switchStatus = status => {
    // 当前步骤
    let current = 1;
    // 当前步骤处理状态类型
    let type = 2;
    switch (status) {
      case 5:
        current = 1;
        type = 1;
        break;
      case 10:
        current = 2;
        type = 2;
        break;
      case 15:
        current = 2;
        type = 4;
        break;
      case 20:
        current = 2;
        type = 3;
        break;
      case 30:
        current = 3;
        type = 4;
        break;
      case 31:
        current = 3;
        type = 3;
        break;
      case 35:
        current = 4;
        type = 4;
        break;
      case 40:
        current = 5;
        type = 4;
        break;
      default:
        current = 1;
        type = 2;
    }
    return { current, type };
  };

  componentWillReceiveProps(nextProps) {
    // 根据父层节点宽度自动适配节点宽度
    const stepContainer = document.querySelector(".step-container");
    if (stepContainer) {
      this.minStepsWidth = stepContainer.offsetWidth;
    }
    const dom = this.buildSteps(nextProps.processData);
    // const dom = this.buildSteps(this.data);
    this.setState({ dom });
  }

  findNodeCount = list => {
    let nodeCount = 0;
    if (list) {
      list.forEach((value, index) => {
        if (value.type == 1 && value.lineNodes) {
          const length1 = value.lineNodes[0].length;
          const length2 = value.lineNodes[1].length;
          const maxLength = length1 >= length2 ? length1 : length2;
          nodeCount += maxLength + 2;
        } else if (value.type == 2) {
          nodeCount += 1;
        }
      });
    }
    return nodeCount;
  };

  // 当前步骤状态类型(0-pass 1-tod0 2-pendding 3-rejected)
  step = (statusType, title, date) => {
    const { orderStatus } = this.props
    if (statusType === 1) {
      return (
        <Tooltip placement="top" title={title}>
          <div className="pretrial-item-title step-todo" key={Math.random(100)}>
            <i className="icon-circle icon-todo" />
            {/* <i className="iconfont icon-ic_radio_button_off"></i> */}
            <div
              className={`icon-des-text ${
                this.stepWidth > this.nowrapStepWidth
                  ? "title-nowrap"
                  : "title-show"
                }`}
            >
              {title}
            </div>
            <div>
              <span>&nbsp;</span>
            </div>
          </div>
        </Tooltip>
      );
    }
    if (statusType === 2 && orderStatus !== 25) {
      return (
        <Tooltip placement="top" title={title}>
          <div
            className="pretrial-item-title step-pendding"
            key={Math.random(100)}
          >
            <div className="icon-circle icon-pendding" />
            {/* <i className="iconfont icon-ic_radio_button_off"></i> */}
            <div
              className={`icon-des-text ${
                this.stepWidth > this.nowrapStepWidth
                  ? "title-nowrap"
                  : "title-show"
                }`}
            >
              {title}
            </div>
            <div>
              <span>&nbsp;</span>
            </div>
          </div>
        </Tooltip>
      );
    }
    if (statusType === 3 || (statusType === 2 && orderStatus === 25)) {
      console.log('lessaaaa', this.props)
      return (
        <Tooltip placement="top" title={title}>
          <div
            className="pretrial-item-title step-rejected"
            key={Math.random(100)}
          >
            {/* <div className="icon-circle icon-rejected" /> */}
            <div className={orderStatus === 25 ? "icon-circle icon-rejectedtwo" : "icon-circle icon-rejected"} />
            {/* <i className="iconfont icon-iconfont_failed_acco "></i> */}
            <div
              className={`icon-des-text ${
                this.stepWidth > this.nowrapStepWidth
                  ? "title-nowrap"
                  : "title-show"
                }`}
            >
              {title}
            </div>
            <div>{<span>&nbsp;</span>}</div>
          </div>
        </Tooltip>
      );
    }
    if (statusType === 4) {
      return (
        <Tooltip placement="top" title={title}>
          <div
            className="pretrial-item-title step-rejected"
            key={Math.random(100)}
          >
            <Icon type="close-circle icon-end" />
            <div
              className={`icon-des-text ${
                this.stepWidth > this.nowrapStepWidth
                  ? "title-nowrap"
                  : "title-show"
                }`}
            >
              {title}
            </div>
            <div>{<span>&nbsp;</span>}</div>
          </div>
        </Tooltip>
      );
    }
    return (
      <Tooltip placement="top" title={title}>
        <div
          className="pretrial-item-title step-finished"
          key={Math.random(100)}
        >
          <div className="icon-circle icon-finished" />
          {/* <i className="iconfont icon-icon_select "></i> */}
          <div
            className={`icon-des-text ${
              this.stepWidth > this.nowrapStepWidth
                ? "title-nowrap"
                : "title-show"
              }`}
          >
            {title}
          </div>
          <div>{<span>&nbsp;</span>}</div>
        </div>
      </Tooltip>
    );
  };

  line = status => (
    <div
      className={`pretrial-item-line-child ${
        status > 1 ? "become-blue-background" : ""
        }`}
      style={this.stepWidthStyle()}
      key={Math.random(100)}
    />
  );

  // line 并联右
  line2 = ({ topStatus = 1, downStatus = 1, downLessWith }) => (
    <div className="pretrial-item-line-right">
      <div
        className={`pretrial-item-line-right-top ${
          topStatus > 1 ? "border-blue" : ""
          }`}
        style={this.stepWidthStyle()}
      />
      <div
        className={`pretrial-item-line-right-bottom ${
          downStatus > 1 ? "border-blue" : ""
          }`}
        style={
          downLessWith
            ? { width: downLessWith, marginLeft: -downLessWith }
            : this.stepWidthStyle(true)
        }
      />
    </div>
  );

  // 并联上节点
  steps2top = (children, status = 1, isFrist) => {
    const verticalClass = isFrist
      ? "pretrial-item-line-vertical-frist"
      : "pretrial-item-line-vertical";
    return (
      <div
        className={`${verticalClass} ${status > 1 ? "border-blue" : ""}`}
        style={this.stepWidthStyle()}
      >
        {children}
      </div>
    );
  };

  // 并联下节点
  steps2Bottom = (children, status = 1, isFrist) => {
    const verticalClass = isFrist
      ? "lazyland-item-line-vertical-frist"
      : "lazyland-item-line-vertical";
    return (
      <div
        className={`${verticalClass} ${status > 1 ? "border-blue" : ""}`}
        style={this.stepWidthStyle(true)}
      >
        {children}
      </div>
    );
  };

  stepWidthStyle = (isBottom = false) => {
    if (isBottom) {
      return { width: this.stepWidth, marginLeft: -this.stepWidth };
    }
    return { width: this.stepWidth };
  };

  // 绘制步骤节点
  buildSteps = list => {
    const process = [];
    if (list) {
      let width = 0;
      const stepWidth = this.minStepsWidth / this.findNodeCount(list) - 24;
      this.stepWidth =
        stepWidth < this.minStepWidth ? this.minStepWidth : stepWidth;
      list.forEach((value, index) => {
        const isLast = list.length == index + 1;
        // 并联
        if (value.type == 1 && value.lineNodes) {
          const length1 = value.lineNodes[0].length;
          const length2 = value.lineNodes[1].length;
          const maxLength = length1 >= length2 ? length1 : length2;
          process.push(this.buildCombineStep(value, maxLength));

          width += maxLength * (this.stepWidth + 24) + 2 * this.stepWidth;
        }
        // 串联
        else if (value.type == 2) {
          process.push(this.buildStrandStep(value, isLast));
          width += this.stepWidth + 24;
        }
      });
      this.setState({ width });
    }
    return process;
  };

  // 串联node
  buildStrandStep = (node, isLast) => {
    const process = [];
    // 未审核
    if (node.status == 0) {
      process.push(this.step(1, node.title));
    }
    // 处理中
    else if (node.status == 1) {
      process.push(this.step(2, node.title));
    }
    // 通过
    else if (node.status == 2) {
      process.push(this.step(0, node.title, node.time));
    }
    // 未通过
    else if (node.status == 3) {
      process.push(this.step(3, node.title, node.time));
    }
    // 终止
    else if (node.status == 4) {
      process.push(this.step(4, node.title, node.time));
    }

    // 处理最后一个节点
    if (!isLast) {
      if (node.status == 2) {
        process.push(this.line(2));
      } else {
        process.push(this.line(1));
      }
    }
    return process;
  };

  // 并联node
  buildCombineStep = (node, maxLength) => {
    const process = [];
    let upLineNodes = [];
    let downLineNodes = [];
    // 设置较长流程为topLine ,保证top节点为最多
    const length1 = node.lineNodes[0].length;
    const length2 = node.lineNodes[1].length;
    let lessNum = length1 - length2;
    upLineNodes = lessNum >= 0 ? node.lineNodes[0] : node.lineNodes[1];
    downLineNodes = lessNum >= 0 ? node.lineNodes[1] : node.lineNodes[0];

    let i = 0;
    for (i; i < maxLength; i++) {
      const topNode = upLineNodes[i];
      let downNode = downLineNodes[i];

      // 设置首位标识
      let isFrist = false;
      if (i == 0) {
        isFrist = true;
      }

      // 设置节点信息
      process.push(this.buildTopStep(topNode, isFrist));
      process.push(this.buildBottomStep(downNode, isFrist));

      // 判断是否为最后node,处理末尾连线样式
      if (i == maxLength - 1) {
        // 若最后down一个节点为空,则取最后一个存在的node的状态
        let downLessWith = null;
        if (!downNode) {
          downNode = downLineNodes[downLineNodes.length - 1];
          lessNum = Math.abs(lessNum);
          downLessWith = this.stepWidth + lessNum * (this.stepWidth + 20);
        }

        // 末尾合并线条状态
        const topStatus = (topNode && topNode.status) == 2 ? 2 : 1;
        const downStatus = (downNode && downNode.status) == 2 ? 2 : 1;
        process.push(this.line2({ topStatus, downStatus, downLessWith }));

        // 连接线条状态
        const combinStatus = topStatus == 2 && downStatus == 2 ? 2 : 1;
        process.push(this.line(combinStatus));
      }
    }

    return process;
  };

  // 上线流程节点
  buildTopStep = (node, isFrist) => {
    if (!node) {
      return;
    }
    // 未审核
    if (node.status == 0) {
      return this.steps2top(this.step(1, node.title), 1, isFrist);
    }
    // 处理中
    if (node.status == 1) {
      return this.steps2top(this.step(2, node.title), 2, isFrist);
    }
    // 通过
    if (node.status == 2) {
      return this.steps2top(this.step(0, node.title, node.time), 2, isFrist);
    }
    // 未通过
    if (node.status == 3) {
      return this.steps2top(this.step(3, node.title, node.time), 2, isFrist);
    }
    // 终止
    if (node.status == 4) {
      return this.steps2top(this.step(4, node.title, node.time), 2, isFrist);
    }
  };

  // 下线流程节点
  buildBottomStep = (node, isFrist) => {
    if (!node) {
      return;
    }
    // 未审核
    if (node.status == 0) {
      return this.steps2Bottom(this.step(1, node.title), 1, isFrist);
    }
    // 处理中
    if (node.status == 1) {
      return this.steps2Bottom(this.step(2, node.title), 2, isFrist);
    }
    // 通过
    if (node.status == 2) {
      return this.steps2Bottom(this.step(0, node.title, node.time), 2, isFrist);
    }
    // 未通过
    if (node.status == 3) {
      return this.steps2Bottom(this.step(3, node.title, node.time), 2, isFrist);
    }
        // 终止
        if (node.status == 4) {
          return this.steps2Bottom(this.step(4, node.title, node.time), 2, isFrist);
        }
  };

  render() {
    return (
      <div className="step-container">
        <section className="step" style={{ width: this.state.width }}>
          {this.state.dom}
        </section>
      </div>
    );
  }
}
