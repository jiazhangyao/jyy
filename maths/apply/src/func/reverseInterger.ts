const reverseInteger = (num: number) => {
    let str: string = num + ''
    let flag: boolean = false
    if (str.includes('-')) {
        flag = true
        str = str.slice(1)
    }

    const arr: string[] = str.split('')
    str = arr.reverse().join('')
    return flag ? '-' + (+str) : +str
}

const num = reverseInteger(-1334)
console.log(num);

