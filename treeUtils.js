const Stack = require('./stack');
/**
 * 计算叶子树 / 分支数
 * @param {Object} node
 */
function branchNum(node) {
  let count = 0;
  (function traversal(node) {
    node.leftNode && traversal(node.leftNode)
    node.rightNode && traversal(node.rightNode)
    if (!node.leftNode && !node.rightNode) {
      count++;
    }
  }
  )(node)
  return count
}

/**
 * 计算树最大深度
 * @param node {Object}
 **/
function getMaxDeepNum(node) {
  if (!node) {
    return 0;
  }
  function max(num1, num2) {
    return num1 >= num2 ? num1 : num2
  }
  return node ? max(getMaxDeepNum(node.leftNode), getMaxDeepNum(node.rightNode)) + 1 : 0
}

/**
 * 前序遍历
 */
function preOrderTraversal(node, resultContainer) {
  resultContainer ? resultContainer.push(node.value) : printValue(node);
  node.leftNode && preOrderTraversal(node.leftNode, resultContainer)
  node.rightNode && preOrderTraversal(node.rightNode, resultContainer)
}

/**
 * 使用栈实现前序序遍历
 */
function preOrderTraversalUseStack(node, resultContainer) {
  let stack = new Stack();
  stack.push(node)
  let currentNode;
  while (stack.length() > 0) {
    currentNode = stack.pop();
    resultContainer.push(currentNode.value)
    if (currentNode.rightNode) {
      stack.push(currentNode.rightNode)
    }
    if (currentNode.leftNode) {
      stack.push(currentNode.leftNode)
    }
  }
}

/**
 * 中序遍历
 */
function inOrderTraversal(node, resultContainer) {
  node.leftNode && inOrderTraversal(node.leftNode, resultContainer)
  resultContainer ? resultContainer.push(node.value) : printValue(node);
  node.rightNode && inOrderTraversal(node.rightNode, resultContainer)
}

/**
 * 使用栈实现中序遍历
 */
function inOrderTraversalUseStack(node, resultContainer) {
  let stack = new Stack();
  stack.push(node)
  let currentNode;
  while (stack.length() > 0) {
    currentNode = stack.getLast();
    if (!currentNode.leftNode) {
      let node = stack.pop();
      resultContainer ? resultContainer.push(node.value) : printValue(node);
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
  1, 2, 3, 5, 6, 8, 9
  console.log(node.value)
}
/**
 * 后序遍历
 */
function postOrderTraversal(node, resultContainer) {
  node.leftNode && postOrderTraversal(node.leftNode, resultContainer)
  node.rightNode && postOrderTraversal(node.rightNode, resultContainer)
  resultContainer ? resultContainer.push(node.value) : printValue(node);
}

function postOrderTraversalUseStack(node, resultContainer) {
  let stack = new Stack();
  stack.push(node)
  let currentNode;
  while (stack.length() > 0) {
    currentNode = stack.getLast();
    if (!currentNode.leftNode && !currentNode.rightNode) {
      let node = stack.pop();
      resultContainer ? resultContainer.push(node.value) : printValue(node);
      stack.getLast() && (
        stack.getLast().leftNode ?
          stack.getLast().leftNode = null
          : stack.getLast().rightNode = null)
    }
    if (currentNode.leftNode) {
      stack.push(currentNode.leftNode)
      continue;
    }
    if (currentNode.rightNode) {
      stack.push(currentNode.rightNode)
      continue;
    }
  }
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

function sortNode(node1, node2, node3) {
  let rootNode = null
  node1.clearBranch();
  node2.clearBranch();
  node3.clearBranch();
}

// currentNode.setParent(compareNode)
function buildAvlTree(currentNode, compareNode, rootNode) {
  if (currentNode.value < compareNode.value) {
    if (!compareNode.leftNode) {
      compareNode.setLeft(currentNode)
      currentNode.setParent(compareNode)
      let BalanceFactor = getMaxDeepNum(rootNode.leftNode) - getMaxDeepNum(rootNode.rightNode)
      if (BalanceFactor != 0 && BalanceFactor != 1 && BalanceFactor != -1) {
        //不平衡点
        let unBanceNode = currentNode.parentNode.parentNode;

        if (unBanceNode.leftNode && unBanceNode.rightNode) {

        } else {
          //如果不平衡点只有一个子节点，那不平衡点下3个节点排序即可
          let unBanceNodeParent = unBanceNode.parentNode;
          let maxNode = sortNode(currentNode, currentNode.parentNode, currentNode.parentNode.parentNode);
          //修改父节点指向
          if (unBanceNode) {
            unBanceNode.parentNode = unBanceNodeParent
          }
        }
      }
      return
    }
    buildAvlTree(currentNode, compareNode.leftNode, rootNode)
  } else {
    if (!compareNode.rightNode) {
      compareNode.setRight(currentNode)
      currentNode.setParent(compareNode)
      let BalanceFactor = getMaxDeepNum(rootNode.leftNode) - getMaxDeepNum(rootNode.rightNode)
      if (BalanceFactor != 0 && BalanceFactor != 1 && BalanceFactor != -1) {
        //树不平衡
      }
      return
    }
    buildAvlTree(currentNode, compareNode.rightNode, rootNode)
  }

}

function buildBTree() {

}

function buildBplusTree() {

}

exports.printInConsole = printInConsole;
exports.preOrderTraversal = preOrderTraversal;
exports.preOrderTraversalUseStack = preOrderTraversalUseStack;
exports.inOrderTraversal = inOrderTraversal;
exports.postOrderTraversal = postOrderTraversal;
exports.inOrderTraversalUseStack = inOrderTraversalUseStack;
exports.postOrderTraversalUseStack = postOrderTraversalUseStack;
exports.branchNum = branchNum;
exports.buildTree = buildTree;
exports.buildAvlTree = buildAvlTree;
exports.buildBTree = buildBTree;
exports.buildBplusTree = buildBplusTree;
