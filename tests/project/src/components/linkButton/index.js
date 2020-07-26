import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import T from "prop-types";

const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);

function isString(str) {
  return typeof str === "string";
}

function LinkButton({ children, onClick, to, style }) {
  if (onClick) {
    return (
      <Button size={"default"} onClick={onClick} className="button-like-link">
        {children}
      </Button>
    );
  }
  if (to) {
    // let text = children;
    // if (isString(children) && isTwoCNChar(children)) {
    //   text = children.split("").join(" ");
    // }
    return (
      <Link to={to} style={style}>
        {children}
      </Link>
    );
  }
}

LinkButton.propTypes = {
  onClick: T.func,
  to: T.string,
  style: T.object,
};

export default LinkButton;
