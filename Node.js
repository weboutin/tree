
class Node {
  constructor(value) {
    this.leftNode = null;
    this.rightNode = null;
    this.value = value;
  }
  setLeft(node) {
    this.leftNode = node;
  }
  setRight(node) {
    this.rightNode = node;
  }
}


module.exports = Node;
