import React from "react";
import { DetailPage } from "super/page";
import Card from "mt-card";
import { Modal, Row ,Col,Input , Card as OriginCard } from "antd";
import { inject, observer } from "mobx-react";
import { moduleName } from "./store";
import { 
    Steps,
    DetailField,
    TableDetail,
    Button,
    DetailImages,
    PropertyInfo,
    ApplicantInfo
  } from "components";
  
import dynamicConst from "common/dynamicConst";

import "./style.less";

const { PrimaryButton, DangerButton , BorderButton ,NoBorderButton} = Button;
const { TextArea } = Input;
// 材料信息的 组成部分的数据
const MaterialJson =[
  {
    fileType: "jpg,png",
    id: 2,
    maxNum: 5,
    maxSize: 50,
    minNum: 1,
    name: "不动产登记申请表",
    remark: "",
    required: true,
  },
  {
    fileType: "jpg,png",
    id: 3,
    maxNum: 5,
    maxSize: 50,
    minNum: 1,
    name: "法人代表身份证",
    remark: "",
    required: true,
  },
  {
    fileType: "jpg,png",
    id: 1,
    maxNum: 5,
    maxSize: 50,
    minNum: 1,
    name: "代理人身份证",
    remark: "",
    required: true,
  },
  {
    fileType: "jpg,png",
    id: 1,
    maxNum: 5,
    maxSize: 50,
    minNum: 1,
    name: "授权委托书",
    remark: "",
    required: true,
  },
  {
    fileType: "jpg,png",
    id: 1,
    maxNum: 5,
    maxSize: 50,
    minNum: 1,
    name: "国有土地使用权证或土地权属来源材料",
    remark: "",
    required: true,
  },
  {
    fileType: "jpg,png",
    id: 1,
    maxNum: 5,
    maxSize: 50,
    minNum: 1,
    name: "建设工程规划许可证",
    remark: "",
    required: true,
  },
  {
    fileType: "jpg,png",
    id: 1,
    maxNum: 5,
    maxSize: 50,
    minNum: 1,
    name: "实地查看表",
    remark: "",
    required: true,
  },
  {
    fileType: "jpg,png",
    id: 1,
    maxNum: 5,
    maxSize: 50,
    minNum: 1,
    name: "其他材料",
    remark: "",
    required: true,
  },
  
]
//需要显示的图片数据
const resPicsList = [
  {
    fileList:[
      {
        ext: "jpeg",
        key: "82e73aec-7aca-4f65-adfd-fc762b9c64ea",
        originalName: "下载.jpeg",
        pageNum: null,
      },
      {
        ext: "jpeg",
        key: "82e73aec-7aca-4f65-adfd-fc762b9c64ea",
        originalName: "下载.jpeg",
        pageNum: null,
      }
    ],
    id:1,
    materialType:2,
  },
  {
    fileList:[
      {
        ext: "jpeg",
        key: "82e73aec-7aca-4f65-adfd-fc762b9c64ea",
        originalName: "下载.jpeg",
        pageNum: null,
      },
    ],
    id:1,
    materialType:3,
  },
  
]


//法定代表人 显示数据
const FDDBR_INFO_DATA = [
  {
    name:"张三",
    role:"法定代表人",
    zjType:"身份证",
    zjNum:"310511198710203872",
    mobleNum:"13818882281",
  },
  {
    name:"王明",
    role:"代理人",
    zjType:"身份证",
    zjNum:"310511198710201122",
    mobleNum:"13818662281",
  }
]
//法定代表人 标题 数据
const FDDBR_DATA = [
  
    {
      title: "姓名/名称",
      dataIndex: "name",
      key: "name",
      width: 200
    },
    {
      title: "角色",
      dataIndex: "role",
      key: "role",
      width: 200
    },
    {
      title: "证件类型",
      dataIndex: "zjType",
      key: "zjType",
      width: 200
    },
    {
      title: "证件号码",
      dataIndex: "zjNum",
      key: "zjNum",
      width: 200
    },
    {
      title: "手机号码",
      dataIndex: "mobleNum",
      key: "mobleNum",
      width: 200
    },
]
//权利人数据
const QLRXX_INFO_DATA = [
  {
    name:"XX有限公司",
    qlrType:"企业",
    zjType:"社会同一信用代码",
    zjNum:"310511198710203872",
    mobleNum:"13818882281",
    location:"查看详情",
    postNum:"150320",
  }
]

