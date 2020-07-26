"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tree_1 = require("./types/tree");
function isSymmetricalTree(node1, node2) {
    if (!node1 && !node2)
        return true;
    if (!node1 || !node2)
        return false;
    if (node1.key !== node2.key)
        return false;
    return isSymmetricalTree(node1.left, node2.right) && isSymmetricalTree(node1.right, node2.left);
}
function isSymmetric(pRoot) {
    console.log(isSymmetricalTree(pRoot, pRoot));
}
isSymmetric(tree_1.treeValue);
