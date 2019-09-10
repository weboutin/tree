//打印树所有分支

//计算树最大深度和最小深度

//计算树的分支树

function max(num1, num2) {
  return num1 >= num2 ? num1 : num2
}

function maxDeep(node) {
  if (!node) {
    return 0
  }
  return max(maxDeep(node.leftNode), maxDeep(node.rightNode)) + 1
}

function printTree(rootNode) {
  let deepNum = maxDeep(rootNode)
  let deepArr = [];
  for (let i = 0; i < deepNum * 2; i++) {
    deepArr[i] = [];
  }
  drawOne(rootNode, 2 * deepNum, deepArr)
  printDeepArr(deepArr)
}

function printDeepArr(deepArr) {
  for (let i = 0; i < deepArr.length; i++) {
    let printStr = ""
    for (let j = 0; j < deepArr[i].length; j++) {
      if (!deepArr[i][j]) {
        printStr += " ";
      } else {
        printStr += deepArr[i][j]
      }
    }
    console.log(printStr)
  }
}

function drawOne(node, index, deepArr, deepNum = 0) {
  deepArr[deepNum][index] = node.value
  if (node.leftNode) {
    deepArr[deepNum + 1][index - 1] = "/"
  }
  if (node.rightNode) {
    deepArr[deepNum + 1][index + 1] = "\\"
  }
  node.leftNode && drawOne(node.leftNode, index - 2, deepArr, deepNum + 2)
  node.rightNode && drawOne(node.rightNode, index + 2, deepArr, deepNum + 2)
}

exports.printTree = printTree;
