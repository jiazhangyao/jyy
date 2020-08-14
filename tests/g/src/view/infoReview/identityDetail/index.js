import React from "react";
import { DetailPage } from "super/page";
import { inject, observer } from "mobx-react";
import { moduleName } from "./store";
import { Row } from "antd";
import Card from "mt-card";
import { DetailField, TableDetail, Button, DetailPics, message } from "components";
import { getAsyncModalInst } from 'components/asyncModal';
import history from "utils/history";
import Pass from "./components/pass";
import {
  AuditStatus, AuditResult, LogAuthResult, MediaType,
} from '../enum';
import './index.less';
import moment from "moment/moment";
import tools from "utils/tools";

const { PrimaryButton, DangerButton } = Button;
const { SingleRow } = Card;

@inject(stores => ({
  store: stores[moduleName],
  userInfo: stores.frame.userInfo
}))
@observer
class IdentityDetail extends DetailPage {

  buildLogColumns = () => {
    return [
      {
        title: '操作时间',
        dataIndex: 'operatorTime',
        width: '200',
        key: 'operatorTime'
      }, {
        title: '处理人',
        dataIndex: 'name',
        width: '150',
        key: 'name'
      }, {
        title: '操作',
        dataIndex: 'authStatus',
        width: '150',
        key: 'authStatus',
        render: (text, item) => LogAuthResult.getTextFromValue(item.authStatus)
      }, {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        width: '200px'
      }
    ];
  }

  renderMedia = (MediaType = [], pics = []) => {
    // const files = {};
    // pics.forEach(item => {
    //   files[item.type] = item;
    // });
    return MediaType.toArray().map(cur => {
      const fileArr = pics[cur.value] || {};
      // console.log('❤fileArr', fileArr)
      if (fileArr.key) {
        // console.log('❤key', fileArr.key)
        let fileArrToArr = [fileArr];
        return (
          <SingleRow>
            <DetailField type="pics" label={cur.text}>
              {fileArrToArr.map(item => <DetailPics name={item.key} suffix={item.ext} alt={cur.name} />)}
            </DetailField>
          </SingleRow>
        );
      } else {
        return (
          <SingleRow>
            <DetailField label={cur.text}>--</DetailField>
          </SingleRow>
        );
      }
    });
  };


  onPassClick = (id, isPass, version) => {
    getAsyncModalInst(this.passModalInst).open({ id, isPass, version })
  }

  onOkPassModal = () => {
    message.success("审核成功");
    setTimeout(() => {
      tools.resetToTop();
      history.push("/inforeview/identity/list");
    }, 2000)
  }
  renderAction = (status) => {
    const {
      store: {
        data: {
          accountId,
          appealApproveVersion
        }
      }
    } = this.props;
    if (status < 3) {
      return '';
    }
    return (
      <Row className="detail-actions-container">
        <PrimaryButton onClick={this.onPassClick.bind(this, accountId, LogAuthResult.PASS, appealApproveVersion)}>通过</PrimaryButton>
        <DangerButton onClick={this.onPassClick.bind(this, accountId, LogAuthResult.REJECT, appealApproveVersion)}>驳回</DangerButton>
      </Row>
    );
  }
  doRender() {
    const {
      store: {
        data
      }
    } = this.props;
    const {baseAccount = {}, userAppealAuthLog = [], pics = [] } = data;
    let appealStatus = "待审核";
    switch (data.appealStatus) {
      case 1:
        appealStatus = "已驳回";
        break;
      case 2:
        appealStatus = "已通过";
        break;
    }

    return (
      <>
        <div className="order-detail">
          <Card title="工单信息">
            <DetailField label="工单编号">{data.id || '-'}</DetailField>
            <DetailField label="审核状态">{appealStatus}</DetailField>
            <DetailField label="处理人">{data.auditName || '-'}</DetailField>
            <DetailField label="提交时间">{moment(data.applyTime).format('YYYY-MM-DD HH:mm:ss')}</DetailField>
            <DetailField label="申诉提交平台">{baseAccount.sourceTypeDesc || '-'}</DetailField>
          </Card>
          <Card title="申诉人信息">
            <DetailField label="申诉人姓名">{baseAccount.name || '-'}</DetailField>
            <DetailField label="申诉人身份证号">{baseAccount.identity || '-'}</DetailField>
            <DetailField label="申诉人手机号">{baseAccount.mobile || '-'}</DetailField>
          </Card>
          <Card title="材料信息" className="pics-list">
            {
              pics.length && this.renderMedia(MediaType, pics)
            }
          </Card>

          <Card title='操作日志' rowLen={1} className="forDetailTable">
            {
              userAppealAuthLog &&
              <TableDetail
                className='detail-table'
                // scroll={{ x: 1300 }}
                dataSource={userAppealAuthLog}
                columns={this.buildLogColumns()}
                key={Math.random(100)}
                text="该审核还没有审批记录！"
              />
            }
          </Card>
          {
            data.appealStatus === AuditStatus.TODO && this.renderAction(data.appealStatus)
          }
          <Pass
            onOk={this.onOkPassModal}
            wrappedComponentRef={inst => (this.passModalInst = inst)}
          />

        </div>
      </>
    );
  }
}

export default IdentityDetail;
