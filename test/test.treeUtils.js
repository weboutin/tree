const treeUtils = require('../treeUtils');
const should = require('should');
const Node = require('../Node');

function buildTestTree() {
  const seeds = [9, 2, 1, 6, 5, 3, 8];
  let rootNode = new Node(seeds[0]);
  for (let i = 1; i < seeds.length; i++) {
    treeUtils.buildTree(new Node(seeds[i]), rootNode);
  }
  return rootNode;
}

let rootNode = null;

describe('#000 Binary Tree!', () => {
  beforeEach(function () {
    rootNode = buildTestTree();
  });
  describe('#001 printInConsole', () => {
    it('success', () => {
      treeUtils.printInConsole(rootNode)
    });
  })
  describe('#002 preOrderTraversal', () => {
    it('success', () => {
      let resultContainer = []
      treeUtils.preOrderTraversal(rootNode, resultContainer);
      resultContainer.should.be.eql([9, 2, 1, 6, 5, 3, 8])
    });
  })
  describe('#003 inOrderTraversal', () => {
    it('success', () => {
      let resultContainer = []
      treeUtils.inOrderTraversal(rootNode, resultContainer);
      resultContainer.should.be.eql([1, 2, 3, 5, 6, 8, 9])
    });
  })
  describe('#004 postOrderTraversal', () => {
    it('success', () => {
      let resultContainer = []
      treeUtils.postOrderTraversal(rootNode, resultContainer);
      resultContainer.should.be.eql([1, 3, 5, 8, 6, 2, 9])
    });
  })
  describe('#005 inOrderTraversalUseStack', () => {
    it('success', () => {
      let resultContainer = []
      treeUtils.inOrderTraversalUseStack(rootNode, resultContainer);
      resultContainer.should.be.eql([1, 2, 3, 5, 6, 8, 9])
    });
  })
  describe('#006 branchNum', () => {
    it('success', () => {
      let branchNum = treeUtils.branchNum(rootNode);
      branchNum.should.be.eql(3)
    });
  })
  describe('#007 preOrderTraversalUsestack', () => {
    it('success', () => {
      let resultContainer = []
      treeUtils.preOrderTraversalUseStack(rootNode, resultContainer);
      resultContainer.should.be.eql([9, 2, 1, 6, 5, 3, 8])
    });
  })
  describe('#008 postOrderTraversalUsestack', () => {
    it('success', () => {
      let resultContainer = []
      treeUtils.postOrderTraversalUseStack(rootNode, resultContainer);
      resultContainer.should.be.eql([1, 3, 5, 8, 6, 2, 9])
    });
  })
})
