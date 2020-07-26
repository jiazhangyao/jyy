import React from "react";
import { Card as OriginCard, Row, Col, Modal, Form, Input } from "antd";
import { DetailPage } from "super/page";
import { inject, observer } from "mobx-react";
import { moduleName } from "./store";
import createForm from "utils/createForm";
import history from "utils/history";
import Card from "mt-card";
import Viewer from "react-viewer";
import 'react-viewer/dist/index.css';
import { Steps, DetailField, TableDetail, DetailImages, Button, message } from "components";
import ImagesUploader, { formatBackendImagesToFrontEnd } from 'components/imagesUploader';
import dynamicConst from "common/dynamicConst";
import "./style.less";
import pdf_icon from "./img/pdf.png";

dynamicConst.getInitialFromValue = (key, value) => {
  const item = dynamicConst.getItem(key);
  return item ? item[value] : undefined;
}
const { SubTitle } = Card;
const { TextArea } = Input;
const FormItem = Form.Item;
const clsPrefix = "scdj-page";
const { PrimaryButton, DangerButton, NoBorderButton } = Button;
// 操作记录标题数据
const CZRZ_DATA = [
  {
    title: "时间",
    dataIndex: "checkTime",
    key: "checkTime",
    rowKey: "checkTime",
    width: 200
  },
  {
    title: "处理人",
    dataIndex: "checkUser",
    key: "checkUser",
    rowKey: "checkUser",
    width: 200
  },
  {
    title: "操作",
    dataIndex: "checkDesc",
    key: "checkDesc",
    rowKey: "checkDesc",
    width: 200
  },
  {
    title: "备注",
    dataIndex: "remark",
    key: "remark",
    rowKey: "remark",
    width: 200,
    render(value) {
      return <div>{value || "--"}</div>;
    }
  }
]
// 申请信息  抵押权人信息,注销登记 标题数据
const DYQR_DATA = [
  {
    title: "姓名/名称",
    dataIndex: "name",
    key: "name",
    rowKey: "name",
    width: 200
  },
  {
    title: "类型", // TODO 不明白这个字段的含义
    dataIndex: "orgTypeDesc",
    key: "orgTypeDesc",
    rowKey: "orgTypeDesc",
    width: 200,
  },
  {
    title: "证件类型",
    dataIndex: "cardTypeDesc",
    key: "cardTypeDesc",
    rowKey: "cardTypeDesc",
    width: 200,
    // render: val => {
    //   return dynamicConst.getTextFromValue("cardType", val)
    // }
  },
  {
    title: "证件号码",
    dataIndex: "cardNo",
    key: "cardNo",
    rowKey: "cardNo",
    width: 200,
    render(value) {
      return <div>{value || "--"}</div>;
    }
  },
  {
    title: "法人/负责人姓名/名称",
    dataIndex: "corporationName",
    key: "corporationName",
    rowKey: "corporationName",
    width: 200,
    render(value) {
      return <div>{value || "--"}</div>;
    }
  },
  {
    title: "法人/负责人证件号码",
    dataIndex: "corporationCardNo",
    key: "corporationCardNo",
    rowKey: "corporationCardNo",
    width: 200,
    render(value) {
      return <div>{value || "--"}</div>;
    }
  },
  {
    title: "联系电话",
    dataIndex: "mobile",
    key: "mobile",
    rowKey: "mobile",
    width: 200,
    render(value) {
      return <div>{value || "--"}</div>;
    }
  }
];
// 申请信息  代理人/法人/负责人信息,抵押人信息,债务人信息 标题数据
const SQXX_DATA = [
  {
    title: "姓名/名称",
    dataIndex: "name",
    key: "name",
    rowKey: "name",
    width: 200
  },
  {
    title: "类型", // TODO 不明白这个字段的含义
    dataIndex: "orgTypeDesc",
    key: "orgTypeDesc",
    rowKey: "orgTypeDesc",
    width: 200,
    // render: val => {
    //   return dynamicConst.getTextFromValue("cardType", val)
    // }
  },
  {
    title: "证件类型",
    dataIndex: "cardTypeDesc",
    key: "cardTypeDesc",
    rowKey: "cardTypeDesc",
    width: 200,
    // render: val => {
    //   return dynamicConst.getTextFromValue("cardType", val)
    // }
  },
  {
    title: "证件号码",
    dataIndex: "cardNo",
    key: "cardNo",
    rowKey: "cardNo",
    width: 200,
    render(value) {
      return <div>{value || "--"}</div>;
    }
  },
  {
    title: "联系电话",
    dataIndex: "mobile",
    key: "mobile",
    rowKey: "mobile",
    width: 200,
    render(value) {
      return <div>{value || "--"}</div>;
    }
  }
];

