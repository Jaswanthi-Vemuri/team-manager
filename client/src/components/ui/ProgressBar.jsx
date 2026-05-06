import clsx from 'clsx'

export default function ProgressBar({
  value,
  max = 100,
  size = 'md',
  showLabel = false,
  className,
}) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  const sizes = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  }

  return (
    <div className={clsx('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between text-sm mb-1">
          <span className="text-text-secondary">Progress</span>
          <span className="font-medium text-text-primary">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={clsx('w-full bg-surface-subtle rounded-full overflow-hidden', sizes[size])}>
        <div
          className="h-full bg-gradient-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
