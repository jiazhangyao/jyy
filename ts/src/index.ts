
// export class Node<K> {
//     left: Node<K> | null;
//     right: Node<K> | null;

//     constructor(public key: K) {
//         this.left = null;
//         this.right = null
//     }
// }

// class Bst<T> {
//     private num: number | undefined;
//     constructor(private root: Node<T> | null) {

//     }
//     insert(key: T) {
//         // special case: first key
//         if (this.root == null) {
//           this.root = new Node(key);
//         } else {
//           this.insertNode(this.root, key);
//         }
//       }
    
//       protected insertNode(node: Node<T>, key: T) {
//         if (node.key < key) {
//           if (node.left == null) {
//             node.left = new Node(key);
//           } else {
//             this.insertNode(node.left, key);
//           }
//         } else if (node.right == null) {
//           node.right = new Node(key);
//         } else {
//           this.insertNode(node.right, key);
//         }
//       }
    
// }

// const w = new Node<number>(10)

