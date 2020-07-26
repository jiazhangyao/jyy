import { treeNodes, treeValue, serializeTreeValue } from './types/tree'

class Bst {
    private root: treeNodes | null = treeValue
    private arr: (number | string)[] = []
    private serializeRoot: treeNodes | null = serializeTreeValue
    preOrder() {
        this.preOrderNode(this.root!)
    }
    preOrderNode(ele: treeNodes) {
        if (ele) {
            this.arr.push(ele.key)
            this.preOrderNode(ele.left!)
            this.preOrderNode(ele.right!)
        }
    }
    getMaxDepth() {
        const t = this.getMaxDepthNode(this.root!)
        console.log(t);
        
    }
    getMaxDepthNode(ele: treeNodes): number {
        return !ele ? 0 : Math.max(this.getMaxDepthNode(ele.left!), this.getMaxDepthNode(ele.right!)) + 1
    }
    getMinDepth() {
        const t = this.getMinDepthNode(this.root!)
        console.log(t);
        
    }
    getMinDepthNode(node: treeNodes): number {
        if (!node) return 0
        if (!node.left) return 1 + this.getMinDepthNode(node.right!)
        if (!node.right) return 1 + this.getMinDepthNode(node.left)
        return Math.min(this.getMinDepthNode(node.left), this.getMinDepthNode(node.right)) + 1
    }
    serialize() {
        if (this.serializeRoot) {
            const t = this.serializeNode(this.serializeRoot, [])
            console.log(t);
        }
    }
    deserialize() {
        const t = this.serializeNode(this.serializeRoot!, [])
        const s = this.deSerializeNode(t.split(''))
        console.log(s);
        
    }
    deSerializeNode(arr: (number | string)[]) {
        let node!: treeNodes
        let opt: (number | string) = (arr.shift())!
        if (opt !== '#') {
            node = { key: opt, left: null, right: null}
            node.left = this.deSerializeNode(arr)
            node.right = this.deSerializeNode(arr)
        }
        return node
    }
    serializeNode(node: treeNodes, arr: (number | string)[] = []) {
        if (!node?.key) {
            arr.push('#')
        } else {
            arr.push(node.key)
            this.serializeNode(node.left!, arr)
            this.serializeNode(node.right!, arr)
        }
        return arr.join('') 
    }
    print(): void {
        console.log(this.arr);
        
    }
}

const b = new Bst()
b.deserialize()
