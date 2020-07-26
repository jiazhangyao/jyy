import React from 'react';
import './index.less';

export default class DetailField extends React.Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    const {label, semicolon = true, children, className = "", type = "text"} = this.props;
    if (type === "pics") {
      return <div className={`col-item ${className}`}>
        <span className="pics-title">{label}{semicolon ? '：' : ''}</span>
        <div>{children.length ? children : "--"}</div>
      </div>;
    }
    else if (type === "specialPics") {
      return <div className={`col-item ${className}`}>
        <div className="pics-wrap">
          {children}
        </div>
        <span className="pics-tit">{label}</span>
      </div>
    }
    else
    {
      return <div className={`col-item ${className}`}>
        <span className="col-item-left">{label}{semicolon ? '：' : ''}</span>
        <div className="col-item-right">{children || "--"}</div>
      </div>;
    }
  }
}
