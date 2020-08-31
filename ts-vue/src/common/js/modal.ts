import { Modal } from "ant-design-vue";
/**
 * 退出当前路由内容不为空弹框
 * @param callback funtion
 * @return function
 */
const defaultText: string = '系统发现您还有内容没保存，确定要退出当前页面吗？';
export function beforeRouteLeaveModal(callback: () => void, text: string = defaultText): any {
  Modal.confirm({
    title: '提示',
    icon: (h: any) => {
      return h("a-icon", {
        props: { type: "exclamation-circle", theme: "filled" }
      });
    },
    keyboard: false,
    content: text,
    okText: "确定",
    cancelText: "取消",
    onOk: () => {
      callback();
    }
  });
}
