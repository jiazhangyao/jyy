const selectPage = {
    data() {
        return {
            select_show: false,
            select_arr: [],    //迭代的数组
            select_key: 'key',    //中间传递的值
            selectTitle: '',
            propsValue: ''
        }
    },
    methods: {
        pageChange(select) {
            if (this.disabled) {
                return false;
            }
            if (select) {
                this[this.select_key] = select;
            }

            this.hideSelect();
        },
        hideSelect() {
            this.select_show = false;
        },
        showSelect() {
            this.select_show = true;
        },
        changeS(arr, key, title, valueName) {
            if (title) {
                this.selectTitle = title;
            }
            if (this.disabled) {
                return false;
            }
            this.select_show = true;
            if (arr) {
                this.select_arr = arr;
            }
            if (key) {
                this.select_key = key
            }
            if (arguments.length==4) {
                this.propsValue = valueName;
            }
        },
        getNameByKey(arr, value) {
            let res = arr.find(item => item.key == value);
            return res ? res.name : '';
        },
        getKeyByName(arr, name) {
            let res = arr.find(item => item.name == name);
            return res ? res.key : '';
        },
        arrGet(arr, value, key = 'id') {
            let res = arr.find(item => item.name == value);
            return res[key];
        },
    }
}
export default selectPage;