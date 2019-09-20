
class Node {
  constructor(value) {
    this.leftNode = null;
    this.rightNode = null;
    this.parentNode = null;
    this.value = value;
  }

  setParentAsLeftChild(node) {
    this.parentNode = node;
    this.parentNode.leftNode = node;
  }

  setParentAsRightChild(node) {
    this.parentNode = node;
    this.parentNode.rightNode = node;
  }

  clearBranch() {
    this.leftNode = null
    this.rightNode = null
    this.parentNode = null
  }

  setLeft(node) {
    this.leftNode = node;
    node.parentNode = this
  }

  setRight(node) {
    this.rightNode = node;
    node.parentNode = this;
  }

  haveLeft() {
    return this.leftNode ? true : false
  }

  haveRight() {
    return this.rightNode ? true : false
  }

  getValue() {
    return this.value;
  }

  getLeft() {
    return this.leftNode;
  }

  getRight() {
    return this.rightNode;
  }

  getParent() {
    return this.parentNode;
  }

  replaceChild(oldNode, newNode) {
    if (this.leftNode == oldNode) {
      this.leftNode = newNode;
      newNode.parentNode = this
    } else {
      this.rightNode = newNode;
      newNode.parentNode = this
    }
  }
}


module.exports = Node;
