import React from 'react'
import styles from './Input.module.css'

interface InputProps {
  value: number | string
  onChange: (value: number | string) => void
  label?: string
  min?: number
  max?: number
  disabled?: boolean
}

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  label,
  min,
  max,
  disabled = false
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    if (inputValue === '') {
      onChange('')
    } else {
      const newValue = Number(inputValue)
      if (!isNaN(newValue)) {
        onChange(newValue)
      }
    }
  }

  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        type="number"
        className={styles.input}
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        disabled={disabled}
      />
    </div>
  )
}
