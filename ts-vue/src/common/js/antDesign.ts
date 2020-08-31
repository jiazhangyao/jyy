import Vue from 'vue';
import {
  Dropdown,
  Menu,
  Button,
  Input,
  Form,
  BackTop,
  Icon,
  Table,
  Tag,
  Tooltip,
  Alert,
  Checkbox,
  Breadcrumb,
  Pagination,
  Select,
  LocaleProvider,
  Affix,
  Anchor,
  Modal,
  Divider,
  Radio,
  Spin,
  Progress,
  message,
  DatePicker,
} from 'ant-design-vue';
const MY_ICON: any = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1516956_q2wfw52jiul.js' // 在 iconfont.cn 上生成
});
Vue.component("MyIcon", MY_ICON);
Vue.use(Dropdown);
Vue.use(Progress);
Vue.use(Anchor);
Vue.use(Radio);
Vue.use(Affix);
Vue.use(Menu);
Vue.use(Button);
Vue.use(Form);
Vue.use(Input);
Vue.use(Icon);
Vue.use(Breadcrumb);
Vue.use(Table);
Vue.use(Alert);
Vue.use(Tag);
Vue.use(BackTop);
Vue.use(Pagination);
Vue.use(Tooltip);
Vue.use(LocaleProvider);
Vue.use(Select);
Vue.use(Divider);
Vue.use(Checkbox);
Vue.use(Spin);
Vue.use(Modal);
Vue.use(DatePicker);

Vue.prototype.$message = message;
