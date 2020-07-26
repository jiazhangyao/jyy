import React from "react";
import {Page} from "super/page";
import {inject, observer} from "mobx-react";
import "./style.less";
import {moduleName} from "./store";

@inject(stores => ({store: stores[moduleName]}))
@observer
class Home extends Page {
  doRender() {
    const {store = {}} = this.props;
    const {} = store;

    return null
  }
}

export default Home;
