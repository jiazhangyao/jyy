/**
 * Created by ex-geqiang001 on 2019/1/18.
 */
import React from "react";
import { DetailPage } from "super/page";
import { inject, observer } from "mobx-react";
import { moduleName } from "./store";
import { Button } from "antd";
import Card from "mt-card";
import { DetailField, DetailPics } from "components";
import BtmBtnModal from "./components/btmBtnModal";
import { getAsyncModalInst } from 'components/asyncModal';
import dynamicConst from 'common/dynamicConst';
import history from "utils/history";
import tools from "utils/tools";
import "./index.less";
import { organizationType, auditStatusDesc, businessScope } from "common/enum";
import TableDetail from "components/tableDetail";
const { SingleRow } = Card;

@inject(stores => ({
    store: stores[moduleName],
    userInfo: stores.frame.userInfo
}))
@observer
class ExamineDetail extends DetailPage {
    renderPics = arrNum => {
        const { materials = [] } = this.props.store.data;
        let add = [];
        if (materials.length) {
            // for (let i = 0; i < materials.length; i++) {
            //     add.push(materials[i].type);
            // }
            return materials.map(item => {
                return item.files.map(ele => {
                    return <DetailPics
                        name={ele.key}
                        suffix={ele.ext}
                        alt={ele.originalName} />
                })
            })
            // if (!add.includes(arrNum)) {
            //     return (<span>--</span>)
            // } else {
            //     return materials.map(item =>
            //         (item.type == arrNum &&
            //             (item.key !== null ?
            //                 <DetailPics
            //                     name={item.key}
            //                     suffix={item.ext}
            //                     alt={item.originalName}
            //                 /> : (<span>--</span>)
            //             )
            //         ));
            // }
        } else {
            return <span>--</span>;
        }
    };

    onBtmBtnClick = (id, certificateStatus) => {
        getAsyncModalInst(this.addBtmBtnModalInst).open({ id, certificateStatus })
    };
    renderAction = (id) => {
        return (
            <div className="examine-btn detail-actions-container">
                <Button onClick={this.onBtmBtnClick.bind(this, id, 2)} className="action-btn primary-color">通过</Button>
                <Button onClick={this.onBtmBtnClick.bind(this, id, 4)} className="action-btn red-color">驳回</Button>
            </div>
        );
    };

    onOkBtmBtnModal = () => {
        history.push("/institution/examine/list");
        tools.resetToTop();
    }

    //获取业务范围信息
    businessScopeRender = (status) => {
        let statueArr = [];
        let result = '';
        if (status != 'undefined') {
            statueArr = status.split(",");
        } else {
            return result;
        }
        for (let i = 0; i < statueArr.length; i++) {
            if (i + 1 < statueArr.length) {
                result += businessScope[statueArr[i]] + ',';
            } else {
                result += businessScope[statueArr[i]];
            }
        }
        return result;
    };

