"use strict";
class Factors {
    constructor() {
    }
    factorialize(num1, num2) {
        let sum = 0;
        for (let i = num1; i <= num2; i++) {
            sum += i;
        }
        return sum;
    }
    unite(...arr) {
        const arrs = [];
        const sets = new Set();
        arr.map(ele => {
            arrs.push(...ele);
        });
        return [...new Set(arrs)].sort((a, b) => a - b);
    }
    diff(arr1, arr2) {
        let arr = [...arr1.filter(ele => {
                return !arr2.includes(ele);
            }), ...arr2.filter(ele => {
                return !arr1.includes(ele);
            })];
        return arr;
    }
    steamroller(arr) {
        return arr.flat(Infinity);
    }
    isBoolean(opt) {
        return typeof opt === 'boolean';
    }
    myReplace(str, owner, target) {
        return str.replace(owner, target);
    }
    fearNotLetter(str) {
        const arr = [];
        for (let i = 0; i < str.length; i++) {
            let num = str.charCodeAt(i + 1) - str.charCodeAt(i);
            if (num > 1) {
                arr.push(String.fromCharCode(str.charCodeAt(i) + 1));
            }
        }
        return arr;
    }
    isPrime(num) {
        for (let i = 2; i < num; i++) {
            if (num % i === 0)
                return false;
        }
    }
}
const test = new Factors();
console.log(test.isPrime(10));
