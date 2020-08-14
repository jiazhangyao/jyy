import React from 'react';
import { Button, Icon, Input } from 'antd';
import './index.less';
const clsPrefix = "search-wrapper-content";
export default class SearchInput extends React.Component {

  constructor(props) {
    super(props);
  }

  onInputChange = (e) => {
    const { onChange } = this.props
    if (onChange) {
      onChange(e.target.value);
    }
  }
  onBtnClick = (e) => {
    e.preventDefault();
    const { onClick } = this.props
    if (onClick) {
      onClick();
    }
  }

  render = () => {
    const { width = 160, placeholder, hasType, value, buttonShow = true, showInput = true } = this.props;
    if (!showInput) {
      return null;
    }
    return <div className={`${clsPrefix}`}>
      <Input value={value} className={`${clsPrefix}-input ${hasType ? 'with-type' : ''}`} style={{ width }} size={'large'} placeholder={placeholder} onChange={this.onInputChange} onPressEnter={this.onBtnClick} title={placeholder} />
      {
        buttonShow && <Button type="default" size="default" onClick={this.onBtnClick} className={`${clsPrefix}-button`}><Icon type="search" /></Button>
      }

    </div>;
  }
}
