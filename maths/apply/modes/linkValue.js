const pHead1 = {
    val: 1,
    next: {
        val: 3,
        next: null
    }
}

const pHead2 = {
    val: 2,
    next: {
        val: 4,
        next: null
    }
}

const pHead = {
    val: 1,
    next: {
        val: 2,
        next: {
            val: 3,
            next: {
                val: 4,
                next: {
                    val: 5,
                    next: null
                }
            }
        }
    }
}

module.exports = {
    pHead1,
    pHead2,
    pHead
}