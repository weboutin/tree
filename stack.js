

/**
 * 栈
 */
class Stack {
  constructor() {
    this.stackContainer = []
  }

  push(item) {
    this.stackContainer.push(item)
  }

  pop() {
    return this.stackContainer.pop();
  }

  length() {
    return this.stackContainer.length;
  }

  getLast() {
    return this.stackContainer[this.stackContainer.length - 1]
  }

}
module.exports = Stack
