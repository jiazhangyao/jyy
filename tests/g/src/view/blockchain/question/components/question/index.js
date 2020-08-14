import React, { Component } from "react";
import PropTypes from "prop-types";

import "./index.less";

class Question extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;
    return (
      <div>
        {data.map(item => {
          return (
            <dl className="question-content" key={item.key}>
              <dt>{item.Q}</dt>
              {typeof item.A === "string" ? (
                <dd>{item.A}</dd>
              ) : (
                item.A.map((value, k) => {
                  return <dd key={k}>{value}</dd>;
                })
              )}
            </dl>
          );
        })}
      </div>
    );
  }
}

// Question.proptypes = {
// 	data: PropTypes.array
// };

export default Question;
