import { InputHTMLAttributes, forwardRef } from 'react'
import './Input.css'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  variant?: 'default' | 'outlined' | 'filled'
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  variant = 'default',
  className = '',
  id,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
  const hasError = Boolean(error)
  
  const inputClasses = [
    'input',
    `input--${variant}`,
    hasError ? 'input--error' : '',
    className
  ].filter(Boolean).join(' ')

  return (
    <div className="input-wrapper">
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={inputClasses}
        aria-invalid={hasError}
        aria-describedby={
          error ? `${inputId}-error` : 
          helperText ? `${inputId}-helper` : undefined
        }
        {...props}
      />
      {error && (
        <div id={`${inputId}-error`} className="input-error" role="alert">
          {error}
        </div>
      )}
      {helperText && !error && (
        <div id={`${inputId}-helper`} className="input-helper">
          {helperText}
        </div>
      )}
    </div>
  )
})