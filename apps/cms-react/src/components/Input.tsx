import React from 'react'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string | null
}

export const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  return (
    <div className="mb-4">
      {label && <label className="label">{label}</label>}
      <input className="input" {...props} />
      {error && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{error}</p>}
    </div>
  )
}
