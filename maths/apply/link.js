"use strict";
var _a = require('./modes/linkValue'), pHead1 = _a.pHead1, pHead2 = _a.pHead2, pHead = _a.pHead;
var Link = /** @class */ (function () {
    function Link() {
        this.head = pHead;
    }
    Link.prototype.print = function () {
        var node = this.head;
        var arr = [];
        while (node.next) {
            arr.push(node.val);
            node = node.next;
        }
        console.log('print', arr);
    };
    Link.prototype.reverse = function () {
        var reverseArr = [];
        var node = this.head;
        while (node.next) {
            reverseArr.unshift(node.val);
            node = node.next;
        }
        console.log('reverse', reverseArr);
    };
    Link.prototype.merge = function (pHead1, pHead2) {
        if (!pHead1)
            return pHead2;
        if (!pHead2)
            return pHead1;
        if (!pHead1 && !pHead2)
            return null;
        var head;
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
    };
    Link.prototype.findKthFromTail = function (head, k) {
        if (!head || !k)
            return null;
        var front = this.head;
        var behind = this.head;
        var index = 1;
        while (front.next) {
            front = front.next;
            index++;
            if (index > k) {
                behind = behind.next;
            }
        }
        return k <= index && behind;
    };
    Link.prototype.reverseList = function (head) {
        var currentNode = null;
        var headNode = head;
        while (head && head.next) {
            currentNode = head.next;
            head.next = currentNode.next;
            currentNode.next = headNode;
            headNode = currentNode;
        }
        return headNode;
    };
    return Link;
}());
var l = new Link();
var t = l.reverseList(pHead);
console.log(t);
