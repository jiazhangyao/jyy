class Stack {
    constructor() {
        this.stack = []
    }
    push(ele) {
        this.stack.push(ele)
        return this.stack.length
    }
    pop() {
        return this.stack.pop()
    }
    size() {
        return this.stack.length
    }
    peek() {
        return this.stack[this.length - 1]
    }
    clear() {
        this.stack = []
    }
    isEmpty() {
        return this.stack.length === 0
    }
}
