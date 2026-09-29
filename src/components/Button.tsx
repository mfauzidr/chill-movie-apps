import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  children: ReactNode
}

const buttonStyles = {
  primary: 'bg-[#0f1e93] hover:bg-[#0a145e]',
  secondary: 'bg-[#22282a] hover:bg-[#607379]',
  outline: 'border border-[#c1c2c4] text-[#c1c2c4] hover:border-white hover:text-white',
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