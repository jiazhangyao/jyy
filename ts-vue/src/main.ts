import Vue from 'vue';
import App from './App.vue';
import { router } from './router/index';
import store from './store/store';
import '@/common/js/antDesign';
import routerCofing from '@/common/js/router';
import MessageValue from '@/common/js/messagevalue';
Vue.prototype.$messagevalue = MessageValue;
Vue.config.productionTip = false;
routerCofing(router);
import '@/common/sass/index.scss';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
