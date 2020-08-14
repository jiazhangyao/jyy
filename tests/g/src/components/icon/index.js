/*
 * @Author: tim huang
 * @Date: 2018-12-25 15:12:19
 * @Last Modified by: tim huang
 * @Last Modified time: 2019-01-11 13:07:56
 */

import React from "react";

export default function({ type, size, color, onClick }) {
  const style = {};
  if (size) {
    style.fontSize = size + "px";
  }
  if (color) {
    style.color = color;
  }
  return (
    <i
      className={`icon iconfont icon-${type}`}
      style={style}
      onClick={onClick}
    />
  );
}
