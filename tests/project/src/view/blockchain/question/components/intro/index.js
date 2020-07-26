import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';

import './index.less';

class Intro extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;
    return (
      <div>
        {
          data.map((item, index) => {
            return (
              <Row key={'scene' + item.key} className="scene-content">
                {
                  index % 2 === 0 ? (
                    <div>
                      <Col span={8}>
                        <h2>{item.title}</h2>
                        <p>{item.content}</p>
                      </Col>
                      <Col offset={4} span={12}>
                        <img className="scene-img" src={item.imgSrc} alt={item.title} />
                      </Col>
                    </div>
                  ) : (
                      <div>
                        <Col span={12}>
                          <img className="scene-img" src={item.imgSrc} alt={item.title} />
                        </Col>
                        <Col offset={2} span={8}>
                          <h2>{item.title}</h2>
                          <p>{item.content}</p>
                        </Col>
                      </div>
                    )
                }
              </Row>
            );
          })
        }
      </div>
    );
  }
}

Intro.propTypes = {
  data: PropTypes.array
};

export default Intro