    doRender() {
        const { store } = this.props;
        const { data } = store;
        const { auditStatus, companyBillDTO, materials, id, companyAuthLogs, type, businessStatus, cardType, certificateType } = data;
        let businessScopeStr = '';
        if (!!businessStatus) {
            businessScopeStr = this.businessScopeRender(businessStatus);
        }
        const logColums = [{
            title: '操作时间',
            dataIndex: 'createTime',
            width: 300,
            key: 'createTime'
        }, {
            title: '处理人',
            dataIndex: 'auditorName',
            width: 300,
            key: 'auditorName'
        }, {
            title: '操作',
            dataIndex: 'authStatus',
            width: 300,
            key: 'authStatus',
            render: val => {
                return auditStatusDesc[val];
            }
        }, {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
            width: 300
        }];

        return (
            <>
                {companyBillDTO &&
                    <Card title="工单信息">
                        <DetailField label="工单号">{companyBillDTO.jobNumber}</DetailField>
                        <DetailField label="审核状态">{auditStatusDesc[auditStatus]}</DetailField>
                        <DetailField label="处理人">{auditStatus === 1 ? '-' : companyBillDTO.auditName}</DetailField>
                        <DetailField label="提交时间">{companyBillDTO.applyDate}</DetailField>
                    </Card>
                }
                {data &&
                    <Card title="基础信息">
                        <DetailField label="机构名称">{data.name}</DetailField>
                        <DetailField label="机构类型">{organizationType[type]}</DetailField>
                        <DetailField label="机构地址">{data.address}</DetailField>
                        {
                            organizationType[type] !== '法院' && <DetailField label="企业法人">{data.legalPerson}</DetailField>
                        }
                        {
                            organizationType[type] !== '法院' && <DetailField label="企业法人身份证号">{data.corporationIdNumber}</DetailField>
                        }
                        <DetailField label="证件类型">{dynamicConst.getItem('companyCardType') ? dynamicConst.getItem('companyCardType')[cardType] : ''}</DetailField>
                        <DetailField label="证件号码">{data.socialCredit}</DetailField>
                        {/* <SingleRow>
                            <DetailField label="业务范围">{businessScopeStr}</DetailField>
                        </SingleRow> */}
                        <SingleRow>
                            <DetailField label="公司简介">{data.remark}</DetailField>
                        </SingleRow>
                    </Card>
                }
                {data &&
                    <Card title="联系方式">
                        <DetailField label="机构联系人">{data.contactPerson}</DetailField>
                        <DetailField label="证件类型">{dynamicConst.getItem('cardType') ? dynamicConst.getItem('cardType')[certificateType] : ''}</DetailField>
                        <DetailField label="证件号码">{data.contactCard}</DetailField>
                        <DetailField label="联系电话">{data.contactMobile}</DetailField>
                        <DetailField label="联系邮箱">{data.contactMail}</DetailField>
                    </Card>
                }

                {/*非法院：1营业执照 2金融许可证 3授权委托书 4其他  法院：5工作证 6执行公务证 7其他*/}
                {materials && (organizationType[type] === '法院' ? (
                    <Card title="上传材料" className="pics-list">
                        <SingleRow>
                            <DetailField type="pics" label="工作证">{this.renderPics(5)}</DetailField>
                        </SingleRow>
                        <SingleRow>
                            <DetailField type="pics" label="执行公务证">{this.renderPics(6)}</DetailField>
                        </SingleRow>
                        <SingleRow>
                            <DetailField type="pics" label="其他材料">{this.renderPics(7)}</DetailField>
                        </SingleRow>
                    </Card>
                ) : (
                        <Card title="上传材料" className="pics-list">
                            <SingleRow>
                                <DetailField type="pics" label="营业执照照片">{this.renderPics(1)}</DetailField>
                            </SingleRow>
                            {businessStatus!="112,113"&&<SingleRow>
                                <DetailField type="pics" label="金融许可证">{this.renderPics(2)}</DetailField>
                            </SingleRow>}
                            {businessStatus!="112,113"&&<SingleRow>
                                <DetailField type="pics" label="授权委托书">{this.renderPics(3)}</DetailField>
                            </SingleRow>}
                            <SingleRow>
                                <DetailField type="pics" label="其他材料">{this.renderPics(4)}</DetailField>
                            </SingleRow>
                        </Card>
                    ))}

                {companyAuthLogs && companyAuthLogs.length ?
                    <Card title="操作日志" className="forDetailTable">
                        {companyAuthLogs.length > 0 &&
                            <TableDetail
                                // scroll={{x: 1200}}
                                dataSource={companyAuthLogs}
                                columns={logColums}
                                pagination={false}
                            />}
                    </Card> : ''
                }

                {/* 1未审核 2审核通过 3审核中 4驳回 */}
                {(auditStatus === 1 || auditStatus === 3) && this.renderAction(id)}

                <BtmBtnModal
                    onOk={this.onOkBtmBtnModal}
                    wrappedComponentRef={inst => (this.addBtmBtnModalInst = inst)}
                />
            </>
        );
    }
}

export default ExamineDetail;
