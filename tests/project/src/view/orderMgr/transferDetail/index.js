import React from "react";
import { Modal, Row, Col, Card as OriginCard, Alert, Form, Input, Popover, Radio, Checkbox, message, Icon, Tooltip, Select, DatePicker } from "antd";
import { DetailPage } from "super/page";
import { inject, observer } from "mobx-react";
import { moduleName } from "./store";
import Card from "mt-card";
import Viewer from "react-viewer";
import 'react-viewer/dist/index.css';
import tools from "utils/tools";
import createForm from "utils/createForm";
import { getTitleTabs } from './components/getTitleName';
import AddFamilyModal from './components/addFamilyModal';
import { getAsyncModalInst } from 'components/asyncModal';
import ImagesUploader, { formatBackendImagesToFrontEnd } from 'components/imagesUploader';
import moment from 'moment';
import pdf_icon from "./img/pdf.png";

import {
  Steps,
  DetailField,
  TableDetail,
  PropertyInfo,
  DetailImages,
  Button
} from "components";
import dynamicConst from "common/dynamicConst";

import "./style.less";

dynamicConst.getInitialFromValue = (key, value) => {
  const item = dynamicConst.getItem(key);
  return item ? item[value] : undefined;
}

const FormItem = Form.Item;
const clsPrefix = "scdj-page";
const { PrimaryButton, DangerButton, NoBorderButton } = Button;
const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
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
// 获取当前DOM在文档流中的绝对位置
function getTop(e) {
  var offset = e.offsetTop;
  if (e.offsetParent != null) {
    offset += getTop(e.offsetParent);
  }
  return offset;
}
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

@inject(stores => ({
  store: stores[moduleName],
  userInfo: stores.frame.userInfo,
  frame: stores["frame"]
}))
@createForm({ clsPrefix })
@observer
class TransferDetail extends DetailPage {
  componentDidMount() {
    this.props.form.resetFields();
  }

  state = {
    //终止原因
    refuseReason: "",
    //通过原因
    passReason: "",
    passReason_51_10: "",
    //驳回原因
    rejectReason: "",
    buyerReason: "",
    sellerReason: "",
    filterTitleKey: '',
    postMessageState: false
  }

  buildOptions = dataArr => {
    return dataArr.map(({ id, key, name, label, value }) => {
      key = id || key || value;
      name = name || label;
      return (
        <Option key={key} value={`${key}`}>
          {name}
        </Option>
      );
    });
  };

  // 空值统一显示--
  textFieldRender = (value) => (<span>{value || '--'}</span>)

  onVisibleChange = (str = '') => {
    this.setState({
      filterTitleKey: str
    })
  }

