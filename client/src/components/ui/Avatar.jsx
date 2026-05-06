import clsx from 'clsx'

const sizes = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
}

const colors = [
  'bg-primary-500',
  'bg-violet-500',
  'bg-pink-500',
  'bg-cyan-500',
  'bg-emerald-500',
  'bg-amber-500',
]

export default function Avatar({
  src,
  name,
  size = 'md',
  className,
}) {
  const initials = name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || '?'

  const colorIndex = name ? name.charCodeAt(0) % colors.length : 0

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={clsx(
          'rounded-full object-cover ring-2 ring-white',
          sizes[size],
          className
        )}
      />
    )
  }

  return (
    <div
      className={clsx(
        'rounded-full flex items-center justify-center font-medium text-white ring-2 ring-white',
        sizes[size],
        colors[colorIndex],
        className
      )}
    >
      {initials}
    </div>
  )
}
