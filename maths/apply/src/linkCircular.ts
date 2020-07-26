class Nodes {
    next: any
    val: any
    constructor(val: number) {
        this.val = val
        this.next = null
    }
}

class CircularLink {
    head: any
    constructor() {
        this.head = null
    }
    push(ele: number) {
        const node = new Nodes(ele)
        let current: any
        if (this.head === null) {
            this.head = node
        } else {
            current = this.head
            while (current && current.next) {
                current = current.next
            }
            current.next = node
        }
        node.next = this.head
    }
    print() {
        console.log(this.head);
        
    }
}

const c = new CircularLink()
c.push(1)
c.push(2)
c.print()


