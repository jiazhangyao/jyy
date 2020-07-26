"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
class Node {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}
exports.Node = Node;
class Bst {
    constructor(root) {
        this.root = root;
    }
    insert(key) {
        // special case: first key
        if (this.root == null) {
            this.root = new Node(key);
        }
        else {
            this.insertNode(this.root, key);
        }
    }
    insertNode(node, key) {
        if (node.key < key) {
            if (node.left == null) {
                node.left = new Node(key);
            }
            else {
                this.insertNode(node.left, key);
            }
        }
        else if (node.right == null) {
            node.right = new Node(key);
        }
        else {
            this.insertNode(node.right, key);
        }
    }
}
const w = new Node(10);
