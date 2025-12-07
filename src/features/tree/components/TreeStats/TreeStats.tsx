import React from 'react'
import styles from './TreeStats.module.css'

interface TreeStatsProps {
  stepCount: number
}

export const TreeStats: React.FC<TreeStatsProps> = ({ stepCount }) => {
  return (
    <div className={styles.container}>
      <div className={styles.stat}>
        <span className={styles.label}>ステップ数</span>
        <span className={styles.value}>{stepCount}</span>
      </div>
    </div>
  )
}
