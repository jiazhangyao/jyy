const Queue = require('./queueObj')

class Deque extends Queue {

  peekEnd() {
    return this.items[this.count]
  }

  addFront(ele) {
    if (this.isEmpty()) {
      this.enQueue(ele)
    } else if (this.lowestCount > 0) {
      this.lowestCount -- 
      this.itmes[this.lowestCount] = ele
    } else {
      for (let i = this.count.length; i >= 0; i --) {
        this.items[i] = this.itmes[i - 1]
      }
      this.count ++
      this.lowestCount = 0
      this.item[0] = ele
    }
  }

  removeEnd() {
    const resutl = this.items[this.count]
    delete this.items[this.count]
    this.count --
    return result
  }

}

const d = new Deque()