const registerTypeMap = {
  3010: '抵押首次登记',
  3020: '抵押变更登记',
  3030: '抵押转移登记',
  3040: '抵押注销登记',
}

@inject(stores => ({
  store: stores[moduleName],
  userInfo: stores.frame.userInfo,
  frame: stores["frame"]
}))
@createForm({clsPrefix})
@observer
class MortgageDetail extends DetailPage {
  componentDidMount() {
  }

  state = {
    modalVersible: false,
    operType: null,
    operPlaceholder: ''
  }
  /* 工单信息 */
  renderOrderInfo() {
    let { store: { data } } = this.props;
    return (
      <Card title="工单信息">
        <DetailField label="工单编号">{data.orderNo}</DetailField>
        <DetailField label="登记类别">
          {/* {registerTypeMap[data.registerType]} */}
          {dynamicConst.getTextFromValue("registerSubTypeForMortgage", data.registerSubType)}
        </DetailField>
        <DetailField label="工单状态">{data.statusDesc}</DetailField>
        <DetailField label="提交时间">{data.submitTime}</DetailField>
      </Card>)
  };

  /* 产权信息 */
  renderPropertyInfo() {
    let { store: { data = { orderHouseList: [] } } } = this.props;
    let orderHouseList = data.orderHouseList ? data.orderHouseList : [{}];
    let propertyInfo = orderHouseList.length ? orderHouseList[0] : {}; // TODO 后端说只涉及房屋，取值房屋信息，宗地信息没做
    // TODO 税费信息, 现状信息 按钮没做
    return <Card title="产权信息" extra={
      <span id="thisTradeInfo">
        {data.isShowStatusQuoButton ?
          <NoBorderButton
            className="statusInfoBtn"
            onClick={() => {
              window.open(`/gm/order/audit/statusInfoDetail?id=${data.id}&registerType=${data.registerType}&flag=current`)
              const bc = new BroadcastChannel('transferStatus')
              bc.onmessage = e => {
                if (e.data && e.data.id) {
                  sessionStorage.setItem('postMessage', e.data)
                  this.setState({
                    postMessageState: true,
                    postMessageData: e.data
                  })
                }
              }
            }}
          >
            现状信息
        </NoBorderButton>
          : ''
        }
        {data.isShowTaxesButton ?
          <NoBorderButton
            className="statusInfoBtn"
            onClick={() =>
              window.open(`/gm/order/audit/taxInfoDetail?id=${data.id}&registerType=${data.registerType}`)
            }
          >
            税费信息
        </NoBorderButton>
          : ''
        }
      </span>
    }>
      {this.getSimpleCardDetail(propertyInfo, [
        { title: "不动产证号", key: "warrantNumber", },
        { title: "坐落", key: "location", },
        { title: "权利人姓名/名称", key: "propertyPerson", },
        { title: "土地用途/房屋用途", key: "planUseDesc", render: (item) => `${item.landUsageDesc || '--'}/${item.planUseDesc || '--'}` },
        { title: "宗地面积/建筑面积", key: "space", render: (item) => `${item.landArea || '--'}平方米/${item.space || '--'}平方米` },
      ])}
    </Card>
  };

