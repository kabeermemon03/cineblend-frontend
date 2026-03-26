import { forwardRef, useState, memo } from 'react'
import type { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glow'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  children?: ReactNode
}

interface Spark {
  id: number
  x: number
  y: number
}

const Button = memo(forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, onClick, ...props }, ref) => {
    const [sparks, setSparks] = useState<Spark[]>([])

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // Reduce spark calculations on low-end devices/fast clicks
      if (sparks.length > 5) return;
      
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      const newSpark = { id: Date.now(), x, y }
      setSparks(prev => [...prev, newSpark])
      setTimeout(() => {
        setSparks(prev => prev.filter(s => s.id !== newSpark.id))
      }, 600)

      if (onClick) onClick(e as any)
    }

    const variants: Record<string, string> = {
      primary: 'bg-mocha hover:bg-mocha-dark text-white',
      secondary: 'bg-purple-dark hover:bg-purple-brand text-white',
      outline: 'border-2 border-mocha text-mocha hover:bg-mocha hover:text-white',
      ghost: 'bg-transparent hover:bg-white/10 text-white',
      glow: 'bg-gradient-to-r from-mocha to-purple-brand text-white shadow-[0_0_20px_rgba(150,105,76,0.3)] hover:shadow-[0_0_30px_rgba(150,105,76,0.5)]',
    }

    const sizes: Record<string, string> = {
      sm: 'px-4 py-2 text-[12px] font-bold uppercase tracking-wider',
      md: 'px-6 py-3 text-[14px] font-black uppercase tracking-widest',
      lg: 'px-10 py-5 text-[16px] font-black uppercase tracking-[0.2em]',
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        // Use layoutId or layout for smooth transitions if needed, but keeping it simple for perf
        onClick={handleClick}
        className={cn(
          'inline-flex items-center justify-center rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden whitespace-nowrap gap-3',
          variants[variant] || variants.primary,
          sizes[size] || sizes.md,
          className
        )}
        {...props}
      >
        <AnimatePresence mode="popLayout">
          {sparks.map(spark => (
            <motion.div
              key={spark.id}
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 4, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }} // Shortened duration for snappier feel
              className="absolute pointer-events-none rounded-full bg-white/30 z-0"
              style={{
                left: spark.x,
                top: spark.y,
                width: 20,
                height: 20,
                transform: 'translate(-50%, -50%)'
              }}
            />
          ))}
        </AnimatePresence>

        {isLoading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white shrink-0" />
        ) : null}
        <span className="relative z-10 flex items-center justify-center gap-3">
          {children}
        </span>
      </motion.button>
    )
  }
))

Button.displayName = 'Button'

export default Button
