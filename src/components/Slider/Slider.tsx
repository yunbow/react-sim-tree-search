import React from 'react'
import styles from './Slider.module.css'

interface SliderProps {
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step?: number
  label?: string
  disabled?: boolean
}

export const Slider: React.FC<SliderProps> = ({
  value,
  onChange,
  min,
  max,
  step = 1,
  label,
  disabled = false
}) => {
  return (
    <div className={styles.container}>
      {label && (
        <div className={styles.labelContainer}>
          <label className={styles.label}>{label}</label>
          <span className={styles.value}>{value}</span>
        </div>
      )}
      <input
        type="range"
        className={styles.slider}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
      />
    </div>
  )
}
