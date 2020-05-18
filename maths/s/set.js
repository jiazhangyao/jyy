const setA = new Set()
setA.add(1)
setA.add(2)
setA.add(3)
setA.add(4)

const setB = new Set()
setB.add(1)
setB.add(2)
setB.add(3)

//并集
const union = (setA, setB) => {
    const setAB = new Set()
    setA.forEach(ele => setAB.add(ele))
    setB.forEach(ele => setAB.add(ele))
    return setAB
}

console.log(union(setA, setB))

//交集
const interSection = (setA, setB) => {
    const interSectionSet = new Set()
    for (let i of setA) {
        setB.has(i) && interSectionSet.add(i)
    }
    return interSectionSet
}

console.log(setA, setB)

//差集
const difference = (setA, setB) => {
    const differenceSet = new Set(
        [...setA].filter(ele => !setB.has(ele))
    )
    return differenceSet
}

console.log(difference(setA, setB))


