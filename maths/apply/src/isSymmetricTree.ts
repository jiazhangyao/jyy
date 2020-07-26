import {
    treeValue, treeNodes
} from './types/tree'
function isSymmetricalTree(node1: treeNodes, node2: treeNodes): boolean | undefined {
    if (!node1 && !node2) return true
    if (!node1 || !node2) return false
    if (node1.key !== node2.key) return false
    return isSymmetricalTree(node1.left!, node2.right!) && isSymmetricalTree(node1.right!, node2.left!)
}

function isSymmetric(pRoot: treeNodes) {
    console.log(isSymmetricalTree(pRoot, pRoot))
}

isSymmetric(treeValue)
