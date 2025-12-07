import React, { useEffect, useRef } from 'react'
import type { LogEntry } from '../../../../types'
import styles from './TreeLog.module.css'

interface TreeLogProps {
  logs: LogEntry[]
}

export const TreeLog: React.FC<TreeLogProps> = ({ logs }) => {
  const logEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>実行ログ</h3>
      <div className={styles.logList}>
        {logs.length === 0 ? (
          <div className={styles.empty}>ログがありません</div>
        ) : (
          logs.map((log, index) => (
            <div key={index} className={styles.logEntry}>
              <span className={styles.step}>Step {log.step}:</span>
              <span className={styles.message}>{log.message}</span>
            </div>
          ))
        )}
        <div ref={logEndRef} />
      </div>
    </div>
  )
}