  /* 申请内容 */
  renderApplyInfo() {
    let { store: { data: {mortgageInfo} } } = this.props;
    if (mortgageInfo) {
      var arr = [
        { title: "债务履行期", key: "planUseDesc", render: (mortgageInfo) => `${mortgageInfo.debtStartDate || '--'} 至 ${mortgageInfo.debtEndDate || '--'}` },
        { title: "被担保债权数额（最高债权数额）", key: "mainClaimAmount" },
        { title: "产权评估总额", key: "evaluationPrice", },
        { title: "变更说明", key: "remark" },
      ]
      // 一般抵押显示mainClaimAmount，否则highestClaimAmount
      if (mortgageInfo.type != 1) {
        arr[1].key = "highestClaimAmount"
      }
      return <Card title="申请内容">
        {this.getSimpleCardDetail(mortgageInfo, arr)}
      </Card>
    } else {
      return null
    }
    
  };

  /* 抵押信息 */
  renderMotgageInfo() {
    let { store: { data } } = this.props;
    let mortgageInfo = data.mortgageInfo ? data.mortgageInfo : [{}];
    return <Card title="抵押信息">
      {this.getSimpleCardDetail(mortgageInfo, [
        { title: "抵押权人", key: "mortgageeName", },
        { title: "债务人", key: "debtorName", },
        { title: "抵押人", key: "mortgagorName", },
        { title: "共同债务人", key: "planUseDesc" }, // TODO 没有对应的字段，自己创建，逻辑是债务人下的每个人的jointDebtorList 的人员名称的join
        { title: "债务履行期", key: "planUseDesc", render: (item) => `${item.debtStartDate || '--'} 至 ${item.debtEndDate || '--'}` },
        { title: "被担保债权数额", key: "highestClaimAmount" },
      ])}
    </Card>
  };

  // 操作记录
  renderLog() {
    let { store: { data: { checkLogList = [] } } } = this.props;
    return (<Card title="操作记录" rowLen={1} className="forDetailTable">
      {checkLogList &&
        <TableDetail
          className="detail-table"
          scroll={{ x: 800 }}
          dataSource={checkLogList}
          columns={CZRZ_DATA}
          key={Math.random()}
        />
      }
    </Card>)
  }

  /* 邮寄信息 */
  renderPost() {
    let { store: { data } } = this.props;
    let { orderMail = {}, isPost } = data;
    return (<Card title="邮寄信息">
      <DetailField label="产证/证明邮寄">
        {isPost === 2 ? "否" : "是"}
      </DetailField>
      <DetailField label="收件人">{orderMail.consignee}</DetailField>
      <DetailField label="手机号">{orderMail.mobile}</DetailField>
      <DetailField label="收件地址">
        {orderMail.addressInfo && orderMail.addressInfo.mosaicAddress}
      </DetailField>
    </Card>)
  }

  // 材料信息card-图片list
  renderPics(MaterialJson = [], resPicsList = []) {
    var resPics = [];
    const files = {};
    function arrTrans(num, arr) { // 一维数组转换为二维数组
      const iconsArr = []; // 声明数组
      arr.forEach((item, index) => {
        const page = Math.floor(index / num); // 计算该元素为第几个素组内
        if (!iconsArr[page]) { // 判断是否存在
          iconsArr[page] = [];
        }
        iconsArr[page].push(item);
      });
      return iconsArr;
    }
    resPicsList.forEach(item => {
      files[item.materialType] = item.fileList;
    });
    MaterialJson.forEach(item => {
      const fileArr = files[item.id];
      if (fileArr && fileArr.length > 0) {
        resPics.push(
          <DetailField type="specialPics" label={item.name}>
            <DetailImages title={item.name} fileArr={fileArr} />
          </DetailField>);
      }
    })
    resPics = arrTrans(4, resPics || []);

    //TODO 有复审页面的情况，需要再判断，增加上传图片
    // if (data.status == 15) { //复审页面
    //   console.log(files);
    //   let pics = files[90] || [];
    //   resPics.push(
    //     <div id="repairDom">
    //       <DetailField key={Math.random()} type="specialPics" label="复审材料">
    //         <ImagesUploader maxcount={5} width='178px' height='146px' onChange={this.onPicChange.bind(this, 90)} value={formatBackendImagesToFrontEnd(pics)}></ImagesUploader>
    //       </DetailField>
    //     </div>
    //   )
    // }

    return resPics.map(item => <div key={Math.random()} className="pics-list-item">{item}</div>);
  };

