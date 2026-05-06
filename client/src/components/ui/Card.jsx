import clsx from 'clsx'
import { motion } from 'framer-motion'

export default function Card({
  children,
  className,
  hover = false,
  glass = false,
  padding = true,
  ...props
}) {
  const Component = hover ? motion.div : 'div'
  const motionProps = hover ? {
    whileHover: { y: -4, boxShadow: '0 8px 24px -8px rgba(0, 0, 0, 0.1), 0 16px 48px -16px rgba(0, 0, 0, 0.15)' },
    transition: { duration: 0.2 }
  } : {}

  return (
    <Component
      className={clsx(
        'rounded-2xl',
        glass ? 'glass' : 'bg-white border border-border',
        'shadow-soft',
        padding && 'p-6',
        hover && 'cursor-pointer',
        className
      )}
      {...motionProps}
      {...props}
    >
      {children}
    </Component>
  )
}
