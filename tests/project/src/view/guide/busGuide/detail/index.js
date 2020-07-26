
import React from "react";
import { DetailPage } from "super/page";
import { inject, observer } from "mobx-react";
import { moduleName } from "./store";
import Card from "mt-card";
import { DetailField } from "components";
@inject(stores => ({
  store: stores[moduleName],
}))
@observer
class BusGuideDetail extends DetailPage {
  doRender() {
    let { store: { data } } = this.props;
    return (
      <>
        <Card rowLen={1}>
          <DetailField label="标题">{data.title}</DetailField>
          <DetailField label="详情描述"><span dangerouslySetInnerHTML={{ __html: data.content }}></span></DetailField>
        </Card>
      </>
    );
  }
}

export default BusGuideDetail;
