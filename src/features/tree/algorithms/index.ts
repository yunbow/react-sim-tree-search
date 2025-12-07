import type { TreeNode, AnimationStep, AlgorithmType } from '../../../types'

// BFS（幅優先探索）
export function* bfs(root: TreeNode | null, targetValue: number | null = null): Generator<AnimationStep> {
  if (!root) return

  const queue: TreeNode[] = [root]
  let lastVisitedId = root.id

  while (queue.length > 0) {
    const current = queue.shift()!

    // 現在処理中のノードを強調
    yield {
      nodeId: current.id,
      status: 'active',
      message: `ノード ${current.value} を訪問中`
    }

    // 訪問済みに変更
    yield {
      nodeId: current.id,
      status: 'visited',
      message: `ノード ${current.value} を訪問済み`
    }

    lastVisitedId = current.id

    // 目標値が見つかった場合は探索を終了
    if (targetValue !== null && current.value === targetValue) {
      yield {
        nodeId: current.id,
        status: 'found',
        message: `目標値 ${targetValue} を発見！探索を終了します`
      }
      return
    }

    // 左の子をキューに追加
    if (current.left) {
      yield {
        nodeId: current.left.id,
        status: 'queued',
        message: `ノード ${current.left.value} をキューに追加`
      }
      queue.push(current.left)
    }

    // 右の子をキューに追加
    if (current.right) {
      yield {
        nodeId: current.right.id,
        status: 'queued',
        message: `ノード ${current.right.value} をキューに追加`
      }
      queue.push(current.right)
    }
  }

  // 目標値が設定されているのに見つからなかった場合
  if (targetValue !== null) {
    yield {
      nodeId: lastVisitedId,
      status: 'visited',
      message: `目標値 ${targetValue} は見つかりませんでした`
    }
  }
}

// DFS Preorder（前順探索）
export function* dfsPreorder(root: TreeNode | null, targetValue: number | null = null): Generator<AnimationStep> {
  if (!root) return

  const stack: TreeNode[] = [root]
  let lastVisitedId = root.id

  while (stack.length > 0) {
    const current = stack.pop()!

    // 現在処理中のノードを強調
    yield {
      nodeId: current.id,
      status: 'active',
      message: `ノード ${current.value} を訪問中 (Preorder)`
    }

    // 訪問済みに変更
    yield {
      nodeId: current.id,
      status: 'visited',
      message: `ノード ${current.value} を訪問済み`
    }

    lastVisitedId = current.id

    // 目標値が見つかった場合は探索を終了
    if (targetValue !== null && current.value === targetValue) {
      yield {
        nodeId: current.id,
        status: 'found',
        message: `目標値 ${targetValue} を発見！探索を終了します`
      }
      return
    }

    // スタックに追加（右、左の順）
    if (current.right) {
      yield {
        nodeId: current.right.id,
        status: 'queued',
        message: `ノード ${current.right.value} をスタックに追加`
      }
      stack.push(current.right)
    }

    if (current.left) {
      yield {
        nodeId: current.left.id,
        status: 'queued',
        message: `ノード ${current.left.value} をスタックに追加`
      }
      stack.push(current.left)
    }
  }

  // 目標値が設定されているのに見つからなかった場合
  if (targetValue !== null) {
    yield {
      nodeId: lastVisitedId,
      status: 'visited',
      message: `目標値 ${targetValue} は見つかりませんでした`
    }
  }
}

// DFS Inorder（中順探索）- 再帰版
function* dfsInorderRecursive(node: TreeNode | null, targetValue: number | null = null): Generator<AnimationStep, boolean> {
  if (!node) return false

  // 左の子を探索
  if (node.left) {
    const found = yield* dfsInorderRecursive(node.left, targetValue)
    if (found) return true
  }

  // 現在のノードを処理
  yield {
    nodeId: node.id,
    status: 'active',
    message: `ノード ${node.value} を訪問中 (Inorder)`
  }

  yield {
    nodeId: node.id,
    status: 'visited',
    message: `ノード ${node.value} を訪問済み`
  }

  // 目標値が見つかった場合は探索を終了
  if (targetValue !== null && node.value === targetValue) {
    yield {
      nodeId: node.id,
      status: 'found',
      message: `目標値 ${targetValue} を発見！探索を終了します`
    }
    return true
  }

  // 右の子を探索
  if (node.right) {
    const found = yield* dfsInorderRecursive(node.right, targetValue)
    if (found) return true
  }

  return false
}

export function* dfsInorder(root: TreeNode | null, targetValue: number | null = null): Generator<AnimationStep> {
  if (!root) return

  const found = yield* dfsInorderRecursive(root, targetValue)

  // 目標値が設定されているのに見つからなかった場合
  if (targetValue !== null && !found) {
    yield {
      nodeId: root.id,
      status: 'visited',
      message: `目標値 ${targetValue} は見つかりませんでした`
    }
  }
}

// DFS Postorder（後順探索）- 再帰版
function* dfsPostorderRecursive(node: TreeNode | null, targetValue: number | null = null): Generator<AnimationStep, boolean> {
  if (!node) return false

  // 左の子を探索
  if (node.left) {
    const found = yield* dfsPostorderRecursive(node.left, targetValue)
    if (found) return true
  }

  // 右の子を探索
  if (node.right) {
    const found = yield* dfsPostorderRecursive(node.right, targetValue)
    if (found) return true
  }

  // 現在のノードを処理
  yield {
    nodeId: node.id,
    status: 'active',
    message: `ノード ${node.value} を訪問中 (Postorder)`
  }

  yield {
    nodeId: node.id,
    status: 'visited',
    message: `ノード ${node.value} を訪問済み`
  }

  // 目標値が見つかった場合は探索を終了
  if (targetValue !== null && node.value === targetValue) {
    yield {
      nodeId: node.id,
      status: 'found',
      message: `目標値 ${targetValue} を発見！探索を終了します`
    }
    return true
  }

  return false
}

export function* dfsPostorder(root: TreeNode | null, targetValue: number | null = null): Generator<AnimationStep> {
  if (!root) return

  const found = yield* dfsPostorderRecursive(root, targetValue)

  // 目標値が設定されているのに見つからなかった場合
  if (targetValue !== null && !found) {
    yield {
      nodeId: root.id,
      status: 'visited',
      message: `目標値 ${targetValue} は見つかりませんでした`
    }
  }
}

// アルゴリズムタイプに応じたジェネレーターを返す
export function getTraversalGenerator(
  algorithmType: AlgorithmType,
  root: TreeNode | null,
  targetValue: number | null = null
): Generator<AnimationStep> {
  switch (algorithmType) {
    case 'bfs':
      return bfs(root, targetValue)
    case 'dfs-preorder':
      return dfsPreorder(root, targetValue)
    case 'dfs-inorder':
      return dfsInorder(root, targetValue)
    case 'dfs-postorder':
      return dfsPostorder(root, targetValue)
    default:
      return bfs(root, targetValue)
  }
}
