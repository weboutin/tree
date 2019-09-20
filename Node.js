
class Node {
  constructor(value) {
    this.leftNode = null;
    this.rightNode = null;
    this.parentNode = null;
    this.value = value;
  }

  setParent(node) {
    this.parentNode = node;
  }

  clearBranch() {
    this.leftNode = null
    this.rightNode = null
    this.parentNode = null
  }

  setLeft(node) {
    this.leftNode = node;
  }
  setRight(node) {
    this.rightNode = node;
  }
}


module.exports = Node;
