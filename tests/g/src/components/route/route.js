/*
 * @Author: tim huang
 * @Date: 2018-12-25 15:12:51
 * @Last Modified by: tim huang
 * @Last Modified time: 2019-01-23 20:41:09
 */

import React from "react";
import { Route } from "react-router-dom";

const setTitle = name => {
  if (document && document.title) {
    document.title = name || process.env.REACT_APP_NAME_ENV;
  }
};

export default ({
  title,
  parent: Parent,
  component: Componnet,
  render,
  page,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      title && setTitle(title);
      if (page) {
        props.page = page;
      }

      if (Componnet && Parent) {
        return (
          <Parent>
            <Componnet {...props} />
          </Parent>
        );
      } else if (Componnet) {
        return <Componnet {...props} />;
      } else if (Parent) {
        return <Parent>{render(props)}</Parent>;
      } else {
        return render(props);
      }
    }}
  />
);
