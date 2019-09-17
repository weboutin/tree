const Stack = require('./stack');
//打印树所有分支

//计算树的分支数


/**
 * 计算树最大深度
 * @param node {Object}
 **/
function getMaxDeepNum(node) {
  function max(num1, num2) {
    return num1 >= num2 ? num1 : num2
  }
  return node ? max(getMaxDeepNum(node.leftNode), getMaxDeepNum(node.rightNode)) + 1 : 0
}

/**
 * 前序遍历
 */
function preOrderTraversal(node) {
  printValue(node)
  node.leftNode && preOrderTraversal(node.leftNode)
  node.rightNode && preOrderTraversal(node.rightNode)
}

/**
 * 中序遍历
 */
function inOrderTraversal(node) {
  node.leftNode && inOrderTraversal(node.leftNode)
  printValue(node)
  node.rightNode && inOrderTraversal(node.rightNode)
}

/**
 * 使用栈实现中序遍历
 */
function inOrderTraversalUseStack(node) {
  let stack = new Stack();
  stack.push(node)
  let currentNode;
  while (stack.length() > 0) {
    currentNode = stack.getLast();
    if (!currentNode.leftNode) {
      let node = stack.pop();
      printValue(node)
      stack.getLast() && (stack.getLast().leftNode = null);
    }
    if (currentNode.leftNode) {
      stack.push(currentNode.leftNode)
      continue
    }
    if (currentNode.rightNode) {
      stack.push(currentNode.rightNode)
      continue
    }
  }
}

function printValue(node) {
  // console.log(node)
  console.log(node.value)
}
/**
 * 后序遍历
 */
function postOrderTraversal(node) {
  node.leftNode && postOrderTraversal(node.leftNode)
  node.rightNode && postOrderTraversal(node.rightNode)
  printValue(node)
}

/**
 * 在控制台打印树的形状
 **/
function printInConsole(rootNode) {
  let maxDeepNum = getMaxDeepNum(rootNode)
  //树的数组容器
  let treeArrContainer = [];
  //树包含节点本身和 "/","\"字符代表分支会占用1层，所以数量是 maxDeepNum * 2, 最底层不会含有子节点，所以是 maxDeepNum * 2 -1
  for (let i = 0; i < maxDeepNum * 2 - 1; i++) {
    treeArrContainer[i] = [];
  }
  //根节点的初始位置是 2 * maxDeepNum
  setNodeIndex(rootNode, 2 * maxDeepNum, treeArrContainer)
  //打印树的形状
  printArrContainer(treeArrContainer)
}


/**
 * 根据树的数组容器序列化地打印出树结构
 * @param {Array} treeArrContainer
 */
function printArrContainer(treeArrContainer) {
  for (let i = 0; i < treeArrContainer.length; i++) {
    let printStr = ""
    for (let j = 0; j < treeArrContainer[i].length; j++) {
      if (!treeArrContainer[i][j]) {
        //空格1作为占位符
        printStr += " ";
      } else {
        printStr += treeArrContainer[i][j]
      }
    }
    console.log(printStr)
  }
}

/**
 * 根据树深度来标记当前节点在树数组容器的位置
 * @param {Object} node
 * @param {Int} index 节点所在当前层级的位置
 * @param {Array} treeArrContainer
 * @param {Int} deepNum 当前深度
 */
function setNodeIndex(node, index, treeArrContainer, deepNum = 0) {
  //将节点的值记录在当前位置
  treeArrContainer[deepNum][index] = node.value
  //如果左节点存在，在下一层的 index - 1处加上 / 字符，标记子节点的层级位置为 index - 2，深度 + 2
  node.leftNode
    && (treeArrContainer[deepNum + 1][index - 1] = "/")
    && setNodeIndex(node.leftNode, index - 2, treeArrContainer, deepNum + 2)
  //如果右节点存在，在下一层的 index + 1处加上 \ 字符，标记子节点的层级位置为 index - 2，深度 + 2
  node.rightNode
    && (treeArrContainer[deepNum + 1][index + 1] = "\\")
    && setNodeIndex(node.rightNode, index + 2, treeArrContainer, deepNum + 2)
}

exports.printInConsole = printInConsole;
exports.preOrderTraversal = preOrderTraversal;
exports.inOrderTraversal = inOrderTraversal;
exports.postOrderTraversal = postOrderTraversal;
exports.inOrderTraversalUseStack = inOrderTraversalUseStack;

