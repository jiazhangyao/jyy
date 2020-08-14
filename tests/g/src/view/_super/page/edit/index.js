import React, { Component, Children } from "react";
import queryString from "query-string";
import editForm from "./editForm";
import { Row, Modal } from "antd";
import formField from "./formField";
import { Icon, BreadCrumbRow } from "components";
import tools from "utils/tools";
import "./style.less";
const Confirm = Modal.confirm;

const autoBindFns = [
  "renderFormHook",
  "renderForm",
  "actionRender",
  "actionRenderHook",
  "renderTop",
  "doRender"
];

const PAGE_TYPES = {
  ADD: "add",
  EDIT: "edit"
};

class EditPage extends Component {
  constructor(props) {
    super(props);
    autoBindFns.forEach(fn => {
      if (this[fn]) {
        this[fn] = this[fn].bind(this);
      }
    });
    this.state = {
      dataTag: undefined,
      preDataTag: undefined
    };
    this.setFormField(props);
  }
  static getDerivedStateFromProps(props, state) {
    const { store } = props;
    return {
      dataTag: store.dataTag,
      preDataTag: state.dataTag
    };
  }

  componentDidUpdate() {
    const { dataTag, preDataTag } = this.state;
    if (dataTag !== preDataTag) {
      this.setFormField(this.props);
    }
  }
  componentDidMount() {
    const { store, location, page } = this.props;
    if (store && store.initHook) {
      let params = {};
      if (location && location.search) {
        params = queryString.parse(location.search);
      }
      if (page) {
        params.page = page;
      }
      store.initHook(params);
    }
  }
  componentWillUnmount() {
    const { store } = this.props;
    if (store.unmountHook) {
      store.unmountHook();
    }
  }
  onSubmitClick = () => {
    const {
      form: { validateFieldsAndScroll }
    } = this.props;
    validateFieldsAndScroll({ force: true }, (err, values) => {
      if (err) {
        console.log("values: ", values);
        return;
      }
      this.doSubmit(values);
    });
  };
  doSubmit = values => {
    const { store } = this.props;
    if (store.submitHook) {
      store.submitHook(values);
    }
  };

  onDelete = id => {
    const { store } = this.props;
    Confirm({
      // title: "确认删除么?",
      iconType: "none",
      content: `确认删除该${this.entityDesc}？`,
      onOk: () => {
        if (store.delete) {
          store.delete(id);
        }
      },
      onCancel() { }
    });
  };

  onCancal = () => {
    let { store } = this.props;
    if (store.onCancal) {
      store.onCancal();
      tools.resetToTop();
    }
  };

  setFormField = props => {
    const {
      form,
      store: { data },
      store
    } = props;
    this.FormField = formField({ form, data });
    store.updPageTag();
  };
  renderFormHook() {
    if (!this.renderForm) {
      return null;
    }
    return this.renderForm();
  }
  actionRenderHook() {
    if (!this.actionRender) {
      return null;
    }
    const { page } = this.props;
    const nodeArr = Children.toArray(this.actionRender());
    if (!nodeArr.length || !nodeArr.length > 1) {
      throw new Error("所有的操作必须包裹在一个标签中！");
    }
    const actions = [];
    Children.forEach(nodeArr[0].props.children, (child, index) => {
      const { activePage, children, ...rest } = child.props;
      if (activePage && activePage !== page) {
        return;
      }
      rest.key = Math.random();
      actions.push(React.createElement(child.type, rest, children));
    });
    return <Row className="edit-actions-container">{actions}</Row>;
  }

  renderTop() {
    const {
      store: { crumbList, activedTabKey }
    } = this.props;
    if ((!crumbList || !crumbList.length) && !this.topActionRender) {
      return null;
    }
    return (
      <BreadCrumbRow
        crumbList={crumbList}
        topActionRender={this.topActionRender}
        activedTabKey={activedTabKey}
      />
    );
  }

  render() {
    const { store } = this.props;
    return (
      <>
        {this.renderTop()}
        <div className="edit-page-content">{this.renderFormHook()}</div>
        {this.actionRenderHook()}
        <div style={{ display: "none" }}>{store.dataTag + store.pageTag}</div>
      </>
    );
  }
}

EditPage.editForm = editForm;
EditPage.PAGE_TYPES = PAGE_TYPES;

export default EditPage;
