import React from "react";
import { inject, observer } from "mobx-react";
import { moduleName } from "../list/store";
import { LinkButton } from "components";
import { Modal,Button } from "antd";
const confirm = Modal.confirm;
const btnRenderTitle = {
  offline: "确认下架该信息？",
  online: "确认发布该信息？",
  delete: "确认删除该信息？"
};
@inject(stores => ({
  store: stores[moduleName]
}))
@observer
class CommonButton extends React.Component {
  onOffline = (id, status) => {
    let { store } = this.props;
    return () => {
      confirm({
        iconType: "none",
        content: btnRenderTitle[status],
        okText: "确定",
        cancelText: "取消",
        onOk: () => {
          store.offline({ id, status });
        },
        onCancel() {}
      });
    };
  };
  render = () => {
    let { id, releaseStatus } = this.props;
    releaseStatus = releaseStatus == 1; // 1: "草稿",  2: "已发布"
    return (
      <div>
        {!releaseStatus && (
          <Button style={{paddingLeft:"0px"}} onClick={this.onOffline(id, "offline")}>下架</Button>
        )}
        {releaseStatus && (
          <Button style={{paddingLeft:"0px"}} onClick={this.onOffline(id, "online")}>发布</Button>
        )}
        {releaseStatus && (
          <LinkButton to={`/guide/busguide/edit?id=${id}`}>编辑</LinkButton>
        )}
        {releaseStatus && (
          <LinkButton onClick={this.onOffline(id, "delete")}>删除</LinkButton>
        )}
      </div>
    );
  };
}

export default CommonButton;
