const { treeValue } = require('./modes/treeValue')

class Bst {
    constructor() {
        this.root = treeValue
    }
    bfs() {
        const result = []
        const queue = [this.root]
        let count = 0
        const bfsNode = () => {
            const node = queue[count]
            if (node) {
                result.push(node.key)
                if (node.left) queue.push(node.left)
                if (node.right) queue.push(node.right)
                count ++
                bfsNode()
            }
        }
        bfsNode()
        console.log('result', result);
        
    }
    mirror() {
        let roots = this.root
        if (roots) {
            const temp = roots.left
            
            this.mirror(roots.left)
            this.mirror(roots.right)
        }
        console.log('roots', roots);
        
    }
}

const t = new Bst()
t.mirror()



