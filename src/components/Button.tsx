import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  children: ReactNode
}

const buttonStyles = {
  primary: 'bg-primary hover:bg-primary-hover',
  secondary: 'bg-paper-background hover:bg-extra-background',
  outline: 'border border-greyscale-400 text-greyscale-400 hover:border-text-light hover:text-text-light',
}

const Button = ({ variant = 'primary', className = '', children, ...props }: ButtonProps) => {
  return (
    <button
      className={`inline-flex cursor-pointer items-center justify-center rounded-full transition-colors ${buttonStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button