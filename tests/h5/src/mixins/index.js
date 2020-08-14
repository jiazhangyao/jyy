/*
* Created by Alex Zhang on 2019/3/19
*/
import {mapGetters, mapActions} from "vuex"
//用于解决router自身的记住位置会互相干扰的问题
const saveScrollPosition = {
    data() {
        return {
            scrollY: 0
        }
    },
    beforeRouteLeave(to, from, next) {
        this.scrollY = window.scrollY;
        next()
    },
    beforeRouteEnter(to, from, next) {
        next(vm => window.scroll(0, vm.scrollY))
    }
}
// 初始化数据
const initData = {
    methods: {
        ...mapActions(["initMonthlyData"]),
        init(monthlyId,articleType,id) {
            this.initMonthlyData({monthlyId,articleType,id})
        }
    }
}


export {saveScrollPosition, initData}