  onPicChange = (type, fileList) => {
    const { changeMmterialListForRepair } = this.props.store;
    changeMmterialListForRepair({ fileList, type })
  }

  /* 材料信息 */
  renderMaterials() {
    let { store: { data, MaterialJson, showViewer } } = this.props;

    if (showViewer) {
      return null;
    } else {
      return ((
        <OriginCard title="材料信息" className="pics-list-wrap">
          {this.renderPics(MaterialJson, data.materialList)}
        </OriginCard>
      ))

    }
  }

  /* 申请信息 */
  // 数据没有处理，取得对象字段可能不一样，里面的属性都是一样的
  renderApplyTable() {
    let { store: { data } } = this.props;
    function getApplicantsByKey(key) {
      let arr = [];
      if (data[key] && data[key][0] && data[key][0].applicantList) {
        data[key].map(item => {
          item.applicantList && item.applicantList.map(itemP => {
            arr.push(itemP)
          })
        })
      }
      return arr;
      // return (data[key] && data[key][0] && data[key][0].applicantList) ? data[key][0].applicantList : []
    }
    let mortgagorInfo = getApplicantsByKey("mortgagorInfo");
    let mortgageeInfo = getApplicantsByKey("mortgageeInfo");
    let debtorInfo = getApplicantsByKey("debtorInfo");
    let legalProxyInfo = getApplicantsByKey("legalProxyInfoList");
    if (data.registerType !== 3040) { // 抵押注销的情况
      return (<Card title="申请信息" rowLen={1} className="forDetailTable">
        <SubTitle>抵押权人信息</SubTitle>
        <TableDetail
          className="detail-table"
          scroll={{ x: 800 }}
          dataSource={mortgageeInfo}
          columns={DYQR_DATA}
          key={Math.random()}
        />
        <SubTitle>代理人/法人/负责人</SubTitle>
        <TableDetail
          className="detail-table"
          scroll={{ x: 800 }}
          dataSource={legalProxyInfo}
          columns={SQXX_DATA}
          key={Math.random()}
        />
        <SubTitle>抵押人信息</SubTitle>
        <TableDetail
          className="detail-table"
          scroll={{ x: 800 }}
          dataSource={mortgagorInfo}
          columns={SQXX_DATA}
          key={Math.random()}
        />
        <SubTitle>债务人信息</SubTitle>
        <TableDetail
          className="detail-table"
          scroll={{ x: 800 }}
          dataSource={debtorInfo}
          columns={SQXX_DATA}
          key={Math.random()}
        />
      </Card>)
    } else {
      return (<Card title="申请信息" rowLen={1} className="forDetailTable">
        <SubTitle>抵押人信息</SubTitle>
        <TableDetail
          className="detail-table"
          scroll={{ x: 800 }}
          dataSource={mortgagorInfo}
          columns={SQXX_DATA}
          key={Math.random()}
        />
        <div>注销说明： {data.orderReason  || "--"}</div> 
      </Card>)

    }
  }

  // 详情展示card内容
  getSimpleCardDetail(sourceData, columns) {
    return (
      columns.map(item => <DetailField key={item.key} label={item.title}>
        {toString.call(item.render) === "[object Function]" ? item.render(sourceData) : sourceData[item.key]}
      </DetailField>)
    )
  }

