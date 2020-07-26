import React from "react";
import Editor from "react-antd-wangeditor";
import apiConfigStore from "common/apiConfigStore";
import "./style.less";
class AntEditor extends React.Component {
  //设置默认
  getEditorConfig = () => {
    let defaultuploadDomain = `http://${apiConfigStore.get("uploadDomain")}`;
    let defaultviewDomain = `http://${apiConfigStore.get("viewDomain")}`;
    let { uploadDomain, viewDomain } = this.props;
    uploadDomain = uploadDomain || defaultuploadDomain;
    viewDomain = viewDomain || defaultviewDomain;
    return {
      menus: [
        "head", // 标题
        "bold", // 粗体
        "fontsize", // 字号
        "fontfamily", // 字体
        "italic", // 斜体
        "underline", // 下划线
        "strikethrough", // 删除线
        "forecolor", // 文字颜色
        "bgcolor", // 背景颜色
        "link", // 插入链接
        "orderlist", // 有序列表
        "unorderlist", // 有序列表
        "alignleft", // 左对齐
        "aligncenter", // 居中
        "alignright", // 右对齐
        "quote", // 引用
        "img", // 插入图片
        "table", // 表格
        "undo", // 撤销
        "redo" // 重复
      ],
      uploadImgUrl: `${uploadDomain}`,
      uploadImgFileName: "file", //必须设置，将不同上传方式的结果放在同一个name里面
      uploadImgFns: {
        onload: function (resultText, xhr) {
          let imgsource = JSON.parse(resultText).data;
          //const viewDomain = viewDomain;
          console.log(viewDomain, "viewDomain");
          let imgurl = `${viewDomain}/${imgsource.key}.${imgsource.ext}`;
          this.command(
            null,
            "insertHtml",
            '<img src="' + imgurl + '"  style="max-width:100%;"/>'
          );
        },
        ontimeout: function () {
          alert("上传超时");
        },
        onerror: function (res) {
          alert("上传错误");
        }
      }
    };
  };

  // let others = {}
  render = () => {
    let editorconfig = this.getEditorConfig();
    let { config, ...others } = this.props;
    editorconfig = config ? config : editorconfig;
    return (
      <Editor config={editorconfig} {...others} className="ant-modal-editor" />
    );
  };
}

export default AntEditor;
