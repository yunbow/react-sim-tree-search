// ノード状態の型定義
export type NodeStatus = 'unvisited' | 'active' | 'visited' | 'queued' | 'found'

// ツリーノードの型定義
export interface TreeNode {
  id: number
  value: number
  left: TreeNode | null
  right: TreeNode | null
}

// アルゴリズムタイプ
export type AlgorithmType = 'bfs' | 'dfs-preorder' | 'dfs-inorder' | 'dfs-postorder'

// データ生成パターン
export type DataPattern =
  | 'random'
  | 'binary-search-tree'
  | 'avl-tree'
  | 'red-black-tree'
  | 'min-heap'
  | 'max-heap'

// アニメーションステップ
export interface AnimationStep {
  nodeId: number
  status: NodeStatus
  message: string
}

// ログエントリー
export interface LogEntry {
  step: number
  message: string
  timestamp: number
}

// アニメーション状態
export type AnimationState = 'idle' | 'running' | 'paused' | 'completed'

// Vis.jsのネットワークノード
export interface VisNode {
  id: number
  label: string
  color?: string
  level?: number
}

// Vis.jsのエッジ
export interface VisEdge {
  from: number
  to: number
}

// ツリーデータ構造（Vis.js用）
export interface TreeData {
  nodes: VisNode[]
  edges: VisEdge[]
}

// 色設定
export const NODE_COLORS = {
  unvisited: '#9e9e9e',    // 灰色
  active: '#2196f3',       // 青
  visited: '#4caf50',      // 緑
  queued: '#ffeb3b',       // 黄
  found: '#f44336'         // 赤
} as const
