import React from "react";
import { DetailPage } from "super/page";
import { inject, observer } from "mobx-react";
import { moduleName } from "./store";
import Card from "mt-card";
import { Tree } from "antd";
import "./style.less";
const { TreeNode } = Tree;

@inject(stores => ({
  store: stores[moduleName]
}))
@observer
class BlockSearchDetail extends DetailPage {
  loop = (data, num) => {
    let numble = num || 1;

    if (data && data.length && typeof data != "string") {
      return data.map((item, key) => {
        return this.loop(item, numble++);
      });
    } else if (data && typeof data == "object" && data != null) {
      return Object.keys(data).map((item, key) => {
        return (
          <TreeNode key={data[item] + numble + item} title={item}>
            {this.loop(data[item], numble++)}
          </TreeNode>
        );
      });
    } else {
      return <TreeNode title={data} key={data + numble} />;
    }
  };

  doRender() {
    let {
      store: { data }
    } = this.props;
    return (
      <>
        <Card rowLen={1}>
          <div>
            <Tree
              showLine
              defaultExpandedKeys={["0-0-0"]}
              defaultExpandAll={false}
              defaultExpandParent={true}
            >
              {this.loop(data, 1)}
            </Tree>
          </div>
        </Card>
      </>
    );
  }
}

export default BlockSearchDetail;
