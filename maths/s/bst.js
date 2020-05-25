const TreeValue = require('./modes/bstValue')

class Bst {

    constructor() {
        this.root = TreeValue
        this.result = []
    }

    preOrderTraversal() {
        this.preOrderTraverseNode(this.root)
    }

    preOrderTraverseNode(root) {
        if (root) {
            this.result.push(root.key)
            this.preOrderTraverseNode(root.left)
            this.preOrderTraverseNode(root.right)
        }
    }

    pre() {
        let stack = [TreeValue]
        let result = []
        while (stack.length) {
            const node = stack.pop()
            result.push(node.key)
            if (node.right) stack.push(node.right)
            if (node.left) stack.push(node.left) 
        }
        console.log(result);
        
    }

    bfs() {
        const stack = [TreeValue]
        const result = []
        let count = 0
        const bfsChild = () => {
            const node = stack[count]
            if (node) {
                result.push(node.key)
                stack.push(node.left)
                stack.push(node.right)
                count ++
                bfsChild()
            }
        }
        bfsChild()
        console.log(result);
    }

    print() {
        console.log(this.result);
        
    }

}

const b = new Bst()

b.pre()
