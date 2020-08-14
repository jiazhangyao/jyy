import React from 'react';
import { Form, Modal, Button, Row, Col, Table } from 'antd';
import { inject, observer } from "mobx-react";
import { moduleName } from "../../store";
import { InputField } from "components/formItem";
import { LinkButton } from "components";
import "./index.less";

const FormItem = Form.Item;
let colLayout = { span: 12 };

const modelName = 'ratepayList';
@inject(stores => ({
    store: stores[moduleName],
}))
@observer
class IncomeModel extends React.Component {
    constructor() {
        super();
        this.modelName = modelName;
        this.state = {
            currentIndex: 1,
            visible: false
        }
    }

    //改变页码
    onChangeDate = (index) => {
        this.setState({
            currentIndex: index
        })
    };

    handleView = (taxInfo, taxInfoDetail, keyValue) => {
        const textFieldRender = (value) => (<span>{value || '--'}</span>);
        const showModalText = (objName, key) => {
            return (
                <span>{objName ? objName[key] : '-'}</span>
            )
        }
        const taxInfoModelDesc = [
            {
                title: '征收项目',
                dataIndex: 'taxTypeText',
                key: 'taxTypeText',
                width: '100px',
                render: textFieldRender
            },
            {
                title: '征收品目',
                dataIndex: 'collectItem',
                key: 'collectItem',
                render: textFieldRender
            },
            {
                title: '征收子目',
                dataIndex: 'collectSubheading',
                key: 'collectSubheading',
                render: textFieldRender
            },
            {
                title: '计税依据',
                dataIndex: 'taxBasis',
                key: 'taxBasis',
                render: textFieldRender
            },
            {
                title: '税款所属时期',
                dataIndex: 'taxExpairedDate',
                key: 'taxExpairedDate',
                render: (value, item) => {
                    return (
                        <span>{item.taxStartDate} 至 {value}</span>
                    )
                }
            },
            {
                title: '已缴或扣除额',
                dataIndex: 'taxExemption',
                key: 'taxExemption',
                render: textFieldRender
            },
            {
                title: '实缴金额',
                dataIndex: 'sum',
                key: 'sum',
                render: textFieldRender
            },
        ];

        return (
            <div>
                <h3>{keyValue == 2 ? '权利方(买方)' : '义务方(卖方)'}</h3>
                <div className="income-content">
                    <Row>
                        <Row>
                            <Col {...colLayout} >
                                <FormItem label="电子税票号码">
                                    {showModalText(taxInfo, 'receiptNo')}
                                </FormItem>
                            </Col>
                            <Col {...colLayout} >
                                <FormItem label="税务机关">
                                    {showModalText(taxInfo, 'collectAuthority')}
                                </FormItem>
                            </Col>
                            <Col {...colLayout} >
                                <FormItem label="填票人">
                                    {showModalText(taxInfo, 'enteredBy')}
                                </FormItem>
                            </Col>
                            <Col {...colLayout} >
                                <FormItem label="填发日期">
                                    {showModalText(taxInfo, 'issueDate')}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24} >
                                <FormItem label="纳税人识别号" >
                                    {showModalText(taxInfo, 'taxPayerCode')}
                                </FormItem>
                            </Col>
                            <Col {...colLayout} >
                                <FormItem label="纳税人姓名">
                                    {showModalText(taxInfo, 'taxPayerName')}
                                </FormItem>
                            </Col>
                            <Col {...colLayout} >
                                <FormItem label="地址">
                                    {showModalText(taxInfo, 'address')}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Table
                                bordered
                                scroll={{ x: true }}
                                columns={taxInfoModelDesc}
                                dataSource={taxInfoDetail}
                                pagination={false}
                                footer={(data) => {
                                    return (
                                        <div className="footer">
                                            <div className="money">
                                                <div className="money-title" >金额合计</div>
                                                <div className="money-content" >（大写）人民币{showModalText(taxInfo, 'sumText')}</div>
                                            </div>
                                            <div className="money">
                                                <div className="money-title" >备注</div>
                                                <div className="money-content" >{showModalText(taxInfo, 'comments')}</div>
                                            </div>
                                        </div>
                                    )
                                }}
                            />
                        </Row>
                    </Row>
                </div>
            </div>
        )
    }

    onIncomeModel = (id) => {
        this.props.store.getCertificateInfo(id);
        this.setState({ visible: true });
    };

    handleOk = (e) => {
        const { id } = this.props;
        const url = `/gm/api/order/tax/download/${id}`;
        window.open(url);
        this.handleCancel();
    };

    handleCancel = (e) => this.setState({ visible: false });

    render() {
        const { store, id, registerType } = this.props;
        const { certificateInfo } = store;
        const { obligorInfo, obligeeInfo, obligorDetail, obligeeDetail } = certificateInfo;
        const { currentIndex, visible } = this.state;

        return (
            <div className="ratepay-prove-see">
                <Button style={{paddingLeft:"0px"}} onClick={this.onIncomeModel.bind(this, id)}>查看完税证明</Button>
                <Modal
                    className="income-model"
                    title="完税证明"
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={820}
                    key={id}
                    footer={[
                        <Button type="default" onClick={this.handleCancel}>取消</Button>,
                        <Button type="primary" onClick={this.handleOk.bind(this, id)}>下载</Button>
                    ]}>
                    <div className="income">
                        {
                            visible && (currentIndex == 1
                                ? this.handleView(obligeeInfo, obligeeDetail, 2)
                                : this.handleView(obligorInfo, obligorDetail, 1))
                        }
                        {
                            registerType == 1
                            && <div className="icon">
                                <div className="icon-content">
                                    <span className={`icon-circle ${currentIndex == 1 ? "icon-active" : ""}`} onClick={this.onChangeDate.bind(this, 1)}></span>
                                    <span className={`icon-circle ${currentIndex == 2 ? "icon-active" : ""}`} onClick={this.onChangeDate.bind(this, 2)}></span>
                                </div>
                            </div>}
                    </div>
                </Modal>
            </div>
        )
    }

}

export default Form.create({ wrappedComponentRef: true })(IncomeModel)