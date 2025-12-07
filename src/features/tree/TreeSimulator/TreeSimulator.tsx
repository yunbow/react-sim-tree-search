import React, { useState, useCallback } from 'react'
import type { TreeNode, AlgorithmType, DataPattern } from '../../../types'
import { generateTree } from '../utils/dataGenerator'
import { useTreeTraversal } from '../hooks/useTreeTraversal'
import { TreeVisualization } from '../components/TreeVisualization'
import { TreeControls } from '../components/TreeControls'
import { TreeStats } from '../components/TreeStats'
import { TreeLog } from '../components/TreeLog'
import styles from './TreeSimulator.module.css'

export const TreeSimulator: React.FC = () => {
  const [tree, setTree] = useState<TreeNode | null>(null)
  const [algorithmType, setAlgorithmType] = useState<AlgorithmType>('bfs')
  const [dataPattern, setDataPattern] = useState<DataPattern>('random')
  const [nodeCount, setNodeCount] = useState(10)
  const [speed, setSpeed] = useState(2)
  const [targetValue, setTargetValue] = useState<number | null>(null)

  const {
    animationState,
    nodeStatuses,
    logs,
    stepCount,
    togglePlayPause,
    reset
  } = useTreeTraversal({
    tree,
    algorithmType,
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

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ツリー探索シミュレーター</h1>

      <TreeControls
        algorithmType={algorithmType}
        onAlgorithmChange={setAlgorithmType}
        dataPattern={dataPattern}
        onDataPatternChange={setDataPattern}
        nodeCount={nodeCount}
        onNodeCountChange={handleNodeCountChange}
        speed={speed}
        onSpeedChange={setSpeed}
        targetValue={targetValue}
        onTargetValueChange={setTargetValue}
        animationState={animationState}
        onTogglePlayPause={togglePlayPause}
        onReset={reset}
        onGenerateTree={handleGenerateTree}
      />

      <div className={styles.content}>
        <div className={styles.visualization}>
          {tree ? (
            <TreeVisualization tree={tree} nodeStatuses={nodeStatuses} />
          ) : (
            <div className={styles.placeholder}>
              「データ生成」ボタンを押してツリーを生成してください
            </div>
          )}
        </div>

        <div className={styles.sidebar}>
          <TreeStats stepCount={stepCount} />
          <TreeLog logs={logs} />
        </div>
      </div>
    </div>
  )
}
