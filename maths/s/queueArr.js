class Queue {
    constructor() {
        this.queue = []
    }
    enQueue(ele) {
        this.queue.push(ele)
    }
    deQueue() {
        return this.shift()
    }
    size() {
        return this.queue.length
    }
    front() {
        return this.queue[0]
    }
    isEmpty() {
        return this.queue.length === 0
    }
    clear() {
        this.queue = []
    }
}



