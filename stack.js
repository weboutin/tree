

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

}

module.export = Stack
