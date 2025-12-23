import React from 'react'

type Variant = 'primary' | 'secondary' | 'danger'
type Size = 'sm' | 'md'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  size?: Size
  className?: string
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const variantClasses: Record<Variant, string> = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger',
  }

  const sizeClasses: Record<Size, string> = {
    sm: 'btn-sm',
    md: '',
  }

  return (
    <button className={`btn ${variantClasses[variant]} ${sizeClasses[size]} ${className}`} {...props}>
      {children}
    </button>
  )
}
