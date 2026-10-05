import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'outlineWhite'
  children?: ReactNode
}

const buttonStyles = {
  primary: 'bg-primary hover:bg-primary-hover',
  secondary: 'bg-paper-background hover:bg-extra-background',
  outline: 'border border-greyscale-400 text-greyscale-400 hover:border-text-light hover:text-text-light',
  outlineWhite: 'border border-white text-white hover:border-text-light hover:text-text-light',
}

const buttonIcons = {
  left: './assets/icons/arrow-left.svg',
  right: './assets/icons/arrow-right.svg',
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

export const CarrouselButton = ({ variant = 'primary', icons, className = '', ...props }: ButtonProps & { icons: 'left' | 'right' }) => {
  return (
    <button
      className={`hidden md:flex absolute ${icons === 'left' ? '-left-5' : '-right-5'} top-1/2 -translate-y-1/2 z-50 items-center justify-center w-11 h-11 bg-body-background hover:bg-[#607379] border border-outline-border rounded-full hover:cursor-pointer ${className}`}
      {...props}
    >
      <img src={buttonIcons[icons]} />
    </button>
  )
}

export default Button
