import { useState, useCallback, useRef, useEffect } from 'react'
import type {
  TreeNode,
  AlgorithmType,
  AnimationState,
  NodeStatus,
  LogEntry,
  AnimationStep
} from '../../../types'
import { getTraversalGenerator } from '../algorithms'

interface UseTreeTraversalProps {
  tree: TreeNode | null
  algorithmType: AlgorithmType
  speed: number
  targetValue: number | null
}

export const useTreeTraversal = ({
  tree,
  algorithmType,
  speed,
  targetValue
}: UseTreeTraversalProps) => {
  const [animationState, setAnimationState] = useState<AnimationState>('idle')
  const [nodeStatuses, setNodeStatuses] = useState<Map<number, NodeStatus>>(new Map())
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [stepCount, setStepCount] = useState(0)

  const generatorRef = useRef<Generator<AnimationStep> | null>(null)
  const timeoutRef = useRef<number | null>(null)

  // アニメーションをリセット
  const reset = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    setAnimationState('idle')
    setNodeStatuses(new Map())
    setLogs([])
    setStepCount(0)
    generatorRef.current = null
  }, [])

  // 新しいツリーまたはアルゴリズムが設定されたらリセット
  useEffect(() => {
    reset()
  }, [tree, algorithmType, reset])

  // アニメーションステップを実行
  const executeStep = useCallback(() => {
    if (!generatorRef.current) return

    const result = generatorRef.current.next()

    if (result.done) {
      setAnimationState('completed')
      return
    }

    const step = result.value

    setNodeStatuses((prev) => {
      const newMap = new Map(prev)
      newMap.set(step.nodeId, step.status)
      return newMap
    })

    setLogs((prev) => [
      ...prev,
      {
        step: stepCount + 1,
        message: step.message,
        timestamp: Date.now()
      }
    ])

    setStepCount((prev) => prev + 1)

    // 次のステップをスケジュール
    const delay = 1000 / speed
    timeoutRef.current = window.setTimeout(() => {
      executeStep()
    }, delay)
  }, [speed, stepCount])

  // アニメーション開始
  const start = useCallback(() => {
    if (!tree) return

    if (animationState === 'idle') {
      generatorRef.current = getTraversalGenerator(algorithmType, tree, targetValue)
      setAnimationState('running')
      executeStep()
    } else if (animationState === 'paused') {
      setAnimationState('running')
      executeStep()
    }
  }, [tree, algorithmType, targetValue, animationState, executeStep])

  // アニメーション一時停止
  const pause = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setAnimationState('paused')
  }, [])

  // 実行/一時停止トグル
  const togglePlayPause = useCallback(() => {
    if (animationState === 'idle' || animationState === 'paused') {
      start()
    } else if (animationState === 'running') {
      pause()
    }
  }, [animationState, start, pause])

  return {
    animationState,
    nodeStatuses,
    logs,
    stepCount,
    start,
    pause,
    reset,
    togglePlayPause
  }
}