  // 获取当前业务需要展示的模块名
  getComponents() {
    let { store: { data } } = this.props;
    if (data.registerType !== 3040) { // 抵押注销的情况
      return ['renderOrderInfo', "renderPropertyInfo",  "renderApplyTable", "renderApplyInfo", "renderMaterials", "renderPost", 'renderLog'];
    } else {
      return ['renderOrderInfo', "renderPropertyInfo", "renderMotgageInfo", "renderApplyTable", "renderMaterials", "renderDocument", 'renderLog'];
    }
  }

  // 相关文件
  renderDocument() {
    let { store: { data } } = this.props;
    return(<Card title="相关文件" className="property-right-info forDetailTable">
      {/* 52, "签署合同中" 53, "缴纳税费中" 的详细页面。 */}
      {/* {(data.status === 62 ||data.status === 53) &&  */}
      {/* ====={JSON.stringify(data)}----- */}
      {/* ====={data.isOfflineOrder}----- */}

      {([ 30, 62, 35, 40, 52, 53, 54, 55, 71, 72 ].includes(data.status) || (data.status === 25 && ([data.applicationSignStatus].includes(1)))) && data.isOfflineOrder != 1 ?
        <div className=" clearfix">
          {/* applicationSignStatus "申请书签署状态 0-签署中；1-签署完成"  */}
          <Row>
            <Col span={3}>
              <div className="file-contenter">
                <div className="pdf-icon"><img src={pdf_icon} /></div>
                <div className="pdf-download">
                  {data.applicationSignStatus == 1 && <a onClick={this.handleDownloadFile.bind(this, 86, data.id)}>
                    下载
                  </a>}
                  {data.applicationSignStatus == 0 && '签署中'}
                </div>
              </div>
              <span className="file-name" title={"不动产抵押登记申请表"} >
                <span>不动产抵押登记申请表</span>
              </span>
            </Col>
          </Row>
        </div> : '暂无相关文件'
      }
      </Card>
    )
  }

    // 合同、申请表下载
  // GET /web/api/order/down/{materialType}/{orderId}
  // materialType 材料类型(86-申请表；87-合同)
  handleDownloadFile = (type, id) => {
    const url = `${window.location.protocol}//${
      window.location.host
    }/gm/api/order/down/${type}/${id}`;
    
    window.location.href = url;
  };

  // 底部操作按钮
  renderOperBtns() {
    let { store: { data } } = this.props;
    if (data.isShowCheckButton) {
      return (
        <Row>
          <Col span={8}></Col>
          <Col span={3}>
            <PrimaryButton onClick={this.handleOrder.bind(this, 1, '通过')}>通过</PrimaryButton>
          </Col>
          <Col span={3}>
            <DangerButton onClick={this.handleOrder.bind(this, 0, '驳回')}>驳回</DangerButton>
          </Col>
          {/* 查档审核 */}
          {data.status != 71 && (
            <Col span={3}>
              <NoBorderButton className="zzBtn" onClick={this.handleOrder.bind(this, 2, '终止')}>终止</NoBorderButton>
            </Col>
          )}
        </Row>
      )
    } else {
      return null
    }
  }

  handleOrder(type, string) {
    this.setState({
      modalVersible: true,
      operType: type,
      operPlaceholder: `请输入${string}理由（${type == 1 ? '选填' : '必填'}）`
    })
  }

  handleOk = async () => {
    const { operType } = this.state;
    const { store: { data, orderOper }, form } = this.props;
    const { getFieldValue, validateFields } = form;
    validateFields(['reason', 'money'], (errors, values) => {
      console.log('errors')
      console.log(errors)
      if (!errors) {
        orderOper(data, data.id, data.registerType, data.status, operType, values).then((res) => {
          if (res) {
            this.props.form.resetFields();
            message.success('操作成功');
            history.push("/order/audit/list");
            // this.setState({
            //   modalVersible: false
            // })
          }
        })
      } else {
      }
    });
  }
  handleCancel = () => {
    this.props.form.resetFields();
    this.setState({
      modalVersible: false,
      operType: null,
      operPlaceholder: ''
    })
  }

