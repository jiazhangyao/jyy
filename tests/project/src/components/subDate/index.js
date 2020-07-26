import React, { Component } from 'react';
import { DatePicker, Button } from 'antd';
import moment from 'moment';
import classnames from 'classnames';
import './index.less';

const { RangePicker } = DatePicker;

export default class Subdate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectOption: -1
    }
  }

  static defaultProps = {
    startProps: {
      allowClear: false
    },
    endProps: {
      allowClear: false
    },
    rangerProps: {
      size: "small",
      allowClear: true

    }
  }

  changeTimeRange = (type, range, key) => {
    return () => {
      const time = {
        year: 'y',
        month: 'months',
      }
      let start = this.props.value && this.props.value.beginTime || new Date();
      let end = moment(start).add(range, time[type]).subtract(1, 'day').toDate();

      this.changeHandle('endTime', end);
      this.setState({
        selectOption: key,
      });
    }
  }

  onChange = type => value => this.changeHandle(type, value);

  changeHandle = (type, value) => {
    this.setState({
      selectOption: -1,
    });
    this.props.onChange({
      ...this.props.value,
      [type]: value
    });
  }

  onRangeChange = (date, dateString) => {
    const { onChange } = this.props
    if (onChange) {
      onChange({
        beginTime: dateString[0],
        endTime: dateString[1],
      });
    }
  }

  render() {
    let { startProps, endProps, rangerProps, operation, value = {}, noInit = true, pattern = "RangePicker" } = this.props;

    let optionButton = [];

    if (operation) {
      optionButton = operation.map(
        (item, key) => (
          <Button key={key} type="primary"
            className={classnames('switch-button', { "switch-button-select": (this.state.selectOption != -1 && this.state.selectOption == key) })}
            size={'default'}
            onClick={this.changeTimeRange(item.type, item.number, key)} >{item.text}</Button>)
      );
    }

    if (!value) {
      value = {};
    }

    return (
      <div className="subDate">
        {
          pattern == "RangePicker" &&
          <div>
            <RangePicker
              {...rangerProps}
              value={value.beginTime && value.endTime && [moment(value.beginTime, 'YYYY-MM-DD'), moment(value.endTime, 'YYYY-MM-DD')]}
              onChange={this.onRangeChange}
            />
            {optionButton}
          </div>
        }
        {
          pattern == "DatePicker" &&
          <div>
            <DatePicker
              {...startProps}
              value={noInit ? value.beginTime : moment(new Date(), 'YYYY-MM-DD')}
              onChange={this.onChange('beginTime')}
              placeholder='请选择起始日期'
            />
            <span> - </span>
            <DatePicker
              {...endProps}
              value={noInit ? value.endTime : moment(new Date(), 'YYYY-MM-DD')}
              onChange={this.onChange('endTime')}
              placeholder='请选择结束日期'
            />
            {optionButton}
          </div>
        }

      </div>
    );
  }
}
