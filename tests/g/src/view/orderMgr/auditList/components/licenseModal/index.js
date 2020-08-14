import React from 'react';
import { Form, Tabs } from 'antd';
import { AsyncModal } from 'components';
import "./style.less";

const { TabPane } = Tabs;

class LicenseModal extends AsyncModal {
  static defaultProps = {
    ...AsyncModal.defaultProps,
    reqUrl: '/order/operate/end',
    reqMethod: 'POST',
    title: ' ',
    wrapClassName: "license-modal-box",
    footer: null
  };

  _render = (props) => {
    const {
      fileInfoList = [],
    } = props;

    return (
      <div className="license-box">
        <Tabs defaultActiveKey="index">
          {
            fileInfoList.map(item => (
              <TabPane tab={item.name} key={item.type}>
                {item.base64List.map((pics, index) => <img key={index} className="license-img" src={`data:image/png;base64,${pics}`} alt={item.name} />)}
              </TabPane>
            ))
          }
        </Tabs>
      </div>
    );
  }
}

export default Form.create({ wrappedComponentRef: true })(LicenseModal)