  //获取转让人信息表格
  getSalerInfo = (obligorInfoList = [], hasFamily = true) => {
    const { filterTitleKey } = this.state;
    let newArr = [];
    let familyArr = obligorInfoList[0] ? obligorInfoList[0].allFamilyMemberList : [];
    obligorInfoList.map((item, index) => {
      newArr.push(item.applicantList[0]);
    })
    const columns1 = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        rowKey: 'name',
        width: 100,
        render: this.textFieldRender
      },
      {
        title: '共有方式',
        dataIndex: 'ownershipType',
        key: 'ownershipType',
        rowKey: 'ownershipType',
        width: 100,
        render: val => {
          return dynamicConst.getTextFromValue("ownerShipType", val)
        }
      },
      {
        title: '产权比例',
        dataIndex: 'rightProportion',
        key: 'rightProportion',
        rowKey: 'rightProportion',
        width: 100,
        render: this.textFieldRender
      },
      {
        title: '持证方式',
        dataIndex: 'holdingType',
        key: 'holdingType',
        rowKey: 'holdingType',
        width: 100,
        render: val => {
          return dynamicConst.getTextFromValue("certifiedWay", val)
        }
      },
      {
        title: '手机号码',
        dataIndex: 'mobile',
        key: 'mobile',
        rowKey: 'mobile',
        width: 130,
        render: this.textFieldRender,
      },
      {
        title: '证件类型',
        dataIndex: 'cardTypeDesc',
        key: 'cardTypeDesc',
        rowKey: 'cardTypeDesc',
        width: 100,
        render: (value, item) => (<span className={item.unanimous === 0 ? 'red' : 'blue'}>{value || '--'}</span>)
      },
      {
        title: '证件号码',
        dataIndex: 'cardNo',
        key: 'cardNo',
        rowKey: 'cardNo',
        width: 150,
        filterDropdown: (<div></div>),
        filterIcon: <Tooltip onVisibleChange={() => this.onVisibleChange('若证件类型或证件号码与核心系统数据存在差异，则有红色标注！')} placement="top" >
          <Icon type="exclamation-circle" theme="filled" />
        </Tooltip>,
        render: (value, item) => (<span className={item.unanimous === 0 ? 'red' : 'blue'}>{value || '--'}</span>)
      }
    ];
    const columns2 = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        rowKey: 'name',
        width: 100,
        render: this.textFieldRender
      },
      {
        title: '共有方式',
        dataIndex: 'ownershipType',
        key: 'ownershipType',
        rowKey: 'ownershipType',
        width: 100,
        render: val => {
          return dynamicConst.getTextFromValue("ownerShipType", val)
        }
      },
      {
        title: '产权比例',
        dataIndex: 'rightProportion',
        key: 'rightProportion',
        rowKey: 'rightProportion',
        width: 80,
        render: this.textFieldRender
      },
      {
        title: '企业/单位证件类型',
        dataIndex: 'cardType',
        key: 'cardType',
        rowKey: 'cardType',
        width: 100,
        render: val => {
          return dynamicConst.getTextFromValue("cardType", val)
        }
      },
      {
        title: '企业/单位证件号码',
        dataIndex: 'cardNo',
        key: 'cardNo',
        rowKey: 'cardNo',
        width: 130,
        render: this.textFieldRender,
      },
      {
        title: '法人/负责人姓名',
        dataIndex: 'corporationName',
        key: 'corporationName',
        rowKey: 'corporationName',
        width: 130,
        render: this.textFieldRender,
      },
      {
        title: '法人/负责人证件类型',
        dataIndex: 'corporationCardTypeDesc',
        key: 'corporationCardTypeDesc',
        rowKey: 'corporationCardTypeDesc',
        width: 120,
        render: this.textFieldRender,
      },
      {
        title: '法人/负责人证件号码',
        dataIndex: 'corporationCardNo',
        key: 'corporationCardNo',
        rowKey: 'corporationCardNo',
        width: 150,
        render: this.textFieldRender,
      },
      {
        title: '手机号码',
        dataIndex: 'mobile',
        key: 'mobile',
        rowKey: 'mobile',
        width: 130,
        render: this.textFieldRender,
      },
    ];
    return (
      <>
        <h5 className="table-detail-title">义务人</h5>
        {hasFamily ?
          <TableDetail
            className="detail-table"
            dataSource={newArr}
            columns={columns1}
            scroll={{ x: 1000 }}
            locale={{
              filterTitle: filterTitleKey || '默认', // 设一个默认是防止控制台的报错，移除以后造成filterTitle为空，失败；
            }}
          />
          :
          <TableDetail
            className="detail-table"
            dataSource={newArr}
            columns={columns2}
            scroll={{ x: 1000 }}
            locale={{
              filterTitle: filterTitleKey || '默认', // 设一个默认是防止控制台的报错，移除以后造成filterTitle为空，失败；
            }}
          />
        }
        {hasFamily ? this.renderFamily(familyArr, 'obligorInfoList') : ''}
      </>
    );
  }
  //获取受让人信息表格
  getBuyerInfo = (obligeeInfoList = [], hasFamily = true) => {
    let newArr = [];
    let familyArr = obligeeInfoList[0] ? obligeeInfoList[0].allFamilyMemberList : [];
    obligeeInfoList.map((item, index) => {
      newArr.push(item.applicantList[0]);
    })
    const columns1 = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        rowKey: 'name',
        width: 100,
        render: this.textFieldRender
      },
      {
        title: '共有方式',
        dataIndex: 'ownershipType',
        key: 'ownershipType',
        rowKey: 'ownershipType',
        width: 100,
        render: val => {
          return dynamicConst.getTextFromValue("ownerShipType", val)
        }
      },
      {
        title: '产权比例',
        dataIndex: 'rightProportion',
        key: 'rightProportion',
        rowKey: 'rightProportion',
        width: 100,
        render: this.textFieldRender
      },
      {
        title: '持证方式',
        dataIndex: 'holdingType',
        key: 'holdingType',
        rowKey: 'holdingType',
        width: 100,
        render: val => {
          return dynamicConst.getTextFromValue("certifiedWay", val)
        }
      },
      {
        title: '手机号码',
        dataIndex: 'mobile',
        key: 'mobile',
        rowKey: 'mobile',
        width: 130,
        render: this.textFieldRender,
      },
      {
        title: '证件类型',
        dataIndex: 'cardTypeDesc',
        key: 'cardTypeDesc',
        rowKey: 'cardTypeDesc',
        width: 100,
        render: this.textFieldRender,
      },
      {
        title: '证件号码',
        dataIndex: 'cardNo',
        key: 'cardNo',
        rowKey: 'cardNo',
        width: 150,
        render: this.textFieldRender,
      }
    ];
    const columns2 = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        rowKey: 'name',
        width: 100,
        render: this.textFieldRender
      },
      {
        title: '共有方式',
        dataIndex: 'ownershipType',
        key: 'ownershipType',
        rowKey: 'ownershipType',
        width: 100,
        render: val => {
          return dynamicConst.getTextFromValue("ownerShipType", val)
        }
      },
      {
        title: '产权比例',
        dataIndex: 'rightProportion',
        key: 'rightProportion',
        rowKey: 'rightProportion',
        width: 80,
        render: this.textFieldRender
      },
      {
        title: '企业/单位证件类型',
        dataIndex: 'cardType',
        key: 'cardType',
        rowKey: 'cardType',
        width: 100,
        render: val => {
          return dynamicConst.getTextFromValue("cardType", val)
        }
      },
      {
        title: '企业/单位证件号码',
        dataIndex: 'cardNo',
        key: 'cardNo',
        rowKey: 'cardNo',
        width: 130,
        render: this.textFieldRender,
      },
      {
        title: '法人/负责人姓名',
        dataIndex: 'corporationName',
        key: 'corporationName',
        rowKey: 'corporationName',
        width: 130,
        render: this.textFieldRender,
      },
      {
        title: '法人/负责人证件类型',
        dataIndex: 'corporationCardTypeDesc',
        key: 'corporationCardTypeDesc',
        rowKey: 'corporationCardTypeDesc',
        width: 120,
        render: this.textFieldRender,
      },
      {
        title: '法人/负责人证件号码',
        dataIndex: 'corporationCardNo',
        key: 'corporationCardNo',
        rowKey: 'corporationCardNo',
        width: 150,
        render: this.textFieldRender,
      },
      {
        title: '手机号码',
        dataIndex: 'mobile',
        key: 'mobile',
        rowKey: 'mobile',
        width: 130,
        render: this.textFieldRender,
      },
    ];
    return (
      <>
        <h5 className="table-detail-title">权利人</h5>
        {hasFamily ?
          <TableDetail
            className="detail-table"
            dataSource={newArr}
            columns={columns1}
            scroll={{ x: 1000 }}
          />
          :
          <TableDetail
            className="detail-table"
            dataSource={newArr}
            columns={columns2}
            scroll={{ x: 1000 }}
          />
        }
        {hasFamily ? this.renderFamily(familyArr, 'obligeeInfoList') : ''}
      </>
    );
  }
  renderFamily = (data, type) => {
    const { data: { status } } = this.props.store;
    const familyColums = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        rowKey: 'name',
        render: this.textFieldRender
      },
      {
        title: '证件类型',
        dataIndex: 'cardTypeDesc',
        key: 'cardTypeDesc',
        rowKey: 'cardTypeDesc',
        render: this.textFieldRender,
      },
      {
        title: '证件号码',
        dataIndex: 'cardNo',
        key: 'cardNo',
        rowKey: 'cardNo',
        render: this.textFieldRender,
      }
    ];
    if ([10, 51, 55].indexOf(status) > -1) {
      familyColums.push(
        {
          title: <DangerButton className="table-btn" onClick={this.onFamilyMemberAddHandler.bind(this, type)}>新增成员</DangerButton>,
          dataIndex: 'familyMemberList',
          key: 'familyMemberList',
          rowKey: 'familyMemberList',
          width: 150,
          render: (value, item, index) => {
            return item.editFlag == 2 && <DangerButton className="table-btn" onClick={this.onFamilyMemberDelHandler.bind(this, { index, type })}>删除成员</DangerButton>
          }
        })
    }
    return <>
      <h5 className="table-detail-title">家庭信息</h5>

      <TableDetail
        className="detail-table"
        dataSource={data}
        columns={familyColums}
        scroll={{ x: 1000 }}
      />
    </>
  }
  /**
 * 删除家庭成员
 * @param index 数组中家庭数据索引
 * @param type 家庭成员类型
 */
  onFamilyMemberDelHandler = ({ index, type }) => {
    const { deleteFamilyMember } = this.props.store;
    Modal.confirm({
      content: '是否确定删除该家庭成员',
      okText: '确认',
      cancelText: '取消',
      onOk: () => { deleteFamilyMember({ index, type }) }
    });
  }
  /**
   * 添加家庭成员
   * @param familyIndex 数组中家庭数据索引
   * @param type 家庭成员类型
   */
  onFamilyMemberAddHandler = (type) => {
    const { toggleFamilyModal, addFamilyMember } = this.props.store;
    toggleFamilyModal(true);
    this.addFamilyMember = (() => {
      return (value) => addFamilyMember({ ...value, type })
    })()
  };

  //询问信息
  getAskInfo = (info, owner, type, showSuffixStr) => {
    return (
      <div className="askInfo">
        <h3>{!showSuffixStr ? '申请人询问信息' : (type === "sell" ? "转让人询问信息" : "受让人询问信息")}</h3>
        <div className="container">
          <p>1.申请事项是否为申请人真实意思？<span className="answer">{info.isReal ? "是" : "否"}</span></p>
          <p>2.申请登记的房屋有无共有人？<span className="answer">{info.haveJoinOwner ? "是" : "否"}</span></p>
          {(info.haveJoinOwner && owner.length !== 0) ? owner.map((item, index) => {
            return (
              <span key={index} className="ownerName" onClick={this.showOwner.bind(this, item.name, item.mobile, item.cardType, item.cardNo)}>{item.name || "--"}</span>
            )
          }) : ""}
          <p>3.是否保证所提交的申请登记材料、申请信息真实、合法、有效，如有不实，愿承担一切法律责任，与登记机构无关？<span className="answer">{info.isLaw ? "是" : "否"}</span></p>
        </div>
      </div>
    )
  }
  //展示共有人
  showOwner = (name, mobile, cardType, cardNo) => {
    Modal.info({
      title: '共有人详情',
      className: "ownerModel",
      content: (
        <div>
          <p>姓名：{name || '--'}</p>
          <p>手机号：{mobile || '--'}</p>
          <p>{dynamicConst.getTextFromValue("cardType", cardType) || '--'}：{cardNo || '--'}</p>
        </div>
      ),
      okText: "确定"
    });
  }

  showFamilyInfo = obj => {
    let { store: { setFamilyInfo } } = this.props;
    setFamilyInfo(obj);
  }

  // 产权信息
  getPropertyInfo = (data, isBtnShow) => {
    const {
      userInfo: { department },
      location
    } = this.props;
    const { orderHouseList = [], registerType, id, orderLandInfo = [] } = data;
    let lists = []
    if (registerType === 5010) {
      lists = [
        { landUsageDesc: orderLandInfo['tdyt'], landDroitNature: orderLandInfo['qlxz'] },
      ]
    } else {
      lists = orderHouseList
    }
    const { search } = location;
    return (
      <PropertyInfo
        orderHouseList={lists}
        getCardInfo={this.getCardInfo}
        department={department}
        orderId={id}
        search={search}
        isBtnShow={isBtnShow}
        registerType={registerType}
      />
    );
  };
  // 产权信息card
  getCardInfo = (cardInfo, data) => {
    return Object.keys(cardInfo).map(key => {
      let value;
      if (cardInfo[key].endsWith("面积")) {
        value = data[key] ? `${data[key]} ㎡` : "--";
      } else if (
        cardInfo[key].endsWith("估价") ||
        cardInfo[key].endsWith("总价") ||
        cardInfo[key].endsWith("数额")
      ) {
        value = data[key] ? `${data[key]} 元` : "--";
      } else if (cardInfo[key] === "楼层") {
        value =
          ((data.inFloor || data.totalFloor) &&
            `${data.inFloor}层/${data.totalFloor}层`) ||
          "--";
      } else if (cardInfo[key] === "土地使用期限") {
        if (data.landUseStart && data.landUseEnd) {
          value = `${data.landUseStart} 至 ${data.landUseEnd}`;
        } else {
          value = "--";
        }
      } else if (cardInfo[key] === "建筑年代") {
        value = data.buildYear ? `${data.buildYear}年` : "--";
      }
      else if (cardInfo[key] === "土地权利性质") {
        value = dynamicConst.getTextFromValue("natureRight", data.landDroitNature)
      }
      // 工单信息 登记类别
      else if (cardInfo[key] === "登记类别") {
        const registerType = dynamicConst.getItem("registerType");
        value = registerType[data[key]];
      }
      // 工单信息 处理人
      else if (cardInfo[key] === "处理人") {
        let status = data.statusDesc;
        if (
          status === "已登簿" ||
          status === "已出证" ||
          status === "复审通过" ||
          status === "复审失败"
        ) {
          value = "--";
        } else {
          value = data[key];
        }
      }
      // 邮寄信息 是否邮寄
      else if (cardInfo[key] === "不动产单元是否灭失") {
        data[key] !== 0
          ? data[key] === 1
            ? (value = "是")
            : (value = "否")
          : (value = "--");
      }
      //转移信息  
      else if (cardInfo[key] === "产权类别") {
        const registerType = dynamicConst.getItem("propertyCategory");
        value = registerType[data[key]];
      }
      //转移信息  
      else if (cardInfo[key] === "房屋性质") {
        const registerType = dynamicConst.getItem("natureHouse");
        value = registerType[data[key]];
      }
      else if (cardInfo[key] === "收件地址") {
        value = data.addressInfo
          ? data.addressInfo.mosaicAddress
            ? data.addressInfo.mosaicAddress
            : "--"
          : "--";
      } else if (cardInfo[key] === "产证/证明邮寄") {
        value = "是";
      } else {
        value = data[key];
      }

      if (this.state.postMessageState === true) {
        const { houseInfo, landProperty } = this.state.postMessageData
        const postMessageDatas = { ...houseInfo, ...landProperty }
        switch (key) {
          case 'warrantNumber':
            value = postMessageDatas['bdczl']
            break;
          case 'unitNumber':
            value = postMessageDatas['bdcdyh']
            break;
          case 'fullAddress':
            value = postMessageDatas['bdczl']
            break;
          case 'propertyCategory':
            value = postMessageDatas['cqlb']
            break;
          case 'planUseDesc':
            value = postMessageDatas['fwyt']
            break;
          case 'floor':
            value = postMessageDatas['lc']
            break;
          case 'houseStructureDesc':
            value = postMessageDatas['fwjg']
            break;
          case 'natureHouse':
            value = postMessageDatas['fwxz']
            break;
          case 'space':
            value = postMessageDatas['tnjzmj']
            break;
          //峻工时间
          case 'buildYear':
            value = postMessageDatas['jgrq']
            break;
          case 'eastWall':
            value = postMessageDatas['dq']
            break;
          case 'southWall':
            value = postMessageDatas['nq']
            break;
          case 'westernWall':
            value = postMessageDatas['xq']
            break;
          case 'northWall':
            value = postMessageDatas['bq']
            break;
          //土地用途
          case 'landUsageDesc':
            value = postMessageDatas['tdyt']
            break;
          case 'landDroitNature':
            value = postMessageDatas['qlxz']
            break;
        }
      }
      return <DetailField key={cardInfo[key]} label={cardInfo[key]}>{value}</DetailField>
    });
  };

  // 材料信息card-图片list
  renderPics = (MaterialJson = [], resPicsList = []) => {
    const { store } = this.props;
    const { data: { status }, pageNameMap, needRepairHelp, canAudit } = store;
    var resPics = [];
    const files = {};
    resPicsList.forEach(item => {
      files[item.materialType] = item.fileList;
    });
    MaterialJson.forEach(item => {
      const fileArr = files[item.id];

      if (canAudit && ((status == 15 && item.id == 34) || (pageNameMap[status] === 4 && item.id == 90))) return;
      if (fileArr && fileArr.length > 0) {
        resPics.push(
          <DetailField type="specialPics" label={item.name}>
            <DetailImages title={item.name} fileArr={fileArr} />
          </DetailField>);
      }
    })
    resPics = arrTrans(4, resPics || []);
    if (canAudit && status == 15) { // 维修资金预审 
      let pics = files[34] || [];
      resPics.push(
        <DetailField key={Math.random()} type="specialPics" label="维修资金缴纳证明">
          {/* 34: 维修基金缴纳凭证  材料类型值 */}
          <ImagesUploader maxcount={5} width='178px' height='146px' onChange={this.onPicChange.bind(this, 34)} value={formatBackendImagesToFrontEnd(pics)}></ImagesUploader>
        </DetailField>
      )
    }
    if (canAudit && pageNameMap[status] === 4) { //复审页面
      let pics = files[90] || [];
      resPics.push(
        <div id="repairDom">
          <DetailField key={Math.random()} type="specialPics" label="复审材料">
            {/* 90: 维修基金缴纳凭证  材料类型值 */}
            <ImagesUploader maxcount={5} width='178px' height='146px' onChange={this.onPicChange.bind(this, 90)} value={formatBackendImagesToFrontEnd(pics)}></ImagesUploader>
          </DetailField>
          {needRepairHelp ? <div className="red">请上传复审材料</div> : ''}
        </div>
      )
    }
    return resPics.map(item => <div  key={Math.random()} className="pics-list-item">{item}</div>);
  };
  onPicChange = (type, fileList) => {
    const { changeMmterialListForRepair } = this.props.store;
    changeMmterialListForRepair({ fileList, type })
  }
  // 操作记录table
  createOptInfoColumns = data => [
    ...data
  ];


  onBtmBtnClick = (orderId, isPass) => {
    getAsyncModalInst(this.addBtmBtnModalInst).open({ orderId, isPass })
  };

  /** 终止工单弹窗 */
  onStopOrderClick = orderId => {
    getAsyncModalInst(this.endOrderModalInst).open({ orderId })
  };

  // 判断是否显示当前card
  getTitleShow = (index, registerType) => {
    if (!registerType) {
      return false
    }
    let titleList = getTitleTabs(registerType);
    let titleListNum = titleList.filter(item => item.id === index)
    return titleListNum.length > 0 && titleListNum[0].id;
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

  // 渲染驳回 & 终止原因
  renderNotice = (status, message) => {
    return (status === 20 || status === 25) && (
      <div className="notice-container">
        <Alert message={message} type="error" showIcon />
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
  //同步数据
  syncData = () => {
    const { store } = this.props
    store.getSynchronousData(e => {
      if (e.success) {
        sessionStorage.setItem('postMessage', e.data)
        this.setState({
          postMessageState: true,
          postMessageData: e.data
        })
      }
    });
  }
  //中止/驳回 按钮的事件处理函数--在这个事件处理函数中，通过 store 里面 操作 versible 的方法 handleVersible() 来修改 versible 的 状态 从而控制 模态框的 显示影藏
  handleVersibleOk_bh = () => {
    const { store } = this.props;
    store.handleVersible(true);
    store.setOrderStatus(1)
  };

  //有无土地出让金radio
  changeOrderNontax = (e) => {
    this.props.store.isTransfer = e.target.value;
  }
  //有无维修资金radio
  changeRepair = (e) => {
    this.props.store.isRepair = e.target.value;
  }

  changeSellerMsg = (e) => {
    this.props.store.sellerMsg = e.target.checked;
  }
  changeBuyerMsg = (e) => {
    this.props.store.buyerMsg = e.target.checked;
  }

  //终止按钮的事件处理程序
  handleVersibleOk_zz = () => {
    const { store } = this.props;
    store.handleVersible(true);
    store.setOrderStatus(0)
  }
  //终止弹窗取消
  handleVersibleCancel = e => {
    const { store } = this.props;
    store.handleVersible(false);
  };
  //终止事件
  handleOk_zz = () => {
    const { refuseReason } = this.state;
    const { store, form } = this.props;
    const { data: { id, status }, pageNameMap, orderEnd } = store;
    form.validateFields(['refuseReason'], (error, values) => {
      if (!error) {
        const OrderCheckForm = {
          orderId: id, reason: refuseReason, status: status, pageName: pageNameMap[status],
        }
        orderEnd(OrderCheckForm);
      }
    });
  }

  //通过按钮的事件处理程序
  handlePassVersibleOk = () => {
    const { store, form } = this.props;
    const { data: { status, isInfoMissing }, checkOrderStatus, pageNameMap } = store;
    if (isInfoMissing != 1 && status === 50) {
      message.error('您还有未补录的信息，请核对！');
      return false
    } else if ([2, 3].indexOf(pageNameMap[status]) > -1) { //2-受理预审 , 3-维修资金预审
      form.setFieldsValue({ 'maintainCapital': this.getInitialRepairPrice() });
      store.handlePassVersible_51_10(true);
    } else if (status === 54) { //复审
      store.handlePassVersible_54(true);
    } else if (status === 50) { //1-权籍预审
      checkOrderStatus({
        isPass: 1
      });
    }
  }
  //通过弹窗取消
  handlePassVersibleCancel = () => {
    const { store } = this.props;
    const { data: { status }, pageNameMap } = store;
    if ([2, 3].indexOf(pageNameMap[status]) > -1) { //2-受理预审 , 3-维修资金预审
      store.handlePassVersible_51_10(false);
    } else if (status === 54) { //复审
      store.handlePassVersible_54(false);
    }
  }
  //通过事件
  handlePassOk = async () => {
    const { passReason, passReason_51_10 } = this.state;
    const { store, form } = this.props;
    const { getFieldValue, validateFields } = form;
    const { data: { id, status, isInfoMissing,
      orderNontaxDTO = {},  //非税信息
      orderHouseList = [],  //房屋信息
      materialList = [],
      registerType,
      orderLandInfo = {},
    }, checkOrderStatus, pageNameMap, changeNeedRepairHelp } = store;
    let OrderCheckForm = {
      isPass: 1,
      orderId: id,
      reason: passReason || passReason_51_10,
      buyerReason: "",
      sellerReason: "",
      status: status,
      orderNontaxDTO: orderNontaxDTO
    }
    // 土地轉移使用orderLandInfo，否則拿orderHouseList的第一個數據
    let dialogReinfo = registerType == '5010' ? {
      ...orderLandInfo,
      landDroitNature: orderLandInfo.qlxzDesc,
      landUseStart: orderLandInfo.syqxq,
      landUseEnd: orderLandInfo.syqxz
    } : (orderHouseList[0] || {});
    if (isInfoMissing != 1 && status === 50) {
      message.error('您还有未补录的信息，请核对！');
      return false
    }
    if (status == 54) {
      let pics = materialList.find(item => item.materialType == 90);
      if (!(pics && pics.fileList && pics.fileList.length)) {
        changeNeedRepairHelp(true);
        window.scrollTo(window.pageXOffset, getTop(document.getElementById('repairDom')));
      } else {
        checkOrderStatus({ ...OrderCheckForm, isPass: 1 });
      }
    } else {
      validateFields(['registerFee', 'cost', 'isTransfer', 'price', 'isMaintain', 'maintainCapital', 'landUseRange', 'natureRight', 'natureHouse', 'propertyCategory', 'propertySource', 'registerSubType'], (errors, values) => {
        if (!errors) {
          //如果状态是15 则为可修改的form 非税信息要变
          if (pageNameMap[status] === 2 || pageNameMap[status] === 3) {
            let obj = {};
            obj.registerFee = +getFieldValue("registerFee");
            obj.cost = +getFieldValue("cost");
            obj.isTransfer = getFieldValue("isTransfer");
            obj.price = +getFieldValue("price");
            obj.isMaintain = getFieldValue("isMaintain");
            obj.maintainCapital = +getFieldValue("maintainCapital");
            OrderCheckForm.orderNontaxDTO = obj;
          }
          if (pageNameMap[status] === 2) {// 当前页面的值 2-受理预审
            let landUseRange = getFieldValue("landUseRange");
            let landUseEnd = landUseRange[1].format("YYYY-MM-DD") || dialogReinfo.landUseEnd;
            let landUseStart = landUseRange[0].format("YYYY-MM-DD") || dialogReinfo.landUseStart
            OrderCheckForm = {
              ...OrderCheckForm,
              transferAdditionalInfo: {
                landDroitNature: window.isNaN(parseInt(getFieldValue("natureRight"))) ? dialogReinfo.natureRight : +getFieldValue("natureRight"),
                natureHouse: window.isNaN(parseInt(getFieldValue("natureHouse"))) ? dialogReinfo.natureHouse : +getFieldValue("natureHouse"),
                propertyCategory: window.isNaN(parseInt(getFieldValue("propertyCategory"))) ? dialogReinfo.propertyCategory : +getFieldValue("propertyCategory"),
                propertySource: window.isNaN(parseInt(getFieldValue("propertySource"))) ? dialogReinfo.propertySource : +getFieldValue("propertySource"),
                registerSubType: window.isNaN(parseInt(getFieldValue("registerSubType"))) ? dialogReinfo.registerSubType : +getFieldValue("registerSubType"),
                landUseEnd,
                landUseStart
              },
              registerSubType: window.isNaN(parseInt(getFieldValue("registerSubType"))) ? dialogReinfo.registerSubType : +getFieldValue("registerSubType")
            }
          }
          checkOrderStatus(OrderCheckForm);
        }
      });
    }
  }

  //驳回按钮的事件处理程序
  handleRejectVersibleOk = () => {
    const { store } = this.props;
    const { data: { status } } = store;
    // 维修资金预审 //复审
    if (status === 15 || status === 54) {
      store.handleRejectVersible_15(true);
    } else if (status === 10 || status === 51 || status === 55) {// 受理预审
      store.handleRejectVersible_10(true);
    }
  }
  //驳回按钮取消
  handleRejectVersibleCancel = () => {
    const { store } = this.props;
    const { data: { status } } = store;
    if (status === 15 || status === 54) {
      store.handleRejectVersible_15(false);
    } else if (status === 10 || status === 51 || status === 55) {
      store.handleRejectVersible_10(false);
    }
  }
  //驳回事件
  handleRejectOk = async () => {
    const { store, form } = this.props;
    const { data: { status, id }, checkOrderStatus, buyerMsg, sellerMsg, rejectVersible_15 } = store;
    form.validateFields([sellerMsg ? 'sellerReason' : '', buyerMsg ? 'buyerReason' : '', rejectVersible_15 ? 'rejectReason' : ''], (errors, values) => {
      if (!errors) {
        if (status === 15 || status === 54) {
          const { rejectReason, sellerReason, buyerReason } = this.state;
          let OrderCheckForm = {
            isPass: 0,
            orderId: id,
            reason: rejectReason || "",
            buyerReason: buyerReason || "",
            sellerReason: sellerReason || "",
            status: status,
            orderNontaxDTO: {}
          }
          checkOrderStatus(OrderCheckForm);
        } else if (status === 10 || status === 51 || status === 55) {
          const { buyerReason, sellerReason } = this.state;
          const { buyerMsg, sellerMsg, data } = store;
          const { orderNontaxDTO } = data;
          let OrderCheckForm = {
            orderId: id,
            reason: "",
            buyerReason: buyerReason || "",
            sellerReason: sellerReason || "",
            status: status,
            orderNontaxDTO: orderNontaxDTO
          }
          if (sellerMsg && buyerMsg) {
            OrderCheckForm.isPass = 5;
          } else if (!sellerMsg && buyerMsg) {
            OrderCheckForm.isPass = 4;
          } else if (sellerMsg && !buyerMsg) {
            OrderCheckForm.isPass = 3;
          } else {
            message.error("请至少选择一项");
            return false
          }
          checkOrderStatus(OrderCheckForm);
        }
      }
    });
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

  getInitialRepairPrice() {
    const { orderHouseList } = this.props.store.data;
    const { planUse, space, tradePrice } = orderHouseList[0] || {};

    if (planUse == 10 || planUse == 11) { // 房屋用途为住宅或者成套住宅，建筑面积* 25.5
      return space ? (+space) * 25.5 : undefined;
    } else { // 购房价格* 0.03
      return tradePrice ? (+tradePrice) * 0.03 : undefined;
    }
  }

  doRender() {
    let {
      store: {
        entity: { fn = undefined },
        data,
        MaterialJson,
        showFamilyInfoFlag,
        familyInfoTitle,
        familyMemberList,
        hideFamilyInfo,
        showViewer,
        showViewerData,
        versible, //中止 模态框 显示隐藏状态
        passVersible_51_10,//通过模态框 显示隐藏状态
        passVersible_54,//通过模态框 显示隐藏状态
        rejectVersible_15,//驳回模态框 显示隐藏状态
        rejectVersible_10,//驳回模态框 显示隐藏状态
        registerFee,
        cost,
        isRepair,//有无维修资金
        repairPrice, //维修资金
        isTransfer = 1,
        price,
        buyerMsg,
        sellerMsg,
        showFamilyModal,
        toggleFamilyModal,
        orderProcess,
        pageNameMap,
        canAudit
      },
      frame: { isEstateCenter }
    } = this.props;

    let {
      id: orderId,
      registerType,
      status,
      orderLandInfo = {}, // 土地信息
      orderHouseList = [], // 产权信息
      obligorInfoList = [], // 申请人信息-义务人信息
      obligeeInfoList = [], // 申请人信息-权利人信息
      materialList: resPicsList, // 材料信息/图片
      isPost,
      orderMail = {}, // 邮寄信息
      checkLogList = [], // 操作记录
      transactionInfo = {}, //交易信息
      sellerAskInfo = {}, //转让人询问信息
      sellerSetNumber = null, //转让人套次
      sellerOwner = [], //转让人共有人
      buyerAskInfo = {}, //受让人询问信息
      buyerSetNumber = null, //受让人套次
      buyerOwner = [], //受让人共有人
      isInfoMissing = 0, //判断产权数据是否缺失,1:没有缺失，0：有缺失
      isShowTaxesButton = false, //税费信息按钮的展示
      isShowStatusQuoButton = false,  //现状信息按钮的展示
    } = data;
    const styleProps = { style: { fontWeight: 'bold' } };
    const styleProps_btn = { style: { color: '#448AFF', cursor: 'pointer' } };

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
    const registerSubType = dynamicConst.getArray("registerSubType");
    const propertySource = dynamicConst.getArray("propertySource");
    const propertyCategory = dynamicConst.getArray("propertyCategory");
    const natureHouse = dynamicConst.getArray("natureHouse");
    const natureRight = dynamicConst.getArray("natureRight");
    const fullSrc = fileArr.map(item => ({
      src: `${prefix}/${item.key}.${item.ext}`,
      alt: item.originalName,
    }));
    //判断是不是企业  有没有家庭
    const hasobligeeFamily = obligeeInfoList && obligeeInfoList[0] && obligeeInfoList[0].isEnterPrise !== 1;
    const hasobligorFamily = obligorInfoList && obligorInfoList[0] && obligorInfoList[0].isEnterPrise !== 1;

    const viewContainer = document.getElementById('viewer-wrap') || null;

    let isBtnShow = isShowStatusQuoButton;

    //处理 权利人数据的格式
    let QLRXX_INFO_DATA = []

    if (obligeeInfoList[0]) {
      let { applicantList } = obligeeInfoList[0]
      applicantList.forEach(item => {
        if (item) {
          // 创建一个新的对象
          QLRXX_INFO_DATA.push({ ...item })
        }
      })

    }

    QLRXX_INFO_DATA.forEach(item => {
      const address = item.address
      const postCode = item.postcode
      const mobile = item.mobile
      item.address = <Popover
        title="通讯地址"
        trigger="click"
        content={address ? address : "--"}
      >
        <Button type="primary" style={{ textAlign: "left" }}>查看详情</Button>
      </Popover>
      item.postcode = postCode ? postCode : "--"
      item.mobile = mobile ? item.mobile : "--"
    })

    //处理 法定代表人数据
    let FDDBR_INFO_DATA = []

    if (obligeeInfoList[0]) {
      let { applicantList } = obligeeInfoList[0]
      applicantList.forEach(item => {
        if (item) {
          // 创建一个新的对象
          FDDBR_INFO_DATA.push({ ...item })
        }
      })

    }
    FDDBR_INFO_DATA.forEach(item => {
      const mobile = item.mobile
      item.mobile = mobile ? item.mobile : "--"
    })

    const { form } = this.props;
    const { getFieldDecorator } = form;

    // 是否是（土地转移或者二手房转移）
    const showSuffixStr = registerType === 5010 || registerType === 5030;
    // 土地轉移使用orderLandInfo，否則拿orderHouseList的第一個數據
    let dialogReinfo = registerType == '5010' ? {
      ...orderLandInfo,
      landDroitNature: orderLandInfo.qlxz,
      landUseStart: orderLandInfo.syqxq,
      landUseEnd: orderLandInfo.syqxz
    } : (orderHouseList[0] || {});

    return (
      <>
        {
          (isInfoMissing == 0 && status === 50) &&
          <div className="extra-part">
            <p>
              提示：产权数据缺失，请前往核心系统完善数据后，点击“同步数据”
            </p>
          </div>
        }
        {orderProcess && <Steps processData={orderProcess} />}

        {/* 审批对比按钮 */}
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

        {/* 工单信息 */}
        <Card title="工单信息">
          <DetailField label="工单编号">{data.orderNo}</DetailField>
          <DetailField label="登记类别">
            {dynamicConst.getTextFromValue("registerType", registerType)}
          </DetailField>
          <DetailField label="工单状态">{data.statusDesc}</DetailField>
          <DetailField label="提交时间">{data.submitTime}</DetailField>
        </Card>

        {/* 交易信息 */} <Card title="交易信息" extra={
          <span id="thisTradeInfo">
            {isBtnShow ?
              <NoBorderButton
                className="statusInfoBtn"
                onClick={() => {
                  window.open(`/gm/order/audit/statusInfoDetail?id=${orderId}&registerType=${registerType}&flag=current`)
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

            {isShowTaxesButton ?
              <NoBorderButton
                className="statusInfoBtn"
                onClick={() =>
                  window.open(`/gm/order/audit/taxInfoDetail?id=${orderId}&registerType=${registerType}`)
                }
              >
                税费信息
            </NoBorderButton>
              : ''
            }
          </span>
        }>
          <DetailField label="购房价格">{transactionInfo ? transactionInfo.price : '--'}</DetailField>
          <DetailField label="缴纳税费主体">{transactionInfo ? transactionInfo.mainBody : '--'}</DetailField>
          <DetailField label="产权来源">{transactionInfo ? transactionInfo.source : '--'}</DetailField>
        </Card>
        {showSuffixStr && (
          <Card title={showSuffixStr ? "申请信息（转让人）" : "申请信息"} extra={<span {...styleProps}>
            家庭总套次：
              {isBtnShow && <span {...styleProps_btn} onClick={() =>
              window.open(`/gm/order/audit/setInfoDetail?id=${orderId}&registerType=${registerType}&flag=current`)
            }>{sellerSetNumber}套</span>}
            {!isBtnShow && <span>{sellerSetNumber}套</span>}
          </span>} rowLen={1} className="forDetailTable">
            {
              (obligorInfoList &&
                this.getSalerInfo(obligorInfoList, hasobligorFamily)//受理预审展示家庭信息
              )
            }
            {(sellerAskInfo !== {} &&
              this.getAskInfo(sellerAskInfo, sellerOwner, "sell", showSuffixStr)
            )
            }
          </Card>
        )}
        <Card title={showSuffixStr ? "申请信息（受让人）" : "申请信息"} extra={hasobligeeFamily && <span {...styleProps}
        >家庭总套次：
            {isBtnShow && <span {...styleProps_btn} onClick={() =>
            window.open(`/gm/order/audit/setInfoDetail?id=${orderId}&registerType=${registerType}&flag=current`)
          }>{buyerSetNumber}套</span>}
          {!isBtnShow && <span>{buyerSetNumber}套</span>}
        </span>} rowLen={1} className="forDetailTable">
          {
            (obligeeInfoList &&
              this.getBuyerInfo(obligeeInfoList, hasobligeeFamily)//受理预审展示家庭信息
            )
          }
          {(buyerAskInfo !== {} &&
            this.getAskInfo(buyerAskInfo, buyerOwner, "buy", showSuffixStr)
          )
          }
          <h5 className="forFont">邮寄信息</h5>
          <DetailField label="产证/证明邮寄">
            {isPost === 2 ? "否" : "是"}
          </DetailField>
          <DetailField label="收件人">{orderMail.consignee}</DetailField>
          <DetailField label="手机号">{orderMail.mobile}</DetailField>
          <DetailField label="收件地址">
            {orderMail.addressInfo && orderMail.addressInfo.mosaicAddress}
          </DetailField>
        </Card>

        {/** 申请人信息-家庭成员弹窗*/}
        <Modal
          className="modal-family"
          width={520}
          title={`${familyInfoTitle}的家庭成员`}
          footer={null}
          visible={showFamilyInfoFlag}
          onCancel={hideFamilyInfo}
        >
          {
            <div className="modal-family-info">
              {
                familyMemberList.map(item => (
                  <Row key={item.cardNo} className="family-info-list">
                    <span className='user-name'>姓名： {item.name}</span>
                    <span className="user-card">{item.cardTypeDesc}号： {item.cardNo}</span>
                  </Row>
                )
                )
              }
            </div>
          }
        </Modal>

        {/* 不动产基本信息 */}
        {<Card title="不动产基本信息" extra={
          <NoBorderButton
            className="tbBtn"
            onClick={this.syncData}
          >
            同步数据
          </NoBorderButton>
        } className="property-right-info forDetailTable">
          {this.getPropertyInfo(data, isBtnShow)}
        </Card>}
        {/* 材料信息 */}
        {!showViewer && (
          <OriginCard title="材料信息" className="pics-list-wrap">
            {this.renderPics(MaterialJson, resPicsList)}
          </OriginCard>
        )}

        {/* 相关文件 */}
        {<Card title="相关文件" className="property-right-info forDetailTable">

          {/* 52, "签署合同中" 53, "缴纳税费中" 的详细页面。 */}
          {/* {(data.status === 62 ||data.status === 53) &&  */}
          {/* ====={JSON.stringify(data)}----- */}
          {/* ====={data.isOfflineOrder}----- */}
          {([ 30, 62, 35, 40, 52, 53, 54, 55 ].includes(data.status) || (data.status === 25 && ([data.contractSignStatus, data.applicationSignStatus].includes(1)))) && data.isOfflineOrder != 1 ?
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
                  <span className="file-name" title={data.registerType == 5020 ? "不动产所有权登记申请信息表" : "不动产所有权转移登记申请信息表"} >
                    {data.registerType == 5020 && <span>不动产所有权登记申请信息表</span>}
                    {data.registerType != 5020 && <span>不动产所有权转移登记申请信息表</span>}
                  </span>
                </Col>
              {/* contractSignStatus "合同签署状态 0-签署中；1-签署完成" */}
              {data.registerType == 5030 &&
                <Col span={3}>
                  <div className="file-contenter">
                    <div className="pdf-icon"><img src={pdf_icon} /></div>
                    <div className="pdf-download">
                      {data.contractSignStatus == 1 && <a onClick={this.handleDownloadFile.bind(this, 87, data.id)}>
                        下载
                      </a>}
                      {data.contractSignStatus == 0 && '签署中'}
                    </div>
                  </div>
                  <span className="file-name" title={'鹤岗市不动产买卖合同'} href="javascript:;" >
                    鹤岗市不动产买卖合同
                  </span>
                </Col>
              }
              </Row>
            </div> : '暂无相关文件'
          }
        </Card>}
        <Card title="操作记录" rowLen={1} className="forDetailTable">
          {checkLogList &&
            <TableDetail
              className="detail-table"
              scroll={{ x: 800 }}
              dataSource={checkLogList}
              columns={this.createOptInfoColumns(CZRZ_DATA)}
              key={Math.random()}
            />
          }
        </Card>
        {/* 底部审核按钮 */}
        {canAudit &&
          <Row>
            {
              [1].indexOf(pageNameMap[status]) > -1 &&   // 1-权籍预审 页面
              <Col span={10} push={10}>
                <PrimaryButton onClick={this.handlePassVersibleOk}>提交</PrimaryButton>
              </Col>
            }
            {
              [2, 3, 4].indexOf(pageNameMap[status]) > -1 && // 2-受理预审， 3-维修资金预审 页面 4-复审
              <Col span={10} push={8}>
                <PrimaryButton onClick={this.handlePassVersibleOk}>通过</PrimaryButton>
              </Col>
            }
            {
              [2, 3, 4].indexOf(pageNameMap[status]) > -1 && // 2-受理预审， 3-维修资金预审 页面 4-复审
              <Col span={3} push={1}>
                <DangerButton onClick={this.handleRejectVersibleOk}>驳回</DangerButton>
              </Col>
            }
            {
              [2, 4].indexOf(pageNameMap[status]) > -1 && // 2-受理预审 页面 4-复审
              <Col span={3} push={1}>
                <NoBorderButton className="zzBtn" onClick={this.handleVersibleOk_zz}>终止</NoBorderButton>
              </Col>
            }
          </Row>}

        {/* 终止 */}
        {<Modal
          title='审批意见'
          width='400px'
          visible={versible}
          onOk={this.handleOk_zz}
          onCancel={this.handleVersibleCancel}
          okText='确定'
        >
          <Form>
            <FormItem>
              {getFieldDecorator('refuseReason', {
                rules: [
                  {
                    required: true,
                    message: '请输入终止理由120字以内（必填）'
                  }
                ]
              })(<TextArea
                rows={4}
                maxLength={120}
                placeholder="请输入终止理由120字以内（必填）"
                onChange={e => {
                  this.setState({
                    refuseReason: e.target.value
                  })
                }}
              >
              </TextArea>)}
            </FormItem>
          </Form>
        </Modal>}

        {/* 通过 pageNameMap-2-受理预审 */}
        {<Modal
          title='审批意见'
          width='400px'
          visible={passVersible_51_10}
          onOk={this.handlePassOk}
          onCancel={this.handlePassVersibleCancel}
          okText='确定'
          className="passMod"
        >
          <Form>
            {pageNameMap[status] == 2 &&
              <div>
                <p className="title_p">基本信息</p>
                <FormItem label="登记类型" className="mar_top5">
                  {getFieldDecorator('registerSubType', {
                    rules: [
                      {
                        required: true,
                        message: '请选择登记类型'
                      }
                    ]
                  })(
                    <Select placeholder="请选择登记类型" dropdownMatchSelectWidth={false}>
                      {this.buildOptions(registerSubType)}
                    </Select>
                  )}
                </FormItem>
                <FormItem label="产权来源" className="mar_top5">
                  {getFieldDecorator('propertySource', {
                    rules: [
                      {
                        required: true,
                        message: '请选择产权来源'
                      }
                    ],
                    initialValue: dynamicConst.getInitialFromValue("propertySource", dialogReinfo.propertySource)
                  })(
                    <Select placeholder="请选择产权来源" dropdownMatchSelectWidth={false}>
                      {this.buildOptions(propertySource)}
                    </Select>
                  )}
                </FormItem>
                <FormItem label="产权类别" className="mar_top5">
                  {getFieldDecorator('propertyCategory', {
                    rules: [
                      {
                        required: true,
                        message: '请选择产权类别'
                      }
                    ],
                    initialValue: dynamicConst.getInitialFromValue("propertyCategory", dialogReinfo.propertyCategory)
                  })(
                    <Select placeholder="请选择产权类别" dropdownMatchSelectWidth={false}>
                      {this.buildOptions(propertyCategory)}
                    </Select>
                  )}
                </FormItem>
                {registerType == '5010' ? '' : <FormItem label="房屋性质" className="mar_top5">
                  {getFieldDecorator('natureHouse', {
                    rules: [
                      {
                        required: true,
                        message: '请选择房屋性质'
                      }
                    ],
                    initialValue: dynamicConst.getInitialFromValue("natureHouse", dialogReinfo.natureHouse)
                  })(
                    <Select placeholder="请选择房屋性质" dropdownMatchSelectWidth={false}>
                      {this.buildOptions(natureHouse)}
                    </Select>
                  )}
                </FormItem>}
                <FormItem label="土地权利性质" className="mar_top5">
                  {getFieldDecorator('natureRight', {
                    rules: [
                      {
                        required: true,
                        message: '请选择土地权利性质'
                      }
                    ],
                    initialValue: dynamicConst.getInitialFromValue("natureRight", dialogReinfo.landDroitNature)
                  })(
                    <Select placeholder="请选择土地权利性质" dropdownMatchSelectWidth={false}>
                      {this.buildOptions(natureRight)}
                    </Select>
                  )}
                </FormItem>
                <FormItem label="土地使用起止时间" className="mar_top5">
                  {getFieldDecorator('landUseRange', {
                    rules: [
                      {
                        required: true,
                        message: '请选择土地使用起止时间'
                      }
                    ],
                    initialValue: [moment(dialogReinfo.landUseStart || new Date()), moment(dialogReinfo.landUseEnd || new Date())]
                  })(
                    <RangePicker />
                  )}
                </FormItem>
                <p className="title_p">非税信息</p>
                <FormItem label="登记费" className="mar_top10">
                  {getFieldDecorator('registerFee', {
                    rules: [
                      {
                        required: true,
                        message: '请输入登记费'
                      }
                    ],
                    initialValue: registerFee,
                  })(<Input
                    placeholder="请输入登记费"
                    suffix="元"
                  />)}
                </FormItem>
                <FormItem label="工本费" className="mar_top10">
                  {getFieldDecorator('cost', {
                    rules: [
                      {
                        required: true,
                        message: '请输入工本费'
                      }
                    ],
                    initialValue: cost,
                  })(<Input
                    placeholder="请输入工本费"
                    suffix="元"
                  />)}
                </FormItem>
                <FormItem label="有无土地出让金" className="mod_left">
                  {getFieldDecorator('isTransfer', {
                    rules: [
                      {
                        required: true,
                        message: '请选择有无土地出让金'
                      }
                    ],
                    initialValue: isTransfer || 1,
                  })(<Radio.Group onChange={this.changeOrderNontax}>
                    <Radio value={1}>有</Radio>
                    <Radio value={2}>无</Radio>
                  </Radio.Group>)}
                </FormItem>
                {isTransfer == 1 && <FormItem className="mod_right">
                  {getFieldDecorator('price', {
                    initialValue: price,
                    rules: [
                      {
                        required: isTransfer === 1,
                        message: '请输入土地出让金'
                      }
                    ],
                  })(<Input
                    placeholder="请输入土地出让金"
                    suffix="元"
                  />)}
                </FormItem>}
              </div>}
            {registerType == '5010' ?
              <FormItem label="有无维修资金：" className="mod_left">
                {getFieldDecorator('isMaintain', {
                  initialValue: 2,
                })(<Radio.Group>
                  <Radio value={2}>无</Radio>
                </Radio.Group>)}
              </FormItem> :
              <FormItem label="有无维修资金：" className="mod_left">
                {getFieldDecorator('isMaintain', {
                  rules: [
                    {
                      required: status === 15,
                      message: '请选择有无维修资金'
                    }
                  ],
                  initialValue: isRepair,
                })(<Radio.Group onChange={this.changeRepair}>
                  <Radio value={1}>有</Radio>
                  <Radio value={2}>无</Radio>
                </Radio.Group>)}
              </FormItem>
            }
            {pageNameMap[status] === 3 && isRepair == 1 && <FormItem className="mod_right">
              {getFieldDecorator('maintainCapital', {
                rules: [
                  {
                    required: status === 15 && isRepair === 1,
                    message: '请输入维修资金'
                  }
                ],
                initialValue: repairPrice,
              })(<Input
                placeholder="请输入维修资金"
                suffix="元"
              />)}
            </FormItem>}
            {pageNameMap[status] === 3 && <p className="tips">注：请核对附件中已包含已缴纳发票！</p>}
            <FormItem>
              {getFieldDecorator('passReason_51_10', {
                rules: [
                  {
                    required: false
                  }
                ]
              })(<TextArea
                rows={4}
                maxLength={120}
                placeholder="请输入通过理由120字以内（非必填）"
                onChange={e => {
                  this.setState({
                    passReason_51_10: e.target.value
                  })
                }}
              >
              </TextArea>)}
            </FormItem>
          </Form>
        </Modal>}

        {/* 通过 pageNameMap-2-受理预审 */}
        {<Modal
          title='审批意见'
          width='400px'
          visible={passVersible_54}
          onOk={this.handlePassOk}
          onCancel={this.handlePassVersibleCancel}
          okText='确定'
        >
          <Form>
            <FormItem>
              {getFieldDecorator('passReason', {
                rules: [
                  {
                    required: false
                  }
                ]
              })(<TextArea
                rows={4}
                maxLength={120}
                placeholder="请输入通过理由120字以内（非必填）"
                onChange={e => {
                  this.setState({
                    passReason: e.target.value
                  })
                }}
              >
              </TextArea>)}
            </FormItem>
          </Form>
        </Modal>}

        {/* 驳回 pageNameMap-3-维修资金预审 */}
        {<Modal
          title='审批意见'
          width='400px'
          visible={rejectVersible_15}
          onOk={this.handleRejectOk}
          onCancel={this.handleRejectVersibleCancel}
          okText='确定'
        >
          <Form>
            <FormItem>
              {getFieldDecorator('rejectReason', {
                rules: [
                  {
                    required: true,
                    message: '请输入驳回理由120字以内（必填）'
                  }
                ]
              })(<TextArea
                rows={4}
                maxLength={120}
                placeholder="请输入驳回理由120字以内（必填）"
                onChange={e => {
                  this.setState({
                    rejectReason: e.target.value
                  })
                }}
              >
              </TextArea>)}
            </FormItem>
          </Form>
        </Modal>}

        {/* 驳回 status为10 */}
        {<Modal
          title='审批意见'
          width='400px'
          visible={rejectVersible_10}
          onOk={this.handleRejectOk}
          onCancel={this.handleRejectVersibleCancel}
          okText='确定'
          className="rejectMod"
        >
          <Form>
            {registerType == 5020 ? '' : <FormItem>
              {getFieldDecorator('sellerMsg', {

              })(<Checkbox onChange={this.changeSellerMsg}>
                转让人附件信息有误
                </Checkbox>)}
            </FormItem>
            }
            <FormItem>
              {getFieldDecorator('buyerMsg', {

              })(<Checkbox onChange={this.changeBuyerMsg}>
                {registerType == 5020 ? '申请人' : '受让人'}附件信息有误
                </Checkbox>)}
            </FormItem>
            <br />
            {sellerMsg && registerType !== 5020 && <FormItem>
              {getFieldDecorator('sellerReason', {
                rules: [
                  {
                    required: true,
                    message: `请输入转让人驳回理由（必填）`
                  }
                ]
              })(<TextArea
                rows={2}
                placeholder={`请输入转让人驳回理由（必填）`}
                onChange={e => {
                  this.setState({
                    sellerReason: e.target.value
                  })
                }}
              >
              </TextArea>)}
            </FormItem>}
            {buyerMsg && <FormItem>
              {getFieldDecorator('buyerReason', {
                rules: [
                  {
                    required: true,
                    message: `请输入${registerType == 5020 ? '申请人' : '受让人'}驳回理由（必填）`
                  }
                ]
              })(<TextArea
                rows={2}
                placeholder={`请输入${registerType == 5020 ? '申请人' : '受让人'}驳回理由（必填）`}
                onChange={e => {
                  this.setState({
                    buyerReason: e.target.value
                  })
                }}
              >
              </TextArea>)}
            </FormItem>}
            <FormItem>
              <p>注：申请信息中如内容有误，请进行终止操作，被驳回方只能进行附件操作！</p>
            </FormItem>
          </Form>
        </Modal>}
        <AddFamilyModal
          addFamilyMember={this.addFamilyMember}
          visible={showFamilyModal}
          onCancel={() => { toggleFamilyModal(false) }}
        ></AddFamilyModal>
      </>
    );
  }

  backToList = () => {
    tools.resetToTop();
  }
}

export default TransferDetail;
