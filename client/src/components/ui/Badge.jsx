import clsx from 'clsx'

const variants = {
  default: 'bg-surface-subtle text-text-secondary',
  primary: 'bg-primary-100 text-primary-700',
  info: 'bg-status-info-bg text-status-info',
  success: 'bg-status-success-bg text-status-success',
  warning: 'bg-status-warning-bg text-status-warning',
  destructive: 'bg-status-destructive-bg text-status-destructive',
}

export default function Badge({
  children,
  variant = 'default',
  className,
}) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
