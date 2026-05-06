import { forwardRef } from 'react'
import clsx from 'clsx'

const variants = {
  primary: 'btn-gradient',
  secondary: 'bg-surface border border-border text-text-primary hover:bg-surface-muted',
  ghost: 'text-text-secondary hover:text-text-primary hover:bg-surface-muted',
  danger: 'bg-status-destructive text-white hover:bg-status-destructive/90',
  outline: 'border border-primary-500 text-primary-600 hover:bg-primary-50',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
  icon: 'p-2',
}

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  loading,
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={clsx(
        'inline-flex items-center justify-center gap-2 font-medium rounded-xl',
        'transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  )
})

Button.displayName = 'Button'
export default Button
