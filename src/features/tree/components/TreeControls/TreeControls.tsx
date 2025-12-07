import React from 'react'
import { Button } from '../../../../components/Button'
import { Select } from '../../../../components/Select'
import { Input } from '../../../../components/Input'
import { Slider } from '../../../../components/Slider'
import type { AlgorithmType, DataPattern, AnimationState } from '../../../../types'
import styles from './TreeControls.module.css'

interface TreeControlsProps {
  algorithmType: AlgorithmType
  onAlgorithmChange: (type: AlgorithmType) => void
  dataPattern: DataPattern
  onDataPatternChange: (pattern: DataPattern) => void
  nodeCount: number
  onNodeCountChange: (count: number | string) => void
  speed: number
  onSpeedChange: (speed: number) => void
  targetValue: number | null
  onTargetValueChange: (value: number | null) => void
  animationState: AnimationState
  onTogglePlayPause: () => void
  onReset: () => void
  onGenerateTree: () => void
}

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

export const TreeControls: React.FC<TreeControlsProps> = ({
  algorithmType,
  onAlgorithmChange,
  dataPattern,
  onDataPatternChange,
  nodeCount,
  onNodeCountChange,
  speed,
  onSpeedChange,
  targetValue,
  onTargetValueChange,
  animationState,
  onTogglePlayPause,
  onReset,
  onGenerateTree
}) => {
  const isRunning = animationState === 'running'
  const isCompleted = animationState === 'completed'

  const getPlayPauseLabel = () => {
    if (animationState === 'idle') return '実行'
    if (animationState === 'running') return '一時停止'
    if (animationState === 'paused') return '再開'
    return '完了'
  }

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <Select
          label="アルゴリズム"
          value={algorithmType}
          onChange={(value) => onAlgorithmChange(value as AlgorithmType)}
          options={algorithmOptions}
          disabled={isRunning}
        />

        <Select
          label="生成パターン"
          value={dataPattern}
          onChange={(value) => onDataPatternChange(value as DataPattern)}
          options={dataPatternOptions}
          disabled={isRunning}
        />

        <Input
          label="ノード数"
          value={nodeCount}
          onChange={onNodeCountChange}
          min={5}
          max={50}
          disabled={isRunning}
        />

        <Input
          label="目標値 (未設定で全探索)"
          value={targetValue ?? ''}
          onChange={(value) => onTargetValueChange(typeof value === 'number' ? value : null)}
          disabled={isRunning}
        />
      </div>

      <div className={styles.row}>
        <Slider
          label="アニメーション速度"
          value={speed}
          onChange={onSpeedChange}
          min={1}
          max={10}
          step={1}
        />
      </div>

      <div className={styles.buttons}>
        <Button onClick={onGenerateTree} disabled={isRunning}>
          データ生成
        </Button>
        <Button
          onClick={onTogglePlayPause}
          variant="primary"
          disabled={isCompleted}
        >
          {getPlayPauseLabel()}
        </Button>
        <Button onClick={onReset} variant="secondary">
          リセット
        </Button>
      </div>
    </div>
  )
}
