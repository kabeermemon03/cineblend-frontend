import { forwardRef } from 'react'
import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glow'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  children?: ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const variants: Record<string, string> = {
      primary: 'bg-mocha hover:bg-mocha-dark text-white',
      secondary: 'bg-purple-dark hover:bg-purple-brand text-white',
      outline: 'border-2 border-mocha text-mocha hover:bg-mocha hover:text-white',
      ghost: 'bg-transparent hover:bg-white/10 text-white',
      glow: 'bg-gradient-to-r from-mocha to-purple-brand text-white shadow-[0_0_20px_rgba(150,105,76,0.3)] hover:shadow-[0_0_30px_rgba(150,105,76,0.5)]',
    }

    const sizes: Record<string, string> = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base font-semibold',
      lg: 'px-8 py-4 text-lg font-bold',
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'inline-flex items-center justify-center rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
          variants[variant] || variants.primary,
          sizes[size] || sizes.md,
          className
        )}
        {...props}
      >
        {isLoading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
        ) : null}
        {children}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export default Button
