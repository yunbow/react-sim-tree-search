import React, { useState, useCallback } from 'react'
import type { TreeNode, AlgorithmType, DataPattern } from '../../../types'
import { generateTree } from '../utils/dataGenerator'
import { useTreeTraversal } from '../hooks/useTreeTraversal'
import { TreeVisualization } from '../components/TreeVisualization'
import { TreeStats } from '../components/TreeStats'
import { TreeLog } from '../components/TreeLog'
import { Button } from '../../../components/Button'
import { Select } from '../../../components/Select'
import { Input } from '../../../components/Input'
import { Slider } from '../../../components/Slider'
import styles from './ComparisonMode.module.css'

const algorithmOptions = [
  { value: 'bfs', label: 'BFS (幅優先探索)' },
  { value: 'dfs-preorder', label: 'DFS Preorder (前順)' },
  { value: 'dfs-inorder', label: 'DFS Inorder (中順)' },
  { value: 'dfs-postorder', label: 'DFS Postorder (後順)' }
]

const dataPatternOptions = [
  { value: 'random', label: 'ランダム' },
  { value: 'binary-search-tree', label: '二分探索木' },
  { value: 'avl-tree', label: 'AVL木' },
  { value: 'red-black-tree', label: '赤黒木' },
  { value: 'min-heap', label: 'Min-Heap' },
  { value: 'max-heap', label: 'Max-Heap' }
]

export const ComparisonMode: React.FC = () => {
  const [tree, setTree] = useState<TreeNode | null>(null)
  const [algorithmType1, setAlgorithmType1] = useState<AlgorithmType>('bfs')
  const [algorithmType2, setAlgorithmType2] = useState<AlgorithmType>('dfs-preorder')
  const [dataPattern, setDataPattern] = useState<DataPattern>('random')
  const [nodeCount, setNodeCount] = useState(10)
  const [speed, setSpeed] = useState(2)
  const [targetValue, setTargetValue] = useState<number | null>(null)

  const traversal1 = useTreeTraversal({
    tree,
    algorithmType: algorithmType1,
    speed,
    targetValue
  })

  const traversal2 = useTreeTraversal({
    tree,
    algorithmType: algorithmType2,
    speed,
    targetValue
  })

  const handleGenerateTree = useCallback(() => {
    const newTree = generateTree(dataPattern, nodeCount)
    setTree(newTree)
  }, [dataPattern, nodeCount])

  const handleNodeCountChange = (count: number | string) => {
    if (typeof count === 'number' && count >= 5 && count <= 50) {
      setNodeCount(count)
    }
  }

  const isAnyRunning =
    traversal1.animationState === 'running' || traversal2.animationState === 'running'

  const isBothIdle =
    traversal1.animationState === 'idle' && traversal2.animationState === 'idle'

  const isBothPaused =
    traversal1.animationState === 'paused' && traversal2.animationState === 'paused'

  const isAnyCompleted =
    traversal1.animationState === 'completed' || traversal2.animationState === 'completed'

  const handleSimultaneousToggle = () => {
    traversal1.togglePlayPause()
    traversal2.togglePlayPause()
  }

  const getSimultaneousButtonLabel = () => {
    if (isBothIdle) return '同時に実行'
    if (isAnyRunning) return '一時停止'
    if (isBothPaused) return '再開'
    return '実行/再開'
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ツリー探索比較モード</h1>

      <div className={styles.controls}>
        <div className={styles.controlsRow}>
          <Select
            label="生成パターン"
            value={dataPattern}
            onChange={(value) => setDataPattern(value as DataPattern)}
            options={dataPatternOptions}
            disabled={isAnyRunning}
          />

          <Input
            label="ノード数"
            value={nodeCount}
            onChange={handleNodeCountChange}
            min={5}
            max={50}
            disabled={isAnyRunning}
          />

          <Input
            label="目標値 (未設定で全探索)"
            value={targetValue ?? ''}
            onChange={(value) => setTargetValue(typeof value === 'number' ? value : null)}
            disabled={isAnyRunning}
          />

          <Slider
            label="アニメーション速度"
            value={speed}
            onChange={setSpeed}
            min={1}
            max={10}
            step={1}
          />
        </div>

        <div className={styles.buttons}>
          <Button onClick={handleGenerateTree} disabled={isAnyRunning}>
            データ生成
          </Button>
          <Button
            onClick={handleSimultaneousToggle}
            variant="primary"
            disabled={isAnyCompleted}
          >
            {getSimultaneousButtonLabel()}
          </Button>
          <Button
            onClick={() => {
              traversal1.reset()
              traversal2.reset()
            }}
            variant="secondary"
          >
            リセット
          </Button>
        </div>
      </div>

      <div className={styles.comparison}>
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <Select
              label="アルゴリズム 1"
              value={algorithmType1}
              onChange={(value) => setAlgorithmType1(value as AlgorithmType)}
              options={algorithmOptions}
              disabled={isAnyRunning}
            />
          </div>

          {tree ? (
            <TreeVisualization tree={tree} nodeStatuses={traversal1.nodeStatuses} />
          ) : (
            <div className={styles.placeholder}>
              「データ生成」ボタンを押してツリーを生成してください
            </div>
          )}

          <TreeStats stepCount={traversal1.stepCount} />
          <TreeLog logs={traversal1.logs} />
        </div>

        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <Select
              label="アルゴリズム 2"
              value={algorithmType2}
              onChange={(value) => setAlgorithmType2(value as AlgorithmType)}
              options={algorithmOptions}
              disabled={isAnyRunning}
            />
          </div>

          {tree ? (
            <TreeVisualization tree={tree} nodeStatuses={traversal2.nodeStatuses} />
          ) : (
            <div className={styles.placeholder}>
              「データ生成」ボタンを押してツリーを生成してください
            </div>
          )}

          <TreeStats stepCount={traversal2.stepCount} />
          <TreeLog logs={traversal2.logs} />
        </div>
      </div>
    </div>
  )
}
