"use strict";
class Test {
    constructor() {
    }
    chunk(arr, size) {
        let applyArr = [];
        for (let i = 0; i < arr.length; i += size) {
            applyArr.push(arr.slice(i, (i + size)));
        }
        return applyArr;
    }
    repeat(str, target) {
        console.log(str.repeat(target));
        let l = str.length;
        for (let i = 0; i < target; i++) {
            str += str;
        }
        return str.slice(0, l * target);
    }
    confirmEnding(str, target) {
        let arr = str.split(' ');
        return target === arr[arr.length - 1];
    }
    titleCase(str) {
        let arr = str.split(' ');
        return arr.map(ele => {
            return ele.replace(ele[0], ele[0].toUpperCase());
        }).join('');
    }
    findLongestWord(str) {
        let arr = str.split(' ');
        let index = 0;
        let container = null;
        arr.map(ele => {
            if (ele.length > index) {
                index = ele.length;
                container = ele;
            }
        });
        return container;
    }
    palindrome(str) {
        let l = 0;
        let r = str.length - 1;
        while (l < r) {
            l++;
            r--;
            if (str[l] !== str[r])
                return false;
        }
        return true;
    }
    factorialize(num) {
        if (num < 0)
            return -1;
        else if (num === 1)
            return 1;
        else
            return num * this.factorialize(num - 1);
    }
    langestOfArrs(arr) {
        const applyArr = [];
        for (let ele of arr) {
            applyArr.push(ele.sort((a, b) => b - a));
        }
        return (applyArr);
    }
    slasher(arr, howMany) {
        return arr.slice(0, howMany);
    }
    mutation(parentStr, childStr) {
        console.log(parentStr.indexOf(childStr));
        // for (let i of childStr) {
        //     if (!parentStr.includes(i)) return false
        //     return true
        // }
    }
    bouncer(arr) {
        return arr.filter(ele => Boolean(ele));
    }
    destory(arr, opt) {
        return arr.filter(ele => ele !== opt);
    }
    rot13(str) {
        let strs = '';
        const arr = [];
        for (let i = 0; i < str.length; i++) {
            arr.push(str.charCodeAt(i));
        }
        return String.fromCharCode(...arr);
    }
    extendedOpt(...opt) {
        console.log(opt);
    }
}
const tests = new Test();
// console.log(tests.rot13("SERR PBQR PNZC"));
tests.extendedOpt('a', 'b', 'c');
