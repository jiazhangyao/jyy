/*
 * Created by Alex Zhang on 2019/3/27
 */
export const pushHistory = () => {
    let state = {
        title: '',
        url: ''
    }
    window.history.pushState(state, state.title, state.url)
}

export const toBase64 = str => {
    return window.btoa(unescape(encodeURIComponent(str)));
};

// 密码校验
export const validatePassword = val => {
    var reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z!#$%^&*]{8,15}$/;
    return reg.test(val);
}

export const queryURL = function (name) {
    // VUE的URL中含有#，且未限定位置。使用 window.location.search会查询#前且？后的数据，可能查不到search数据。此处自己获取search
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, "i");
    const location = window.location.href.split('?');
    const search = location.length > 1 ? location[location.length - 1] : "";
    const r = search.match(reg);
    if (r != null) return decodeURIComponent(r[2]);
    return null;
};

export const GetHtmlImageUrlList = sHtmlText => {
    const reg = /<\s*img\s+[^>]*?src\s*=\s*(\'|\")(.*?)\1[^>]*?\/?\s*>/;
    sHtmlText.match(reg);
    return RegExp.$2;
};

export const htmlRemoverImage = sHtmlText => {
    let newText = "";
    newText = sHtmlText.replace(/<img.*\/>/gi, "");
    newText = sHtmlText.replace(/<img.*>/gi, "");
    newText = newText.replace(/<img.*>.*<\/img>/gi, "");
    newText = newText.replace(/<[^>]+>/g, "");
    return newText;
};

export const propertySource = [
    {key: 1, name: "自建"},
    {key: 2, name: "买卖"},
    {key: 3, name: "互换"},
    {key: 4, name: "赠与"},
    {key: 5, name: "继承"},
    {key: 6, name: "遗赠"},
    {key: 7, name: "法人或其他组织分立或合并"},
    {key: 8, name: "因生效法律文书取得"},
    {key: 9, name: "分割或合并共有房屋"},
    {key: 10, name: "以房屋出资入股"},
    {key: 11, name: "征收"},
    {key: 12, name: "其他"},
];