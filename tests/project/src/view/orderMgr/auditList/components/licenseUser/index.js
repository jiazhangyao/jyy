import React from 'react';
import { Form, Button } from 'antd';
import { AsyncModal } from 'components';

import "./style.less";

class LicenseUser extends AsyncModal {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: {}
    };
  }
  static defaultProps = {
    ...AsyncModal.defaultProps,
    wrapClassName: "license-user-modal-box",
    title: "请选择持证人",
  };

  onCancel() {
    this.close();
  }

  onOk = () => {
    let { selectedItem, extraParams: { modalInst, queryLicenseInfo, id } } = this.state;
    if (selectedItem) {
      queryLicenseInfo({ ...selectedItem, orderId: id }, modalInst, this);
      this.close();
    }
  }

  licenseUserClick(item) {
    this.setState({
      selectedItem: item
    })
  }

  _render = (props) => {
    let values = props || {}
    const {
      id,
      userdata = [],
      modalInst,
      queryLicenseInfo
    } = values;
    let { selectedItem } = this.state;

    return (
      <div className="license-box">
        {
          userdata.map((item, index) =>
            <Button
              type={item.name === selectedItem.name ? "primary" : ''}
              key={index}
              onClick={this.licenseUserClick.bind(this, { ...props, ...item }, modalInst, queryLicenseInfo, id)}>
              {item.name}
            </Button>
          )
        }
      </div>
    );
  }
}

export default Form.create({ wrappedComponentRef: true })(LicenseUser)