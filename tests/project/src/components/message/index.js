import { message } from "antd";
import { DURATION } from "common/const";
import "./style.less"

const appMessage = {};
Object.keys(message).forEach(fn => {
  appMessage[fn] = (content, duration = DURATION[fn], onClose) =>
    message[fn](content, duration, onClose);
});

export default appMessage;
