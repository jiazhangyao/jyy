class Factors {
    constructor() {

    }
    factorialize(num1: number, num2: number) {
        let sum = 0
        for (let i = num1; i <= num2; i++) {
            sum += i
        }
        return sum
    }
    unite(...arr: any[]) {
        const arrs: number[] = []
        const sets = new Set()
        arr.map(ele => {
            arrs.push(...ele)
        })
        return [...new Set(arrs)].sort((a, b) => a - b)
    }
    diff(arr1: number[], arr2: number[]) {
        let arr = [...arr1.filter(ele => {
            return !arr2.includes(ele)
        }), ...arr2.filter(ele => {
            return !arr1.includes(ele)
        })]
        return arr
    }
    steamroller(arr: any[]) {
        return arr.flat(Infinity)
    }
    isBoolean(opt: any) {
        return typeof opt === 'boolean'
    }
    myReplace(str: string, owner: string, target: string) {
        return str.replace(owner, target)
    }
    fearNotLetter(str: string) {
        const arr = []
        for (let i = 0; i < str.length; i++) {
            let num = str.charCodeAt(i + 1) - str.charCodeAt(i)
            if (num > 1) {
                arr.push(String.fromCharCode(str.charCodeAt(i) + 1))
            }
        }
        return arr
    }
    isPrime(num: number) {
        for (let i = 2; i < num; i ++) {
            if (num % i === 0) return false
        }
    }
}

const test = new Factors()
console.log(test.isPrime(10))


