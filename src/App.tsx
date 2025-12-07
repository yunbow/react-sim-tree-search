import { useState } from 'react'
import { TreeSimulator } from './features/tree/TreeSimulator'
import { ComparisonMode } from './features/tree/ComparisonMode'
import { Button } from './components/Button'
import styles from './App.module.css'

function App() {
  const [mode, setMode] = useState<'single' | 'comparison'>('single')

  return (
    <div className={styles.app}>
      <div className={styles.modeSelector}>
        <Button
          onClick={() => setMode('single')}
          variant={mode === 'single' ? 'primary' : 'secondary'}
        >
          シングルモード
        </Button>
        <Button
          onClick={() => setMode('comparison')}
          variant={mode === 'comparison' ? 'primary' : 'secondary'}
        >
          比較モード
        </Button>
      </div>

      {mode === 'single' ? <TreeSimulator /> : <ComparisonMode />}
    </div>
  )
}

export default App
