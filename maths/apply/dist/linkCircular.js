"use strict";
class Nodes {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}
class CircularLink {
    constructor() {
        this.head = null;
    }
    push(ele) {
        const node = new Nodes(ele);
        let current;
        if (this.head === null) {
            this.head = node;
        }
        else {
            current = this.head;
            while (current && current.next) {
                current = current.next;
            }
            current.next = node;
        }
        node.next = this.head;
    }
    print() {
        console.log(this.head);
    }
}
const c = new CircularLink();
c.push(1);
c.push(2);
c.print();
