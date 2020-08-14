// 校验验证码6位
export const verifyMsgAuthCode = (value, callback) => {
    if (value && !/^\d{6}$/.test(value)) {
        return ('短信验证码为6位数字');
    } else {
        return true;
    }
}
// 校验身份证号
export const verifyId = (value, callback) => {
    if (value && !/^\d{17}(\d|x)$/i.test(value)) {
        return ('请输入正确的身份证号');
    } else {
        return true;
    }
}
// 校验手机号码 
export const verifyPhone = (value, callback) => {
    if (!value) {
        return ('请输入手机号');
    } else if (value && !/^1[0-9][0-9]{9}$/.test(value)) {
        return ('手机号格式不正确');
    } else {
        return true;
    }
}

// 校验手机号码
export const verifyPhoneWithFlag = (needFlag, value, callback) => {
    if (!needFlag) {
        callback()
        return
    }
    return verifyPhone(value, callback)
}

// 校验密码
export const verifyPassword = (value, callback) => {
    if (value && (/[\u4E00-\u9FA5\uF900-\uFA2D]/.test(value) || /[\uFF00-\uFFEF]/.test(value) || !/^(?![a-zA-z]+$)(?!\d+$)(?![!\"#$%&'()*+,-./:;<=>?@\[\]^_`{|}~]+$)[a-zA-Z\d!\"#$%&'()*+,-./:;<=>?@\[\]^_`{|}~]{6,20}$/.test(value))) {
        return ('6~20位字符，至少包含数字.字母.符号中的2种');
    } else {
        return true;
    }
}
//统一社会信用代码
export const verifyidentify = (value, callback) => {
    if (value && !/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d]{18}$/.test(value)) {
        return ('18位字,包含数字.字母');
    } else {
        return true;
    }
}
// 校验姓名 最大20字
export const verifyname = (value, callback) => {
    if (value && value.length > 20) {
        return ('姓名/名称长度不得超过20')
    } else {
        callback()
    }
}

// 校验账户 最大50字
export const verifyaccount = (value, callback) => {
    if (value && !/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d]{18}$/.test(value) && value.length > 50) {
        return ('账户长度不得超过50,包含数字.字母')
    } else {
        callback()
    }
}
// 校验面积 金额 两位小数
export const verifydecimal = (value, callback) => {
    if (value && !/^\d{1,15}\.\d{2}?$/.test(value)) {
        return ('格式异常');
    } else {
        return true;
    }
}
//校验邮箱
export const verifyemail = (value, callback) => {
    if (value && !/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(value)) {
        return ('邮箱格式不正确');
    } else {
        return true;
    }
}
// 校验面积 金额 两位小数;允许为空
export const verifydecimalWithNone = (value, callback) => {
    if (!value) {
        return true;
    }
    return verifydecimal(value, callback);
}
// 校验面积 金额 两位小数;正整数自动补充2位小数部分
export const verifydecimalFillZero = (value, callback, form) => {
    if (value && /^\d{1,15}$/.test(value)) {
        form.setFieldsValue({
            [field]: (value * 1).toFixed(2),
        })
    } else {
        verifydecimal(value, callback)
    }
}
// 校验网点名称 最大20字
export const verifynameNet = (value, callback) => {
    if (value && value.length > 20) {
        return ('不超过20个字符')
    } else {
        callback()
    }
}
export const verifynameNetTen = (value, callback) => {
    if (value && value.length > 10) {
        return ('不超过10个字符')
    } else {
        callback()
    }
}
//  1-100 最多两位小数
export const verifyNumOneTo = (value, callback) => {
    let reg = /^\d\.([1-9]{1,2}|[0-9][1-9])$|^[1-9]\d{0,1}(\.\d{1,2}){0,1}$|^100(\.0{1,2}){0,1}$/
    if (value && reg.test(value)) {
        callback()
    } else {
        return ('0-100的数字')
    }
}