//权利人信息
const QLRXX_DATA = [
  {
    title: "姓名/名称",
    dataIndex: "name",
    key: "name",
    width: 200
  },
  {
    title: "权利人类型",
    dataIndex: "qlrType",
    key: "qlrType",
    width: 200
  },
  {
    title: "证件类型",
    dataIndex: "zjType",
    key: "zjType",
    width: 200
  },
  {
    title: "证件号码",
    dataIndex: "zjNum",
    key: "zjNum",
    width: 200
  },
  {
    title: "手机号码",
    dataIndex: "mobleNum",
    key: "mobleNum",
    width: 200
  },
  {
    title: "通讯地址",
    dataIndex: "location",
    key: "location",
    width: 200
  },
  {
    title: "邮编",
    dataIndex: "postNum",
    key: "postNum",
    width: 200
  },
]
// 日志 tabel 标题
const RZ_DATA = [
  {
    title: "时间",
    dataIndex: "checkTime",
    key: "checkTime",
    width: 200
  },
  {
    title: "处理人",
    dataIndex: "checkUser",
    key: "checkUser",
    width: 200
  },
  {
    title: "操作",
    dataIndex: "checkDesc",
    key: "checkDesc",
    width: 200
  },
  {
    title: "备注",
    dataIndex: "remark",
    key: "remark",
    width: 200,
    render(value) {
      return <div>{value || "--"}</div>;
    }
  }
]
// 日志数据
const RZ_INFO_DATA = [
  {checkTime:"2019-08-12 11:00",checkUser:"国土局最美操作员——高圆圆",checkDesc:"驳回",remark:"证照号码与图片不一致"}
]
//土地信息数据
const TDXX_DATA = [
  {label:"土地用途",value:"城镇住宅用地"},
  {label:"土地面积",value:"2887.98"},
  {label:"独用土地面积",value:"209.88"},
  {label:"分摊土地面积",value:"789.10"},
  {label:"土地使用起始时间",value:"2010-09-09"},
  {label:"土地使用结束时间",value:"2080-09-09"},
  {label:"土地权利性质",value:"出让"},
]

//产权信息数据
const CQXX_DATA = [
  {label:"不动产权利类型",value:"国有建设用地使用权/房屋所有权"},
  {label:"产权人",value:"XX有限公司"},
  {label:"购房价格",value:"230000元"},
  {label:"共有方式",value:"单独所有"},
  {label:"占有份额",value:null},
  {label:"上手不动产权证号",value:"鹤国用（2014）第GN00285号"},
  {label:"共有不动产权证号",value:null},
  {label:"产权来源",value:"自建"},
  {label:"产权类别",value:"股份制企业房产"},

]

// 房屋信息数据
const FWXX_DATA = [
  {label:"总层数",value:"32"},
  {label:"所在层次",value:"13"},
  {label:"地上层数",value:"30"},
  {label:"地下层数",value:"2"},
  {label:"规划用途",value:"成套住宅"},
  {label:"房屋结构",value:"230407002001GB00005W00000000C"},
  {label:"房屋性质",value:"市场化商品房"},
  {label:"房屋类型",value:"住宅"},
  {label:"建筑面积",value:"169.72"},
  {label:"套内建筑面积",value:"126.3480"},
  {label:"分摊建筑面积",value:"43.3757"},
  {label:"竣工时间",value:"2010"},
  {label:"东墙",value:"共有墙"},
  {label:"南墙",value:"共有墙"},
  {label:"北墙",value:"共有墙"},
  {label:"西墙",value:"共有墙"},
]

// 权利人信息数据
const QLR_DATA = [{applicantList:[{cardNo: "310511198710203872",
cardType: 1,
cardTypeDesc: "身份证",
familyMemberList: null,
holdingType: 0,
isFamilyMember: 0,
isHolder: 0,
mobile: "社会统一信用码",
name: "XX有限公司",
ownershipType: 0,
rightProportion: 0,
type: 7,
typeDesc: "企业"}]}]
// 法定代表人信息
// const FDDBR_DATA = [
//                     {
//                       applicantList:
//                         [
//                           { cardNo: "310511198710203872",
//                             cardType: 1,
//                             cardTypeDesc: "身份证",
//                             familyMemberList: null,
//                             holdingType: 0,
//                             isFamilyMember: 0,
//                             isHolder: 0,
//                             mobile: "社会统一信用码",
//                             name: "XX有限公司",
//                             ownershipType: 0,
//                             rightProportion: 0,
//                             type: 7,
//                             typeDesc: "企业"
//                           },
//                           { cardNo: "310511198710203872",
//                             cardType: 1,
//                             cardTypeDesc: "身份证",
//                             familyMemberList: null,
//                             holdingType: 0,
//                             isFamilyMember: 0,
//                             isHolder: 0,
//                             mobile: "社会统一信用码",
//                             name: "XX有限公司",
//                             ownershipType: 0,
//                             rightProportion: 0,
//                             type: 7,
//                             typeDesc: "企业"
//                           }
//                         ]
//                       }
//                     ]

@inject(stores => ({
    store: stores[moduleName]
  }))
