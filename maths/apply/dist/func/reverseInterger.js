"use strict";
const reverseInteger = (num) => {
    let str = num + '';
    let flag = false;
    if (str.includes('-')) {
        flag = true;
        str = str.slice(1);
    }
    const arr = str.split('');
    str = arr.reverse().join('');
    return flag ? '-' + (+str) : +str;
};
const num = reverseInteger(-1334);
console.log(num);
