const linkValue = require('./modes/linkValue')

const arr = [1, 2, 3, 4, 5]

class LinkNode {
    constructor(val) {
        this.val = val
        this.next = null
    }
}

class Link {
    constructor() {
        this.head = null
        this.length = 0
    }
    push(ele) {
        const node = new LinkNode(ele)
        if (this.head === null) {
            this.head = node
        } else {
            let current = this.head
            while (current.next) {
                current = current.next
            }
            current.next = node
        }
        this.length++
    }
    insert(index, ele) {
        if (index >= 0 && index < this.length) {
            let node = new LinkNode(ele)
            let current = this.head
            if (index === 0) {
                this.head = node
                node.next = current
            } else {
                let num = 0
                let previous
                while (num < index) {
                    num ++
                    previous = current
                    current = current.next
                    
                }
                previous.next = node
                node.next = current
            }
            this.length ++
        }
    }
    removeAt(index) {
        if (index >= 0 && index < this.length) {
            let current = this.head
            if (index === 0) {
                this.head = current.next
            } else {
                let num = 0
                let previous
                while (num < index) {
                    num ++
                    previous = current
                    current = current.next
                    
                }
                previous.next = current.next
            }    
            this.length -- 
        }
    }
    indexOf(ele) {
        let current = this.head
        let index = 0
        while (current.next && current.val !== ele) {
            index++
            current = current.next
        }
    }
    size() {
        return this.length
    }
    print() {
        console.log(this.head);
        console.log(this.length);
    }
}

module.exports = {
    LinkNode,
    Link
}
