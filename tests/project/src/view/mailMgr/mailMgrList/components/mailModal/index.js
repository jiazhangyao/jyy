import React from 'react';
import { Form, Modal, Button } from 'antd';
import { inject, observer } from "mobx-react";
import { moduleName } from "../../store";
import { InputField } from "components/formItem";
import { LinkButton } from "components";
import { MailType, mailState } from '../../enum';
import "./index.less";

@inject(stores => ({
  store: stores[moduleName],
}))
@observer
class MailModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false }
  }

  verifyTrackNum = (rule, value, callback) => {
    if (value && (value.length > 50 || !/^[A-Za-z0-9]+$/.test(value))) {
      callback('请输入不超过50位字母和数字组合的快递单号')
    } else {
      callback()
    }
  };

  handleCancel = () => {
    this.props.form.resetFields()
    this.setState({ visible: false })
  }

  handleMailModel = (id) => {
    this.props.store.getMailModalInfo(id)
    this.setState({ visible: true })
  }

  handleSave = (id) => {
    this.props.form.validateFields(
      { force: true },
      (err, values) => {
        if (!err) {
          this.props.store.subMailInfo(id, values)
          this.handleCancel()
        }
      },
    );
  }

  render() {
    const { getFieldDecorator: creator } = this.props.form;
    const { store: { activedTabKey, mailInfo = {} }, id } = this.props;
    let { visible } = this.state;
    let { consignee, mobile, addressInfo = {}, expressCompany, trackingNumber, logisticsState } = mailInfo;
    return (
      <div >
        <Button style={{paddingLeft:"0px"}} onClick={this.handleMailModel.bind(this, id)}>{activedTabKey == "todo" ? "填写邮寄信息" : "查看邮寄信息"}</Button>
        <Modal
          className="mail-info-model"
          title="邮寄"
          width={400}
          visible={visible}
          onCancel={this.handleCancel}
          footer={activedTabKey == 'todo' && [
            <Button type="default" onClick={this.handleCancel}>取消</Button>,
            <Button type="primary" onClick={this.handleSave.bind(this, id)} >寄出</Button>
          ]}
        >
          <div>
            <div className="label">收件人:{consignee || '--'} </div>
            <div className="label">收件人手机号:{mobile || '--'} </div>
            <div className="label">收件地址:{addressInfo.mosaicAddress || '--'}</div>
            <div className="label">快递公司:{MailType.getTextFromValue(expressCompany) || '--'}</div>
            {
              activedTabKey != "todo" &&
              <div>
                <div className="label">快递单号:{trackingNumber || "--"}</div>
                {/* <div className="label">物流状态:{mailState.getTextFromValue(logisticsState) || '--'}</div> */}
              </div>
            }
            <div>
              <Form>
                {
                  activedTabKey == "todo" &&
                  <InputField
                    label="快递单号"
                    field="trackingNumber"
                    req={true}
                    placeholder="输入不超过50个字的快递单号"
                    msg="请输入"
                    validator={this.verifyTrackNum}
                    creator={creator}
                  />
                }
              </Form>
            </div>
          </div>
        </Modal >
      </div>
    );
  }
}
export default Form.create({ wrappedComponentRef: true })(MailModal)