@observer
class RegDemo extends DetailPage{
    // 申请人信息card
  getApplicantInfo = data => {
    console.log("打印data",data);
    
    // const {
    //   obligeeInfoList,
    //   obligorInfoList,
    //   mortgageeInfo,
    //   mortgagorInfo,
    // //   debtorInfo,
    //   registerType
    // } = data;
    return (
      <ApplicantInfo
        // obligeeInfoList={obligeeInfoList}
        // obligorInfoList={obligorInfoList}
        // mortgageeInfo={mortgageeInfo}
        // mortgagorInfo={mortgagorInfo}
        debtorInfo={data}
        showFamilyInfo={this.showFamilyInfo}
        // registerType={registerType}
      />
    );
  };
  
  showFamilyInfo = obj => {
    let { store: { setFamilyInfo } } = this.props;
    setFamilyInfo(obj);
  }
  // 生成 card 结构的方法
renderCardDetail = data => data.map(item =><DetailField label={item.label}>{item.value}</DetailField>)

// 操作 table 标题
createOptInfoColumns = data => data ;
// 材料信息card-图片list
renderPics = (MaterialJson = [], resPicsList = []) => {
  const files = {};
  // const resPicsList = [
  //   {
  //     fileList:[
  //       {
  //         ext: "jpeg",
  //         key: "82e73aec-7aca-4f65-adfd-fc762b9c64ea",
  //         originalName: "下载.jpeg",
  //         pageNum: null,
  //       }
  //     ],
  //     id:1,
  //     materialType:1,
  //   }
  // ]
  // 注意 resPicsList 元素的 materialType 属性 需要和 MaterialJson 元素的 id 对应，设置 图片
  resPicsList.forEach(item => {
    files[item.materialType] = item.fileList;
  });
  console.log("files",files);
  
  return MaterialJson.map(cur => {
    const fileArr = files[cur.id] || [];
    console.log("fileArr",fileArr);
    
    return (
      <DetailField type="specialPics" label={cur.name}>
        <DetailImages title={cur.name} fileArr={fileArr} />
      </DetailField>
    );
  });
};

handleVersibleOk = () => {
  const { store } = this.props;
  store.handleVersible(true);
};
handleVersibleCancel = e => {
  const { store } = this.props;
  store.handleVersible(false);
};
    doRender() {
        // let { store : {data}} = this.props
        const { store } = this.props;
        const { data } = store; 
    const { store: {  versible } } = this.props;
        
      
        // let {
        //     id: orderId,
        //     registerType,
        //     status,
        //     signInfo = {},
        //     orderHouseList = [], // 产权信息
        //     mortgageInfo = {}, // 抵押信息
        //     obligorInfoList = [], // 申请人信息-义务人信息
        //     obligeeInfoList = [], // 申请人信息-权利人信息
        //     mortgagorInfo = [], // 申请人信息-抵押人信息
        //     mortgageeInfo = [], // 申请人信息-抵押权人信息
        //     debtorInfo = [], // 债务人信息
        //     materialList: resPicsList, // 材料信息/图片
        //     isPost,
        //     orderReason, // 抵押注销原因
        //     orderMail = {}, // 邮寄信息
        //     checkLogList = [] // 操作日志
        //   } = data;
          // 流程栏数据
        const stepData = [
            {lineNodes: null,
            status: 1,
            taskKey: "申请人信息填写",
            time: "2019-10-21",
            title: "申请人信息填写",
            type: 2},
            {lineNodes: null,
            status: 0,
            taskKey: "申请人信息填写",
            time: "2019-10-21",
            title: "受理预审",
            type: 2},
            {lineNodes: null,
            status: 0,
            taskKey: "申请人信息填写",
            time: "2019-10-21",
            title: "非税预审",
            type: 2},
            {lineNodes: null,
            status: 0,
            taskKey: "申请人信息填写",
            time: "2019-10-21",
            title: "缴费",
            type: 2},
            {lineNodes: null,
            status: 0,
            taskKey: "申请人信息填写",
            time: "2019-10-21",
            title: "复审",
            type: 2},
            {lineNodes: null,
            status: 0,
            taskKey: "申请人信息填写",
            time: "2019-10-21",
            title: "登簿",
            type: 2},
            {lineNodes: null,
            status: 0,
            taskKey: "申请人信息填写",
            time: "2019-10-21",
            title: "出证",
            type: 2},
        ]

        console.log("组件的props",this.props);
        
        
        return(
            <>
            {/* 进度条 */}
                <Steps processData={stepData} className="step"></Steps>
                <Row>
                  <Col span={2} push={22}>
                    <PrimaryButton>审批对比</PrimaryButton>
                  </Col>
                </Row>
                <Card title="工单信息">
                    <DetailField label="工单编号：">SC20190808123456</DetailField>
                    <DetailField label="登记类别：">开发项目初始登记</DetailField>
                    <DetailField label="工单状态：">受理预审中</DetailField>
                    <DetailField label="提交时间：">2019-10-12 11:09:35</DetailField>
                </Card>
                {/* Card 组件 通过 Render - children 的方式 生成 表格结构 传递的数据结构 非常复杂 需要 给 Card 组件 添加 forDetailTable 类名，表格方可 百分百显示 */}
                
                <Card title="权利人信息" rowLen={1} className="forDetailTable">
                  {[] &&
                    <TableDetail
                      className="detail-table"
                      scroll={{ x: 800 }}
                      dataSource={QLRXX_INFO_DATA}
                      columns={this.createOptInfoColumns(QLRXX_DATA)}
                      key={Math.random()}
                    />
                  }
                </Card>
                <Card title="法定代表人信息" rowLen={1} className="forDetailTable">
                  {[] &&
                    <TableDetail
                      className="detail-table"
                      scroll={{ x: 800 }}
                      dataSource={FDDBR_INFO_DATA}
                      columns={this.createOptInfoColumns(FDDBR_DATA)}
                      key={Math.random()}
                    />
                  }
                </Card>

                {/* <Card title="法定代表人信息" className="forDetailTable">
                    {this.getApplicantInfo(FDDBR_DATA)}
                </Card> */}
                <Row>
                  <Col span={22}>
                    <div className="info">
                      <span className="text">提示：产权数据缺失，请前往核心系统完善数据后，点击“同步数据”</span>
                    </div>
                  </Col>
                  <Col span={2}>
                    <BorderButton className="tbBtn">同步数据</BorderButton>
                  </Col>
                </Row>
                {/* <div className="info">
                  <span className="text">提示：产权数据缺失，请前往核心系统完善数据后，点击“同步数据”</span>
                  <BorderButton className="tbBtn">同步数据</BorderButton>
                </div> */}
                <Card title="房屋信息" className="mainInfo_fwxx">
                    <DetailField  label="房屋坐落" className="mainInfo_fwzl">
                    黑龙江省鹤岗市萝北县40委学生公寓楼301室
                    </DetailField> 
                    <br/>
                    <br/>
                    <DetailField label="不动产单元号">230403004002GB00003F00040152</DetailField>
                    <br/>
                    <DetailField label="产籍号">333333-1001-1557-031301</DetailField>
                    {this.renderCardDetail(FWXX_DATA)}
                </Card>
                <Card title="产权信息" className="mainInfo_cqxx">
                    {this.renderCardDetail(CQXX_DATA)}
                </Card>
                <Card title="土地信息" className="mainInfo_tdxx">
                    {this.renderCardDetail(TDXX_DATA)}
                </Card>
                <Card title="邮寄信息" className="mainInfo_yjxx">
                    {/* {this.renderCardDetail(TDXX_DATA)} */}
                    <DetailField label="产证/证明/发票邮寄">是</DetailField><br /><br />
                    <DetailField label="收件人">张三</DetailField><br /><br />
                    <DetailField label="手机号">13818882281</DetailField><br /><br />
                    <DetailField label="收件地区">鹤岗市元山区平安小区5幢501</DetailField>
                </Card>

                <OriginCard title="材料信息" className="pics-list-wrap">
                  {this.renderPics(MaterialJson, resPicsList)}
                </OriginCard>
                <Card title="操作日志" rowLen={1} className="forDetailTable">
                  {[] &&
                    <TableDetail
                      className="detail-table"
                      scroll={{ x: 800 }}
                      dataSource={RZ_INFO_DATA}
                      columns={this.createOptInfoColumns(RZ_DATA)}
                      key={Math.random()}
                    />
                  }
                </Card>
                <Card title="缴费信息">
                    <DetailField label="登记费">550元</DetailField>
                </Card>
                <Row>
                  <Col span={10} push={8}>
                    <PrimaryButton onClick={this.handleVersibleOk}>通过</PrimaryButton>
                  </Col>
                  <Col  span={3} push={1}>
                    <DangerButton>驳回</DangerButton>
                  </Col>
                  <Col span={3} push={1}>
                    <NoBorderButton className="zzBtn">中止</NoBorderButton>
                  </Col>
                </Row>
                {/* <div className="btns">
                   <PrimaryButton onClick={this.handleVersibleOk}>通过</PrimaryButton>
                   <DangerButton>驳回</DangerButton>
                   <NoBorderButton className="zzBtn">中止</NoBorderButton>
                </div> */}
                {/* 审批意见模态框 */}
                <Modal
                title='审批意见'
                width='400px'
                visible={versible}
                onOk={this.handleVersibleCancel}
                onCancel={this.handleVersibleCancel}
                okText='确定'
                >
                  <TextArea 
                  rows={4}
                  defaultValue="请输入通过的理由120字以内(非必填)"
                  >

                  </TextArea>
                </Modal>
            </>
        )
    }
}

export default RegDemo