import React from 'react';
import {
  Button
} from 'antd';
import { TableDetail } from 'components';
import { houseBaseInfo ,OrderRegisterType} from 'common/enum';
import './index.less';

const detailModulePath = 'order';

class PropertyInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      houseBaseInfo
    };
  }

  textFieldRender = (value) => (<span>{value || '--'}</span>)

  getHouseBase = (_obj) => {
    const { registerType } = _obj;
    const { houseBaseInfo } = this.state;
    const {
      projectName,
      warrantNumber,
      space,
      fullAddress,
      unitNumber,
      buildYear,
      planUseDesc,
      houseStructureDesc,
      isLost,
      landUsageDesc,
      floor,
      landUse,
      holder,
      houseStatus,
      propertyCategory,
      natureHouse, 
      eastWall, 
      southWall, 
      westernWall, 
      northWall,
      landDroitNature
    } = houseBaseInfo;
    let useHouseBaseInfo
    switch (registerType) {
      case 5020:
      case 5030:  
        useHouseBaseInfo = { unitNumber, warrantNumber, fullAddress, propertyCategory, planUseDesc, floor, houseStructureDesc, 
          natureHouse, space, buildYear, eastWall, southWall, westernWall, northWall, landUsageDesc, landDroitNature }
        useHouseBaseInfo.buildYear = '竣工时间';
        return useHouseBaseInfo;
      case 5010:
          useHouseBaseInfo = { landUsageDesc, landDroitNature }
          return useHouseBaseInfo;
      case 121:
      case 122:
        // 抵押权转移登记
        useHouseBaseInfo = { unitNumber, warrantNumber, fullAddress, propertyCategory, planUseDesc, floor, houseStructureDesc, natureHouse, space, buildYear, eastWall, southWall, westernWall, northWall, landUsageDesc, landDroitNature }
        useHouseBaseInfo.buildYear = '竣工时间';
        return useHouseBaseInfo;
      case 2:
        // 抵押权首次登记
        useHouseBaseInfo = { warrantNumber, space, fullAddress, unitNumber, floor, buildYear, planUseDesc, houseStructureDesc }
        if(registerType === 4) {
          useHouseBaseInfo.warrantNumber = '不动产权证号';
        }
        return useHouseBaseInfo;
      case 3:
      case 4:
        // 抵押权注销登记
        useHouseBaseInfo = { warrantNumber, space, fullAddress, unitNumber, floor, buildYear, planUseDesc, houseStructureDesc }
        if(registerType === 4) {
          useHouseBaseInfo.warrantNumber = '不动产权证号';
        }
        return useHouseBaseInfo;
      case 5:
      case 7:
        useHouseBaseInfo = { projectName, space, fullAddress, unitNumber, floor, buildYear, planUseDesc, houseStructureDesc }
        if(registerType === 7) {
          delete useHouseBaseInfo.unitNumber
        }
        return useHouseBaseInfo;
      case 6:
        useHouseBaseInfo = { warrantNumber, space, fullAddress, unitNumber, floor, buildYear, planUseDesc, houseStructureDesc }
        useHouseBaseInfo.warrantNumber = '不动产登记证明(他项权证)号';
        return useHouseBaseInfo;
      case 8:
        useHouseBaseInfo = { warrantNumber, unitNumber, space, fullAddress, floor, buildYear, planUseDesc, houseStructureDesc }
        return useHouseBaseInfo;
      case 9:
        useHouseBaseInfo = { unitNumber, space, warrantNumber, fullAddress, floor, buildYear, planUseDesc, houseStructureDesc }
        useHouseBaseInfo.warrantNumber = '原不动产权证号';

        return useHouseBaseInfo;
      case 10:
        useHouseBaseInfo = { projectName, landUsageDesc, space, fullAddress, landUse };
        useHouseBaseInfo.space = '宗地面积';
        useHouseBaseInfo.fullAddress = '宗地坐落';
        return useHouseBaseInfo;
      case 11:
        useHouseBaseInfo = { unitNumber, space, warrantNumber, fullAddress, floor, buildYear, planUseDesc, houseStructureDesc, isLost }
        useHouseBaseInfo.warrantNumber = '原不动产权证号';
        useHouseBaseInfo.isLost = '不动产单元是否灭失';
        return useHouseBaseInfo;
      case 101:
      case 102: 
      case 103:
      case 104:
      case 105:
      case 107:
        useHouseBaseInfo = { warrantNumber, space, fullAddress, unitNumber, floor, buildYear, holder, planUseDesc, houseStructureDesc, houseStatus }
        return useHouseBaseInfo;
      case 106: 
        useHouseBaseInfo = { warrantNumber, space, fullAddress, unitNumber, floor, buildYear, holder, planUseDesc, houseStructureDesc, houseStatus }
        return useHouseBaseInfo;
      default:
        return {};
    }
  }

  //商品房转移登记 | 抵押权设立登记 | 二手房交易登记 肯能会有多个产权信息，列表显示
  getMultipleHouse = (orderHouseList) => {
    const { registerType, department, orderId, search, isBtnShow } = this.props;

      let warrantNumberText = "不动产权证号";
      let warrantText = "warrantNumber";
      let colSpan = "";
      let unitNumberColSpan = "";
      let isLostColSpan = "";

      if (
          OrderRegisterType.getAliasFromValue(registerType) ==
          "COMMODITY_PREVIEW" ||
          OrderRegisterType.getAliasFromValue(registerType) ==
          "PREVIEW_A_PRE_MORTGAGE"
      ) {
          warrantNumberText = "项目名称";
          warrantText = "projectName";
      } else if (
          OrderRegisterType.getAliasFromValue(registerType) ==
          "SECOND_HOUSE_A_CREATE" ||
          OrderRegisterType.getAliasFromValue(registerType) == "CANCEL_REG_HOUSE"
      ) {
          warrantNumberText = "原不动产权证号";
          warrantText = "warrantNumber";
      } else if (
          OrderRegisterType.getAliasFromValue(registerType) ==
          "COMMODITY_HOUSE_PRE_MORTGAGE"
      ) {
          warrantNumberText = "不动产登记证明（他项权证）号";
          warrantText = "warrantNumber";
      } else if (
          OrderRegisterType.getAliasFromValue(registerType) == "MORTGAGE_CANCLE"
      ) {
          warrantNumberText = "房屋权证号";
          warrantText = "warrantNumber";
      }
      if (
          OrderRegisterType.getAliasFromValue(registerType) ==
          "PREVIEW_A_PRE_MORTGAGE"
      ) {
          //商品房预告登记+商品房预抵押登记 没有不动产单元号
          unitNumberColSpan = 0;
      }
      if (
          OrderRegisterType.getAliasFromValue(registerType) != "CANCEL_REG_HOUSE"
      ) {
          //房产注销登记 增加不动产单元你是否缺少
          isLostColSpan = 0;
      }
    const columns = [{
      title: '不动产单元号',
      dataIndex: 'unitNumber',
      key: 'unitNumber',
      render: this.textFieldRender,
    }, {
      title: '建筑面积',
      dataIndex: 'space',
      key: 'space',
      render: (value) => (value ? `${value} ㎡` : '--')
    },
    {
        title: warrantNumberText,
        dataIndex: warrantText,
        key: warrantText,
        render:  (value) => (value ? `${value}` : '--'),

    },
        {
      title: '房屋坐落 ',
      dataIndex: 'fullAddress',
      key: 'fullAddress',
      render: this.textFieldRender,
    }, {
      title: '楼层  ',
      dataIndex: 'floor',
      key: 'floor',
      render: (value, item) => (((item.inFloor || item.totalFloor) && `${item.inFloor}层/${item.totalFloor}层`) || '--')
    }, {
      title: '建筑年代',
      dataIndex: 'buildYear',
      key: 'buildYear',
      render:  (value) => (value ? `${value}年` : '--'),
    }, {
      title: '规划用途',
      dataIndex: 'planUseDesc',
      key: 'planUseDesc',
      render: this.textFieldRender,
    }, {
      title: '房屋结构',
      dataIndex: 'houseStructureDesc',
      key: 'houseStructureDesc',
      render: this.textFieldRender,
    }, {
      title: '不动产单元是否灭失',
      dataIndex: 'isLost',
      key: 'isLost',
      colSpan: isLostColSpan,
      render(value) {
          return {
              children: <span>{ value  ? (value == 1) ? '是' :'否' : '-'}</span>,
              props: { colSpan: isLostColSpan }
          };
      }
    }, {
      title: '查看',
      dataIndex: 'regionId',
      key: 'regionId',
      render: (value, item) => (
        // isBtnShow标识是否展示“本次交易信息”栏的“现状信息”按钮，与此处的“现状信息”按钮出现互斥，故而使用!判断
        !isBtnShow ? <a href={`/gm/order/audit/statusInfoDetail?id=${orderId}`} target="_blank">现状信息</a> : '--'
      )
    }];
    let findIndex
    if(registerType === 2) {
      findIndex = columns.findIndex(item => item.dataIndex === 'isLost')
      columns.splice(findIndex, 1)
    }
    orderHouseList && orderHouseList.forEach(item => (item._id = Math.random(100)))
    return <TableDetail className='detail-table' dataSource={orderHouseList} columns={columns} rowKey='_id' scroll={{ x: 1200 }} />;
  }

  render() {
    const { registerType, orderHouseList, getCardInfo, routeParams } = this.props;
    //判断是否是列表展示
    let showList = false;
    if(registerType === 2 || registerType === 4 || registerType === 6 || registerType === 11) {
      showList = orderHouseList.length > 1;
    }

    return (
      <div>
        {
          showList ?
            this.getMultipleHouse(orderHouseList) :
            orderHouseList.map(item => getCardInfo(this.getHouseBase({registerType}), item))
        }
      </div>
    )
  };

}

export default PropertyInfo;
