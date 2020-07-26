const { Link, LinkNode } = require('./link')
const arr = [1, 2]

class DoublyLinkNode {
    constructor(val) {
        this.val = val
        this.next = null
        this.prev = null
    }
}

class DoublyLinkList {
    constructor() {
        this.head = null
        this.tail = null
        this.count = 0
    }
    push(ele) {
        const node = new DoublyLinkNode(ele)
        if (this.head === null) {
            this.head = node
            this.tail = node
        } else {
            this.tail.next = node
            node.prev = this.tail
            this.tail = node
        }
        this.count ++
    }
    insert(ele, index) {
        if (index >= 0 && index < this.count) {
            
        }
    }
    removeAt(index) {
        if (index >= 0 && index < this.count) {
            if (index === 0) {
                if (this.count === 1) {
                    this.head.prev = null
                    this.tail.prev = null
                }
                this.head = this.head.next
            } else if (index === this.count - 1) {
                this.tail = this.tail.prev
                this.tail.next = null
            }
            this.count -- 
        }
    }
    indexOf(ele) {
        let node = this.head
        let index = 0
        while (node.next && node.val !== ele) {
            index ++
            node = node.next
        }
        console.log(index);   
    }
    getHead() {
        console.log(this.head);
        console.log(this.count);
        
    }
    getTail() {
        console.log(this.tail);
        console.log(this.count);
        
    }
    print() {

    }
}

const d = new DoublyLinkList()
arr.forEach(ele => {
    d.push(ele)
})
d.removeAt(0)
d.getHead()
d.getTail()

