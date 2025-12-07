import { useEffect, useRef } from 'react'
import { Network } from 'vis-network'
import { DataSet } from 'vis-data'
import type { TreeNode, TreeData, NodeStatus } from '../../../../types'
import { NODE_COLORS as COLORS } from '../../../../types'
import styles from './TreeVisualization.module.css'

interface TreeVisualizationProps {
  tree: TreeNode | null
  nodeStatuses: Map<number, NodeStatus>
}

// ツリーをVis.jsのデータ形式に変換
function convertTreeToVisData(root: TreeNode | null): TreeData {
  const nodes: TreeData['nodes'] = []
  const edges: TreeData['edges'] = []

  if (!root) return { nodes, edges }

  const queue: { node: TreeNode; level: number }[] = [{ node: root, level: 0 }]

  while (queue.length > 0) {
    const { node, level } = queue.shift()!

    nodes.push({
      id: node.id,
      label: String(node.value),
      level
    })

    if (node.left) {
      edges.push({ from: node.id, to: node.left.id })
      queue.push({ node: node.left, level: level + 1 })
    }

    if (node.right) {
      edges.push({ from: node.id, to: node.right.id })
      queue.push({ node: node.right, level: level + 1 })
    }
  }

  return { nodes, edges }
}

export const TreeVisualization: React.FC<TreeVisualizationProps> = ({
  tree,
  nodeStatuses
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const networkRef = useRef<Network | null>(null)
  const nodesDataSetRef = useRef<DataSet<any> | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const { nodes, edges } = convertTreeToVisData(tree)

    const nodesDataSet = new DataSet<any>(
      nodes.map((node) => ({
        id: node.id,
        label: node.label,
        color: COLORS.unvisited,
        level: node.level,
        shape: 'circle',
        font: { color: '#ffffff', size: 14, face: 'Arial' },
        size: 25
      }))
    )
    nodesDataSetRef.current = nodesDataSet

    const edgesDataSet = new DataSet<any>(
      edges.map((edge) => ({
        from: edge.from,
        to: edge.to,
        arrows: 'to',
        color: { color: '#999999' }
      }))
    )

    const options = {
      layout: {
        hierarchical: {
          direction: 'UD',
          sortMethod: 'directed',
          nodeSpacing: 150,
          levelSeparation: 100,
        }
      },
      physics: {
        enabled: false
      },
      nodes: {
        shape: 'circle',
        size: 30,
        color: {
          background: '#ffffff',
          border: '#848484',
          highlight: {
            background: '#ffffff',
            border: '#848484',
          },
        },
        font: {
          size: 16,
          color: '#000000',
          face: 'Arial, sans-serif',
          bold: {
            face: 'Arial, sans-serif',
          },
        },
        borderWidth: 2,
        borderWidthSelected: 4,
        shadow: {
          enabled: true,
          color: 'rgba(0, 0, 0, 0.3)',
          size: 10,
          x: 3,
          y: 3,
        },
      },
      edges: {
        color: {
          color: '#848484',
          highlight: '#848484',
        },
        smooth: {
          enabled: true,
          type: 'cubicBezier',
          forceDirection: 'vertical',
          roundness: 0.4,
        },
        arrows: {
          to: {
            enabled: true,
            scaleFactor: 0.8,
          },
        },
      },
      interaction: {
        dragNodes: false,
        dragView: true,
        zoomView: true,
        selectable: false,
      }
    }

    networkRef.current = new Network(
      containerRef.current,
      { nodes: nodesDataSet, edges: edgesDataSet },
      options
    )

    return () => {
      networkRef.current?.destroy()
    }
  }, [tree])

  // ノードの状態が変わったら色を更新
  useEffect(() => {
    if (!nodesDataSetRef.current) return

    // nodeStatusesが空の場合（リセット時）は、すべてのノードを初期色に戻す
    if (nodeStatuses.size === 0) {
      const allNodes = nodesDataSetRef.current.get()
      const resetUpdates = allNodes.map((node: any) => ({
        id: node.id,
        color: COLORS.unvisited
      }))
      if (resetUpdates.length > 0) {
        nodesDataSetRef.current.update(resetUpdates)
      }
      return
    }

    // nodeStatusesに基づいて色を更新
    const updates = Array.from(nodeStatuses.entries()).map(([nodeId, status]) => ({
      id: nodeId,
      color: COLORS[status]
    }))

    if (updates.length > 0) {
      nodesDataSetRef.current.update(updates)
    }
  }, [nodeStatuses])

  return <div ref={containerRef} className={styles.container} />
}
