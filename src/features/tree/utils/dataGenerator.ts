import type { TreeNode, DataPattern } from '../../../types'

// ランダムツリー生成
function generateRandomTree(values: number[]): TreeNode | null {
  if (values.length === 0) return null

  const root: TreeNode = {
    id: 0,
    value: values[0],
    left: null,
    right: null
  }

  const queue: TreeNode[] = [root]
  let index = 1
  let nodeId = 1

  while (queue.length > 0 && index < values.length) {
    const current = queue.shift()!

    // 左の子ノード
    if (index < values.length) {
      current.left = {
        id: nodeId++,
        value: values[index++],
        left: null,
        right: null
      }
      queue.push(current.left)
    }

    // 右の子ノード
    if (index < values.length) {
      current.right = {
        id: nodeId++,
        value: values[index++],
        left: null,
        right: null
      }
      queue.push(current.right)
    }
  }

  return root
}

// 二分探索木の生成
function generateBST(values: number[]): TreeNode | null {
  if (values.length === 0) return null

  let root: TreeNode | null = null
  let nodeId = 0

  const insert = (node: TreeNode | null, value: number): TreeNode => {
    if (node === null) {
      return {
        id: nodeId++,
        value,
        left: null,
        right: null
      }
    }

    if (value < node.value) {
      node.left = insert(node.left, value)
    } else {
      node.right = insert(node.right, value)
    }

    return node
  }

  for (const value of values) {
    root = insert(root, value)
  }

  return root
}

// AVL木の生成（簡易版）
function generateAVLTree(values: number[]): TreeNode | null {
  if (values.length === 0) return null

  let root: TreeNode | null = null
  let nodeId = 0

  const getHeight = (node: TreeNode | null): number => {
    if (node === null) return 0
    return Math.max(getHeight(node.left), getHeight(node.right)) + 1
  }

  const getBalance = (node: TreeNode | null): number => {
    if (node === null) return 0
    return getHeight(node.left) - getHeight(node.right)
  }

  const rotateRight = (y: TreeNode): TreeNode => {
    const x = y.left!
    const T2 = x.right

    x.right = y
    y.left = T2

    return x
  }

  const rotateLeft = (x: TreeNode): TreeNode => {
    const y = x.right!
    const T2 = y.left

    y.left = x
    x.right = T2

    return y
  }

  const insert = (node: TreeNode | null, value: number): TreeNode => {
    if (node === null) {
      return {
        id: nodeId++,
        value,
        left: null,
        right: null
      }
    }

    if (value < node.value) {
      node.left = insert(node.left, value)
    } else if (value > node.value) {
      node.right = insert(node.right, value)
    } else {
      return node
    }

    const balance = getBalance(node)

    // Left Left Case
    if (balance > 1 && node.left && value < node.left.value) {
      return rotateRight(node)
    }

    // Right Right Case
    if (balance < -1 && node.right && value > node.right.value) {
      return rotateLeft(node)
    }

    // Left Right Case
    if (balance > 1 && node.left && value > node.left.value) {
      node.left = rotateLeft(node.left)
      return rotateRight(node)
    }

    // Right Left Case
    if (balance < -1 && node.right && value < node.right.value) {
      node.right = rotateRight(node.right)
      return rotateLeft(node)
    }

    return node
  }

  for (const value of values) {
    root = insert(root, value)
  }

  return root
}

// Min-Heapの生成
function generateMinHeap(values: number[]): TreeNode | null {
  if (values.length === 0) return null

  const heap = [...values]

  // ヒープ化
  for (let i = Math.floor(heap.length / 2) - 1; i >= 0; i--) {
    heapifyMin(heap, heap.length, i)
  }

  return arrayToTree(heap)
}

// Max-Heapの生成
function generateMaxHeap(values: number[]): TreeNode | null {
  if (values.length === 0) return null

  const heap = [...values]

  // ヒープ化
  for (let i = Math.floor(heap.length / 2) - 1; i >= 0; i--) {
    heapifyMax(heap, heap.length, i)
  }

  return arrayToTree(heap)
}

function heapifyMin(arr: number[], n: number, i: number): void {
  let smallest = i
  const left = 2 * i + 1
  const right = 2 * i + 2

  if (left < n && arr[left] < arr[smallest]) {
    smallest = left
  }

  if (right < n && arr[right] < arr[smallest]) {
    smallest = right
  }

  if (smallest !== i) {
    ;[arr[i], arr[smallest]] = [arr[smallest], arr[i]]
    heapifyMin(arr, n, smallest)
  }
}

function heapifyMax(arr: number[], n: number, i: number): void {
  let largest = i
  const left = 2 * i + 1
  const right = 2 * i + 2

  if (left < n && arr[left] > arr[largest]) {
    largest = left
  }

  if (right < n && arr[right] > arr[largest]) {
    largest = right
  }

  if (largest !== i) {
    ;[arr[i], arr[largest]] = [arr[largest], arr[i]]
    heapifyMax(arr, n, largest)
  }
}

function arrayToTree(arr: number[]): TreeNode | null {
  if (arr.length === 0) return null

  const root: TreeNode = {
    id: 0,
    value: arr[0],
    left: null,
    right: null
  }

  const queue: TreeNode[] = [root]
  let index = 1
  let nodeId = 1

  while (queue.length > 0 && index < arr.length) {
    const current = queue.shift()!

    // 左の子ノード
    if (index < arr.length) {
      current.left = {
        id: nodeId++,
        value: arr[index++],
        left: null,
        right: null
      }
      queue.push(current.left)
    }

    // 右の子ノード
    if (index < arr.length) {
      current.right = {
        id: nodeId++,
        value: arr[index++],
        left: null,
        right: null
      }
      queue.push(current.right)
    }
  }

  return root
}

// 赤黒木の生成（簡易版 - BST として生成）
function generateRedBlackTree(values: number[]): TreeNode | null {
  // 簡易実装のため、BST として生成
  return generateBST(values)
}

// ランダムな値の配列を生成
export function generateRandomValues(size: number): number[] {
  const values: number[] = []
  const used = new Set<number>()

  while (values.length < size) {
    const value = Math.floor(Math.random() * (size * 10)) + 1
    if (!used.has(value)) {
      used.add(value)
      values.push(value)
    }
  }

  return values
}

// パターンに応じてツリーを生成
export function generateTree(pattern: DataPattern, size: number): TreeNode | null {
  const values = generateRandomValues(size)

  switch (pattern) {
    case 'random':
      return generateRandomTree(values)
    case 'binary-search-tree':
      return generateBST(values)
    case 'avl-tree':
      return generateAVLTree(values)
    case 'red-black-tree':
      return generateRedBlackTree(values)
    case 'min-heap':
      return generateMinHeap(values)
    case 'max-heap':
      return generateMaxHeap(values)
    default:
      return generateRandomTree(values)
  }
}
