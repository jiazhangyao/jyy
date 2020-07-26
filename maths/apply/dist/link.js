"use strict";
const { pHead1, pHead2, pHead } = require('./modes/linkValue');
class Link {
    constructor() {
        this.head = pHead;
    }
    print() {
        let node = this.head;
        const arr = [];
        while (node.next) {
            arr.push(node.val);
            node = node.next;
        }
        console.log('print', arr);
    }
    reverse() {
        const reverseArr = [];
        let node = this.head;
        while (node.next) {
            reverseArr.unshift(node.val);
            node = node.next;
        }
        console.log('reverse', reverseArr);
    }
    merge(pHead1, pHead2) {
        if (!pHead1)
            return pHead2;
        if (!pHead2)
            return pHead1;
        if (!pHead1 && !pHead2)
            return null;
        let head;
        if (pHead1.val < pHead2.val) {
            head = pHead1;
            head.next = this.merge(pHead1.next, pHead2);
            return head;
        }
        else {
            head = pHead2;
            head.next = this.merge(pHead1, pHead2.next);
            return head;
        }
    }
    findKthFromTail(head, k) {
        if (!head || !k)
            return null;
        let front = this.head;
        let behind = this.head;
        let index = 1;
        while (front.next) {
            front = front.next;
            index++;
            if (index > k) {
                behind = behind.next;
            }
        }
        return k <= index && behind;
    }
    reverseList(head) {
        let currentNode = null;
        let headNode = head;
        while (head && head.next) {
            currentNode = head.next;
            head.next = currentNode.next;
            currentNode.next = headNode;
            headNode = currentNode;
        }
        return headNode;
    }
}
const l = new Link();
const t = l.reverseList(pHead);
console.log(t);