  // 审批对比按钮
  spBtnRender = (data) => {
    const {
      store: { showViewer }
    } = this.props;
    return (
      <div className="sp-btn-container">
        <div className="sp-btn-pro" onClick={this.setViewerContainer}>{showViewer ? '关闭对比' : '审批对比'}</div>
      </div>
    )
  }

  // 分屏操作
  setViewerContainer = () => {
    const {
      store: { showViewerData, showViewer }
    } = this.props;
    if (!showViewer) {
      const viewContainer = document.createElement('div');
      viewContainer.className = 'viewer-wrap';
      viewContainer.setAttribute('id', 'viewer-wrap');
      document.body.appendChild(viewContainer);
      document.getElementsByClassName('app-content-contaner')[0].style.marginRight = '400px';
      document.getElementsByClassName('sp-btn-pro')[0].style.right = "424px";
    }
    else {
      document.body.removeChild(document.getElementById('viewer-wrap'));
      document.getElementsByClassName('app-content-contaner')[0].style.marginRight = '0';
      document.getElementsByClassName('sp-btn-pro')[0].style.right = "24px";
    }
    showViewerData();
  }

  doRender() {
    let { store: { canAudit, data, MaterialJson, orderProcess,showViewer, showViewerData, }, form } = this.props;
    const {modalVersible, operType, operPlaceholder} = this.state;
    const { getFieldDecorator } = form;
    let {
      materialList: resPicsList, // 材料信息/图片
    } = data;
    const files = {};
    if (resPicsList && resPicsList.length) {
      resPicsList.forEach(item => {
        files[item.materialType] = item.fileList;
      });
    }
    const fileArr = [];
    if (MaterialJson && MaterialJson.length) {
      MaterialJson.forEach(cur => {
        if (files[cur.id]) fileArr.push(...files[cur.id]);
      });
    }
    const prefix = dynamicConst.getItem("filehost");
    const fullSrc = fileArr.map(item => ({
      src: `${prefix}/${item.key}.${item.ext}`,
      alt: item.originalName,
    }));
    const viewContainer = document.getElementById('viewer-wrap') || null;

    return (
      <>
        {/* 流程图 */}
        {orderProcess && <Steps processData={orderProcess} />}
        {/* TODO 审批对比按钮没做 */}
        {this.spBtnRender()}
        {/* 审批对比图 */}
        <Viewer
          activeIndex={0}
          visible={showViewer}
          onClose={showViewerData}
          images={fullSrc}
          noClose={true}
          noImgDetails={true}
          container={viewContainer}
        />
        {/* 详情部分 */}
        {this.getComponents().map(item => this[item]())}
        {/* 通过驳回终止按钮没做，已处理不展示，已复审状态不展示 */}
        {canAudit && data.status != 30 && this.renderOperBtns()}
        {<Modal
          title='审批意见'
          width='400px'
          visible={modalVersible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText='确定'
          className='mortgageDetail-oper-modal'
        >
          <Form>
            {/* 工单复审通过，无需再填登记费 */}
            { data.status == 10 && data.registerType != 3040 && operType == 1 && <FormItem label={'登记费'} className='mortgageDetail-oper-modal-input'>
              {getFieldDecorator('money', {
                initialValue:'550',
                rules: [
                  {
                    required: true,
                    message: '请输入登记费'
                  }
                ]
              })(<Input
                placeholder='请输入登记费'
                style={{width:150}}
              >
              </Input>)}
            </FormItem>}
            <FormItem>
              {getFieldDecorator('reason', {
                rules: [
                  {
                    required: operType == 1 ? false : true,
                    message: '请输入理由'
                  }
                ]
              })(<TextArea
                rows={4}
                maxLength={120}
                placeholder={operPlaceholder}
              >
              </TextArea>)}
            </FormItem>
          </Form>
        </Modal>}
      </>
    );
  }
}

export default MortgageDetail;
