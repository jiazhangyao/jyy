class Queue {
  constructor() {
    this.items = {}
    this.count = 0
    this.lowestCount = 0
  }
  enQueue(ele) {
    this.items[this.count] = ele
    this.count ++
  }
  deQueue() {
    if (this.isEmpty()) return undefined
    const result = this.items[this.lowestCount]
    delete this.items[this.lowestCount]
    this.lowestCount ++
    return result
  }
  isEmpty() {
    return this.count - this.lowestCount === 0
  }
  peek() {
    return this.items[this.lowestCount]
  }
  clear() {
    this.items = {}
    this.count = 0
    this.lowestCount = 0
  }
  size() {
    return this.count - this.lowestCount
  }
  print() {
    console.log(Object.values(this.items));
    return Object.values(this.items)
  }
}

module.exports = Queue

