import { forwardRef } from 'react'
import clsx from 'clsx'

const Input = forwardRef(({
  label,
  error,
  icon: Icon,
  className,
  ...props
}, ref) => {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-text-primary">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
        )}
        <input
          ref={ref}
          className={clsx(
            'input-base',
            Icon && 'pl-10',
            error && 'border-status-destructive focus:ring-status-destructive/20 focus:border-status-destructive',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-status-destructive">{error}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'
export default Input
