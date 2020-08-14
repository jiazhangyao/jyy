/*
 * @Author: tim huang
 * @Date: 2018-12-25 15:00:56
 * @Last Modified by: tim huang
 * @Last Modified time: 2018-12-25 15:38:50
 */

import { Component } from "react";
import queryString from "query-string";

class Page extends Component {
  constructor(...args) {
    super(...args);
    this.doRender = this.doRender.bind(this);
  }
  componentDidMount() {
    // const { store, location } = this.props;
    // if (store && store.init) {
    //   let params = {};
    //   if (location && location.search) {
    //     params = queryString.parse(location.search);
    //   }
    //   store.init(params);
    // }
  }
  render() {
    return this.doRender();
  }
}

export default Page;
