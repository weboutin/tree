const { printTree } = require('../printTree')

// const seeds = [2, 1, 3];
const seeds = [9, 2, 1, 6, 5, 3, 8];

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


function buildTree(currentNode, compareNode) {
  if (currentNode.value < compareNode.value) {
    if (!compareNode.leftNode) {
      compareNode.setLeft(currentNode)
      return
    }
    buildTree(currentNode, compareNode.leftNode)
  } else {
    if (!compareNode.rightNode) {
      compareNode.setRight(currentNode)
      return
    }
    buildTree(currentNode, compareNode.rightNode)
  }
}


let rootNode = new Node(seeds[0]);

for (let i = 1; i < seeds.length; i++) {
  buildTree(new Node(seeds[i]), rootNode);
}

function result(node) {
  if (node.leftNode) {
    result(node.leftNode)
  }
  console.log(node.value)
  if (node.rightNode) {
    result(node.rightNode);
  }
}

// result(rootNode)
printTree(rootNode)
