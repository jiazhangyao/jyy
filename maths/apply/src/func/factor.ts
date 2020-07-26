class Test<T> {
    constructor() {

    }
    chunk(arr: string[], size: number) {
        let applyArr = []
        for (let i = 0; i < arr.length; i += size) {
            applyArr.push(arr.slice(i, (i + size)))
        }
        return applyArr
    }
    repeat(str: string, target: number) {
        console.log(str.repeat(target));
        
        let l = str.length
        for (let i = 0; i < target; i ++) {
            str += str
        }
        return str.slice(0, l * target)
    }
    confirmEnding(str: string, target: string) {
        let arr = str.split(' ')
        return target === arr[arr.length - 1]
    }
    titleCase(str: string) {
        let arr = str.split(' ')
        return arr.map(ele => {
            return ele.replace(ele[0], ele[0].toUpperCase())
        }).join('')
    }
    findLongestWord(str: string) {
        let arr = str.split(' ')
        let index = 0
        let container = null
        arr.map(ele => {
            if (ele.length > index) {
                index = ele.length
                container = ele
            }
        })
        return container
    }
    palindrome(str: string): boolean {
        let l = 0
        let r = str.length - 1
        while (l < r) {
            l ++
            r --
            if (str[l] !== str[r]) return false
        }
        return true
    }

    factorialize(num: number): number {
       if (num < 0) return -1
       else if (num === 1) return 1
       else return num * this.factorialize(num - 1)
    }
    langestOfArrs(arr: number[][]) {
        const applyArr = []
        for (let ele of arr) {
            applyArr.push(ele.sort((a, b) => b - a))
        }
        return(applyArr);
    }
    slasher(arr: number[], howMany: number) {
        return arr.slice(0, howMany)
    }
    mutation(parentStr: string, childStr: string) {
        console.log(parentStr.indexOf(childStr));
        // for (let i of childStr) {
        //     if (!parentStr.includes(i)) return false
        //     return true
        // }
    }
    bouncer(arr: any[]) {
        return arr.filter(ele => Boolean(ele))
    }
    destory(arr: number[], opt: number) {
        return arr.filter(ele => ele !== opt)
    }
    rot13(str: string) {
        let strs = ''
        const arr = []
        for (let i = 0; i < str.length; i ++) {
            arr.push(str.charCodeAt(i))
        }
        return String.fromCharCode(...arr)
    }
    extendedOpt(...opt: string[]) {
        console.log(opt);
        
    }
}

const tests = new Test()
// console.log(tests.rot13("SERR PBQR PNZC"));
tests.extendedOpt('a', 'b', 'c')