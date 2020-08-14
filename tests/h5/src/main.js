/*
* Created by Alex Zhang on 2019/3/19
*/
import 'lib-flexible/flexible.js'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Router from 'vue-router'
import * as filters from './filter';
// import gallery from 'img-vuer'
import FastClick from 'fastclick'
import nav from '@/mixins/navBar.js';
import NavBar from "./components/navBar.vue";
import { Dialog } from "vant"
import "./assets/iconfont/iconfont.css";
import "./style/main.less";
import VeeValidate from 'vee-validate';
// import touch from './directive'//全局引入指令
FastClick.attach(document.body);
Vue.config.productionTip = false
// 注册全局过滤器
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
return routerPush.call(this, location).catch(error=> error)
}

// Vue.use(gallery, {
//     swipeThreshold: 150, // default 100 ,new in 0.12.0
// })


//vant组件
import {
    Swipe,
    SwipeItem,
    Lazyload,
    Toast,
    Tab,
    Tabs,
    Search,
    Icon,
    Button,
    Popup,
    Field,
    Cell,
    CellGroup,
    Picker,
    DatetimePicker,
    Switch,
    RadioGroup,
    Radio
} from 'vant'
Vue.use(Swipe)
    .use(SwipeItem)
    .use(Lazyload)
    .use(Toast)
    .use(Tab)
    .use(Tabs)
    .use(Search)
    .use(Icon)
    .use(Button)
    .use(Popup)
    .use(Field)
    .use(Cell)
    .use(CellGroup)
    .use(Picker)
    .use(DatetimePicker)
    .use(Switch)
    .use(RadioGroup)
    .use(Radio)
Vue.prototype.$toast = Toast
Vue.prototype.$dialog = Dialog

let isLoading = false
Vue.prototype.$loading = (message = '加载中') => {
    isLoading = true
    //100毫秒内响应则不显示loading
    setTimeout(() => {
        if (isLoading) {
            Toast.loading({
                mask: true,
                duration: 0,
                message: message
            })
            isLoading = false
        }
    }, 100)
}
Vue.prototype.$loading.clear = () => {
    //最少持续200毫秒,防止一闪而过
    setTimeout(() => {
        if (isLoading) {
            isLoading = false
        } else {
            Toast.clear()
        }
    }, 200)
}



Vue.mixin(nav);    //全局混入，处理nav的title;
Vue.use(Dialog);
Vue.use(VeeValidate);
Vue.component('NavBar', NavBar);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
