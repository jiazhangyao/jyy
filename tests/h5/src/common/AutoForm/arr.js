export const fns = (w) => {
    const arrs = [
    {
        type: 1, //输入框 , 必填
        key: 'demo1', //key, 必填
        inputType: 'text', //输入框类型, 可选
        label: '姓名', //label, 可选
        value: '', //初始值, 可选
        required: true //是否必填, 可选
    },
    {
        type: 11,
        label: '性别', //label, 可选
        value: '男',
        key: 'demo11',
        data: ['男', '女'],
        required: false //是否必填, 可选
    },
    {
        type: 1, //输入框 , 必填
        key: 'id', //key, 必填
        inputType: 'tel', //输入框类型, 可选
        label: '身份证号', //label, 可选
        value: '', //初始值, 可选
        required: false //是否必填, 可选
    },
    {
        type: 1, //输入框 , 必填
        key: 'address', //key, 必填
        inputType: 'text', //输入框类型, 可选
        label: '家庭住址', //label, 可选
        value: '', //初始值, 可选
        required: false //是否必填, 可选
    },
    {
        type: 3, //输入框 , 必填
        key: 'user', //key, 必填
        label: '推荐人', //描述
        value: 2, //命中值
        show: false, //设为true可以让初始化时就显示
        data: [
            '张一',
            '张二',
            '张三',
            '张四',
            '张五',
            '张六',
            '张七',
            '张八',
            '张九'
        ],
        callback: (value, index) => {
            console.log(`选中项${value},索引${index}`)
        }
    },
    {
        type: 10,
        label: '是否入伍', //label, 可选
        value: true,
        key: 'demo10',
        required: true, //是否必填, 可选,
        // callback: value => {
        //     this.data[6].hidden = !value
        //     this.data[6].required = value

        //     this.data[7].hidden = !value
        //     this.data[7].required = value
        // }
    },
    {
        type: 5, //输入框 , 必填
        key: 'demo5', //key, 必填
        label: '退伍时间', //label, 可选
        dateType: 'date', //取值 datetime | date | time | year_month
        value: '2022-05-05', //初始值, 可选
        hidden: false,
        required: true //是否必填, 可选
    },
    {
        type: 4, //多行文本框
        key: 'reason',
        value: '',
        readonly: false,
        placeholder: '请输入申请理由',
        info: '申请理由不能为空啦',
        required: true,
        maxlength: 2000,
        minHeight: 60, //最小高度
        maxHeight: 140, //最大高度
        hidden: false //隐藏字段
    },
    {
        type: 7, //一个按钮
        label: '提交',
        readonly: false,
        class: '123', //自定义样式,类
        hidden: false, //隐藏字段
        callback: w
    }
    ]
    return {arrs}
} 

