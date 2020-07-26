import React from 'react';
import { Button } from 'antd';
import { TableDetail } from 'components';
import { getTitleTabs } from './getTitleName';

export default class ApplicantInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultColumns: [{
        title: '姓名/名称',
        dataIndex: 'name',
        key: 'name',
        width: 100,
        render: this.textFieldRender
      }, {
        title: '角色',
        dataIndex: 'typeDesc',
        key: 'typeDesc',
        width: 100,
        render: this.textFieldRender,
      }, {
        title: '共有方式',
        dataIndex: 'ownershipType',
        key: 'ownershipType',
        width: 100,
        render: this.ownershipType,
      }, {
        title: '权利比例',
        dataIndex: 'rightProportion',
        key: 'rightProportion',
        width: 100,
        render: (value) => (value ? `${value}%` : '--'),
      }, {
        title: '持证方式',
        dataIndex: 'holdingType',
        key: 'holdingType',
        width: 100,
        render: this.holdingType,
      }, {
        title: '持证人',
        dataIndex: 'isHolder',
        key: 'isHolder',
        width: 100,
        render: (value) => (value ? "是" : '否')
      }, {
        title: '手机号',
        dataIndex: 'mobile',
        key: 'mobile',
        width: 130,
        render: this.textFieldRender,
      }, {
        title: '证件类型',
        dataIndex: 'cardTypeDesc',
        key: 'cardTypeDesc',
        width: 100,
        render: this.textFieldRender,
      }, {
        title: '证件号码',
        dataIndex: 'cardNo',
        key: 'cardNo',
        width: 150,
        render: this.textFieldRender,
      },
        // {
        //   title: '家庭成员',
        //   dataIndex: 'familyMemberList',
        //   key: 'familyMemberList',
        //   width: 150,
        //   // render: value => "--"
        //   render: (value, item) => (
        //     item.isFamilyMember
        //       ? <span style={{ color: "#448AFF", cursor: "pointer" }} onClick={this.showFamilyInfo.bind(this, item)}>查看详情</span>
        //       : '--'
        //   )
        // }
      ]
    };
  }

  // 空值统一显示--
  textFieldRender = (value) => (<span>{value || '--'}</span>)

  // 查看家庭成员
  showFamilyInfo = data => {
    this.props.showFamilyInfo(data)
  }

  // 通用表格信息展示方法
  getTableInfo = (ListInfo, columns) => {
    if(ListInfo!==null&&ListInfo&&ListInfo.length>0){
      ListInfo && ListInfo.forEach(item => {
        item.applicantList && item.applicantList.forEach(cur => {
          cur._id = Math.random()
        })
      })
      console.log('ListInfo', ListInfo)
      return ListInfo.length && (
        <div>
          {ListInfo.map(item => <TableDetail className='detail-table' dataSource={item.applicantList.concat(item.jointDebtorList)} columns={columns} rowKey='_id' scroll={{ x: 800 }} />)}
        </div>
      )
    }
  
  }

  // 共有方式
  ownershipType = (value) => {
    let type;
    switch (value) {
      case 1:
        type = this.textFieldRender('单独所有');
        break;
      case 2:
        type = this.textFieldRender('共同所有');
        break;
      case 3:
        type = this.textFieldRender('按份额共有');
        break;
      case 4:
        type = this.textFieldRender('其他共有');
        break;
      default:
        type = this.textFieldRender();
        break;
    }
    return type;
  }

  // 持证方式
  holdingType = (value) => {
    let type;
    switch (value) {
      case 1:
        type = this.textFieldRender('共同持证');
        break;
      case 2:
        type = this.textFieldRender('分别持证');
        break;
      default:
        type = this.textFieldRender();
        break;
    }
    return type;
  }

  // 义务人信息 | 抵押权人信息
  getDefalutList = ({ list, label, prevList }) => {
    const { registerType } = this.props;
    const { defaultColumns } = this.state;
    const columns = defaultColumns.filter(item => item.key !== 'ownershipType' && item.key !== 'rightProportion' && item.key !== 'holdingType' &&
      item.key !== 'isHolder' && item.key !== 'holderName');
    return (
      <div>
        <div className={`table-detail-title ${prevList ? 'obligor-detail-title' : ''}`}>{label}</div>
        {
          this.getTableInfo(list, columns)
        }
      </div>
    )
  }

  // 权利人 | 抵押人信息
  getObligeeInfo = ({ list, label, registerType, obligorInfoList }) => {
    const { defaultColumns } = this.state;
    const isAlone = list && list.length === 1;
    let columns;
    if (registerType === 1 || registerType === 3 || registerType === 8 || registerType === 9) {
      if (isAlone) {
        columns = defaultColumns.filter(item => item.key !== 'rightProportion' && item.key !== 'holdingType' && item.key !== 'isHolder' && item.key !== 'holderName');
        label = `${label}(独自)`;
      } else {
        columns = defaultColumns;
        label = `${label}(多人)`;
      }
    } else if (registerType === 10) {
      columns = defaultColumns;
      if (isAlone) {
        label = `${label}(独自)`;
      } else {
        label = `${label}(多人)`;
      }
    } else {
      columns = defaultColumns.filter(item => item.key !== 'ownershipType' && item.key !== 'rightProportion' && item.key !== 'holdingType' &&
        item.key !== 'isHolder' && item.key !== 'holderName');
    }
    return (
      <div>
        <div className={`table-detail-title ${obligorInfoList ? 'obligor-detail-title' : ''}`}>{label}</div>
        {
          this.getTableInfo(list, columns)
        }
      </div>
    )
  }

  // 判断是否展示当前下标
  getTitleShow = (index, registerType) => {
    if (!registerType) {
      return false
    }
    let titleList = getTitleTabs(registerType);
    let titleListNum = titleList.filter(item => item.id == index)

    return titleListNum.length > 0 && titleListNum[0].id
  }


  render() {
    const {
      obligorInfoList, // 义务人
      obligeeInfoList, // 权利人
      mortgagorInfo, // 抵押人
      mortgageeInfo, // 抵押权人
      debtorInfo, // 债务人
      registerType,
      department
    } = this.props;

    let list, label;
    if (obligeeInfoList && mortgagorInfo && department !== 0) {
      list = obligeeInfoList;
      // label = '权利人/抵押人';
      label = '权利人/义务人';
    } else if (obligeeInfoList) {
      list = obligeeInfoList;
      label = '权利人';
    } else if (mortgagorInfo) {
      list = mortgagorInfo;
      // label = '抵押人';
      label = '义务人';
    }
    return (
      <>
        {
          this.getTitleShow("ywr", registerType)
          && this.getDefalutList({ list: obligorInfoList, label: '义务人' })
        }
        {
          (this.getTitleShow("qlr", registerType) || this.getTitleShow("dyr", registerType))
          && this.getObligeeInfo({ list, label, registerType, obligorInfoList })
        }
        {
          // 地税人员不可见 department === 0
          department !== 0 && this.getTitleShow("dyqr", registerType) &&
          // this.getDefalutList({ list: mortgageeInfo, label: '抵押权人', prevList: obligorInfoList || list })
          this.getDefalutList({ list: mortgageeInfo, label: '权利人', prevList: obligorInfoList || list })
        }
        {
          debtorInfo && this.getDefalutList({ list: debtorInfo, label: '债务人' })
        }
      </>
    )
  }
}
