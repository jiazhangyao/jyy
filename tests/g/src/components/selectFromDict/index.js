import React from 'react';
import { Select, Icon } from 'antd';
import dynamicConst from 'common/dynamicConst';
import './index.less';

const { Option } = Select;

export default class SelectFromDict extends React.Component {
  constructor(props) {
    super(props);
    let value = this.setStateFromProps(props);
    this.state = {
      value
    }
  }

  setStateFromProps = props => {
    let { value, initialValue } = props;
    if (!value && initialValue) {
      value = initialValue;

    }
    return value;
  }

  componentWillReceiveProps(nextProps) {
    let value = this.setStateFromProps(nextProps);
    let { value: preValue } = this.state;
    if (value !== preValue) {
      this.setState({ value });
    }
  }

  onChange = value => {
    this.setState({ value }, () => {
      const { onChange, onSelectChange } = this.props;
      if (onChange) {
        onChange(value);
        /** 触发query */
        onSelectChange && onSelectChange();
      }
    })
  }

  render = () => {
    let {
      showSelect = true, // 是否显示下拉选框
      width = 120,
      placeholder = "",
      dataSource = [],
      dictKey, // 下拉选框指定的字典key
      options, // 下拉选项静态数据源
      withNoLimit = true, // 是否有“不限”
      ...otherProps
    } = this.props;

    if (showSelect) {
      if (options) {
        Object.keys(options).map(function (cur) {
          dataSource.push({
            label: options[cur],
            value: cur
          })
        })
      } else {
        dataSource = dynamicConst.getArray(dictKey);
      }

      // console.log('❤dataSource', dataSource)
      let optionsArr = [
        withNoLimit && <Option key="-1" value={undefined}>不限</Option>,
        ...dataSource.map(item => <Option title={item.label} key={item.value} value={item.value}>{item.label}</Option>)
      ]

      return <div className="search-wrapper-select">
        <Select
          {...otherProps}
          value={this.state.value}
          style={{ "width": width }}
          suffixIcon={<Icon type="caret-down" />}
          placeholder={placeholder}
          dropdownMatchSelectWidth={false}
          onChange={this.onChange}
        >
          {optionsArr}
        </Select>
      </div>;
    } else {
      return null;
    }
  }
}
