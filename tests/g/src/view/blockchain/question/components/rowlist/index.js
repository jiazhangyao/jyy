import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import "./index.less";

class RowList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;
    const rowItemProps = { type: "flex", justify: "space-between" };

    return (
      <div>
        <Row {...rowItemProps}>
          {data.map(item => {
            return (
              <Col key={"adv" + item.key}>
                <div className="row-card-box">
                  <div className="row-card-img">
                    <img src={item.imgSrc} alt={item.title} />
                  </div>
                  <div className="row-card-title">{item.title}</div>
                  <div className="row-card-content">{item.content}</div>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

// RowList.proptypes = {
//   data: PropTypes.array
// };

export default RowList;
